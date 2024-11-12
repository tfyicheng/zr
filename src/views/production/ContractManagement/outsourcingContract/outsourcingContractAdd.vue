<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <!-- <div class="top">
          <svg-icon icon-class="back" style="cursor: hand" @click="goback" />
          合同信息
        </div> -->

        <NavTop :val="['生产管理', '外委合同管理', '外委合同列表 ', '添加外委合同']" />
        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" ref="form" :rules="ruleData">
              <el-form-item label="合 同 编 号">
                <el-input
                  v-model="form.contNumber"
                  placeholder="请输入"
                  :maxlength="commonFun.inputMax"
                  clearable
                />
              </el-form-item>
              <el-form-item label="合 同 名 称" prop="contName">
                <el-input
                  v-model="form.contName"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                />
              </el-form-item>

              <el-form-item label="项 目 类 型" prop="prjType">
                <el-select v-model="form.prjType" placeholder="点击选择" clearable>
                  <el-option
                    v-for="item in dict.type.project_type"
                    :key="item.value"
                    :label="item.label"
                    :value="Number(item.value)"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="签 署 类 型">
                <el-select v-model="form.contType" placeholder="点击选择" clearable>
                  <el-option
                    v-for="item in dict.type.cont_type"
                    :key="item.value"
                    :label="item.label"
                    :value="Number(item.value)"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="合同金额（元）" prop="totalAmount">
                <el-input-number
                  v-model="form.totalAmount"
                  :precision="2"
                  :controls="false"
                  :min="0"
                  placeholder="0.00元"
                >
                </el-input-number>
              </el-form-item>

              <el-form-item label="结算金额（元）" prop="settlementAmount">
                <el-input-number
                  v-model="form.settlementAmount"
                  :precision="2"
                  :controls="false"
                  :min="0"
                  placeholder="0.00元"
                >
                </el-input-number>
              </el-form-item>

              <el-form-item label="发 票 税 点 (%)" prop="taxPoints">
                <el-input-number
                  v-model="form.taxPoints"
                  :precision="2"
                  :controls="false"
                  :min="0"
                  :max="100"
                  placeholder="请输入（%）"
                >
                </el-input-number>
              </el-form-item>

              <el-form-item label="参 与 部 门" prop="deptIds">
                <DeptChoose :data.sync="form.deptIds" />
              </el-form-item>

              <el-form-item label="其 他 部 门">
                <el-input
                  v-model="form.otherDept"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                />
              </el-form-item>

              <el-form-item label="合同负责人" prop="userId">
                <PersonChoose :data.sync="form.userId" :Multiple="false" />
              </el-form-item>

              <el-form-item label="关联项目合同" prop="prjContIds">
                <!-- <ProjChoose :data.sync="form.prjContIds" :Multiple="false" /> -->
                <ContChoose :data.sync="form.prjContIds" :type="0" />
              </el-form-item>

              <el-form-item label="签 约 日 期" prop="contStartDate">
                <el-date-picker
                  v-model="form.contStartDate"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>

              <el-form-item label="合 同 备 注" class="remark">
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="form.contTerm"
                  maxlength="500"
                  show-word-limit
                  resize="none"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="合 同 附 件" class="file">
                <FileChoose ref="FileChoose" :value.sync="form.annexFile" :autoUpload="false" />
                <span style="float: right; position: relative; right: 150px; color: #999999"
                  >*必须上传营业执照及银行开户许可证或基本存款账户信息</span
                >
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
              <el-form :model="form" :inline="true" ref="form2" :rules="ruleData">
                <el-form-item label="客 户 名 称">
                  <ClieChoose
                    :data.sync="form.clientId"
                    :Multiple="false"
                    @getClie="getClie"
                    :backVal="form.clientName"
                    :type="2"
                    :value.sync="form.clientName"
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

                <el-form-item label="项目负责人">
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

        <div class="main2">
          <div class="m2top">
            付款节点
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
                    <el-input v-model="c.nodeName" placeholder="请输入"></el-input>
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
                  <svg-icon icon-class="delete" style="cursor: hand" @click="delpm(c)" />
                </div>
              </div>
            </el-form>

            <div>
              <el-button type="primary" @click="addPayments">添加节点</el-button>
            </div>
          </div>
        </div>

        <div
          class="main2"
          v-for="(c, index) in form.contSupplements"
          :key="c.uid"
          v-show="form.contSupplements && form.contSupplements.length > 0"
        >
          <div class="m2top">
            补充合同{{ index + 1 }}
            <span
              style="
                color: red;
                cursor: pointer;
                font-size: 15px;
                line-height: 15px;
                margin-left: 10px;
              "
              @click="delc(c.uid)"
              >删除</span
            >
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
              <el-form :model="c" :inline="true" :ref="`refCont${index}`" :rules="ruleData">
                <el-form-item label="合 同 编 号">
                  <el-input
                    v-model="c.contNumber"
                    placeholder="请输入"
                    :maxlength="commonFun.inputMax"
                    clearable
                  />
                </el-form-item>
                <el-form-item label="合 同 名 称" prop="contName">
                  <el-input
                    v-model="c.contName"
                    placeholder="请输入内容"
                    :maxlength="commonFun.inputMax"
                    clearable
                  />
                </el-form-item>

                <el-form-item label="签 署 类 型">
                  <el-select v-model="c.prjType" placeholder="点击选择">
                    <el-option
                      v-for="item in dict.type.project_type"
                      :key="item.value"
                      :label="item.label"
                      :value="Number(item.value)"
                      clearable
                    >
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="合同金额（元）">
                  <el-input-number
                    v-model="c.totalAmount"
                    :precision="2"
                    :controls="false"
                    :min="0"
                    placeholder="0.00元"
                    clearable
                  >
                  </el-input-number>
                </el-form-item>
                <el-form-item label="参 与 部 门">
                  <DeptChoose :data.sync="c.deptId" />
                </el-form-item>

                <el-form-item label="其 他 部 门">
                  <el-input
                    v-model="c.otherDept"
                    placeholder="请输入内容"
                    :maxlength="commonFun.inputMax"
                    clearable
                  />
                </el-form-item>

                <el-form-item label="合同负责人" prop="userId">
                  <PersonChoose :data.sync="c.userId" :Multiple="false" />
                </el-form-item>

                <el-form-item label="签 约 日 期">
                  <el-date-picker
                    v-model="c.contStartDate"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    clearable
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="合 同 备 注" class="remark">
                  <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="c.remark"
                    maxlength="500"
                    show-word-limit
                    resize="none"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item label="合 同 附 件" class="file">
                  <FileChoose :ref="c.uid + ''" :autoUpload="false" :value.sync="c.fileIds" />
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" style="width: auto" @click="addCont">添加补充合同</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>

        <el-dialog :visible.sync="dialogTableVisible">
          <PersonList v-show="this.ChooseOne == 'pList'" :Multiple="false" ref="pList" />
          <DeptList v-show="this.ChooseOne == 'dList'" ref="dList" />
          <ProjList v-show="this.ChooseOne == 'jList'" :Multiple="false" ref="jList" />
          <ClieList v-show="this.ChooseOne == 'cList'" :Multiple="false" ref="cList" />
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import PersonList from '@/views/components/dialog/personlist';
import DeptList from '@/views/components/dialog/deptlist';
import ProjList from '@/views/components/dialog/projList';
import ClieList from '@/views/components/dialog/clieList';
import { outContAdd } from '@/api/data/contract';
import { custInfo } from '@/api/data/customer';
export default {
  name: 'OutsourcingContractAdd', //添加外委合同
  dicts: [
    'cont_type',
    'project_scale',
    'project_type',
    'project_src',
    'engineering_level',
    'engineering_level0',
  ],
  components: { PersonList, DeptList, ProjList, ClieList },
  data() {
    return {
      form: {
        prjContIds: null,
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
        annexFile: [],
        paymentNodes: [],
        contSupplements: [],
      },
      paymentShow: true,
      infoShow: true,
      dialogTableVisible: false,
      ChooseOne: '',
      ruleData: {
        fileIds: [{ required: true, message: '附件不能为空', trigger: 'blur' }],
        annexFile: [{ required: true, message: '附件不能为空', trigger: 'blur' }],
        contNumber: [{ required: true, message: '合同编号不能为空', trigger: 'blur' }],
        contName: [{ required: true, message: '合同名称不能为空', trigger: 'blur' }],
        contType: [{ required: true, message: '请选择合同类型', trigger: 'change' }],
        totalAmount: [
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
        ChooseDept: [{ required: true, message: '请选择部门', trigger: 'change' }],
        clientId: [{ required: true, message: '请选择客户', trigger: ['blur', 'change'] }],
        userId: [{ required: true, message: '请选择合同负责人', trigger: ['blur', 'change'] }],
        ChoosePri: [{ required: true, message: '请选择项目名称', trigger: 'change' }],
        phone: [
          { required: true, message: '请输入号码', trigger: 'blur' },
          // {
          //   pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
          //   message: '请输入正确的手机号码',
          //   trigger: 'blur',
          // },
        ],
        contStartDate: [{ required: true, message: '请输入签约日期', trigger: 'blur' }],
        period: [{ required: true, message: '请输入期次', trigger: 'blur' }],
        nodeName: [{ required: true, message: '请输入节点名称', trigger: 'blur' }],
        ratio: [{ required: true, message: '请输入比例', trigger: 'blur' }],
        addrArea: [{ required: true, message: '区域不能为空', trigger: ['blur', 'change'] }],
        prjArea: [{ required: true, message: '区域不能为空', trigger: ['blur', 'change'] }],
        prjScale: [{ required: true, message: '项目规模不能为空', trigger: 'change' }],
        prjSrc: [{ required: true, message: '项目来源不能为空', trigger: 'change' }],
        prjType: [{ required: true, message: '项目类型不能为空', trigger: 'change' }],
        creditCode: [{ required: true, message: '请输入信用代码', trigger: 'blur' }],
        contacts: [{ required: true, message: '负责人不能为空', trigger: ['blur', 'change'] }],
        telephone: [{ required: true, message: '请输入联系号码', trigger: ['blur', 'change'] }],
        bankAccount: [{ required: true, message: '请输入开户行账号', trigger: 'blur' }],
        prjContIds: [
          { required: true, message: '关联项目合同不能为空', trigger: ['blur', 'change'] },
        ],
        amount: [{ required: true, message: '请输入金额', trigger: 'blur' }],
      },
    };
  },

  mounted() {
    this.$refs.uList.$on('upload', this.getUlist);
  },

  created() {},
  methods: {
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
        this.form.bankAccount = response.data.bankAccount;
        this.form.bankName = response.data.bankName;
        this.form.creditCode = response.data.creditCode;
        this.form.addr = response.data.addr;
        this.form.mailAddr = response.data.mailAddr;
        let { areaProvince, ...rdata } = response.data;
        this.commonFun.backAreaVal(this.form, rdata);
      });
    },

    //关闭选择弹窗
    closeChoose() {
      this.dialogTableVisible = false;
    },

    //返回
    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
    },

    //添加收款节点
    addPayments() {
      var nv = {};
      this.form.paymentNodes.push(nv);
    },
    //删除收款节点
    delpm(c) {
      this.form.paymentNodes.splice(
        this.form.paymentNodes.findIndex(
          (item) =>
            item.period === c.period && item.nodeName === c.nodeName && item.ratio === c.ratio,
        ),
        1,
      );
    },

    //检查上传附件
    checkContUp() {
      for (let index = 0; index < this.form.contSupplements.length; index++) {
        const c = this.form.contSupplements[index];
        if (this.$refs[c.uid][0].fileList.length == 0) {
          this.$message.error('补充合同 ' + (index + 1) + ' 的附件不能为空');
          return false;
        }
      }
      return true;
    },

    //添加合同
    addCont() {
      var nv = {
        uid: Math.floor(Math.random() * 100) + 1, //临时随机id
        flag: true,
        fileIds: null,
      };
      this.form.contSupplements.push(nv);
    },

    //删除合同
    delc(uid) {
      this.form.contSupplements.splice(
        this.form.contSupplements.findIndex((item) => item.uid === uid),
        1,
      );
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
      console.log(this.form);

      if (this.form.paymentNodes.length == 0) {
        this.$message.error('付款节点不能为空');
        return;
      }

      if (this.$refs.FileChoose.fileList.length == 0) {
        this.$message.error('附件不能为空');
        return;
      }

      Promise.all([
        this.validateForm('form'),
        ...this.form.paymentNodes.map((item, index) => this.validateForm(`refForm${index}`)),
        ...this.form.contSupplements.map((item, index) => this.validateForm(`refCont${index}`)),
      ]).then((res) => {
        if (res) {
          Promise.all([
            this.$refs.FileChoose.asyncUpFile(),
            ...this.form.contSupplements.map((item, index) =>
              this.$refs[item.uid][0].asyncUpFile(),
            ),
          ]).then((res) => {
            if (res) {
              this.commonFun.ConverAreaVal(this.form);
              this.$modal.loading('正在提交，请稍候...');
              outContAdd(this.form)
                .then((res) => {
                  console.log(res);
                  this.$modal.closeLoading();
                  if (res.code == 200) {
                    this.$message.success('添加成功');
                    this.$store.dispatch('tagsView/delView', this.$route);
                    this.$router.go(-1);
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
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/commonAE.scss';
</style>
