<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['项目管理', '项目人员管理', '项目人员列表', '添加项目人员信息']" />
        <div class="main">
          <div class="p1">
            <div class="p1item">
              <span><i style="color: red; visibility: hidden">*</i>合 同 编 号</span>
              <el-input v-model="input" placeholder="系统填写" :disabled="true"></el-input>
            </div>
            <div class="p1item">
              <span><i style="color: red">*</i>合 同 名 称</span>
              <el-input v-model="input" placeholder="填入内容"></el-input>
            </div>

            <div class="p1item">
              <span><i style="color: red; visibility: hidden">*</i>合 同 类 型</span>
              <el-select v-model="value" placeholder="点击选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="p1item">
              <span><i style="color: red">*</i>合同金额(元)</span>
              <el-input v-model="input" placeholder="0.00元"></el-input>
            </div>
            <div class="p1item">
              <span><i style="color: red; visibility: hidden">*</i>部 门 名 称</span>
              <el-input v-model="input" placeholder="系统填写" :disabled="true"></el-input>
            </div>
            <div class="p1item">
              <span><i style="color: red">*</i>合同负责人</span>
              <el-input v-model="input" placeholder="请输入内容">
                <svg-icon
                  slot="suffix"
                  icon-class="choose"
                  style="cursor: pointer; margin-right: 10px"
                />
              </el-input>
            </div>
            <div class="p1item">
              <span><i style="color: red; visibility: hidden">*</i>项 目 编 号</span>
              <el-input v-model="input" placeholder="系统填写" :disabled="true"></el-input>
            </div>
            <div class="p1item">
              <span><i style="color: red; visibility: hidden">*</i>项 目 名 称</span>
              <el-input v-model="input" placeholder="请输入内容">
                <svg-icon
                  slot="suffix"
                  icon-class="choose"
                  style="cursor: pointer; margin-right: 10px"
              /></el-input>
            </div>
            <div class="p1item">
              <span><i style="color: red">*</i>客 户 名 称</span>
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <div class="p1item">
              <span><i style="color: red; visibility: hidden">*</i>联 系 人</span>
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <div class="p1item">
              <span><i style="color: red; visibility: hidden">*</i>联 系 号 码</span>
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <div class="p1item">
              <span><i style="color: red; visibility: hidden">*</i>邮 箱 地 址</span>
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <div class="p1item">
              <span><i style="color: red">*</i>签 约 日 期</span>
              <el-date-picker v-model="value1" type="date" placeholder="选择日期"> </el-date-picker>
            </div>
            <div class="p1item">
              <span><i style="color: red; visibility: hidden">*</i>联 系 地 址</span>
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div>
          </div>
        </div>

        <div class="main2">
          <div class="m2top">
            项目人员
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
            <div class="m2mt">
              <div class="m2mb" style="max-width: 100px">ID</div>
              <div class="m2mb"><i style="color: red">*</i>期次</div>
              <div class="m2mb"><i style="color: red">*</i>节点名称</div>
              <div class="m2mb" style="max-width: 100px">
                <i style="color: red">*</i>*应收金额（元）
              </div>
              <div class="m2mb"></div>
              <div class="m2mb" style="max-width: 60px">操作</div>
            </div>
            <div class="m2mt" v-for="(c, index) in payments" :key="index">
              <div class="m2mb" style="max-width: 100px">
                <el-input v-model="c.id" placeholder="123" :disabled="true"></el-input>
              </div>
              <div class="m2mb">
                <el-select v-model="value" placeholder="点击选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="m2mb">
                <el-input v-model="c.planname" placeholder="请输入内容（%）"></el-input>
              </div>
              <div class="m2mb" style="max-width: 100px">
                <el-input v-model="c.sum" placeholder="0.00%"></el-input>
              </div>
              <div class="m2mb">
                <el-input
                  v-model="c.percentage"
                  placeholder="0.00（元）"
                  :disabled="true"
                ></el-input>
              </div>
              <div class="m2mb" style="max-width: 60px">
                <svg-icon icon-class="delete" style="cursor: hand" @click="delpm(c.uid)" />
              </div>
            </div>

            <div>
              <el-button type="primary" @click="addPayments">添加节点</el-button>
            </div>
          </div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectPersonnelAdd', //添加项目人员
  data() {
    return {
      textarea: '',
      payments: [
        {
          uid: '1213',
          issue: '1',
          planname: '项目阶段计划名称',
          sum: 21.1,
          percentage: 0.5,
        },
      ],
      paymentShow: true,
    };
  },
  created() {},
  methods: {
    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
    },
    //添加收款节点
    addPayments() {
      var nv = {
        uid: '3213',
        issue: '3',
        planname: '项目阶段计划名称3',
        sum: 61.1,
        percentage: 1.5,
      };
      this.payments.push(nv);
    },
    //删除收款节点
    delpm(uid) {
      this.payments.splice(
        this.payments.findIndex((item) => item.uid === uid),
        1,
      );
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
            width: 390px;
            height: 60px;
            span {
              margin-left: 20px;
              float: left;
              text-align: center;
              line-height: 60px;
              font-size: 16px;
            }
            .el-input,
            .el-date-editor,
            .el-select {
              float: right;
              margin: 10px 10px 0 10px;
              width: 240px;
            }
            .el-button {
              margin-left: 12px;
            }
          }
          .p1item:last-child {
            width: 795px;
            .el-input {
              width: 645px;
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
