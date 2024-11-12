<template class="app-container">
  <div class="mbody">
    <el-timeline v-loading="loading" style="width: 600px; padding: 5px">
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
        :timestamp="activity.timestamp"
        placement="top"
      >
        <!--   -->
        <el-link
          v-if="checkPermi(['file:down:prjContChange', 'file:down:outContChange'])"
          type="primary"
          v-show="activity.fileIds && activity.fileIds.length > 0"
          @click="Output(activity.id)"
          >下载附件</el-link
        >
        <el-link
          v-else
          type="primary"
          v-show="activity.fileIds && activity.fileIds.length > 0"
          @click="exportApply(activity.id)"
          >申请下载</el-link
        >
        <el-card>
          <h4>
            {{ activity.title }}<span style="width: 10px; display: inline-block"></span>
            <el-tag type="danger" size="mini" v-show="activity.type == 2">中止</el-tag>
          </h4>
          <p>{{ activity.content }}</p>
          <div>
            <ul>
              <li
                @click="filePreview(c.annexId)"
                style="cursor: hand"
                v-for="c in activity.fileIds"
                :key="c.index"
              >
                <svg-icon icon-class="file" />
                <a style="cursor: hand; color: #409eff"> {{ c.originalName }}</a>
              </li>
            </ul>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>

    <el-dialog :visible.sync="dialogTableVisible" class="iframe" v-el-drag-dialog>
      <iframe width="100%" height="100%" :src="fileview"></iframe>
    </el-dialog>

    <ApplyDown ref="ApplyDown" :downSourceId="this.chooseId" :type="atype" />

    <BeforeDown ref="BeforeDown" :downSourceId="this.chooseId" :type="btype" />
  </div>
</template>

<script>
import BeforeDown from '@/views/components/dialog/beforeDown';
import ApplyDown from '@/views/components/dialog/applyDown';
import { projectContOperation, outsourcingOperation } from '@/api/data/contract';
import { checkPermi, checkRole } from '@/utils/permission'; // 权限判断函数
export default {
  name: 'ChangeRecord', //操作记录
  props: ['maxtbheigth', 'id', 'type'], //type 0 项目，1 外委
  dicts: ['invoice_type'],
  components: { ApplyDown, BeforeDown },
  data() {
    return {
      loading: true, // 遮罩层
      activities: [
        // {
        //   id: '1213', //id
        // },
      ],
      dialogTableVisible: false,
      fileview: '', //文件预览地址
      chooseId: '', //选中项
      atype: 0, //导出类型
      btype: 1, //下载类型
    };
  },
  created() {
    this.atype = this.type == 0 ? 10 : 11;
    this.btype = this.type == 0 ? 10 : 11;
  },
  methods: {
    checkPermi,
    checkRole,
    /** 查询列表 */
    getList(id) {
      if (id) {
        if (this.type == 0) {
          projectContOperation(id).then((response) => {
            this.activities = response.data.map((item) => {
              return {
                title:
                  (item.userName ? item.userName : '') + ` ` + (item.deptName ? item.deptName : ''),
                content: item.remark,
                timestamp: item.createTime,
                color: this.coverColor(item.type),
                fileIds: item.fileIds,
                type: item.type,
                id: item.id,
              };
            });
          });
          this.loading = false;
        }

        if (this.type == 1) {
          outsourcingOperation(id).then((response) => {
            this.activities = response.data.map((item) => {
              return {
                title:
                  (item.userName ? item.userName : '') + ` ` + (item.deptName ? item.deptName : ''),
                content: item.remark,
                timestamp: item.createTime,
                color: this.coverColor(item.type),
                fileIds: item.fileIds,
                type: item.type,
                id: item.id,
              };
            });
          });
          this.loading = false;
        }
      }
    },

    //申请导出
    exportApply(id) {
      this.chooseId = id;
      this.$refs.ApplyDown.downSourceId = id;
      this.$refs.ApplyDown.show();
    },

    //下载/导出
    Output(id) {
      this.chooseId = id;
      this.$refs.BeforeDown.downSourceId = id;
      this.$refs.BeforeDown.show();
    },

    //阶段颜色处理
    coverColor(status) {
      switch (status) {
        case 0:
          return '#409EFF';
        case 1:
          return '#2FD052';
        case 2:
          return 'red';
        default:
          break;
      }
    },

    coverTag(status) {
      switch (status) {
        case 0:
          return 'success';
        case 1:
          return 'info';
        case 2:
          return 'danger';
        default:
          break;
      }
    },

    coverTagContent(status) {
      switch (status) {
        case 0:
          return '新建';
        case 1:
          return '变更';
        case 2:
          return '中止';
        default:
          break;
      }
    },

    //文件预览
    filePreview(val) {
      this.fileview = 'about:blank';
      setTimeout(() => {
        this.fileview = process.env.VUE_APP_BASE_API + '/file/preview/' + val;
      }, 200);

      this.dialogTableVisible = true;
    },
  },
  //   watch: {
  //   id: {
  //     handler(val) {
  //       if (val) {
  //         //console.log('获取参数:' + val);
  //         this.getList();
  //       }
  //     },
  //     deep: true,
  //     immediate: true,
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.mbody {
  overflow: auto;
  max-height: 500px;
  margin: 5px;
  .el-link {
    // margin-right: 10px;
    // float: right;
    // position: relative;
    right: -490px;
    top: -20px;
  }
  h4 {
    font-size: 15px;
    font-weight: bold;
  }
  ul {
    // max-height: 150px;
    overflow: auto;
    list-style-type: none;
    margin: 0px 5px;
    padding: 0px;

    li {
      margin-bottom: 5px;
    }
  }
}
</style>
