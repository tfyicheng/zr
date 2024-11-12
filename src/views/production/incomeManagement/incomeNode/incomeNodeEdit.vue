<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['生产管理', '收款节点管理', '收款节点列表', '编辑收款节点']" />
        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" class="info">
              <el-form-item label="合 同 编 号">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.contNumber"></InputTip>
                </div>
              </el-form-item>
              <el-form-item label="合 同 名 称">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.contName"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="项 目 名 称">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.prjName"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="合同金额(元)">
                <div class="info">{{ commonFun.amountConversion2(form.totalAmount) }}</div>
              </el-form-item>

              <el-form-item label="结算金额(元)">
                <div class="info">{{ commonFun.amountConversion2(form.settlementAmount) }}</div>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div class="main2">
          <div class="m2top">
            收款节点
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
            <div class="m2mt" v-show="form.paymentNodes.length > 0">
              <div class="m2mb" style="max-width: 100px"><i style="color: red"></i>期次</div>
              <div class="m2mb"><i style="color: red">*</i>节点名称</div>
              <div class="m2mb"><i style="color: red"></i>比例</div>
              <div class="m2mb"><i style="color: red">*</i>金额（元）</div>
              <div class="m2mb" style="max-width: 60px">操作</div>
            </div>
            <el-form
              v-for="(c, index) in form.paymentNodes"
              :key="index"
              :model="c"
              :ref="`refForm${index}`"
              :rules="ruleData"
            >
              <div class="m2mt">
                <div class="m2mb" style="max-width: 100px">
                  <el-form-item label="">
                    <el-input
                      :model="(c.period = index + 1)"
                      @input="$forceUpdate()"
                      @blur="(e) => (c.period = e.target.value)"
                      oninput="value=value.replace(/[^\d]/g,'')"
                      :placeholder="index + 1"
                      disabled
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="m2mb">
                  <el-form-item label="" prop="nodeName">
                    <el-input v-model="c.nodeName" placeholder="请输入" clearable></el-input>
                  </el-form-item>
                </div>
                <div class="m2mb">
                  <el-form-item label="">
                    <el-input-number
                      v-model="c.ratio"
                      :precision="2"
                      style="width: 100%"
                      :controls="false"
                      :min="0"
                      :max="100"
                      placeholder="请输入（%）"
                    >
                    </el-input-number>
                  </el-form-item>
                </div>
                <div class="m2mb">
                  <el-form-item label="" prop="amount">
                    <!-- <el-input :placeholder="calVal(c.ratio)" disabled></el-input> -->
                    <el-input-number
                      v-model="c.amount"
                      :precision="2"
                      :controls="false"
                      style="width: 100%"
                      :min="0"
                      placeholder="0.00元"
                      clearable
                    >
                    </el-input-number>
                  </el-form-item>
                </div>
                <div class="m2mb" style="max-width: 60px">
                  <svg-icon icon-class="delete" style="cursor: hand" @click="delpm(c.id)" />
                </div>
              </div>
            </el-form>

            <div>
              <el-button type="primary" @click="addPayments">添加节点</el-button>
            </div>
          </div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>

        <el-dialog :visible.sync="dialogTableVisible">
          <PaymentNodeList ref="pList" :id="form.id" />
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { paymentNodeEdit, paymentNodeList } from '@/api/data/contract';
import { payAmount } from '@/api/data/produce';

export default {
  name: 'IncomeNodeEdit', //编辑收款节点
  data() {
    return {
      inputTipWidth: 230,
      form: {
        paymentNodes: [],
        // contractName: '项目阶段计划名称项目阶段计划名称项目阶段计划名称项目阶段计划名称',
      },
      paymentShow: true,
      dialogTableVisible: false,
      id: '', //临时记录节点id
      flagId: null,
      ruleData: {
        period: [{ required: true, message: '请输入期次', trigger: 'blur' }],
        nodeName: [{ required: true, message: '请输入节点名称', trigger: 'blur' }],
        ratio: [{ required: true, message: '请输入比例', trigger: 'blur' }],
        amount: [{ required: true, message: '请输入金额', trigger: 'blur' }],
      },
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    //查询信息
    getInfo() {
      //let resdata = null;
      if (this.$route.query.id) {
        this.flagId = this.$route.query.id;
        paymentNodeList(this.$route.query.id).then((response) => {
          //console.log(response);
          this.form = response.data;
          // resdata = JSON.parse(JSON.stringify(response.data));
          // payAmount({ contId: resdata.id, prjNumber: resdata.prjNumber }).then((response) => {
          //   this.form.totalAmount = response.data;
          // });
        });
      }
    },

    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
    },

    //添加节点
    addPayments() {
      var nv = {
        id: Math.floor(Math.random() * 100) + 1, //临时随机id
        isNew: true, //新增节点标记
      };
      this.form.paymentNodes.push(nv);
    },

    //删除节点
    delpm(id) {
      this.form.paymentNodes.splice(
        this.form.paymentNodes.findIndex((item) => item.id === id),
        1,
      );
    },

    validateForm(refs) {
      console.log(refs);
      let valiForm = this.$refs?.[refs].validate ? this.$refs?.[refs] : this.$refs?.[refs][0];
      return new Promise((resolve, reject) => {
        valiForm.validate((res) => {
          if (res) resolve();
          else reject();
        });
      });
    },

    //保存编辑
    save() {
      Promise.all([
        ...this.form.paymentNodes.map((item, index) => this.validateForm(`refForm${index}`)),
      ]).then((res) => {
        if (res) {
          let data = { id: this.form.id, paymentNodes: [] };
          let tolmout = 0;
          for (var i = 0; i < this.form.paymentNodes.length; i++) {
            data.paymentNodes.push({
              id: this.form.paymentNodes[i].isNew ? null : this.form.paymentNodes[i].id,
              nodeName: this.form.paymentNodes[i].nodeName,
              period: this.form.paymentNodes[i].period,
              ratio: this.form.paymentNodes[i].ratio,
              amount: this.form.paymentNodes[i].amount,
            });
            tolmout += this.form.paymentNodes[i].ratio;
          }
          // if (tolmout > 100) {
          //   this.$message.error('收付款比例设置错误');
          //   return;
          // }
          console.log(data);
          this.$modal.loading('正在提交，请稍候...');
          paymentNodeEdit(data)
            .then((res) => {
              this.$modal.closeLoading();
              if (res.code == 200) {
                this.$message.success('修改成功');
                this.goback();
              }
            })
            .catch((error) => {
              this.$modal.closeLoading();
            });
        }
      });
    },
  },
  computed: {
    //计算比例金额
    calVal() {
      return function (val) {
        if (this.form.totalAmount && val) {
          return this.form.totalAmount * (val / 100);
        } else {
          return '请先输入总金额';
        }
      };
    },
  },
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name && this.flagId != this.$route.query.id) {
        this.getInfo();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/commonAE.scss';
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
            width: 350px;
            height: 60px;
            span {
              margin-left: 20px;
              float: left;
              text-align: center;
              line-height: 60px;
              font-size: 16px;
            }
          }
        }

        .p2 {
          margin-top: 10px;
          .p2item {
            span {
              line-height: 100px;
              text-align: center;
              margin: 0 37px 0 25px;
              font-family: Alibaba PuHuiTi 2;
              font-size: 16px;
              font-weight: 500;
            }
            .el-textarea {
              height: 240px !important;
              width: 1050px;
              border-radius: 4px;
              border: 1px;
              ::v-deep textarea {
                height: 240px !important;
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
          }
          .p2item:first-child {
            span {
              position: relative;
              top: -170px;
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
                width: 36px;
                height: 36px;
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

      // ::v-deep .el-dialog__header {
      //   display: none;
      // }
      // ::v-deep .el-dialog__body {
      //   padding: 10px;
      // }

      // ::v-deep .dialog {
      //   min-width: 900px;
      // }
    }
  }
}
</style>
