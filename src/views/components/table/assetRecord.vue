<template class="app-container">
  <div class="mbody">
    <el-timeline v-loading="loading" style="width: 600px; padding: 5px">
      <!-- :type="activity.type"  checkEdit(activity)-->
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :icon="activity.icon"
        :color="activity.color"
        :size="activity.size"
        :timestamp="activity.timestamp"
        placement="top"
      >
        <!-- <div v-show="activity.type != 2">
          <el-link
            type="primary"
            v-if="checkPermi(['property:stock0:in:edit', 'property:stock0:use:edit'])"
            @click="handleEdit(activity)"
            >编辑</el-link
          >
        </div> -->

        <el-card>
          <h4>{{ activity.title }}<span style="width: 10px; display: inline-block"></span></h4>
          <p>{{ activity.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import BeforeDown from '@/views/components/dialog/beforeDown';
import ApplyDown from '@/views/components/dialog/applyDown';
import { projectContOperation, outsourcingOperation } from '@/api/data/contract';
import { checkPermi, checkRole } from '@/utils/permission'; // 权限判断函数
export default {
  name: 'AssetRecord', //操作记录
  props: ['maxtbheigth', 'id', 'type', 'data'], //type 0 项目，1 外委
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
    };
  },
  created() {},
  methods: {
    checkPermi,
    checkRole,
    /** 查询列表 */
    getList() {
      if (this.data) {
        this.activities = this.data.map((item) => {
          return {
            title:
              (item.applyUser ? item.applyUser : '') +
              `\xa0` +
              `\xa0` +
              `\xa0` +
              `\xa0` +
              (item.applyDept ? item.applyDept : ''),
            content: this.coverContent(item.type, item.num),
            timestamp: item.createTime,
            color: this.coverColor(item.type),
            type: item.type,
            id: item.id,
          };
        });
        this.loading = false;
      }
    },

    //编辑  //0库存1领用2报废
    handleEdit(row) {
      switch (row.type) {
        case 0:
          this.$router.push({ path: '/purchase-d/assetInEdit', query: { id: row.id } });
          break;
        case 1:
          this.$router.push({ path: '/purchase-d/assetAcquisitionEdit', query: { id: row.id } });
          break;
        // case 2:
        //   this.$router.push({ path: '/purchase-d/assetOutEdit', query: { id: row.id } });
        //   break;
        default:
          break;
      }
    },

    checkEdit(row) {
      console.log(row);
      if (row.type === 2) {
        console.log('hidden');
        return false;
      } else {
        return true;
      }
    },

    //内容处理
    coverContent(type, num) {
      let c = '';
      if (type != null) {
        switch (type) {
          case 0:
            c = '资产入库';
            break;
          case 1:
            c = '领用资产';
            break;
          case 2:
            c = '报废资产';
            break;
          default:
            break;
        }
      }
      return c + `\xa0` + `\xa0` + `\xa0` + `\xa0` + (num ? num + '个' : null);
    },

    //阶段颜色处理
    coverColor(status) {
      return '#409EFF';
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
  },
  watch: {
    data: {
      handler(val) {
        if (val) {
          //console.log('获取参数:' + val);
          this.getList();
        }
      },
      deep: true,
      immediate: true,
    },
  },
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
    right: -530px;
    top: -20px;
  }

  ::v-deep .el-card__body {
    background-color: #f4f9ff;
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
