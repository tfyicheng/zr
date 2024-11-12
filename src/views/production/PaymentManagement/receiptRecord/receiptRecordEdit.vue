<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['生产管理', '收票记录管理', '收票记录列表', '编辑收票记录']" />
        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" ref="form" :rules="ruleData">
              <el-form-item label="合 同 编 号">
                <el-input
                  v-model="form.contNumber"
                  placeholder="系统填写"
                  :disabled="true"
                ></el-input>
              </el-form-item>

              <el-form-item label="合 同 名 称">
                <ContChoose
                  :data.sync="form.clientId"
                  :backVal="form.contName"
                  :Multiple="false"
                  :type="1"
                  @getCont="getCont"
                />
              </el-form-item>

              <el-form-item label="票 据 类 型">
                <el-select v-model="form.billType" placeholder="点击选择" clearable>
                  <el-option
                    v-for="item in dict.type.invoice_type"
                    :key="item.value"
                    :label="item.label"
                    :value="Number(item.value)"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="发 票 编 号">
                <el-input
                  v-model="form.invoiceNumber"
                  placeholder="请输入"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="收 票 日 期" prop="invoicingDate">
                <el-date-picker
                  v-model="form.invoicingDate"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  clearable
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="结算金额 (元)">
                <el-input-number
                  v-model="form.settlementAmount"
                  :precision="2"
                  :controls="false"
                  :min="0"
                  placeholder="0.00元"
                  disabled
                >
                </el-input-number>
              </el-form-item>

              <el-form-item class="pline" :label="'累计收票\n金额(元)'">
                <el-input-number
                  v-model="form.cumulativeAmount"
                  :precision="2"
                  :controls="false"
                  :min="0"
                  placeholder="0.00元"
                  disabled
                >
                </el-input-number>
              </el-form-item>

              <el-form-item class="pline" :label="'此次收票\n金额(元)'" prop="currentAmount">
                <el-input-number
                  v-model="form.currentAmount"
                  :precision="2"
                  :controls="false"
                  :min="0"
                  placeholder="0.00元"
                >
                </el-input-number>
              </el-form-item>

              <el-form-item label="收 票 备 注" class="remark">
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="form.invoiceRemark"
                  maxlength="500"
                  show-word-limit
                  resize="none"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="收 票 附 件" class="file">
                <FileChoose
                  ref="FileChoose"
                  :value.sync="form.annexFile"
                  :extra="1"
                  :autoUpload="false"
                />
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div class="main2">
          <div class="m2top">
            客户信息
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
              <el-form :model="form" :inline="true" ref="form2" :rules="ruleData">
                <el-form-item label="客 户 名 称">
                  <ClieChoose
                    :data.sync="form.clientId"
                    :Multiple="false"
                    :backVal="form.clientName"
                    @getClie="getClie"
                  />
                </el-form-item>

                <el-form-item class="pline" :label="'统 一 社 会\n信 用 代 码'">
                  <el-input
                    v-model="form.creditCode"
                    placeholder="请输入内容"
                    :maxlength="commonFun.inputMax"
                    clearable
                  ></el-input>
                </el-form-item>

                <el-form-item label="联 系 人">
                  <PersonChoose
                    :extra="form.clientId"
                    :value.sync="form.contacts"
                    :Multiple="false"
                    :type="2"
                    @getPerson="getPerson"
                  />
                </el-form-item>

                <el-form-item label="联 系 号 码">
                  <el-input
                    v-model="form.telephone"
                    @input="$forceUpdate()"
                    @blur="(e) => (form.telephone = e.target.value)"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    placeholder="请输入内容"
                    :maxlength="commonFun.inputMax"
                    clearable
                  ></el-input>
                </el-form-item>

                <el-form-item label="邮 寄 区 域">
                  <AddrCascader :data.sync="form.mailArea" />
                </el-form-item>

                <el-form-item label="邮寄详细地址">
                  <el-input
                    v-model="form.mailAddr"
                    placeholder="请输入内容"
                    :maxlength="commonFun.inputMax"
                    clearable
                  ></el-input>
                </el-form-item>

                <el-form-item label="注 册 区 域">
                  <AddrCascader :data.sync="form.addrArea" />
                </el-form-item>

                <el-form-item label="注册详细地址">
                  <el-input
                    v-model="form.addr"
                    placeholder="请输入内容"
                    :maxlength="commonFun.inputMax"
                    clearable
                  ></el-input>
                </el-form-item>

                <el-form-item label="开户行账号">
                  <el-input
                    v-model="form.bankAccount"
                    placeholder="请输入内容"
                    :maxlength="commonFun.inputMax"
                    clearable
                  ></el-input>
                </el-form-item>

                <el-form-item label="开户支行">
                  <el-input
                    v-model="form.bankName"
                    placeholder="请输入内容"
                    :maxlength="commonFun.inputMax"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PersonList from '@/views/components/dialog/personlist';
import ClieList from '@/views/components/dialog/clieList';
import ContList from '@/views/components/dialog/contList';
import { outContInfo } from '@/api/data/contract';
import { ticketCEdit, ticketCInfo } from '@/api/data/produce';
import { ticketCAmount } from '@/api/data/produce';
import { custInfo } from '@/api/data/customer';
export default {
  name: 'ReceiptRecordEdit', //编辑收票记录
  dicts: ['invoice_type'],
  components: { PersonList, ClieList, ContList },
  data() {
    return {
      form: {
        contName: null,
        contacts: null,
        telephone: null,
        creditCode: null,
        addr: null,
        mailAddr: null,
        bankAccount: null,
        bankName: null,
      },
      paymentShow: true,
      infoShow: true,
      // dialogTableVisible: false,
      ChooseOne: '', //当前弹窗目标
      flagId: null,
      ruleData: {
        contName: [{ required: true, message: '合同名称不能为空', trigger: 'change' }],
        billType: [{ required: true, message: '请选择票据类型', trigger: 'change' }],
        invoiceNumber: [{ required: true, message: '发票编号不能为空', trigger: 'blur' }],
        payee: [{ required: true, message: '收款方不能为空', trigger: 'blur' }],
        invoicingDate: [{ required: true, message: '请选择收票日期', trigger: 'blur' }],
        userName: [{ required: true, message: '请选择收票记录人', trigger: 'change' }],
        contacts: [{ required: true, message: '联系人不能为空', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入号码', trigger: 'blur' },
          // {
          //   pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
          //   message: '请输入正确的手机号码',
          //   trigger: 'blur',
          // },
        ],
        currentAmount: [
          { required: true, message: '金额不能为空', trigger: 'blur' },
          {
            validator: function (rule, value, callback) {
              if (value) {
                callback();
              } else {
                let tip = '';

                if (value * 1 === 0) {
                  tip = '金额应大于0';
                }

                if (tip) {
                  callback(new Error(tip));
                } else {
                  callback();
                }
              }
            },
            trigger: ['blur', 'change'],
          },
        ],
        clientId: [{ required: true, message: '请选择客户', trigger: ['blur', 'change'] }],
        creditCode: [{ required: true, message: '请输入信用代码', trigger: 'blur' }],
        contacts: [{ required: true, message: '联系人不能为空', trigger: ['blur', 'change'] }],
        telephone: [{ required: true, message: '请输入联系号码', trigger: ['blur', 'change'] }],
        bankAccount: [{ required: true, message: '请输入开户行账号', trigger: 'blur' }],
      },
    };
  },

  mounted() {},

  created() {
    this.getData();
  },
  methods: {
    getData() {
      if (this.$route.query.id) {
        this.flagId = this.$route.query.id;
        ticketCInfo(this.$route.query.id).then((response) => {
          console.log(response);
          this.form = response.data;
        });
      }
    },
    //根据选择的合同id获取合同信息
    getInfo(id) {
      if (id) {
        outContInfo(id).then((response) => {
          console.log(response);
          if (response.data) {
            //  this.form = response.data;合同附件不带过来
            //结构对象排除某些字段
            let { annexFile, ...profileData } = response.data;
            this.form = profileData;
            this.form.contId = response.data.id;
            //区域数据回传
            this.commonFun.backAreaVal(this.form, response.data);
          }
        });
      }
    },

    //根据选择的合同id获取累计总金额
    getTotalAmount(id, prjNumber) {
      ticketCAmount({ contId: id }).then((response) => {
        this.form.cumulativeAmount = response.data;
        this.$forceUpdate();
      });
    },

    // 选择合同一般会带有对应项目id等信息，联系人等其他信息可根据合同id查询详情获得
    getCont(data) {
      //this.$refs.contList.clearSel();
      // this.dialogTableVisible = false;
      if (data && data.length > 0) {
        this.form.contName = data[0].contName;
        this.form.contId = data[0].id;
        this.getInfo(data[0].id);
        setTimeout(() => {
          this.getTotalAmount(data[0].id, data[0].contNumber);
        }, 500);
      } else {
        this.form.contId = null;
        this.form.contName = null;
        this.form.contNumber = null;
        this.form.settlementAmount = 0;
        this.form.cumulativeAmount = 0;
      }
    },
    //获取客户联系人
    getPerson(data) {
      if (data) {
        this.form.contacts = data[0].name;
        this.form.telephone = data[0].phone;
      }
    },

    //获取选择的客户信息
    getClie(data) {
      if (data && data.length > 0) {
        this.form.clientName = data[0].name;
        // this.form.addr = data[0].addr;
        // this.form.mailAddr = data[0].mailAddr;
        this.getClieInfo(data[0].id);
      } else {
        this.form.clientName = null;
        this.form.addr = null;
        this.form.mailAddr = null;
      }
    },

    //获取客户详细信息
    getClieInfo(id) {
      custInfo(id).then((response) => {
        this.form.creditCode = response.data.creditCode;
        this.form.addr = response.data.addr;
        this.form.mailAddr = response.data.mailAddr;
        this.form.bankAccount = response.data.bankAccount;
        this.form.bankName = response.data.bankName;
        if (response.data.mailAreaProvince != null) {
          this.form.mailArea = [
            'backVal',
            response.data.mailAreaProvince,
            response.data.mailAreaCity,
            response.data.mailAreaRegion,
          ];
        }
        if (response.data.addrAreaProvince != null) {
          this.form.addrArea = [
            'backVal',
            response.data.addrAreaProvince,
            response.data.addrAreaCity,
            response.data.addrAreaRegion,
          ];
        }
      });
    },

    // 获取上传的文件
    getUlist(data) {
      console.log(data);
      this.form.annexFile = data;
    },

    //返回
    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
    },

    validateForm(refs) {
      //console.log(refs);
      let valiForm = this.$refs?.[refs].validate ? this.$refs?.[refs] : this.$refs?.[refs][0];
      return new Promise((resolve, reject) => {
        valiForm.validate((res) => {
          if (res) resolve();
          else reject();
        });
      });
    },

    // 保存
    save() {
      console.log(this.form);
      Promise.all([this.validateForm('form'), this.validateForm('form2')]).then((res) => {
        if (res) {
          this.$refs.FileChoose.asyncUpFile().then((res) => {
            if (res) {
              this.commonFun.ConverAreaVal(this.form);
              this.$modal.loading('正在提交，请稍候...');
              ticketCEdit(this.form)
                .then((res) => {
                  console.log(res);
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
        }
      });
    },
  },
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name && this.flagId != this.$route.query.id) {
        this.$tab.refreshPage();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/commonAE.scss';
</style>
