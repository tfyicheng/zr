<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['项目管理', '项目人员管理', '项目人员列表', '查看项目人员信息']" />
        <div class="main">
          <div class="mainl">
            <div class="p1">
              <div class="p1item">
                <span>合 同 编 号</span>
                <span><InputTip :width="inputTipWidth" :text="form.contractId"></InputTip></span>
              </div>
              <div class="p1item">
                <span>合 同 名 称</span>
                <span> <InputTip :width="inputTipWidth" :text="form.contractName"></InputTip></span>
              </div>
              <div class="p1item">
                <span>合 同 级 别</span>
                <span>{{ form.contractLevel }}</span>
              </div>
              <div class="p1item">
                <span>合 同 状 态</span>
                <span>{{ form.contractState }}</span>
              </div>
              <div class="p1item">
                <span>项 目 编 号</span>
                <span>{{ form.projectId }}</span>
              </div>
              <div class="p1item">
                <span>项 目 名 称</span>
                <span class="mark">{{ form.projectName }}</span>
              </div>
              <div class="p1item">
                <span>金 额(元)</span>
                <span>{{ commonFun.amountConversion2(form.money) }}</span>
              </div>
              <div class="p1item">
                <span>签 约 日 期</span>
                <span>{{ form.date }}</span>
              </div>
              <div class="p1item">
                <span>部 门 名 称</span>
                <span>{{ form.departmentName }}</span>
              </div>
              <div class="p1item">
                <span>合同负责人</span>
                <span>{{ form.responsiblePerson }}</span>
              </div>
              <div class="p1item">
                <span>客 户 名 称</span>
                <span class="mark">{{ form.customerName }}</span>
              </div>
              <div class="p1item">
                <span>联 系 人</span>
                <span>{{ form.contacts }}</span>
              </div>
              <div class="p1item">
                <span>联 系 号 码</span>
                <span>{{ form.phone }}</span>
              </div>
              <div class="p1item">
                <span>邮 箱 地 址</span>
                <span>{{ form.email }}</span>
              </div>
            </div>
            <div class="p2">
              <div class="p2item">
                <div class="p2iteml">
                  <span>联 系 地 址</span>
                </div>
                <div class="p2itemr">
                  <el-input
                    type="textarea"
                    autosize
                    resize="none"
                    readonly
                    v-model="form.address"
                  ></el-input>
                </div>
              </div>
              <div class="p2item">
                <div class="p2iteml">
                  <span class="p2itemlt">主 要 条 款</span>
                </div>
                <div class="p2itemr">
                  <el-input
                    type="textarea"
                    autosize
                    resize="none"
                    readonly
                    v-model="form.clause"
                  ></el-input>
                </div>
              </div>
              <div class="p2item">
                <div class="p2iteml">
                  <span>备注</span>
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
                  <span>合 同 附 件</span>
                </div>
                <div class="p2itemr">
                  <ul>
                    <li
                      @click="filePreview(c.annexId)"
                      style="cursor: hand"
                      v-for="c in form.files"
                      :key="c.index"
                    >
                      <svg-icon icon-class="file" />
                      <a style="cursor: hand; color: #409eff"> {{ c.originalName }}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div style="height: 20px"></div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button @click="Output" type="warning">导出</el-button>
        </div>

        <el-dialog :visible.sync="dialogTableVisible" class="iframe" v-el-drag-dialog>
          <iframe width="100%" height="100%" :src="fileview"></iframe>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { certInfo } from '@/api/data/certificate';
import BillingRecord from '@/views/components/table/billingRecord';
import IncomeNode from '@/views/components/table/incomeNode';
import IncomeRecord from '@/views/components/table/incomeRecord';
export default {
  name: 'ProjectPersonnelInfo', //项目人员信息
  components: { BillingRecord, IncomeNode, IncomeRecord },
  dicts: ['certificate_category'],
  data() {
    return {
      maxtbheigth: '300',
      form: {
        contractName: '深圳机场建设项目合同深圳机场建设项目合同', //合同名称
        contractId: '7562356563525675623565635256', //合同编号
        contractState: '执行中', //合同状态
        contractLevel: '主合同', //合同等级
        projectId: '75623565635256', //项目编号
        projectName: '深圳机场建设项目', //项目名称
        date: '2023-11-11', //签 约  日 期
        money: 64545445.67, //金额（元）
        departmentName: '珠荣工程设计有限公司', //部 门名 称
        responsiblePerson: '张学友', //合同负责人
        customerName: '广州移动工程建设有限公司', //客 户名 称
        contacts: '刘德华', //联   系   人
        address: '广东省佛山市顺德区龙江镇沙富村金宁大街', //联 系地 址
        phone: '13620072007', //联 系号 码
        email: 'abc39286141@sina.com', //邮 箱地 址
        clause: `定义和解释： 1.1\r\n 甲方：指合同中提供方的名称和详细信息。 1.2 乙方：指合同中接受方的名称和详细信息。 1.3 “合同”：指本协议及其所有附件、补充和修订。
合同目的： 2.1 本合同旨在规定甲方向乙方提供特定的产品/服务。
产品/服务描述： 3.1 甲方将向乙方提供详细描述的产品/服务。 3.2 产品/服务的规格、数量、质量标准等应在合同中明确规定。
价格和支付条款： 4.1 乙方应支付甲方指定的金额，具体金额和付款方式应在合同中明确规定。 4.2 付款期限为合同签署后的指定天数/日期。 4.3 逾期付款将产生罚金或利息，罚金/利息的比例和计算方式应在合同中明确规定。
保密条款： 5.1 乙方同意保守和保密甲方提供的所有机密信息，未经甲方事先书面同意，不得披露给任何第三方。 5.2 保密义务适用于合同有效期和合同终止后的一段时间。
知识产权： 6.1 甲方保留所有与合同产品/服务相关的知识产权。 6.2 乙方不得复制、修改、分发或利用甲方的知识产权，除非得到甲方的事先书面许可。
保证和责任限制： 7.1 甲方保证其提供的产品/服务符合合同中约定的规格和质量标准。 7.2 乙方同意在使用产品/服务时遵守所有适用的法律和法规。 7.3 除非另有明确约定，甲方对于因产品/服务使用而导致的任何损失或损害不承担责任。
终止条款： 8.1 任何一方有权在违约、合同履行困难或其他约定的终止条件下终止合同。 8.2 终止合同应通过书面通知对方实施，通知期限应在合同中明确规定。
适用法律和管辖权： 9.1 本合同受到适用法律的管辖。 9.2 双方同意将任何争议提交至指定地点的仲裁机构解决。',//主要条款`,
        remark: '本合同受到适用法律的管辖至指定地点的仲裁机构解决', //备注
        files: [
          {
            primaryId: null, //附件列表
            annexId: 1735214161396260900, //文件ID
            originalName: 'err.log', //文件名称
          },
          {
            primaryId: null, //附件列表
            annexId: 1735214161396260900, //文件ID
            originalName: 'err.log', //文件名称
          },
        ], //合同附件
      },
      inputTipWidth: this.commonFun.inputTipWidth,
      dialogTableVisible: false,
      fileview: '', //文件预览地址
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    //查询信息
    getInfo() {
      if (this.$route.query.id) {
        this.loading = true;
        certInfo(this.$route.query.id).then((response) => {
          //console.log(response);
          this.form = response.data;
          this.loading = false;
        });
        this.loading = true;
      }
    },

    //返回
    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
    },

    //导出
    Output() {},

    //文件预览
    filePreview(val) {
      this.fileview = 'about:blank';
      setTimeout(() => {
        this.fileview = process.env.VUE_APP_BASE_API + '/file/preview/' + val;
      }, 200);

      this.dialogTableVisible = true;
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
  computed: {
    //组织或人员
    foreignCertName: function () {
      let foreignCertNames = '';
      for (var i = 0; i < this.form.foreignCert.length; i++) {
        foreignCertNames +=
          this.form.foreignCert[i].userOrDeptName +
          (i + 1 == this.form.foreignCert.length ? '' : '/');
      }
      return foreignCertNames;
    },
  },

  // 使用 watch 监听路由变化，手动更新数据
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name) {
        //this.getInfo();
        //this.refreshView();
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
