<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['项目管理', '项目计划管理', '项目计划列表']" />
        <div class="main">
          <div class="p1">
            <div class="p1item">
              <el-input
                v-model="queryParams.contNumber"
                placeholder="合同编号"
                clearable
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div>

            <div class="p1item">
              <el-input
                v-model="queryParams.prjName"
                placeholder="项目名称"
                clearable
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div>

            <div class="p1item">
              <el-select v-model="queryParams.status" placeholder="计划状态" clearable>
                <el-option
                  v-for="item in dict.type.project_plan_status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value + ''"
                  @input="$forceUpdate()"
                >
                </el-option>
              </el-select>
            </div>

            <div class="p1item">
              <el-input
                v-model="queryParams.planName"
                placeholder="计划名称"
                clearable
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div>
            <div class="p1item">
              <el-input
                v-model="queryParams.prjLeader"
                placeholder="项目负责人"
                clearable
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div>

            <!-- <div class="p1item">
              <el-input v-model="queryParams.placeholder" placeholder="关键字"></el-input>
            </div> -->
            <div class="p1item">
              <el-button type="primary" @click="handleQuery">搜索</el-button>
              <el-button @click="resetQuery">重置</el-button>
            </div>
          </div>

          <!-- <div class="p2">
            <el-button type="primary" @click="addC">添加</el-button>
            <el-button type="danger" @click="deleteT" :disabled="chooseItems.length == 0"
              >删除</el-button
            >
            <div class="p2choose" style="display: none">
              <span>已选择</span>
              <span class="p2chooses">
                <span v-for="c in chooseItems" :key="c.index">{{ c.certName }}</span>
              </span>
              <span class="p2choosed" :disabled="chooseItems.length == 0">导出</span>
            </div>
          </div> -->

          <div class="p3">
            <el-table
              :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
              :cell-style="{ textAlign: 'left' }"
              :data="tableData"
              style="width: 100%"
              max-height="560"
              ref="multipleTable"
              @selection-change="handleSelectionChange"
              row-key="id"
              v-loading="loading"
            >
              <!-- <el-table-column type="selection" width="55" reserve-selection /> -->
              <!-- <el-table-column prop="id" label="ID"></el-table-column> -->
              <el-table-column prop="contNumber" label="合同编号"></el-table-column>
              <el-table-column prop="prjName" label="项目名称">
                <template slot-scope="scope">
                  <!-- 到期标志 -->
                  <svg-icon
                    icon-class="xm_jjcq"
                    v-show="scope.row.dueStatus === 2"
                    style="width: 30px; height: 30px; margin: auto 0"
                  />
                  {{ scope.row.prjName }}
                </template>
              </el-table-column>
              <el-table-column prop="planName" label="计划名称"> </el-table-column>
              <el-table-column label="项目阶段">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.project_plan"
                    :value="scope.row.phase"
                  />
                </template>
              </el-table-column>
              <el-table-column label="进度">
                <template slot-scope="scope">
                  {{ scope.row.progress + '%' }}
                </template>
              </el-table-column>
              <el-table-column label="状态">
                <template slot-scope="scope">
                  <!-- 项目状态 -->
                  <!-- <span v-if="scope.row.children && scope.row.children.length > 0"> -->
                  <span v-if="scope.row.children != null">
                    <dict-tag
                      :flag="false"
                      :options="dict.type.project_status"
                      :value="scope.row.status"
                    />
                    <!-- <span v-if="scope.row.status === 0" style="color: #409eff">{{
                      dict.type.project_status[scope.row.status].label
                    }}</span>
                    <span v-else-if="scope.row.status === 1" style="color: #07c15f">{{
                      dict.type.project_status[scope.row.status].label
                    }}</span>
                    <span v-else-if="scope.row.status === 2" style="color: red">{{
                      dict.type.project_status[scope.row.status].label
                    }}</span>
                    <span v-else-if="scope.row.status === 3" style="color: #ffba00">{{
                      dict.type.project_status[scope.row.status].label
                    }}</span>
                    <span v-else-if="scope.row.status === 4" style="color: red">{{
                      dict.type.project_status[scope.row.status].label
                    }}</span> -->
                  </span>
                  <!-- 项目计划状态-->
                  <span v-else>
                    <dict-tag
                      :flag="false"
                      :options="dict.type.project_plan_status"
                      :value="scope.row.status"
                    />
                    <!-- <span v-if="scope.row.status === 0" style="color: #666666">{{
                      dict.type.project_plan_status[scope.row.status].label
                    }}</span>
                    <span v-else-if="scope.row.status === 1" style="color: #1890ff">{{
                      dict.type.project_plan_status[scope.row.status].label
                    }}</span>
                    <span v-else-if="scope.row.status === 2" style="color: #07c15f">{{
                      dict.type.project_plan_status[scope.row.status].label
                    }}</span>
                    <span v-else-if="scope.row.status === 3" style="color: #fac06a">{{
                      dict.type.project_plan_status[scope.row.status].label
                    }}</span>
                    <span v-else-if="scope.row.status === 4" style="color: #fac06a">{{
                      dict.type.project_plan_status[scope.row.status].label
                    }}</span>
                    <span v-else-if="scope.row.status === 5" style="color: red">{{
                      dict.type.project_plan_status[scope.row.status].label
                    }}</span> -->
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="prjLeader" label="项目负责人"> </el-table-column>
              <el-table-column prop="startDate" label="计划开始时间"> </el-table-column>
              <el-table-column prop="endDate" label="计划结束时间"> </el-table-column>
              <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                  <!-- <el-button
                    @click="handleCheck(scope.row)"
                    type="text"
                    size="small"
                    style="font-size: 14px"
                    >查看</el-button
                  > -->
                  <!-- v-hasPermi="['project:project:editPlan']" -->
                  <el-button
                    v-show="scope.row.children == null && scope.row.canEdit"
                    type="text"
                    size="small"
                    @click="handleEdit(scope.row)"
                    style="font-size: 14px"
                    >调整</el-button
                  >
                </template>
              </el-table-column>
            </el-table>

            <pagination
              v-show="total > 0"
              :total="total"
              :page.sync="queryParams.pageNum"
              :limit.sync="queryParams.pageSize"
              @pagination="getList"
            />
            <div style="height: 10px"></div>
          </div>

          <el-dialog :visible.sync="dialogTableVisible" class="iframe" v-el-drag-dialog>
            <iframe width="100%" height="100%" :src="fileview"></iframe>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { projPlanList } from '@/api/data/project';
export default {
  name: 'ProjectPlanCheck', //查看项目计划
  dicts: ['project_plan_status', 'project_status', 'project_plan'],
  data() {
    return {
      options: [],
      loading: true, // 遮罩层
      chooseItems: [], // 选中项
      tableData: [], //信息表格数据
      // 总条数
      total: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        prjNumber: '',
        prjName: '',
        planName: '',
        status: '',
        prjLeader: '',
      },
      dialogTableVisible: false,
      fileview: '', //文件预览地址
    };
  },

  created() {
    this.getList();
  },

  mounted() {},

  methods: {
    //查询列表
    getList() {
      if (this.$route.query.status != null) {
        this.queryParams.status = this.$route.query.status;
        this.$router.push({ path: this.$router.currentRoute.path, query: null });
      }
      console.log(this.queryParams);
      projPlanList(this.queryParams).then((response) => {
        this.tableData = response.rows;
        this.total = response.total;
        this.loading = false;
        this.$nextTick(() => {
          this.$refs.multipleTable.toggleRowExpansion(this.tableData[0], true);
        });
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

    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },

    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams = { pageNum: 1, pageSize: 10 };
      this.handleQuery();
    },

    //选择
    handleSelectionChange(rows) {
      this.chooseItems = [];
      this.chooseItems = Array.from(new Set(rows));
    },

    //删除
    async deleteT(row) {
      if (!(await this.commonFun.sureDialog())) {
        return;
      }
      let params = [];
      this.chooseItems.forEach((element) => {
        params.push(element.id);
      });
      custDelete(params.join(',')).then((res) => {
        if (res.code == 200) {
          this.$message.success(`删除成功`);
          this.$refs.multipleTable.clearSelection();
          this.getList();
        } else {
          this.$message.error(`删除失败`);
        }
      });
      this.$refs.multipleTable.clearSelection();
      this.getList();
    },

    //查看
    handleCheck(row) {
      console.log(row);
      this.$router.push({
        path: '/production-d/customerManagementInfo',
        query: { id: row.id, type: row.type },
      });
    },

    //编辑
    handleEdit(row) {
      //遍历整个table数据
      this.tableData.forEach((item) => {
        //判断该行是否有子节点
        if ('children' in item) {
          //遍历子节点
          item.children.forEach((item2) => {
            //判断该节点是否为我点击的节点
            if (item2 == row) {
              // console.log('父节点', item); //输出父节点
              this.$router.push({
                path: '/project-d/projectPlanAdjustment',
                query: { id: item.id },
              });
            }
          });
        }
      });

      //   this.$router.push({ path: '/project-d/projectPlanAdjustment', query: { id: row.id } });
    },

    // //添加
    // addC() {
    //   this.$router.push({ path: '/production-d/customerManagementAdd' });
    // },
  },

  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name) {
        this.getList();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.appo {
  overflow: auto;
  .appi {
    margin: 20px;
    min-width: 1220px;
    .appc {
      .top {
        font-family: Alibaba PuHuiTi 2;
        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
        letter-spacing: 0em;
        text-align: left;
        margin-bottom: 20px;
      }
      .top::before {
        content: '\00a0 ';
        border-left: 3px solid #4da0ff;
        margin-right: 5px;
      }
      .main {
        background: #fff;
        border-radius: 4px;
        .p1 {
          position: relative;
          display: inline-block;
          padding-bottom: 10px;
          width: 100%;
          border-bottom: 1px solid #ebeef5;
          .p1item {
            margin: 4px 0px 0 4px;
            float: left;
            width: 270px;
            height: 60px;
            .el-input,
            .el-date-editor,
            .el-select {
              margin: 10px 10px 0 10px;
              width: 240px;
              height: 40px;
            }
            .el-button {
              margin-left: 12px;
              margin: 11px;
              width: 100px;
              border: 0px;
            }
            .el-button:last-child {
              background: #f3f4f8;
            }
          }
        }

        .p2 {
          margin: 15px;
          width: 98%;
          .el-button {
            margin: 0px 20px 5px 0px;
            width: 100px;
            border: 0px;
          }
          .p2choose {
            width: 100%;
            border-radius: 4px;
            line-height: 40px;
            font-family: Alibaba PuHuiTi 2;
            font-size: 16px;
            font-weight: 400;
            letter-spacing: 0em;
            background: #409eff1a;
            span {
              vertical-align: top;
              color: #409eff;
              margin: 0px 15px;
            }
            span:first-child {
              vertical-align: top;
              float: left;
            }
            .p2choosed {
              cursor: pointer;
              float: right;
            }
            .p2chooses {
              display: inline-block;
              width: 85%;
              max-height: 80px;
              overflow-y: auto;

              span {
                vertical-align: top;
                margin-left: 0;
                margin-bottom: 0;
                padding: 0;
              }
            }
          }
        }
        .p3 {
          margin: 15px;
          .el-pagination {
            margin: 15px;
            margin-top: 20px;
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
