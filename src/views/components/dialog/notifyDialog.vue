<template>
  <el-dialog :visible.sync="visible" top="25vh" append-to-body>
    <div class="mbody">
      <div class="appc">
        <div class="top">{{ title }}</div>
        <div class="main">
          <div class="p1"></div>

          <!-- <div class="p2">
            <div class="p2choose">
              <span>已选择</span>
              <span class="p2chooses">
                <span v-for="c in chooseItemss" :key="c.index">{{ c.userName }}</span>
              </span>
              <span class="p2choosed" @click="clearSel">清空</span>
            </div>
          </div> -->

          <div class="p3">
            <el-table
              :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
              :cell-style="{ textAlign: 'left' }"
              :data="tableData"
              style="width: 100%"
              max-height="420"
              ref="multipleTable"
              row-key="userId"
              @selection-change="handleSelectionChange"
              v-loading="loading"
            >
              <!-- <el-table-column type="selection" width="55" reserve-selection /> -->
              <el-table-column prop="createTime" width="200" label="时间"> </el-table-column>
              <el-table-column prop="" label="类型" width="200">
                <template slot-scope="scope">
                  <span style="color: #409eff"> {{ getType(scope.row.type) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="handleContent" label="详情"> </el-table-column>

              <el-table-column
                fixed="right"
                label="操作"
                width="150"
                :show-overflow-tooltip="false"
              >
                <template slot-scope="scope">
                  <el-button
                    @click="handleWork(scope.row)"
                    type="text"
                    size="small"
                    style="font-size: 14px; color: red"
                    >不再提醒</el-button
                  >
                </template>
              </el-table-column>

              <!-- 工作状态 -->
              <!-- <el-table-column label="状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.jobState === 0" style="color: #07c15f">{{
                    dict.type.user_job_status[scope.row.jobState].label
                  }}</span>
                  <span v-else-if="scope.row.jobState === 1" style="color: #409eff">{{
                    dict.type.user_job_status[scope.row.jobState].label
                  }}</span>
                  <span v-else-if="scope.row.jobState === 2" style="color: red">{{
                    dict.type.user_job_status[scope.row.jobState].label
                  }}</span>
                  <span v-else-if="scope.row.jobState === 3" style="color: #676767">{{
                    dict.type.user_job_status[scope.row.jobState].label
                  }}</span>
                  <span v-else-if="scope.row.jobState === 4" style="color: #676767">{{
                    dict.type.user_job_status[scope.row.jobState].label
                  }}</span>
                  <span v-else-if="scope.row.jobState === 5" style="color: #676767">{{
                    dict.type.user_job_status[scope.row.jobState].label
                  }}</span>
                  <span v-else-if="scope.row.jobState === 6" style="color: #676767">{{
                    dict.type.user_job_status[scope.row.jobState].label
                  }}</span>
                </template>
              </el-table-column> -->
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

          <!-- <div class="p4">
            <el-button @click="goback">返回</el-button>
            <el-button type="primary" @click="save">保存</el-button>
          </div> -->
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import store from '@/store';
import { handleNotice, handleNoticeStop } from '@/api/data/statistic';
export default {
  name: '', //通知列表
  props: {
    type: 0, //选择类型，0默认不限制，1车辆选择时指定在岗
    value: [String, Object, Array],
    Multiple: {
      type: Boolean,
      default: true,
    }, //是否支持多选
  },
  data() {
    return {
      title: '通知列表',
      // 遮罩层
      visible: false,
      loading: true, // 遮罩层
      chooseItemss: [], // 选中项
      tableData: [], //表格数据
      // 总条数
      total: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        //placeholder: '', //关键字
      },
    };
  },

  created() {
    //this.getList();
  },

  methods: {
    // 显示弹框
    show() {
      this.visible = true;
      this.getList();
    },

    //加载列表
    getList() {
      handleNotice(this.queryParams).then((response) => {
        this.tableData = response.rows;
        if (response.total > this.total) {
          this.$notify({
            title: '通知',
            dangerouslyUseHTMLString: true,
            message:
              '你有' +
              '<span  style="color:red"> ' +
              (response.total - this.total) +
              '</span>' +
              ' 条新的待处理事项',
            offset: 40,
          });
        }
        this.total = response.total;
        this.loading = false;
        store.commit('SET_NOTIFYNUM', response.total);
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
      this.getList();
    },

    //选择
    handleSelectionChange(rows) {
      this.chooseItemss = [];
      rows.forEach((element) => {
        this.chooseItemss.push(element);
      });
    },

    //清空选中
    clearSel() {
      this.chooseItemss = [];
      this.$refs.multipleTable.clearSelection();
    },

    //返回
    goback() {
      this.visible = false;
    },

    getType(type) {
      switch (type) {
        case 0:
          return '车辆出库待审批';
        case 1:
          return '车辆用车待审批';
        case 2:
          return '车辆入库待审批';
        case 3:
          return '资产报废待审批';
        case 4:
          return '资产领用待审批';
        case 5:
          return '资产入库待审批';
        case 6:
          return '人员请假待审批';
        case 7:
          return '人员外出待审批';
        case 8:
          return '项目进度更新';
        case 9:
          return '有可收款节点';
        case 10:
          return '有可付款节点';
        case 11:
          return '劳动合同即将到期';
        case 12:
          return '项目计划即将到期';
        case 13:
          return '项目即将到期';
        case 14:
          return '证书即将到期';
        default:
          break;
      }
    },

    handleWork(row) {
      handleNoticeStop(row.id).then((res) => {
        if (res.code == 200) {
          this.$message.success('设置成功');
          this.getList();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.mbody {
  .appc {
    .top {
      font-family: Alibaba PuHuiTi 2;
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
      letter-spacing: 0em;
      text-align: left;
      margin: 10px;
    }
    .top::before {
      content: '\00a0 ';
      border-left: 3px solid #4da0ff;
      margin-right: 5px;
    }
    i {
      float: right;
      cursor: pointer;
      font-weight: 700;
      font-size: 30px;
    }
    .main {
      background: #fff;
      border-radius: 4px;
      .p1 {
        position: relative;
        display: inline-block;
        .p1item {
          margin: 4px 0px 0 4px;
          float: left;
          width: 270px;
          height: 50px;
          .el-input,
          .el-date-editor,
          .el-select {
            margin: 10px 10px 0 10px;
            width: 240px;
            height: 40px;
          }
          .el-button {
            margin: 11px;
            width: 100px;
            border: 0px;
          }
          .el-button ~ .graybtn {
            background: #f3f4f8;
          }
        }
      }

      .p2 {
        margin: 15px;
        width: 98%;
        .el-button {
          margin: 20px 20px 20px 0px;
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
            width: 80%;
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
        margin-bottom: 0px;
        .pagination-container {
          margin-bottom: 0px;
          .el-pagination {
            margin: 15px;
            margin-top: 20px;
            text-align: right;
            padding-bottom: 0px;
          }
        }
      }

      .p4 {
        margin: 0px 15px;
        width: 98%;

        .el-button {
          border: 0;
          margin: 20px 20px 20px 0px;
          width: 100px;
          border-radius: 4px;
        }
        .el-button:first-child {
          background: #f3f4f8;
        }
      }
    }
  }
}
</style>
