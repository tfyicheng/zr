<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['资产采购管理', '采购合同管理', '采购合同列表', '编辑服务采购合同']" />
        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" ref="form" :rules="ruleData">
              <el-form-item label="合 同 编 号" prop="contNumber">
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

              <el-form-item label="总金额(元)" prop="totalAmount">
                <el-input-number
                  v-model="form.totalAmount"
                  :precision="2"
                  :controls="false"
                  :min="0"
                  placeholder="0.00元"
                  clearable
                >
                </el-input-number>
              </el-form-item>

              <el-form-item label="采 购 部 门" prop="applyDeptId">
                <DeptChoose
                  :data.sync="form.applyDeptId"
                  :backVal="form.deptName"
                  :Multiple="false"
                />
              </el-form-item>

              <el-form-item label="合 同 负 责 人" prop="userId">
                <PersonChoose :data.sync="form.userId" :backVal="form.leader" :Multiple="false" />
              </el-form-item>

              <el-form-item label="签 约 日 期">
                <el-date-picker
                  v-model="form.contStartDate"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  clearable
                ></el-date-picker>
              </el-form-item>

              <!-- <el-form-item label="到 货 日 期" prop="arrivalDate">
                <el-date-picker
                  v-model="form.arrivalDate"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  clearable
                ></el-date-picker>
              </el-form-item> -->

              <el-form-item label="合 同 备 注" class="remark">
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
              <el-form-item label="合 同 附 件" class="file">
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
            供应商
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
                <el-form-item label="供 应 商 全 称" prop="supplierId">
                  <SupChoose
                    :data.sync="form.supplierId"
                    :backVal="form.supplierName"
                    :Multiple="false"
                    @getSup="getSup"
                  />
                  <!-- <el-input
                  v-model="form.ChooseSup"
                  placeholder="点击选择"
                  @click.native="chooseSup"
                  readonly
                >
                  <svg-icon slot="suffix" icon-class="choose" style="cursor: pointer; margin-right: 10px""
                /></el-input> -->
                </el-form-item>

                <el-form-item class="pline" :label="'统 一 社 会\n信 用 代 码'" prop="creditCode">
                  <el-input
                    v-model="form.creditCode"
                    placeholder="请输入内容"
                    :maxlength="commonFun.inputMax"
                    clearable
                  ></el-input>
                </el-form-item>

                <el-form-item label="联 系 人" prop="contacts">
                  <PersonChoose
                    :extra="form.supplierId"
                    :value.sync="form.contacts"
                    :Multiple="false"
                    :type="3"
                    @getPerson="getPerson"
                  />
                </el-form-item>

                <el-form-item label="联 系 号 码" prop="telephone">
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

                <el-form-item label="注 册 区 域">
                  <AddrCascader ref="AddrCascader" :data.sync="form.addrArea" />
                </el-form-item>

                <el-form-item label="注册详细地址">
                  <el-input
                    v-model="form.addr"
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
import { supplierContactsInfo } from '@/api/data/asset';
import { serviceContInfo, serviceContUpdate } from '@/api/data/contract';
export default {
  name: 'ServicePCEdit', //编辑服务采购合同
  data() {
    return {
      form: {
        id: '',
        creditCode: null,
        contName: '', //合同名称
        applyUserId: null, //申请人用户
        applyDeptId: null, //申请人部门ID
        totalAmount: undefined, //总金额
        supplierId: null, //供应商ID
        contacts: '', //联系人
        telephone: '', //联系电话
        email: '', //联系邮箱
        addr: '', //联系地址
        contStartDate: '', //签约日期
        arrivalDate: '', //交货日期
        remark: '', //合同条款
        annexFile: [],
        trades: [],
      },
      infoShow: true,
      paymentShow: true,
      dialogTableVisible: false,
      uid: '', //临时记录节点id
      ChooseOne: '', //当前弹窗目标
      ruleData: {
        contNumber: [{ required: true, message: '合同编号不能为空', trigger: 'blur' }],
        contName: [{ required: true, message: '合同名称不能为空', trigger: 'blur' }],
        totalAmount: [
          { required: true, message: '合同金额不能为空', trigger: 'blur' },
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
        ChooseClient: [{ required: true, message: '请选择客户', trigger: 'change' }],
        ChooseUser: [{ required: true, message: '请选择申请人', trigger: 'change' }],
        ChooseSup: [{ required: true, message: '请选择供应商', trigger: 'change' }],
        contacts: [{ required: true, message: '联系人不能为空', trigger: 'change' }],
        phone: [
          { required: true, message: '请输入号码', trigger: 'change' },
          // {
          //   pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
          //   message: '请输入正确的手机号码',
          //   trigger: 'blur',
          // },
        ],
        annexFile: [{ required: true, message: '附件不能为空', trigger: ['blur', 'change'] }],
        userId: [{ required: true, message: '请选择负责人', trigger: ['blur', 'change'] }],
        contStartDate: [{ required: true, message: '请输入签约日期', trigger: 'blur' }],
        arrivalDate: [{ required: true, message: '请输入到货日期', trigger: 'blur' }],
        materialName: [{ required: true, message: '请选择资产', trigger: 'change' }],
        tradeNum: [{ required: true, message: '请输入数量', trigger: 'blur' }],
        tradePrice: [{ required: true, message: '请输入单价', trigger: 'blur' }],
        supplierId: [{ required: true, message: '请选择供应商', trigger: ['blur', 'change'] }],
        creditCode: [{ required: true, message: '请输入信用代码', trigger: 'blur' }],
        contacts: [{ required: true, message: '联系人不能为空', trigger: ['blur', 'change'] }],
        telephone: [{ required: true, message: '请输入联系号码', trigger: ['blur', 'change'] }],
      },
      flagId: null,
    };
  },

  mounted() {},

  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      if (this.$route.query.id) {
        this.flagId = this.$route.query.id;
        serviceContInfo(this.$route.query.id).then((response) => {
          console.log(response);
          this.form = response.data;
          this.commonFun.backAreaVal(this.form, response.data);
        });
      }
    },

    //获取客户联系人
    getPerson(data) {
      if (data) {
        this.form.contacts = data[0].name;
        this.form.telephone = data[0].phone;
      }
    },

    //获取供应商信息
    getSup(data) {
      this.dialogTableVisible = false;
      if (data && data.length > 0) {
        this.form.supplierName = data[0].supplierName;
        supplierContactsInfo(data[0].supplierId).then((res) => {
          if (res.data) {
            this.form.creditCode = res.data.creditCode;
            this.form.addr = res.data.addr;
            this.commonFun.backAreaVal(this.form, res.data);
            this.$forceUpdate();
          }
        });
      } else {
        this.form.supplierName = null;
        this.$refs.form2.resetFields();
        this.$refs.AddrCascader.clearSel();
      }
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

      if (this.$refs.FileChoose.fileList.length == 0) {
        this.$message.error('附件不能为空');
        return;
      }
      Promise.all([this.validateForm('form'), this.validateForm('form2')]).then((res) => {
        if (res) {
          this.$refs.FileChoose.asyncUpFile().then((res) => {
            if (res) {
              this.commonFun.ConverAreaVal(this.form);
              this.$modal.loading('正在提交，请稍候...');
              serviceContUpdate(this.form)
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

  computed: {},
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
</style>
