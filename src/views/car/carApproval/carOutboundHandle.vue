<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <div class="top">
          <svg-icon icon-class="back" style="cursor: hand" @click="goback" />
          处理出库审批
        </div>
        <div class="main">
          <div class="mainl">
            <div class="p1">
              <div class="p1item">
                <span>车 牌 号</span>
                <span> <InputTip :width="inputTipWidth" :text="form.plateNumber"></InputTip></span>
              </div>

              <div class="p1item">
                <span>状 态</span>
                <span>
                  {{ form.status ? dict.type.approval_status[form.status].label : null }}</span
                >
              </div>

              <div class="p1item">
                <span>品 牌</span>
                <span> <InputTip :width="inputTipWidth" :text="form.brand"></InputTip></span>
              </div>
              <div class="p1item">
                <span>型 号</span>
                <span> <InputTip :width="inputTipWidth" :text="form.model"></InputTip></span>
              </div>

              <div class="p1item">
                <span>发 动 机 号</span>
                <span> <InputTip :width="inputTipWidth" :text="form.engineNumber"></InputTip></span>
              </div>

              <div class="p1item">
                <span>车 架 号</span>
                <span> <InputTip :width="inputTipWidth" :text="form.frameNumber"></InputTip></span>
              </div>

              <div class="p1item">
                <span>出 库 人</span>
                <span> <InputTip :width="inputTipWidth" :text="form.outboundUser"></InputTip></span>
              </div>

              <div class="p1item">
                <span>出 库 时 间</span>
                <span> <InputTip :width="inputTipWidth" :text="form.outboundTime"></InputTip></span>
              </div>

              <div class="p1item">
                <span>出 库 事 由</span>
                <span>
                  <InputTip :width="inputTipWidth" :text="form.outboundRemark"></InputTip
                ></span>
              </div>
            </div>
            <div class="p2">
              <div class="p2item">
                <span>车 辆 照片</span>
                <div>
                  <FilePreview :data="form.carPicFile" />
                </div>
                <!-- <div class="p2img">
                  <img
                    v-for="(c, index) in form.carPicFile"
                    :key="index"
                    :src="c.annexId"
                    :alt="c.originalName"
                    @click="preview(c.annexId)"
                  />
                </div> -->
              </div>
            </div>
          </div>
          <div style="height: 20px"></div>
        </div>

        <div class="main2" v-if="false">
          <div class="m2top">
            审批记录
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

        <!--  -->
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
import { carOutInfo, carOutApprove } from '@/api/data/car';

export default {
  name: 'CarOutboundHandle', //处理出库审批
  dicts: ['approval_status'],
  data() {
    return {
      maxtbheigth: '300',
      paymentShow: true,
      form: {},
      inputTipWidth: this.commonFun.inputTipWidth,
      approve: [], // 审批菜单
      reMark: '', //审批意见
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
        carOutInfo(this.$route.query.id).then((response) => {
          this.form = response.data;
        });
      }
      if (this.$route.query.approve) {
        this.approve = this.$route.query.approve;
      }
    },

    //审批处理操作
    handleWork(status) {
      let data = {
        id: this.$route.query.id, //编号(申请单ID)
        status: status, //状态,暂时固定填6即可
        approvalDesc: this.reMark, //备注
      };
      this.$modal.loading('正在提交，请稍候...');
      carOutApprove(data)
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

    //返回
    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
    },

    //导出
    Output() {},

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
        //this.getInfo();
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
            span {
              line-height: 100px;
              text-align: center;
              margin: 0 40px 0 30px;
              font-family: Alibaba PuHuiTi 2;
              font-size: 16px;
              font-weight: 500;
            }
            .el-textarea {
              height: 100px !important;
              width: 645px;
              border-radius: 4px;
              border: 1px;
              ::v-deep textarea {
                height: 100px !important;
              }
            }
            .el-button {
              width: 240px;
              height: 48px;
              border-radius: 4px;
              color: #409eff;
              font-family: Alibaba PuHuiTi 2;
              font-size: 16px;
              font-weight: 500;
            }
            .upload-file {
              margin-top: 30px;
              width: 400px;
              display: inline-block;
            }
            .p2img {
              max-height: 300px;
              width: 90%;
              overflow: auto;
              img {
                cursor: pointer;
                max-width: 120px;
                max-height: 120px;
                margin-right: 20px;
                margin-bottom: 20px;
              }
            }
          }
          .p2item:first-child {
            span {
              position: relative;
              top: -35px;
            }
          }
          .p2item:last-child {
            span {
              float: left;
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
