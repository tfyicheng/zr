<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['生产管理', '收款记录管理', '收款记录列表', '添加收款记录']" />

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
                  :type="0"
                  @getCont="getCont"
                />
              </el-form-item>

              <el-form-item label="收 款 类 型" prop="paymentBusinessType">
                <el-select v-model="form.paymentBusinessType" placeholder="点击选择" clearable>
                  <el-option
                    v-for="item in dict.type.payment_business1"
                    :key="item.value"
                    :label="item.label"
                    :value="Number(item.value)"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="收 款 方 式">
                <el-select v-model="form.paymentMethod" placeholder="点击选择" clearable>
                  <el-option
                    v-for="item in dict.type.payment_type"
                    :key="item.value"
                    :label="item.label"
                    :value="Number(item.value)"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="收 款 日 期" prop="paymentTime">
                <el-date-picker
                  v-model="form.paymentTime"
                  type="datetime"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  clearable
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="收 款 节 点">
                <el-select
                  v-model="form.nodeId"
                  placeholder="点击选择"
                  @change="SelectNode"
                  clearable
                >
                  <el-option
                    v-for="item in payNodes"
                    :key="item.id"
                    :label="item.nodeName"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
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

              <el-form-item class="pline" :label="'累计收款\n金额(元)'">
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
              <el-form-item class="pline" :label="'此次收款\n金额(元)'" prop="currentAmount">
                <el-input-number
                  v-model="form.currentAmount"
                  :precision="2"
                  :controls="false"
                  :min="0"
                  placeholder="0.00元"
                >
                </el-input-number>
              </el-form-item>

              <el-form-item label="收 款 备 注" class="remark">
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="form.remark"
                  maxlength="500"
                  show-word-limit
                  resize="none"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="收 款 附 件" class="file">
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
            付款方信息
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
              <el-form :inline="true" :model="form" ref="form3" :rules="ruleData">
                <el-form-item label="开户行账号">
                  <el-input
                    v-model="form.oppositeBankAccount"
                    placeholder="请输入内容"
                    :maxlength="commonFun.inputMax"
                    clearable
                  ></el-input>
                </el-form-item>

                <el-form-item label="开户支行">
                  <el-input
                    v-model="form.oppositeBankName"
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
import { projectContInfo, paymentNodeList } from '@/api/data/contract';
import { proPayMentNodeList, payNodeAmount, proPayNodeList } from '@/api/data/project';
import { receiptsAdd, receiptsAmount } from '@/api/data/produce';
import { custInfo } from '@/api/data/customer';
export default {
  name: 'IncomeRecordAdd', //添加收款记录
  dicts: ['payment_type', 'payment_business1'],
  components: { PersonList, ClieList, ContList },
  data() {
    return {
      form: {
        contName: '',

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
      payNodes: [], //节点
      ruleData: {
        contName: [{ required: true, message: '合同名称不能为空', trigger: 'change' }],
        paymentMethod: [{ required: true, message: '请选择收款方式', trigger: 'change' }],
        paymentBusinessType: [{ required: true, message: '请选择类型', trigger: 'change' }],
        paymentTime: [{ required: true, message: '请选择收款日期', trigger: 'blur' }],
        nodeId: [{ required: true, message: '请选择收款节点', trigger: 'change' }],
        userName: [{ required: true, message: '请选择经办人', trigger: 'change' }],
        clientName: [{ required: true, message: '请选择付款方', trigger: 'change' }],
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
        oppositeAccount: [{ required: true, message: '收款账户不能为空', trigger: 'blur' }],
        openingBankName: [{ required: true, message: '开户行不能为空', trigger: 'blur' }],
        openingBankAddr: [{ required: true, message: '开户行地址不能为空', trigger: 'blur' }],
        oppositeBankAccount: [{ required: true, message: '请输入开户行账号', trigger: 'blur' }],
        clientId: [{ required: true, message: '请选择客户', trigger: ['blur', 'change'] }],
        creditCode: [{ required: true, message: '请输入信用代码', trigger: 'blur' }],
        contacts: [{ required: true, message: '联系人不能为空', trigger: ['blur', 'change'] }],
        telephone: [{ required: true, message: '请输入联系号码', trigger: ['blur', 'change'] }],
        bankAccount: [{ required: true, message: '请输入开户行账号', trigger: 'blur' }],
      },
    };
  },

  mounted() {},

  created() {},
  methods: {
    //根据选择的合同id获取合同信息
    getInfo(id) {
      if (id) {
        projectContInfo(id).then((response) => {
          console.log(response.data);
          if (response.data) {
            //  this.form = response.data;合同附件不带过来
            //结构对象排除某些字段
            let { annexFile, ...profileData } = response.data;
            this.form = profileData;
            //区域数据回传
            this.commonFun.backAreaVal(this.form, response.data);
            receiptsAmount(response.data.id).then((response) => {
              if (response.data) {
                this.form.cumulativeAmount = response.data;
                this.$forceUpdate();
              }
            });
          }
        });
      }
    },

    //根据选择的合同id获取节点信息
    getNodes(id) {
      if (id) {
        //proPayMentNodeList(0, id).then((response) => {
        // proPayNodeList(0, id).then((response) => {
        paymentNodeList(id).then((response) => {
          console.log(response); //添加收付款节点只能是状态1，2 参考字典可收款类型
          this.payNodes = response.data.paymentNodes.filter(
            (item) => item.status == 1 || item.status == 2,
          );
        });
      }
    },

    //根据选择的合同id获取累计总金额
    getTotalAmount(id, prjNumber) {
      receiptsAmount({ contId: id }).then((response) => {
        this.form.totalAmount = response.data;
      });
    },

    //根据选择的节点id获取总金额
    SelectNode() {
      // if (this.form.nodeId) {
      //   payNodeAmount(this.form.nodeId).then((response) => {
      //     if (response.data) {
      //       this.form.totalAmount = response.data.totalAmount;
      //       this.form.cumulativeAmount = response.data.cumulativeAmount;
      //     }
      //   });
      // }
    },

    getCont(data) {
      //this.$refs.contList.clearSel();
      // this.dialogTableVisible = false;
      if (data && data.length > 0) {
        this.form.contName = data[0].contName;
        this.form.id = data[0].id;
        this.getInfo(data[0].id);
        this.getNodes(data[0].id);
        //累计金额不能用合同信息带来的要根据节点id查获得
        // setTimeout(() => {
        //   this.form.totalAmount = 0;
        // }, 500);
        //  this.getTotalAmount(data[0].id, data[0].prjNumber);
      } else {
        this.form.contName = null;
        this.form.contNumber = null;
        this.form.settlementAmount = 0; //结算金额取自合同
        this.form.cumulativeAmount = 0; //累计合同取接口实时计算
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
        //  this.form.addr = data[0].addr;
        //  this.form.mailAddr = data[0].mailAddr;
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
      this.form.files = data;
    },

    //返回
    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
    },

    validateForm(refs) {
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
      this.form.contId = this.form.id;
      console.log(this.form);
      Promise.all([
        this.validateForm('form'),
        this.validateForm('form2'),
        this.validateForm('form3'),
      ]).then((res) => {
        if (res) {
          this.$refs.FileChoose.asyncUpFile().then((res) => {
            if (res) {
              this.commonFun.ConverAreaVal(this.form);
              this.$modal.loading('正在提交，请稍候...');
              receiptsAdd(this.form)
                .then((res) => {
                  console.log(res);
                  this.$modal.closeLoading();
                  if (res.code == 200) {
                    this.$message.success('添加成功');
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
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/commonAE.scss';
</style>
