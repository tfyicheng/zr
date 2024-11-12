<template class="app-container">
  <div class="tmain">
    <div class="top">
      <el-button
        type="primary"
        v-hasPermi="['certificate:cert1:add']"
        @click="addC"
        icon="el-icon-plus"
      >
        添加</el-button
      >
    </div>
    <div class="body">
      <el-table
        :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
        :cell-style="{ textAlign: 'left' }"
        :data="tableData"
        style="width: 100%"
        max-height="560"
        ref="multipleTable"
        row-key="id"
        v-loading="loading"
      >
        <!-- <el-table-column type="selection" width="55" reserve-selection /> -->
        <el-table-column prop="certNumber" label="证书编号"> </el-table-column>
        <el-table-column prop="certName" label="证书名称">
          <template slot-scope="scope">
            <!-- 到期标志 -->
            <svg-icon
              icon-class="xm_jjcq"
              v-show="scope.row.dueStatus === 2"
              style="width: 30px; height: 30px; margin: auto 0"
            />
            {{ scope.row.certName }}
          </template>
        </el-table-column>
        <el-table-column label="证书大类">
          <template slot-scope="scope">
            {{
              scope.row.certParentType != null
                ? dict.type.certificate_category[scope.row.certParentType].label
                : ''
            }}
          </template>
        </el-table-column>
        <el-table-column label="证书中类">
          <template slot-scope="scope">
            {{
              scope.row.certChildType != null
                ? dict.type.certificate_category[scope.row.certParentType].raw.children[
                    scope.row.certChildType
                  ].dictLabel
                : ''
            }}
          </template>
        </el-table-column>
        <el-table-column label="证书小类">
          <template slot-scope="scope">
            {{
              scope.row.certGrandsonType != null
                ? dict.type.certificate_category[scope.row.certParentType].raw.children[
                    scope.row.certChildType
                  ].children[scope.row.certGrandsonType]
                  ? dict.type.certificate_category[scope.row.certParentType].raw.children[
                      scope.row.certChildType
                    ].children[scope.row.certGrandsonType].dictLabel
                  : ''
                : ''
            }}
          </template>
        </el-table-column>
        <el-table-column label="证书种类">
          <template slot-scope="scope">
            {{
              dict.type.cert_type[scope.row.certType]
                ? dict.type.cert_type[scope.row.certType].label
                : ''
            }}
          </template>
        </el-table-column>
        <!-- <el-table-column label="最近三个月浏览/使用数">
          <template slot-scope="scope">
            {{
              (scope.row.browseNum ? scope.row.browseNum : '0') +
              '/' +
              (scope.row.useNum ? scope.row.useNum : '0')
            }}
          </template>
        </el-table-column> -->

        <el-table-column label="最近三个月浏览数">
          <template slot-scope="scope">
            {{ scope.row.browseNum != null ? scope.row.browseNum : '0' }}
          </template>
        </el-table-column>
        <el-table-column label="证书预览" width="200" :show-overflow-tooltip="false">
          <template slot-scope="scope">
            <el-popover
              v-if="scope.row.files && scope.row.files.length > 0"
              trigger="hover"
              placement="top"
            >
              <ul style="padding: 0px; margin: 0px 5px; list-style-type: none">
                <li
                  @click="preview([c])"
                  style="cursor: hand"
                  v-for="c in scope.row.files"
                  :key="c.index"
                >
                  <svg-icon icon-class="file" />
                  <a style="cursor: hand; color: #409eff"> {{ c.originalName }}</a>
                </li>
              </ul>
              <div slot="reference" class="name-wrapper">
                <el-link type="primary" :underline="false" size="medium">{{
                  scope.row.files && scope.row.files.length > 0
                    ? scope.row.files[0].originalName
                    : null
                }}</el-link>
              </div>
            </el-popover>

            <el-link v-else type="primary" :underline="false" @click="preview(scope.row.files)">
              {{
                scope.row.files && scope.row.files.length > 0
                  ? scope.row.files[0].originalName
                  : null
              }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="authority" label="颁发机构"> </el-table-column>
        <el-table-column prop="issueDate" label="颁发时间"> </el-table-column>
        <el-table-column prop="userName" label="用户"> </el-table-column>
        <el-table-column prop="deptName" label="组织"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              v-hasPermi="['certificate:cert1:query']"
              @click="handleCheck(scope.row)"
              type="text"
              size="small"
              style="font-size: 14px"
              >查看</el-button
            >
            <el-button
              v-hasPermi="['certificate:cert1:edit']"
              type="text"
              size="small"
              @click="handleEdit(scope.row)"
              style="font-size: 14px"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible.sync="dialogTableVisible" class="iframe" v-el-drag-dialog>
      <iframe width="100%" height="100%" :src="fileview"></iframe>
    </el-dialog>
  </div>
</template>

<script>
import { certPersonInfo } from '@/api/data/certificate';
export default {
  name: 'CertInfo', //个人证书信息
  dicts: ['certificate_category', 'cert_type'],
  props: { uid: null },
  data() {
    return {
      loading: true, // 遮罩层
      chooseItems: [], // 选中项
      tableData: [], //证书信息表格数据
      dialogTableVisible: false,
      multipleSelection: [],
      fileview: '', //文件预览地址
    };
  },
  created() {},
  methods: {
    getList(id) {
      certPersonInfo(id).then((response) => {
        this.tableData = response.data;
        this.loading = false;
      });
    },

    //附件判断预览
    filePreview(row) {
      if (Array.isArray(row)) {
        if (row.length > 0) {
          for (let i = 0; i < row.length; i++) {
            if (
              this.commonFun.limitFt.includes(
                row[i].originalName.substr(row[i].originalName.lastIndexOf('.') + 1),
              )
            ) {
              return row[i].originalName;
            }
          }
          return '';
        } else {
          return '';
        }
      }
    },

    //预览  先处理可以预览的文件
    preview(row) {
      this.fileview = 'about:blank';
      setTimeout(() => {
        this.fileview = process.env.VUE_APP_BASE_API + '/file/preview/' + row[0].annexId;
      }, 200);

      this.dialogTableVisible = true;
    },

    //查看
    handleCheck(row) {
      console.log(row);
      this.$router.push({ path: '/data-d/certificatesInfo', query: { id: row.id } });
    },

    //编辑
    handleEdit(row) {
      this.$router.push({ path: '/data-d/certificatesEdit', query: { id: row.id } });
    },

    //添加证书
    addC() {
      this.$router.push({ path: '/data-d/certificatesAdd' });
    },
  },
  // watch: {
  //   uid: {
  //     handler(val) {
  //       if (val) {
  //         console.log('额外参数:' + val);
  //         this.getList(val);
  //       }
  //     },
  //     deep: true,
  //     immediate: true,
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.tmain {
  .top {
    margin-bottom: 20px;
  }
}
.collink {
  max-width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  ::v-deep .el-link--inner {
    max-width: 200px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
