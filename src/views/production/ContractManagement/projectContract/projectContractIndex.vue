<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['生产管理', '项目合同管理', '项目合同列表 ']" />

        <!-- <div class="top">合同列表</div> -->
        <!-- <div class="top2" style="margin-bottom: 15px">
          <svg-icon
            icon-class="back"
            style="cursor: hand; margin-right: 15px"
            @click="commonFun.goBack()"
          />
          <span style="cursor: pointer" @click="commonFun.goToOnly('资料管理')">资料管理</span>
          <span> > </span>
          <span style="cursor: pointer" @click="commonFun.goToOnly('合同管理')">合同管理</span>
          <span> > </span>
          <span style="cursor: pointer" @click="commonFun.goToOnly('项目合同列表')"
            >项目合同列表</span
          >
        </div> -->
        <div class="main">
          <div class="p1">
            <div class="p1item">
              <el-input
                v-model="queryParams.contNumber"
                placeholder="合同编号"
                clearable
              ></el-input>
            </div>
            <div class="p1item">
              <el-input
                v-model="queryParams.contName"
                :maxlength="commonFun.inputMax"
                placeholder="合同名称"
                clearable
              ></el-input>
            </div>
            <!-- <div class="p1item">
              <el-select
                v-model="queryParams.certParentType"
                placeholder="合同类型" clearable
                :popper-append-to-body="true"
                popper-class="popperClass"
                @change="certPChange"
              >
                <el-option
                  v-for="item in dict.type.certificate_category"
                  :popper-append-to-body="false"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div> -->
            <!-- <div class="p1item">
              <el-input v-model="queryParams.certNumber" placeholder="项目名称" clearable></el-input>
            </div> -->
            <div class="p1item">
              <el-select v-model="queryParams.status" placeholder="状态" clearable>
                <el-option
                  v-for="item in dict.type.contract_status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="p1item">
              <el-date-picker
                v-model="queryParams.startTime"
                type="date"
                placeholder="开始时间"
                value-format="yyyy-MM-dd"
                popper-class="popperClass"
              >
              </el-date-picker>
            </div>
            <div class="p1item">
              <el-date-picker
                v-model="queryParams.endTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="结束时间"
              >
              </el-date-picker>
            </div>
            <!-- <div class="p1item">
              <el-input v-model="queryParams.placeholder" placeholder="关键词" clearable></el-input>
            </div> -->
            <div class="p1item">
              <el-button type="primary" @click="handleQuery">搜索</el-button>
              <el-button @click="resetQuery">重置</el-button>
            </div>
          </div>

          <div class="p2">
            <el-button v-hasPermi="['contract:project:add']" type="primary" @click="addC"
              >添加</el-button
            >
            <el-button
              v-hasPermi="['contract:project:exportList']"
              type="warning"
              @click="exportList"
              :disabled="tableData.length == 0"
              >导出</el-button
            >
            <!-- <el-button v-hasPermi="['contract:project:import']" type="warning" @click="importList"
              >导入</el-button
            > -->
            <!-- <el-button
              v-hasPermi="['contract:project:termination']"
              type="danger"
              @click="TerminatedT"
              :disabled="chooseItems.length == 0"
              >中止</el-button
            > -->
            <el-button
              v-hasPermi="['contract:project:remove']"
              type="danger"
              @click="deleteT"
              :disabled="chooseItems.length == 0"
              >删除</el-button
            >

            <!-- <el-button
              v-hasPermi="['contract:project:contTemplate']"
              style="width: auto"
              type="primary"
              @click="downTemplate"
              >下载导入模版</el-button
            > -->

            <!-- <div class="p2choose">
              <span>已选择</span>
              <span class="p2chooses">
                <span v-for="c in chooseItems" :key="c.index">{{ c.contName }}</span>
              </span>
              <span class="p2choosed" :disabled="chooseItems.length == 0">导出</span>
            </div> -->
          </div>

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
              <el-table-column type="selection" width="55" reserve-selection />
              <el-table-column prop="contNumber" label="合同编号"> </el-table-column>
              <el-table-column prop="contName" label="合同名称"> </el-table-column>
              <el-table-column prop="clientName" label="客户名称"> </el-table-column>
              <el-table-column prop="clientName" label="合同来源">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.project_src"
                    :value="scope.row.prjSrc"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="clientName" label="项目类型">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.project_type"
                    :value="scope.row.prjType"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="" label="项目区域">
                <template slot-scope="scope">
                  {{
                    commonFun.coverRegin(
                      scope.row.prjAreaProvince,
                      scope.row.prjAreaCity,
                      scope.row.prjAreaRegion,
                      '',
                    )
                  }}
                </template>
              </el-table-column>
              <el-table-column label="项目阶段">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.project_plan"
                    :value="scope.row.prjPhase"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="totalAmount" label="合同金额(元)"> </el-table-column>
              <!-- <el-table-column prop="prjNumber" label="项目编号"> </el-table-column> -->
              <!-- <el-table-column prop="prjName" label="项目名称"> </el-table-column> -->
              <!-- 合同状态 -->
              <el-table-column label="状态">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.contract_status"
                    :value="scope.row.status"
                  />
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="200">
                <template slot-scope="scope">
                  <el-button
                    v-hasPermi="['contract:project:query']"
                    @click="handleCheck(scope.row)"
                    type="text"
                    size="small"
                    style="font-size: 14px"
                    >查看</el-button
                  >
                  <el-button
                    v-hasPermi="['contract:project:edit']"
                    type="text"
                    size="small"
                    @click="handleEdit(scope.row)"
                    style="font-size: 14px"
                    >变更</el-button
                  >
                  <el-button
                    v-hasPermi="['contract:plan:edit0']"
                    type="text"
                    size="small"
                    @click="handleSheet(scope.row)"
                    style="font-size: 14px"
                    >任务单</el-button
                  >

                  <el-button
                    v-hasPermi="['contract:project:termination']"
                    type="text"
                    size="small"
                    @click="TerminatedT(scope.row)"
                    style="font-size: 14px; color: red"
                    >中止</el-button
                  >
                </template>
              </el-table-column>
            </el-table>

            <!-- <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400"
            >
            </el-pagination>               -->
            <pagination
              v-show="total > 0"
              :total="total"
              :limit.sync="queryParams.pageSize"
              :page.sync="queryParams.pageNum"
              @pagination="getList"
            />
            <div style="height: 10px"></div>
          </div>

          <ApprovalDialog ref="Approval" :type="0" />
          <FileChoose
            ref="FileChoose"
            :upType="999"
            @import="getList()"
            style="display: none"
            :limit="1"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApprovalDialog from '@/views/components/dialog/approvalDialog';
import {
  projectContList,
  projectContDelete,
  projectContTermination,
  projContExportList,
  contImportTemplateDown,
} from '@/api/data/contract';
export default {
  name: 'ProjectContractIndex', //项目合同
  dicts: ['contract_status', 'project_type', 'project_src', 'project_plan'],
  components: { ApprovalDialog },
  data() {
    return {
      loading: true, // 遮罩层
      chooseItems: [], // 选中项
      tableData: [
        // {
        //   id: '1751143984094859264', //合同ID
        //   contName: 'test项目合同名称测试', //合同名称
        //   clientName: '广州xxxfds有限科技f公f司', //客户名称
        //   contType: 0, //合同类型
        //   priNumber: null,
        //   priName: null,
        //   status: 1, //状态
        // },
      ], //信息表格数据
      // 总条数
      total: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        clientId: '', //客户ID
        contName: '', //合同名称
        status: '', //状态
        //placeholder: '', //关键字
        startTime: '', // 日期范围
        endTime: '',
      },
    };
  },

  created() {
    //console.log(this.dict.type.certificate_category); //输出字典
    this.getList();
  },

  mounted() {
    //自定义字典是Vue监控变量产生的，取值的方式是Ajax异步的，
    //所以需要等异步执行完毕后，才能取值，否则会取到undefined
    // setTimeout(()=>{
    //   console.log(this.dict.type.certificate_category);//输出字典
    //   let copy = this.dict.type.certificate_category.slice();
    //   this.certChildTypes = copy[this.queryParams.certParentType].children;//在没有初始选项时依旧是undefined
    // },800)
  },

  methods: {
    /** 查询列表 */
    getList() {
      console.log(this.queryParams);
      projectContList(this.queryParams).then((response) => {
        this.tableData = response.rows;
        this.total = response.total;
        this.loading = false;
      });
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

    //导出列表
    exportList() {
      projContExportList(this.queryParams);
    },

    //导入
    importList() {
      this.$refs.FileChoose.clickEvent();
    },

    //下载导入的合同模版
    downTemplate() {
      contImportTemplateDown();
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
      projectContDelete(params.join(',')).then((res) => {
        if (res.code == 200) {
          this.$message.success(`删除成功`);
          this.$refs.multipleTable.clearSelection();
          this.getList();
        } else {
          this.$message.error(`删除失败`);
        }
      });
    },

    //中止
    async TerminatedT(row) {
      this.$refs.Approval.show();
      this.$refs.Approval.sourceId = row.id;
      return;
      if (!(await this.commonFun.sureDialog('是否确定中止？'))) {
        return;
      }

      let params = [];
      this.chooseItems.forEach((element) => {
        params.push(element.id);
      });
      projectContTermination(params.join(',')).then((res) => {
        if (res.code == 200) {
          this.$message.success(`中止成功`);
          this.$refs.multipleTable.clearSelection();
          this.getList();
        } else {
          this.$message.error(`中止失败`);
        }
      });
    },

    //添加
    addC() {
      this.$router.push({ path: '/production-d/projectContractAdd' });
    },

    //查看
    handleCheck(row) {
      this.$router.push({ path: '/production-d/projectContractInfo', query: { id: row.id } });
    },

    //编辑
    handleEdit(row) {
      this.$router.push({ path: '/production-d/projectContractEdit', query: { id: row.id } });
    },

    //任务单
    handleSheet(row) {
      this.$router.push({ path: '/production-d/taskSheetP', query: { id: row.id } });
    },
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
          border-top: 1px solid #ebeef5;
          margin: 0 15px;
          padding-top: 20px;
          width: 98%;
          .el-button {
            margin: 0px 20px 20px 0px;
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
        // .p2::before{
        //   content: '';
        //   position: absolute;
        //   left: 0px;
        //   height: 1px;
        //   width: 100px;
        //   background-color: #284ac5;
        // }
        .p3 {
          margin: 15px;
          margin-top: 0;
          .el-pagination {
            margin: 15px;
            margin-top: 20px;
            text-align: right;
          }
        }
      }

      ::v-deep .popperClass {
        //top: 200px !important;
        position: absolute !important;
      }
    }
  }
}
</style>
