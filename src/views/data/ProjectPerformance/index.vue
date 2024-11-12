<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['资料管理', '项目业绩']" />
        <div class="main">
          <div class="p1">
            <div class="p1item">
              <el-input
                v-model="queryParams.prjName"
                placeholder="项目名称"
                clearable
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div>

            <div class="p1item">
              <el-select v-model="queryParams.prjType" placeholder="项目类型" clearable>
                <el-option
                  v-for="item in dict.type.project_type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="p1item">
              <el-cascader
                v-model="area"
                :props="props"
                ref="cascaderAddr"
                placeholder="请选择区域"
                @change="areaChange"
                clearable
              ></el-cascader>
            </div>

            <div class="p1item">
              <el-date-picker v-model="queryParams.year" type="year" placeholder="年份" clearable>
              </el-date-picker>
            </div>

            <div class="p1item">
              <el-button type="primary" @click="handleQuery">搜索</el-button>
              <el-button
                v-hasPermi="['project:performance:gen']"
                type="warning"
                @click="chooseProjF"
                >生成业绩表</el-button
              >
              <el-button
                v-hasPermi="['project:performance:export']"
                type="warning"
                @click="exportList"
                :disabled="tableData.length == 0"
                >导出文档</el-button
              >
              <el-button @click="resetQuery">重置</el-button>
            </div>
          </div>

          <div class="p3">
            <el-table
              :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
              :data="tableData"
              style="width: 100%"
              max-height="560"
              ref="multipleTable"
              row-key="id"
              v-loading="loading"
            >
              <!-- <el-table-column prop="id" label="ID" width="120" show-overflow-tooltip>
              </el-table-column> -->
              <!-- <el-table-column prop="showPrjNumber" label="项目编号" width="200"> </el-table-column> -->
              <el-table-column prop="prjName" label="项目名称" width="200"> </el-table-column>
              <el-table-column prop="prjArea" label="项目区域" width="200"> </el-table-column>
              <el-table-column label="项目类型" width="200">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.project_type"
                    :value="scope.row.prjType"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="prjScale" label="规模" width="200">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.project_scale"
                    :value="scope.row.prjScale"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="bidTime" label="中标通知时间" width="200"> </el-table-column>
              <el-table-column prop="projectName" label="项目合同">
                <el-table-column prop="totalAmount" label="金额" width="200"> </el-table-column>
                <el-table-column prop="contStartTime" label="合同开始日期" width="200">
                </el-table-column>
              </el-table-column>
              <el-table-column prop="startDate" label="项目开始日期" width="200"> </el-table-column>
              <el-table-column label="项目批复">
                <el-table-column prop="oneApprovalTime" label="可研批复时间" width="200">
                </el-table-column>
                <el-table-column prop="twoApprovalTime" label="初设批复时间" width="200">
                </el-table-column>
                <el-table-column prop="threeApprovalTime" label="其他批复时间" width="200">
                </el-table-column>
              </el-table-column>
              <el-table-column label="项目交付">
                <el-table-column prop="completeCheckTime" label="完工验收时间" width="200">
                </el-table-column>
                <el-table-column prop="overCheckTime" label="竣工验收时间" width="200">
                </el-table-column>
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
          <!-- //个别页面弹窗修改 width="400px"-->
          <el-dialog :visible.sync="dialogTableVisible" width="400px">
            <ProjForm v-show="this.ChooseOne == 'projForm'" ref="projForm" />
            <DownForm v-show="this.ChooseOne == 'downForm'" :type="0" ref="downForm" />
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  projPerformanceList,
  projPerformanceMake,
  projPerformanceExport,
} from '@/api/data/project';
import { tansParams } from '@/utils/guangwei';
import { getCity, getProvince } from '@/api/system/user';
import ProjForm from '@/views/components/dialog/projForm';
import DownForm from '@/views/components/dialog/downForm';
export default {
  name: 'ProjectPerformance', //项目业绩
  dicts: ['project_type', 'project_scale'],
  components: { ProjForm, DownForm },
  data() {
    return {
      area: [], //选择区域数组
      loading: true, // 遮罩层
      chooseItems: [], // 选中项
      tableData: [], //表格数据
      // 总条数
      total: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        prjName: null,
        prjType: null,
        year: null,
        areaProvince: null,
        areaCity: null,
        areaRegion: null,
      },
      //区域级联选择配置
      props: {
        checkStrictly: true,
        lazy: true,
        lazyLoad(node, resolve) {
          if (node.level == 0) {
            getCity().then((response) => {
              const nodes = response.data.map((item) => ({
                value: item.id,
                label: item.name,
              }));
              resolve(nodes);
            });
          } else if (node.level == 1) {
            getProvince(node.value).then((response) => {
              const nodes = response.data.map((item) => ({
                value: item.id,
                label: item.name,
              }));
              resolve(nodes);
            });
          } else if (node.level == 2) {
            getCity(node.parent.value, node.value).then((response) => {
              const nodes = response.data.map((item) => ({
                value: item.id,
                label: item.name,
                leaf: node.level == 2,
              }));
              resolve(nodes);
            });
          } else if (node.level == 3) {
            resolve(null);
          }
        },
      },
      dialogTableVisible: false,
      ChooseOne: '',
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //查询列表
    getList() {
      console.log(this.queryParams);
      projPerformanceList(this.queryParams).then((response) => {
        this.tableData = response.rows;
        this.total = response.total;
      });
      this.loading = false;
    },

    //选择区域的值
    areaChange(value) {
      if (this.$refs.cascaderAddr && this.$refs.cascaderAddr.checkedValue.length === 0) {
        this.queryParams.areaProvince = null;
        this.queryParams.areaCity = null;
        this.queryParams.areaRegion = null;
      } else {
        const checkedNodes = this.$refs['cascaderAddr'].getCheckedNodes();
        // console.log(checkedNodes); // 获取当前点击的节点
        // console.log(checkedNodes[0].data.label); // 获取当前点击的节点的label
        // console.log(checkedNodes[0].pathLabels); // 获取由 label 组成的数组
        this.queryParams.areaProvince = checkedNodes[0].pathLabels[0]
          ? checkedNodes[0].pathLabels[0]
          : null;
        this.queryParams.areaCity = checkedNodes[0].pathLabels[1]
          ? checkedNodes[0].pathLabels[1]
          : null;
        this.queryParams.areaRegion = checkedNodes[0].pathLabels[2]
          ? checkedNodes[0].pathLabels[2]
          : null;
      }
    },

    chooseProjF() {
      this.dialogTableVisible = true;
      this.ChooseOne = 'projForm';
      console.log(this.$refs.projForm);
      //
      this.$nextTick(() => {
        this.$refs.projForm.$on('getChoose', this.getProjF);
        this.$refs.projForm.$on('closeChoose', this.closeChoose);
      }, 500);
      this.$refs.projForm.clearSel();
    },

    getProjF(data) {
      this.dialogTableVisible = false;
      if (data) {
        projPerformanceMake(data)
          .then((response) => {
            if (response.code == 200) {
              this.$message.success('生成成功');
              this.getList();
            }
          })
          .catch((error) => {
            this.$message.error('生成失败');
          });
      }
    },

    chooseDownF() {
      this.dialogTableVisible = true;
      this.ChooseOne = 'downForm';
      //
      this.$nextTick(() => {
        this.$refs.downForm.$off('getChoose', this.getDownF);
        this.$refs.downForm.$on('getChoose', this.getDownF);
        this.$refs.downForm.$on('closeChoose', this.closeChoose);
      }, 500);
      this.$refs.downForm.clearSel();
    },

    //项目业绩导出
    getDownF(data) {
      this.dialogTableVisible = false;
      projPerformanceExport(data);
      // this.dialogTableVisible = false;
      // if (data) {
      //   let url =
      //     process.env.VUE_APP_BASE_API +
      //     '/project/performance/export' +
      //     (this.queryParams ? '?' + tansParams(data) : null);
      //   let newurl = url.substr(0, url.length - 1);
      //   window.location.href = newurl;
      // }
    },

    //关闭选择弹窗
    closeChoose() {
      this.dialogTableVisible = false;
    },

    // download2(url) {
    //   let data = {
    //     headers: {},
    //     res: {},
    //   };
    //   var xhr = new XMLHttpRequest();
    //   xhr.open('GET', process.env.VUE_APP_BASE_API + url, true);
    //   xhr.onreadystatechange = function () {
    //     if (xhr.readyState === 4 && xhr.status === 200) {
    //       var headers = xhr.getAllResponseHeaders();
    //       console.log(headers);
    //       data.headers = headers;
    //     }
    //   };
    //   xhr.send();
    //   data.res = xhr.responseText;
    //   return data;
    // },

    //导出
    exportList() {
      this.chooseDownF();
      // this.download('/project/performance/export', {
      //   ...this.queryParams,
      // });

      // projPerformanceExport(this.queryParams);

      // console.log(this.download2('/project/performance/export'));

      // projPerformanceExport(this.queryParams).then((response) => {
      //   console.log(response);
      //   if (response) {
      //     //导出下载文件
      //     const blob = new Blob([response.data], { type: 'text/plain;charset=utf-8' });
      //     console.log(blob);
      //     this.$download.saveAs(blob, response.data);
      //   }
      // });
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },

    /** 重置按钮操作 */
    resetQuery() {
      this.area = [];
      this.queryParams = { pageNum: 1, pageSize: 10 };
      this.handleQuery();
    },

    //查看
    handleCheck(row) {
      console.log(row);
      this.$router.push({ path: '/data/contractmanagement/projectContract/projectContractInfo' });
    },
    //编辑
    handleEdit(row) {},

    //添加
    addC() {
      this.$router.push({ path: '/data/contractmanagement/projectContract/projectContractAdd' });
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
          width: 100%;
          position: relative;
          display: inline-block;
          border-bottom: 1px solid #e4e6ed;
          padding-bottom: 15px;
          .p1item {
            margin: 10px 0px 0 5px;
            float: left;
            width: 150px;
            height: 55px;
            .el-input,
            .el-date-editor,
            .el-cascader,
            .el-select {
              margin: 10px 10px 0 10px;
              width: 140px;
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
          .p1item:last-child {
            width: auto;
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
