<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['资料管理', '项目资料管理', '项目资料列表', '查看项目资料']" />

        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" class="info">
              <el-form-item label="项 目 名 称">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.prjName"></InputTip>
                </div>
              </el-form-item>

              <el-form-item class="pline" :label="'关 联 项 目 \n合 同 编 号'" prop="creditCode">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.contNumber"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="项 目 区 域" prop="prjArea">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.area"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="项 目 类 型" prop="prjType">
                <div class="info">
                  <dict-tag :options="dict.type.project_type" :value="form.prjType" />
                </div>
              </el-form-item>

              <el-form-item label="工 程 等 级">
                <div class="info">
                  <dict-tag :options="dict.type.engineering_level" :value="form.engineeringLevel" />
                </div>
              </el-form-item>

              <el-form-item label="工 程 级 别">
                <div class="info">
                  <dict-tag
                    :options="dict.type.engineering_level0"
                    :value="form.engineeringLevelType"
                  />
                </div>
              </el-form-item>

              <el-form-item label="项 目 规 模">
                <div class="info">
                  <dict-tag :options="dict.type.project_scale" :value="form.prjScale" />
                </div>
              </el-form-item>

              <el-form-item label="项 目 描 述" class="remark">
                <div class="info">
                  <el-input
                    type="textarea"
                    autosize
                    resize="none"
                    readonly
                    v-model="form.prjDesc"
                  ></el-input>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div class="main2">
          <div class="m2top">
            项目资料
            <div class="m2topm">
              <span v-show="info5Show" @click="info5Show ? (info5Show = false) : (info5Show = true)"
                >收起 <i class="el-icon-caret-top"></i>
              </span>
              <span
                v-show="!info5Show"
                @click="info5Show ? (info5Show = false) : (info5Show = true)"
                >展开 <i class="el-icon-caret-bottom"></i>
              </span>
            </div>
          </div>
          <div class="m2main" v-show="info5Show">
            <el-table
              v-show="tableData.length > 0"
              :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
              :cell-style="{ textAlign: 'left' }"
              :data="tableData"
              max-height="560"
              ref="multipleTable"
              row-key="id"
            >
              <el-table-column label="资料类型">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.file_type"
                    :value="scope.row.fileType"
                  />
                </template>
              </el-table-column>

              <el-table-column prop="dataNumber" label="资料编号"> </el-table-column>
              <el-table-column prop="dataName" label="资料名称"> </el-table-column>
              <el-table-column label="项目阶段">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.project_plan"
                    :value="scope.row.prjPhase"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="prjYear" label="年份"> </el-table-column>
              <el-table-column label="预览" width="200" :show-overflow-tooltip="false">
                <template slot-scope="scope">
                  <el-popover
                    v-if="scope.row.annexFile && scope.row.annexFile.length > 0"
                    trigger="hover"
                    placement="top"
                  >
                    <ul style="padding: 0px; margin: 0px 5px; list-style-type: none">
                      <li
                        @click="preview([c])"
                        style="cursor: hand"
                        v-for="c in scope.row.annexFile"
                        :key="c.index"
                      >
                        <svg-icon icon-class="file" />
                        <a style="cursor: hand; color: #409eff"> {{ c.originalName }}</a>
                      </li>
                    </ul>
                    <div slot="reference" class="name-wrapper">
                      <el-link type="primary" :underline="false" size="medium">{{
                        scope.row.annexFile && scope.row.annexFile.length > 0
                          ? scope.row.annexFile[0].originalName
                          : null
                      }}</el-link>
                    </div>
                  </el-popover>

                  <el-link
                    v-else
                    type="primary"
                    :underline="false"
                    @click="preview(scope.row.annexFile)"
                  >
                    {{
                      scope.row.annexFile && scope.row.annexFile.length > 0
                        ? scope.row.annexFile[0].originalName
                        : null
                    }}
                  </el-link>
                </template>
              </el-table-column>
              <el-table-column prop="prjYear" label="操作">
                <template slot-scope="scope">
                  <el-link
                    v-show="scope.row.canDown"
                    type="primary"
                    :underline="false"
                    size="small"
                    @click="Output(scope.row)"
                    style="font-size: 14px"
                    >导出</el-link
                  >
                  <el-link
                    v-show="!scope.row.canDown"
                    type="primary"
                    :underline="false"
                    size="small"
                    @click="exportApply(scope.row)"
                    style="font-size: 14px"
                    >申请导出</el-link
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <!-- <el-button type="primary" v-show="!form.canDown" @click="exportApply">申请导出</el-button> -->
          <el-button type="warning" v-show="form.canDown" @click="Output">导出</el-button>
        </div>

        <el-dialog :visible.sync="dialogTableVisible" class="iframe" v-el-drag-dialog>
          <iframe width="100%" height="100%" :src="fileview"></iframe>
        </el-dialog>
        <ApplyDown ref="ApplyDown" :type="1" />
        <BeforeDown ref="BeforeDown" :type="1" />
      </div>
    </div>
  </div>
</template>

<script>
import { dataDown } from '@/api/data/file';
import ApplyDown from '@/views/components/dialog/applyDown';
import { projDataInfo, projDataInfoAll } from '@/api/data/project';
export default {
  name: 'ProjectDataInfo', //项目资料信息
  dicts: [
    'file_type',
    'down_data_type',
    'project_scale',
    'project_plan',
    'project_type',
    'engineering_level',
    'engineering_level0',
  ],
  components: { ApplyDown },
  data() {
    return {
      inputTipWidth: this.commonFun.inputTipWidth,
      form: {
        projectInfo: {},
      },
      dialogTableVisible: false,
      fileview: '', //文件预览地址
      flagId: null, //标记刷新id
      info5Show: true,
      tableData: [],
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    //查询信息
    getInfo() {
      if (this.$route.query.id) {
        this.flagId = this.$route.query.id;
        projDataInfoAll(this.$route.query.id).then((response) => {
          this.form = response.data;
          this.tableData = response.data.prjData;
          this.commonFun.ShowAreaVal(this.form, response.data);
          if (response.data.projectInfo == null || response.data.projectInfo == undefined) {
            this.form.projectInfo = {};
          }
        });
      }
    },

    //申请导出
    exportApply(row) {
      this.$refs.ApplyDown.downSourceId = row.id;
      this.$refs.ApplyDown.downSourceName = row.dataName;
      this.$refs.ApplyDown.show();
    },

    //下载/导出
    Output(row) {
      if (row.id != null) {
        this.$refs.BeforeDown.downSourceId = row.id;
        this.$refs.BeforeDown.show();
      } else {
        let params = [];
        this.tableData.forEach((element) => {
          params.push(element.id);
        });
        this.$refs.BeforeDown.downSourceId = params.join(',');
        this.$refs.BeforeDown.show();
      }
    },

    //返回
    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
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

    //刷新视图
    refreshView() {
      this.$store.dispatch('tagsView/delAllCachedViews', this.$route); //删除当前路径所有缓存视图
      const { fullPath } = this.$route; //获取全路径
      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath,
        });
      });
    },
  },

  computed: {},
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name && this.$route.query.id != this.flagId) {
        // this.getInfo();
        this.$tab.refreshPage(); //刷新标签重新create组件
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/commonAE.scss';
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
