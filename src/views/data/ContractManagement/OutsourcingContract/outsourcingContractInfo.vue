<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <!-- <div class="top">
          <svg-icon icon-class="back" style="cursor: hand" @click="goback" />
          合同信息
        </div> -->
        <NavTop :val="['资料管理', '合同管理', '外委合同列表', '查看外委合同']" />

        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" ref="form" class="info" @submit.native.prevent>
              <el-form-item label="合 同 编 号">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.contNumber"></InputTip>
                </div>
              </el-form-item>
              <el-form-item label="合 同 名 称" prop="contName">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.contName"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="项 目 类 型" prop="prjType">
                <div class="info">
                  <dict-tag :options="dict.type.project_type" :value="form.prjType" />
                </div>
              </el-form-item>

              <el-form-item label="签 署 类 型">
                <div class="info">
                  <dict-tag :options="dict.type.cont_type" :value="form.contType" />
                </div>
              </el-form-item>

              <el-form-item label="合同金额（元）" prop="totalAmount">
                <div class="info">{{ commonFun.amountConversion2(form.totalAmount) }}</div>
              </el-form-item>

              <el-form-item label="结算金额（元）" prop="settlementAmount">
                <div class="info">{{ commonFun.amountConversion2(form.settlementAmount) }}</div>
              </el-form-item>

              <el-form-item label="发 票 税 点 (%)" prop="taxPoints">
                <div class="info">
                  {{ form.taxPoints }}
                </div>
              </el-form-item>

              <el-form-item label="参 与 部 门" prop="deptIds">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.deptName"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="其 他 部 门">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.otherDept"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="合同负责人" prop="userId">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.userName"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="关联项目合同" prop="prjContId">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.prjContName"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="签 约 日 期" prop="contStartDate">
                <div class="info">
                  <!-- <span>{{ commonFun.coverTime(form.contStartDate) }}</span> -->
                  <span>{{ form.contStartDate }}</span>
                </div>
              </el-form-item>

              <el-form-item label="合 同 备 注" class="remark">
                <div class="info">
                  <el-input
                    type="textarea"
                    autosize
                    resize="none"
                    readonly
                    v-model="form.contTerm"
                  ></el-input>
                </div>
              </el-form-item>
              <el-form-item label="合 同 附 件" class="file">
                <FilePreview :data="form.annexFile" />
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div class="main2">
          <div class="m2top">
            协作单位
            <div class="m2topm">
              <span v-show="infoShow" @click="infoShow ? (infoShow = false) : (infoShow = true)"
                >收起 <i class="el-icon-caret-top"></i>
              </span>
              <span v-show="!infoShow" @click="infoShow ? (infoShow = false) : (infoShow = true)"
                >展开 <i class="el-icon-caret-bottom"></i>
              </span>
            </div>
          </div>
          <div class="m2main" v-show="infoShow">
            <div class="p0">
              <el-form :model="form" :inline="true" ref="form2" class="info">
                <el-form-item label="客 户 名 称" prop="clientId">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.clientName"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item class="pline" :label="'统 一 社 会\n信 用 代 码'" prop="creditCode">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.creditCode"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item label="项目负责人">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.contacts"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item label="联 系 号 码" prop="telephone">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.telephone"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item label="邮 寄 地 址" class="plast">
                  <div class="info">
                    <InputTip :width="inputTipWidth * 2" :text="form.mailArea"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item label="注 册 地 址" class="plast">
                  <div class="info">
                    <InputTip :width="inputTipWidth * 2" :text="form.addrArea"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item label="开户行账号" prop="bankAccount">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.bankAccount"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item label="开户支行">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.bankName"></InputTip>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>

        <div class="main3">
          <div class="m3main">
            <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="付款节点" name="PaymentNode">
                <PaymentNode :maxtbheigth="maxtbheigth" :id="form.id" ref="PaymentNode" />
              </el-tab-pane>
              <el-tab-pane label="付款记录" name="PaymentRecord">
                <PaymentRecord :maxtbheigth="maxtbheigth" :id="form.id" ref="PaymentRecord" />
              </el-tab-pane>
              <el-tab-pane label="收票记录" name="ReceiptRecord">
                <ReceiptRecord :maxtbheigth="maxtbheigth" :id="form.id" ref="ReceiptRecord" />
              </el-tab-pane>
              <el-tab-pane label="操作记录" name="ChangeRecord">
                <ChangeRecord
                  :maxtbheigth="maxtbheigth"
                  :id="form.id"
                  :type="1"
                  ref="ChangeRecord"
                />
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>

        <div
          class="main2"
          v-for="(c, index) in form.contSupplements"
          :key="index"
          v-show="form.contSupplements && form.contSupplements.length > 0"
        >
          <div class="m2top">
            补充合同{{ index + 1 }}
            <div class="m2topm">
              <span v-show="c.flag" @click="c.flag ? (c.flag = false) : (c.flag = true)"
                >收起 <i class="el-icon-caret-top"></i>
              </span>
              <span v-show="!c.flag" @click="c.flag ? (c.flag = false) : (c.flag = true)"
                >展开 <i class="el-icon-caret-bottom"></i>
              </span>
            </div>
          </div>
          <div class="m2main" v-show="c.flag">
            <div class="p0">
              <el-form :model="c" :inline="true" class="info" @submit.native.prevent>
                <el-form-item label="合 同 编 号">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="c.contNumber"></InputTip>
                  </div>
                </el-form-item>
                <el-form-item label="合 同 名 称" prop="contName">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="c.contName"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item label="签 署 类 型">
                  <div class="info">
                    <dict-tag :options="dict.type.cont_type" :value="c.contType" />
                  </div>
                </el-form-item>

                <el-form-item label="合 同 金 额">
                  <div class="info">{{ commonFun.amountConversion2(c.totalAmount) }}</div>
                </el-form-item>

                <el-form-item label="参 与 部 门">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="c.deptName"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item label="其 他 部 门">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="c.otherDept"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item label="合同负责人" prop="userId">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="c.userName"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item label="签 约 日 期">
                  <div class="info">
                    <!-- <span>{{ commonFun.coverTime(form.contStartDate) }}</span> -->
                    <span>{{ c.contStartDate }}</span>
                  </div>
                </el-form-item>
                <el-form-item label="合 同 备 注" class="remark">
                  <div class="info">
                    <el-input
                      type="textarea"
                      autosize
                      resize="none"
                      readonly
                      v-model="c.remark"
                    ></el-input>
                  </div>
                </el-form-item>
                <el-form-item label="合 同 附 件" class="file" prop="fileIds">
                  <div class="info">
                    <FilePreview :data="c.fileIds" />
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" v-show="!form.canDown" @click="exportApply">申请导出</el-button>
          <el-button type="warning" v-show="form.canDown" @click="Output">导出</el-button>
          <el-button
            type="danger"
            v-hasPermi="['contract:outsourcing:termination']"
            @click="TerminatedT"
            >中止</el-button
          >
          <el-button type="primary" v-hasPermi="['contract:outsourcing:edit']" @click="handleEdit"
            >编辑</el-button
          >
        </div>

        <ApplyDown
          ref="ApplyDown"
          :downSourceName="form.contName"
          :downSourceId="form.id"
          :type="4"
        />

        <ApprovalDialog ref="Approval" :type="1" />
        <BeforeDown ref="BeforeDown" :type="4" />
      </div>
    </div>
  </div>
</template>

<script>
import ApprovalDialog from '@/views/components/dialog/approvalDialog';
import { ocontExport } from '@/api/data/file';
import ApplyDown from '@/views/components/dialog/applyDown';
import ReceiptRecord from '@/views/components/table/receiptRecord';
import PaymentNode from '@/views/components/table/paymentNode';
import PaymentRecord from '@/views/components/table/paymentRecord';
import ChangeRecord from '@/views/components/table/changeRecord';
import { outContInfo } from '@/api/data/contract';
export default {
  name: 'OutsourcingContractInfo', //合同信息详情
  components: {
    ReceiptRecord,
    PaymentNode,
    PaymentRecord,
    ApplyDown,
    ApprovalDialog,
    ChangeRecord,
  },
  dicts: [
    'cont_type',
    'project_scale',
    'project_type',
    'project_src',
    'engineering_level',
    'engineering_level0',
  ],
  data() {
    return {
      maxtbheigth: '300',
      form: {
        prjContId: null,
        telephone: null,
        addrArea: [], //注册
        mailArea: [], //邮寄
        prjArea: [], //项目
        addr: '',
        clientId: null,
        contType: null,
        contName: '',
        contStartDate: '',
        contTerm: '',
        contacts: '',
        email: '',
        phone: '',
        deptId: null,
        prjNumber: null,
        totalAmount: undefined,
        userId: null,
        annexFile: null, //置null 初始化[]导致回显失败原因未知
        paymentNodes: [],
      },
      paymentShow: true,
      infoShow: true,
      dialogTableVisible: false,
      inputTipWidth: this.commonFun.inputTipWidth,
      fileview: '', //文件预览地址
      activeName: 'PaymentNode',
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
        outContInfo(this.$route.query.id).then((response) => {
          //console.log(response);
          this.form = response.data;
          //区域数据回传
          this.commonFun.ShowAreaVal(this.form, response.data);
          this.handleClick();
          //补充合同回显处理
          this.form.contSupplements = response.data.contSupplements.map((c) => {
            return { ...c, flag: true };
          });
        });
      }
    },

    handleClick(val) {
      switch (this.activeName) {
        case 'PaymentNode':
          this.$refs.PaymentNode.getList(this.$route.query.id);
          break;
        case 'PaymentRecord':
          this.$refs.PaymentRecord.getList(this.$route.query.id);
          break;
        case 'ReceiptRecord':
          this.$refs.ReceiptRecord.getList(this.$route.query.id);
          break;
        case 'ChangeRecord':
          this.$refs.ChangeRecord.getList(this.$route.query.id);
          break;
        default:
          break;
      }
    },

    //中止
    TerminatedT() {
      this.$refs.Approval.show();
      this.$refs.Approval.sourceId = this.form.id;
    },

    //编辑
    handleEdit() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.push({ path: '/data-d/outsourcingContractEdit', query: { id: this.form.id } });
    },

    //申请导出
    exportApply() {
      this.$refs.ApplyDown.show();
    },

    //下载/导出
    Output() {
      if ((this.form.annexFile && this.form.annexFile.length == 0) || this.form.annexFile == null) {
        this.$message.error('没有可导出的附件');
        return;
      }
      //  ocontExport(this.form.id);
      this.$refs.BeforeDown.downSourceId = this.form.id;
      this.$refs.BeforeDown.show();
    },

    //返回
    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
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
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name && this.flagId != this.$route.query.id) {
        //this.getInfo();
        //this.refreshView();
        this.$tab.refreshPage();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/commonAE.scss';
</style>
