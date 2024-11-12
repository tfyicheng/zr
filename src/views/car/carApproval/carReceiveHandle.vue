<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <div class="top">
          <svg-icon icon-class="back" style="cursor: hand" @click="goback" />
          处理领用审批
        </div>
        <div class="main">
          <div class="mainl">
            <div class="p1">
              <div class="p1item">
                <span>申请部门</span>
                <span> <InputTip :width="inputTipWidth" :text="form.useDept"></InputTip></span>
              </div>

              <div class="p1item">
                <span>申 请 人</span>
                <span> <InputTip :width="inputTipWidth" :text="form.applyUser"></InputTip></span>
              </div>

              <div class="p1item">
                <span>费用</span>
                <span> <InputTip :width="inputTipWidth" :text="form.totalCost"></InputTip></span>
              </div>
              <div class="p1item">
                <span>用车人数</span>
                <span> <InputTip :width="inputTipWidth" :text="form.usePersonNum"></InputTip></span>
              </div>
              <div class="p1item">
                <span>车辆号码</span>
                <span> <InputTip :width="inputTipWidth" :text="form.plateNumber"></InputTip></span>
              </div>
              <div class="p1item">
                <span>项目名称</span>
                <span> <InputTip :width="inputTipWidth" :text="form.projectName"></InputTip></span>
              </div>

              <div class="p1item">
                <span>到达地点</span>
                <span> <InputTip :width="inputTipWidth" :text="form.destination"></InputTip></span>
              </div>

              <div class="p1item">
                <span>出车时间</span>
                <span> <InputTip :width="inputTipWidth" :text="form.useTime"></InputTip></span>
              </div>

              <div class="p1item">
                <span>用车事由</span>
                <span> <InputTip :width="inputTipWidth" :text="form.remark"></InputTip></span>
              </div>
            </div>
          </div>
          <div style="height: 20px"></div>
        </div>

        <div class="main2" v-if="false">
          <div class="m2top">
            用车报告
            <div class="m2topm">
              <span
                v-show="paymentShow"
                @click="paymentShow ? (paymentShow = false) : (paymentShow = true)"
                >收起 <i class="el-icon-caret-top"></i>
              </span>
              <span
                v-show="!paymentShow"
                @click="paymentShow ? (paymentShow = false) : (paymentShow = true)"
                >展开 <i class="el-icon-caret-bottom"></i>
              </span>
            </div>
          </div>

          <div class="m2main" v-show="paymentShow">
            <el-table
              :data="form.reportList"
              style="padding: 20px"
              max-height="560"
              ref="multipleTable"
            >
              <!-- <el-table-column prop="id" label="ID"> </el-table-column> -->
              <el-table-column prop="plateNumber" label="车牌号"> </el-table-column>
              <el-table-column prop="driverName" label="司机名称"> </el-table-column>
              <el-table-column prop="startMileage" label="起始公里"> </el-table-column>
              <el-table-column prop="endMileage" label="返回公里"> </el-table-column>
              <el-table-column prop="mileage" label="行驶公里"> </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="main2" v-if="false">
          <div class="m2top">
            审批记录
            <div class="m2topm">
              <span
                v-show="paymentShow2"
                @click="paymentShow2 ? (paymentShow2 = false) : (paymentShow2 = true)"
                >收起 <i class="el-icon-caret-top"></i>
              </span>
              <span
                v-show="!paymentShow2"
                @click="paymentShow2 ? (paymentShow2 = false) : (paymentShow2 = true)"
                >展开 <i class="el-icon-caret-bottom"></i>
              </span>
            </div>
          </div>

          <div class="m2main" v-show="paymentShow2">
            <el-table
              :data="form.approvalRecordRes"
              style="padding: 20px"
              max-height="560"
              ref="multipleTable"
            >
              <!-- <el-table-column prop="id" label="ID"> </el-table-column> -->
              <el-table-column prop="approvalId" label="审批单"> </el-table-column>
              <el-table-column prop="approver" label="审批人"> </el-table-column>
              <el-table-column prop="deptName" label="所属部门"> </el-table-column>
              <el-table-column prop="approvalTime" label="审批(申请)时间"> </el-table-column>
              <el-table-column label="审批状态">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.approval_status"
                    :value="scope.row.status"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="approvalDesc" label="描述"> </el-table-column>
            </el-table>
          </div>
        </div>

        <!-- -->
        <div class="main3" v-show="commonFun.approveReasonShow(approve)">
          <div class="m3top">审批意见</div>
          <div class="m3main">
            <div class="p3item">
              <span><i style="visibility: hidden">*</i>意 见 内 容</span>
              <span>
                <el-input
                  v-model="reMark"
                  placeholder="请输入内容"
                  :maxlength="commonFun.reMarkMax"
                ></el-input
              ></span>
            </div>
          </div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button
            v-for="(c, index) in approve"
            v-show="c.name != '撤销'"
            :key="index"
            @click="handleWork(c.status)"
            :type="c.status == 1 ? 'primary' : 'warning'"
            >{{ c.name }}</el-button
          >
          <!-- <el-button @click="Output" type="warning">导出</el-button> -->
          <!-- <el-button
            v-show="approve.find((c) => c.status == 1) && approve.find((c) => c.status == 1).show"
            @click="handleWork(1)"
            >通过</el-button
          >
          <el-button
            v-show="approve.find((c) => c.status == 2) && approve.find((c) => c.status == 2).show"
            @click="handleWork(2)"
            >驳回</el-button
          > -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { carApplyInfo, carApplyApprove } from '@/api/data/car';

export default {
  name: 'CarReceiveHandle', //处理领用审批
  dicts: ['approval_status'],
  data() {
    return {
      maxtbheigth: '300',
      paymentShow: true,
      paymentShow2: true,
      form: {},
      inputTipWidth: this.commonFun.inputTipWidth,
      dialogTableVisible: false,
      fileview: '', //文件预览地址
      approve: [], // 审批菜单
      reMark: '',
      flagId: null,
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
        carApplyInfo(this.$route.query.id).then((response) => {
          this.form = response.data;
        });
      }
      if (this.$route.query.approve) {
        this.approve = this.$route.query.approve;
      }
    },

    //返回
    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
    },

    //导出
    Output() {},

    //审批处理操作
    handleWork(status) {
      let data = {
        id: this.$route.query.id, //编号(申请单ID)
        status: status, //状态,暂时固定填6即可
        approvalDesc: this.reMark, //备注
      };
      this.$modal.loading('正在提交，请稍候...');
      carApplyApprove(data)
        .then((res) => {
          this.$modal.closeLoading();
          if (res.code == 200) {
            this.$message.success(`已提交请求`);
            this.goback();
          } else {
            this.$message.error(`请求失败`);
          }
        })
        .catch((error) => {
          this.$modal.closeLoading();
        });
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

  // 使用 watch 监听路由变化，手动更新数据
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name && this.flagId != this.$route.query.id) {
        // this.getInfo();
        this.$tab.refreshPage();
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

      .main {
        background: #fff;
        border-radius: 4px;
        display: inline-block;
        .mainl {
          float: left;
        }
        .mainr {
          float: right;
          text-align: center;
          .el-button {
            margin-top: 25px;
            display: inline-block;
            width: 100px;
            height: 40px;
          }
        }
        .p1 {
          position: relative;
          display: inline-block;
          .p1item {
            margin: 4px 10px 0 4px;
            float: left;
            width: 390px;
            height: 60px;
            span {
              margin-left: 20px;
              float: left;
              text-align: center;
              line-height: 60px;
              font-size: 16px;
            }
            span:first-child {
              width: 100px;
            }

            .el-button {
              margin-left: 12px;
            }
            //下划线标记
            .mark {
              color: #409eff;
              text-decoration-line: underline;
            }
          }
        }

        .p2 {
          margin-top: 10px;
          .p2item {
            height: auto;
            margin-bottom: 35px;
            margin-top: 20px;
            vertical-align: bottom;
            .p2iteml {
              flex: 1;
              height: 24px;
              float: left;
              span {
                display: inline-block;
                text-align: center;
                margin: 0 25px;
                font-size: 16px;
                font-weight: 500;
                height: auto;
                width: 100px;
              }
              div {
                display: inline-block;
              }
            }

            .p2itemr {
              display: inline-block;
              flex: 1;
              ::v-deep .el-textarea {
                width: 1050px;
                max-height: 300px !important;
                border-radius: 4px;
                background: #fff;

                .el-textarea__inner {
                  max-height: 300px;
                  border: 0;
                  padding: 0px;
                  font-family: Alibaba PuHuiTi 2;
                  font-size: 16px;
                  font-weight: 400;
                  letter-spacing: 0em;
                }
              }
              ul {
                max-height: 150px;
                overflow: auto;
                list-style-type: none;
                margin: 0px 5px;
                padding: 0px;
                li {
                  margin-bottom: 5px;
                }
              }
            }
          }
        }
      }

      .main2 {
        margin-top: 20px;
        background: #fff;
        border-radius: 4px;
        .m2top {
          padding-top: 20px;
          padding-bottom: 20px;
          margin: 0 20px;
          font-family: Alibaba PuHuiTi 2;
          font-size: 20px;
          font-weight: 500;
          line-height: 28px;
          letter-spacing: 0em;
          text-align: left;
          .m2topm {
            display: inline;
            float: right;
            font-size: 14px;
            cursor: pointer;
            color: #409eff;
          }
        }
        .m2top::before {
          content: '\00a0    ';
          border-left: 3px solid #4da0ff;
        }
        .m2main {
          border-top: 1px solid #e4e6ed;
          .m2mt {
            height: 60px;
            display: flex;
            line-height: 60px;
            .m2mb {
              flex: 1;
              margin: 0px 10px 10px 20px;
              .el-button {
                border: 0;
                margin: 0;
                width: 40px;
                height: 40px;
                border-radius: 4px;
              }
              .el-select,
              .el-input-inner {
                display: flex;
                flex: 1;
              }
              svg {
                width: 40px;
                height: 40px;
                margin-top: 10px;
              }
            }
          }
          .el-button {
            border: 0;
            margin: 20px 20px 20px 20px;
            width: 100px;
            height: 40px;
            border-radius: 4px;
          }
        }
      }

      .main3 {
        margin-top: 20px;
        background: #fff;
        border-radius: 4px;
        .m3top {
          padding-top: 20px;
          padding-bottom: 20px;
          margin: 0 20px;
          font-family: Alibaba PuHuiTi 2;
          font-size: 20px;
          font-weight: 500;
          line-height: 28px;
          letter-spacing: 0em;
          text-align: left;
          .m3topm {
            display: inline;
            float: right;
            font-size: 14px;
            cursor: pointer;
            color: #409eff;
          }
        }
        .m3top::before {
          content: '\00a0    ';
          border-left: 3px solid #4da0ff;
        }
        .m3main {
          border-top: 1px solid #e4e6ed;
          .p3item {
            display: flex;
            height: 80px;
            line-height: 80px;
            span {
              width: 150px;
              text-align: center;
            }
            span:last-child {
              flex: 1;
              margin: 0 30px 0 0;
            }
          }
        }
      }

      .p3 {
        margin: 0px 0px;
        width: 98%;
        .el-button {
          border: 0;
          margin: 20px 20px 20px 0px;
          width: 100px;
          height: 40px;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>
