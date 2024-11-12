<template class="app-container">
  <div class="cbody">
    <div class="main">
      <div class="top">
        <el-button type="primary" @click="check()" v-show="tolink">查看更多</el-button>
      </div>
      <!-- max-height="560" -->
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane :label="val1" name="first">
          <el-table
            :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
            :cell-style="{ textAlign: 'left' }"
            :data="tableData1"
            style="width: 100%"
            :max-height="tabMaxHeight"
            ref="multipleTable"
            row-key="id"
          >
            <el-table-column prop="id" label="外出编号" v-if="type == 0 || type == 4">
            </el-table-column>
            <el-table-column prop="id" label="请假编号" v-if="type == 1"> </el-table-column>
            <el-table-column prop="name" label="领用名称" v-if="type == 2"> </el-table-column>
            <el-table-column
              prop="applyUser"
              label="申请人"
              v-if="type == 2 || type == 3"
            ></el-table-column>
            <el-table-column prop="createTime" label="申请时间" v-if="type == 3"> </el-table-column>
            <el-table-column prop="applyUser" label="申请人" v-if="type == 4"> </el-table-column>
            <el-table-column label="外出类型" v-if="type == 0">
              <template slot-scope="scope">
                {{
                  scope.row.businessType != null
                    ? dict.type.out_type[scope.row.businessType].label
                    : ''
                }}
              </template>
            </el-table-column>
            <el-table-column label="请假类型" v-if="type == 1">
              <template slot-scope="scope">
                {{
                  scope.row.businessType != null
                    ? dict.type.leave_type[scope.row.businessType].label
                    : ''
                }}
              </template>
            </el-table-column>

            <el-table-column label="审批状态">
              <template slot-scope="scope">
                <dict-tag
                  :flag="false"
                  :options="dict.type.approval_status"
                  :value="scope.row.status"
                />
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              :show-overflow-tooltip="false"
              v-if="type == 2 || type == 3 || type == 4"
            >
              <template slot-scope="scope">
                <el-button
                  v-show="scope.row.canHandle"
                  @click="handleWork(scope.row)"
                  type="text"
                  size="small"
                  style="font-size: 14px"
                  >处理</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="val2" name="second">
          <el-table
            :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
            :cell-style="{ textAlign: 'left' }"
            :data="tableData2"
            style="width: 100%"
            :max-height="tabMaxHeight"
            ref="multipleTable"
            row-key="id"
          >
            <el-table-column prop="id" label="外出编号" v-if="type == 0"> </el-table-column>
            <el-table-column prop="id" label="请假编号" v-if="type == 1 || type == 4">
            </el-table-column>
            <el-table-column prop="name" label="出库名称" v-if="type == 2"> </el-table-column>
            <el-table-column
              prop="applyUser"
              label="申请人"
              v-if="type == 2 || type == 3 || type == 4"
            >
            </el-table-column>
            <el-table-column prop="createTime" label="申请时间" v-if="type == 3"> </el-table-column>
            <el-table-column label="外出类型" v-if="type == 0">
              <template slot-scope="scope">
                {{
                  scope.row.businessType != null
                    ? dict.type.out_type[scope.row.businessType].label
                    : ''
                }}
              </template>
            </el-table-column>
            <el-table-column label="请假类型" v-if="type == 1">
              <template slot-scope="scope">
                {{
                  scope.row.businessType != null
                    ? dict.type.leave_type[scope.row.businessType].label
                    : ''
                }}
              </template>
            </el-table-column>

            <el-table-column label="审批状态">
              <template slot-scope="scope">
                <dict-tag
                  :flag="false"
                  :options="dict.type.approval_status"
                  :value="scope.row.status"
                />
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" :show-overflow-tooltip="false">
              <template slot-scope="scope">
                <el-button
                  v-show="scope.row.canHandle"
                  @click="handleWork(scope.row)"
                  type="text"
                  size="small"
                  style="font-size: 14px"
                  >处理</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {
  infomyApplyo,
  infomyApplyt,
  infoApplyo,
  infoApplyt,
  useOrOuto,
  useOrOutt,
  CarApproveo,
  CarApprovet,
} from '@/api/data/statistic';
export default {
  name: 'TabList', //tab分页表格组件
  dicts: ['approval_status', 'out_type', 'leave_type'],
  props: ['type'], //0外出 1请假
  data() {
    return {
      tabMaxHeight: 300,
      activeName: 'first',
      val1: '',
      val2: '',
      tableData1: [],
      tableData2: [],
      tolink: '', //更多链接
    };
  },
  created() {
    this.init();
  },
  methods: {
    //刷新
    refresh() {
      this.init();
    },

    //初始化
    init() {
      switch (this.type) {
        case 0:
          this.val1 = '我的外出申请';
          this.val2 = '审批处理';
          this.tolink = '/person-d/personOutCheck';
          break;
        case 1:
          this.val1 = '我的请假申请';
          this.val2 = '审批处理';
          this.tolink = '/person-d/personLeaveCheck';
          break;
        case 2:
          this.val1 = '领用审批';
          this.val2 = '出库审批';
          this.tolink = '/purchase-d/approvalHandleCheck';
          break;
        case 3:
          this.val1 = '用车审批';
          this.val2 = '出库审批';
          this.tolink = '/car-d/carApprovalCheck';
          break;
        case 4:
          this.val1 = '外出审批';
          this.val2 = '请假审批';
          break;
        default:
          break;
      }
      this.getData();
    },

    getData() {
      if (this.type == 0) {
        infomyApplyo().then((res) => {
          if (res && res.code == 200) {
            this.tableData1 = res.data;
          }
        });
        infoApplyo().then((res) => {
          if (res && res.code == 200) {
            this.tableData2 = res.data;
          }
        });
      }
      if (this.type == 1) {
        infomyApplyt().then((res) => {
          if (res && res.code == 200) {
            this.tableData1 = res.data;
          }
        });
        infoApplyt().then((res) => {
          if (res && res.code == 200) {
            this.tableData2 = res.data;
          }
        });
      }
      if (this.type == 2) {
        useOrOuto().then((res) => {
          if (res && res.code == 200) {
            this.tableData1 = res.data;
          }
        });
        useOrOutt().then((res) => {
          if (res && res.code == 200) {
            this.tableData2 = res.data;
          }
        });
      }

      if (this.type == 3) {
        CarApproveo().then((res) => {
          if (res && res.code == 200) {
            this.tableData1 = res.data;
          }
        });
        CarApprovet().then((res) => {
          if (res && res.code == 200) {
            this.tableData2 = res.data;
          }
        });
      }

      if (this.type == 4) {
        infoApplyo().then((res) => {
          if (res && res.code == 200) {
            this.tableData1 = res.data;
          }
        });
        infoApplyt().then((res) => {
          if (res && res.code == 200) {
            this.tableData2 = res.data;
          }
        });
      }
    },

    check() {
      this.$router.push({ path: this.tolink });
    },

    //审批处理跳转
    handleWork(row) {
      switch (this.type) {
        case 0:
          this.$router.push({ path: '/person-d/personApprovalCheck' });
          break;
        case 1:
          this.$router.push({ path: '/person-d/personApprovalCheck' });
          break;
        case 2:
          this.$router.push({ path: '/purchase-d/approvalHandleCheck' });
          break;
        case 3:
          this.$router.push({ path: '/car-d/carApprovalCheck' });
          break;
        case 4:
          this.$router.push({ path: '/person-d/personApprovalCheck' });
          break;

        default:
          break;
      }
    },

    handleClick(tab, event) {
      //console.log(tab, event);
    },
  },
};
</script>
<style lang="scss" scoped>
.cbody {
  background: #fff;
  height: 100%;
}
.top {
  z-index: 999;
  float: right;
  height: 0;
  position: relative;
  margin: 10px;
  margin-right: 12px;
  .el-button {
    height: 30px;
    line-height: 0px;
  }
}
.main {
  //height: 100%;
  // border-radius: 4px;
  // background: #fff;
  //box-shadow: 110px 10px 32px 10px rgba(255, 255, 255, 0.02);
  // height: 340px;
  // ::deep el-tabs {
  //   padding-left: 10px!important;
  //   margin-left: 10px;
  // }
}
::v-deep {
  .el-tabs {
    // height: 100%;
    border: 0;
    box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.02);
    .el-tabs__header {
      margin: 0px;
      border: 0;
      background: #e4e6ed;
      height: 48px;
    }
    .el-tabs__content {
    }
    .el-tabs__nav-wrap {
      padding-left: 0px;

      .el-tabs__item {
        height: 49px;
        line-height: 49px;
        border: 0;
        font-family: Alibaba PuHuiTi 2;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
      }
    }
  }
}
</style>
