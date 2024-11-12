<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['生产管理', '付款记录管理', '付款记录列表', '付款申请详情']" />
        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" class="info" @submit.native.prevent>
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

              <el-form-item label="收 款 类 型" prop="paymentBusinessType">
                <div class="info">
                  <dict-tag
                    :options="dict.type.payment_business0"
                    :value="form.paymentBusinessType"
                  />
                </div>
              </el-form-item>

              <el-form-item label="收 款 方 式" prop="paymentType">
                <div class="info">
                  <dict-tag :options="dict.type.payment_type" :value="form.paymentMethod" />
                </div>
              </el-form-item>

              <el-form-item label="收 款 日 期" prop="paymentDate">
                <div class="info">
                  <!-- <span>{{ commonFun.coverTime(form.contStartDate) }}</span> -->
                  <span>{{ form.paymentTime }}</span>
                </div>
              </el-form-item>

              <el-form-item label="收 款 节 点" prop="nodeId">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.nodeName"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="结算金额 (元)">
                <div class="info">{{ commonFun.amountConversion2(form.settlementAmount) }}</div>
              </el-form-item>

              <el-form-item class="pline" :label="'累计收款\n金额(元)'">
                <div class="info">{{ commonFun.amountConversion2(form.cumulativeAmount) }}</div>
              </el-form-item>
              <el-form-item class="pline" :label="'此次收款\n金额(元)'" prop="currentAmount">
                <div class="info">{{ commonFun.amountConversion2(form.currentAmount) }}</div>
              </el-form-item>

              <el-form-item label="收 款 备 注" class="remark">
                <div class="info">
                  <el-input
                    type="textarea"
                    autosize
                    resize="none"
                    readonly
                    v-model="form.remark"
                  ></el-input>
                </div>
              </el-form-item>
              <el-form-item label="收 款 附 件" class="file">
                <FilePreview :data="form.annexFile" />
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div class="main2">
          <div class="m2top">
            收款方信息
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
              <el-form :model="form" :inline="true" class="info">
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

                <el-form-item label="联 系 人" prop="contacts">
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

        <div class="main2" v-show="false">
          <div class="m2top">
            收款账户
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
            <div class="p0">
              <el-form :inline="true" :model="form" class="info">
                <el-form-item label="开户行账号" prop="oppositeBankAccount">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.oppositeBankAccount"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item label="开户支行">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.oppositeBankName"></InputTip>
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
        </div>

        <ApplyDown ref="ApplyDown" :type="17" />
        <BeforeDown ref="BeforeDown" :type="17" />
      </div>
    </div>
  </div>
</template>

<script>
import { payInfo } from '@/api/data/produce';

export default {
  name: 'PaymentRequestInfo', //付款申请信息
  dicts: ['payment_type', 'payment_business0'],
  data() {
    return {
      maxtbheigth: '300',
      paymentShow: true,
      infoShow: true,
      form: {},
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
        payInfo(this.$route.query.id).then((response) => {
          //console.log(response);
          if (response.data) {
            this.form = response.data;
            //区域数据回显，区别于编辑的时候
            this.commonFun.ShowAreaVal(this.form, response.data);
          }
        });
      }
    },

    //返回
    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
    },

    //申请导出
    exportApply() {
      this.$refs.ApplyDown.downSourceId = this.form.id;
      this.$refs.ApplyDown.downSourceName = '付款附件';
      this.$refs.ApplyDown.show();
    },

    //下载/导出
    Output() {
      if ((this.form.annexFile && this.form.annexFile.length == 0) || this.form.annexFile == null) {
        this.$message.error('没有可导出的附件');
        return;
      }
      this.$refs.BeforeDown.downSourceId = this.form.id;
      this.$refs.BeforeDown.show();
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
@import '@/assets/styles/commonAE.scss';
</style>
