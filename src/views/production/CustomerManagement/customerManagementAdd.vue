<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['生产管理', '客户管理', '客户列表', '添加客户信息']" />

        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" ref="form" :rules="ruleData">
              <el-form-item label="单 位 名 称" prop="name">
                <el-input
                  v-model="form.name"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item class="pline" :label="'统 一 社 会\n信 用 代 码'" prop="creditCode">
                <el-input
                  v-model="form.creditCode"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="客户类型" prop="clientType">
                <el-select
                  v-model="form.clientType"
                  placeholder="点击选择"
                  @change="clieChange"
                  clearable
                >
                  <el-option
                    v-for="item in dict.type.client_type"
                    :key="item.value"
                    :label="item.label"
                    :value="Number(item.value)"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="协作项目类别" prop="prjType">
                <el-select
                  ref="prjChoose"
                  v-model="form.prjType"
                  placeholder="点击选择"
                  :disabled="form.clientType == 0"
                  clearable
                >
                  <el-option
                    v-for="item in dict.type.project_type"
                    @input="$forceUpdate()"
                    :key="item.value"
                    :label="item.label"
                    :value="Number(item.value)"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="所 在 区 域" prop="area">
                <AddrCascader :data.sync="form.area" />
              </el-form-item>

              <el-form-item label="单 位 号 码" prop="telephone">
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

              <el-form-item label="注 册 区 域" prop="addrArea">
                <AddrCascader :data.sync="form.addrArea" />
              </el-form-item>

              <el-form-item label="注册详细地址" prop="addr">
                <el-input
                  v-model="form.addr"
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

              <el-form-item label="开户行账号" prop="bankAccount">
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

              <el-form-item label="上 传 附 件" class="file">
                <FileChoose
                  ref="FileChoose"
                  :value.sync="form.files"
                  :extra="1"
                  :autoUpload="false"
                />
                <span style="float: right; position: relative; right: 150px; color: #999999"
                  >*协作单位需要上传公司简介、营业执照、资质
                  证书和银行开过许可证或基本存款账户信息等附件</span
                >
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div class="main2">
          <div class="m2top">
            客户联系人
            <div class="m2topm">
              <span v-show="nodeShow" @click="nodeShow ? (nodeShow = false) : (nodeShow = true)"
                >收起 <i class="el-icon-caret-top"></i>
              </span>
              <span v-show="!nodeShow" @click="nodeShow ? (nodeShow = false) : (nodeShow = true)"
                >展开 <i class="el-icon-caret-bottom"></i>
              </span>
            </div>
          </div>
          <div class="m2main" v-show="nodeShow">
            <div class="m2mt" v-show="form.clientContacts.length > 0">
              <div class="m2mb"><i style="color: red">*</i>部门科室</div>
              <div class="m2mb"><i style="color: red">*</i>联系人</div>
              <div class="m2mb"><i style="color: red">*</i>联系号码</div>
              <div class="m2mb"><i style="color: red"></i>备注</div>
              <div class="m2mb" style="max-width: 60px">操作</div>
            </div>
            <el-form
              v-for="(c, index) in form.clientContacts"
              :key="index"
              :model="c"
              :ref="`refForm${index}`"
              :rules="ruleData"
            >
              <div class="m2mt">
                <div class="m2mb">
                  <el-form-item label="" prop="dept">
                    <el-input v-model="c.dept" placeholder="请输入" clearable></el-input>
                  </el-form-item>
                </div>
                <div class="m2mb">
                  <el-form-item label="" prop="name">
                    <el-input v-model="c.name" placeholder="请输入" clearable></el-input>
                  </el-form-item>
                </div>
                <div class="m2mb">
                  <el-form-item label="" prop="phone">
                    <el-input v-model="c.phone" placeholder="请输入" clearable></el-input>
                  </el-form-item>
                </div>
                <div class="m2mb">
                  <el-form-item label="">
                    <el-input v-model="c.remark" placeholder="请输入" clearable></el-input>
                  </el-form-item>
                </div>
                <div class="m2mb" style="max-width: 60px">
                  <svg-icon icon-class="delete" style="cursor: hand" @click="delpm(c.uid)" />
                </div>
              </div>
            </el-form>

            <div>
              <el-button type="primary" @click="addPayments">添加联系人</el-button>
              <span style="color: #999999">(协作单位至少添加两名联系人)</span>
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
import { custAdd } from '@/api/data/customer';

export default {
  name: 'CustomerManagementAdd', //客户管理-新增
  dicts: ['client_type', 'project_type'],
  components: {},
  data() {
    return {
      form: {
        name: null,
        type: null,
        addr: null,
        phone: null,
        area: [], //给初始值否则第一次使用会触发回显，最好默认给初始值
        addrArea: [],
        mailArea: [],
        clientContacts: [],
      },
      nodeShow: true,
      ruleData: {
        name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        dept: [{ required: true, message: '部门不能为空', trigger: 'blur' }],
        clientType: [{ required: true, message: '客户类型不能为空', trigger: 'change' }],
        addr: [{ required: true, message: '联系地址不能为空', trigger: 'change' }],
        phone: [
          { required: true, message: '请输入号码', trigger: 'blur' },
          // {
          //   pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
          //   message: '请输入正确的手机号码',
          //   trigger: 'blur',
          // },
        ],
        area: [{ required: true, message: '请选择区域', trigger: ['blur', 'change'] }],
        addrArea: [{ required: true, message: '请选择区域', trigger: ['blur', 'change'] }],
        addr: [{ required: true, message: '请输入内容', trigger: ['blur', 'change'] }],
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
    //类型：业主/协助单位  添加业主无需填写协助项目类型等信息
    clieChange() {
      if (this.form.clientType == 0) {
        this.form.prjType = null;
      }
    },

    //添加节点
    addPayments() {
      var nv = {
        uid: Math.floor(Math.random() * 100) + 1, //临时随机id
      };
      this.form.clientContacts.push(nv);
    },

    //删除节点
    delpm(uid) {
      this.form.clientContacts.splice(
        this.form.clientContacts.findIndex((item) => item.uid === uid),
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

      if (this.form.clientContacts.length == 0) {
        this.$message.error('联系人不能为空');
        return;
      }

      if (this.form.clientContacts.length < 2) {
        this.$message.error('协作单位至少添加两名联系人');
        return;
      }

      Promise.all([
        this.validateForm('form'),
        ...this.form.clientContacts.map((item, index) => this.validateForm(`refForm${index}`)),
      ]).then((res) => {
        if (res) {
          this.$refs.FileChoose.asyncUpFile().then((res) => {
            if (res) {
              this.commonFun.ConverAreaVal(this.form);
              this.$modal.loading('正在提交，请稍候...');
              custAdd(this.form)
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

    // 取消
    goback() {
      this.$store.dispatch('tagsView/delView', this.$route); //关闭当前标签页
      this.$router.go(-1);
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/commonAE.scss';
</style>
