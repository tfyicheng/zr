<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['资料管理', '我的申请', '我的申请列表', '审批处理']" />
        <div class="main">
          <div class="p1">
            <div class="p1item">
              <span>申 请 部 门</span>
              <span>
                <InputTip :width="inputTipWidth" :text="form.applyDept"></InputTip>
              </span>
            </div>

            <div class="p1item">
              <span>申 请 人</span>
              <span>
                <InputTip :width="inputTipWidth" :text="form.applyUser"></InputTip>
              </span>
            </div>
            <div class="p1item">
              <span>事 由</span>
              <span>
                <dict-tag :options="dict.type.reason_type" :value="form.reason" />
              </span>
            </div>

            <div class="p1item">
              <span>状 态</span>
              <span>
                <dict-tag :flag="false" :options="dict.type.approval_status" :value="form.status" />
              </span>
            </div>

            <div class="p1item">
              <span>资 料 名 称</span>
              <span>
                <InputTip :width="inputTipWidth" :text="form.resourceName"></InputTip>
              </span>
            </div>

            <div class="p1item">
              <span>资 料 类 型</span>
              <span>
                <dict-tag :options="dict.type.down_data_type" :value="form.type" />
              </span>
            </div>

            <div class="p1item">
              <span>申 请 时 间</span>
              <span>{{ form.createTime }}</span>
            </div>
          </div>

          <div class="p2">
            <div class="p2item">
              <div class="p2iteml" style="width: 120px; text-align: left">
                <span>描 述</span>
              </div>
              <div class="p2itemr">
                <el-input
                  type="textarea"
                  autosize
                  resize="none"
                  readonly
                  v-model="form.remark"
                ></el-input>
              </div>
            </div>
            <div class="p2item">
              <div class="p2iteml">
                <span>附 件</span>
              </div>
              <div class="p2itemr">
                <FilePreview :data="form.files" />
              </div>
            </div>
          </div>
          <div style="height: 2px"></div>
        </div>

        <div class="main3" v-show="commonFun.approveReasonShow(approve)">
          <div class="m3top">审批意见</div>
          <div class="m3main">
            <div class="p3item">
              <span><i style="visibility: hidden">*</i>意 见 内 容</span>
              <span>
                <el-input
                  v-model="form.approvalDesc"
                  placeholder=""
                  :maxlength="commonFun.reMarkMax"
                  :disabled="approve.length == 0"
                ></el-input
              ></span>
            </div>
          </div>
        </div>
        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <!-- <el-button v-show="!form.canDown" type="primary" @click="exportApply">申请导出</el-button> -->
          <!-- <el-button v-show="form.canDown" type="warning" @click="Output">导出</el-button> -->

          <el-button
            v-for="(c, index) in approve"
            v-show="c.name != '撤销' && c.name != '下载'"
            :key="index"
            @click="handleWork(c.status)"
            :type="c.status == 1 ? 'primary' : 'warning'"
            >{{ c.name }}</el-button
          >
          <!-- 
          <el-button
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

        <ApplyDown
          ref="ApplyDown"
          :downSourceName="form.certName"
          :downSourceId="form.id"
          :type="1"
        />
        <BeforeDown ref="BeforeDown" />
      </div>
    </div>
  </div>
</template>

<script>
import ApplyDown from '@/views/components/dialog/applyDown';
import { ApprovalInfo, fileApprovalApply, dataDown } from '@/api/data/file';
export default {
  name: 'MyRequestInfo', //我的申请详情
  dicts: ['approval_status', 'reason_type', 'file_type', 'down_data_type'],
  components: { ApplyDown },
  data() {
    return {
      inputTipWidth: this.commonFun.inputTipWidth,
      form: {},
      dialogTableVisible: false,
      fileview: '', //文件预览地址
      approve: [],
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
        ApprovalInfo(this.$route.query.id).then((response) => {
          //console.log(response);
          this.form = response.data;
        });
      }
      if (this.$route.query.approve) {
        this.approve = this.$route.query.approve;
        this.form.approvalDesc = '';
      }
    },

    //返回
    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      //this.$router.push({ path: '/data-d/certificatesCheck' });
      this.$router.go(-1);
    },

    //申请导出
    exportApply() {
      this.$refs.ApplyDown.show();
    },

    //下载/导出
    Output() {
      // dataDown(this.form.id);
      this.$refs.BeforeDown.downSourceId = this.form.id;
      this.$refs.BeforeDown.type = this.form.type;
      this.$refs.BeforeDown.show();
    },

    //审批处理操作
    handleWork(status) {
      let data = {
        id: this.$route.query.id, //编号(申请单ID)
        status: status, //状态,暂时固定填6即可
        approvalDesc: this.form.approvalDesc,
      };
      this.$modal.loading('正在提交，请稍候...');
      fileApprovalApply(data)
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
        .p1 {
          position: relative;
          display: inline-block;
          .p1item {
            margin: 4px 10px 0 4px;
            float: left;
            width: 370px;
            height: 60px;
            span {
              margin-left: 20px;
              float: left;
              line-height: 60px;
              font-size: 16px;
            }
            span:last-child {
              width: 225px;
            }
            ::v-deep .el-input__inner {
              border: 0;
              width: 225px;
            }
            .el-button {
              margin-left: 12px;
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
              max-width: 130px;
              height: 24px;
              float: left;
              span {
                text-align: center;
                margin: 0 20px 0 25px;
                font-family: Alibaba PuHuiTi 2;
                font-size: 16px;
                font-weight: 500;
                height: auto;
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
                  font-size: 16px;
                  font-weight: 400;
                  letter-spacing: 0em;
                  font-family: Arial, Helvetica, sans-serif;
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
