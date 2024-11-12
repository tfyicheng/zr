<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['资产采购管理', '供应商管理', '供应商列表', '添加供应商']" />
        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" ref="form" :rules="ruleData">
              <el-form-item label="供 应 商 名 称" prop="supplierName">
                <el-input
                  v-model="form.supplierName"
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
            </el-form>
          </div>
        </div>

        <div class="main2">
          <div class="m2top">
            供应商联系人
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
            <div class="m2mt" v-show="form.contactsList.length > 0">
              <div class="m2mb"><i style="color: red">*</i>部门科室</div>
              <div class="m2mb"><i style="color: red">*</i>联系人</div>
              <div class="m2mb"><i style="color: red">*</i>联系号码</div>
              <div class="m2mb"><i style="color: red"></i>备注</div>
              <div class="m2mb" style="max-width: 60px">操作</div>
            </div>
            <el-form
              v-for="(c, index) in form.contactsList"
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
                    <el-input
                      v-model="c.phone"
                      @input="$forceUpdate()"
                      @blur="(e) => (c.phone = e.target.value)"
                      oninput="value=value.replace(/[^\d]/g,'')"
                      placeholder="请输入"
                      clearable
                    ></el-input>
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
import { supplierAdd } from '@/api/data/asset';

export default {
  name: 'SupplierAdd', //添加供应商

  data() {
    return {
      form: {
        contactsList: [],
      },
      nodeShow: true,
      ruleData: {
        supplierName: [{ required: true, message: '供应商名称不能为空', trigger: 'change' }],
        unitLeader: [{ required: true, message: '联系人不能为空', trigger: 'blur' }],
        supplierAddr: [{ required: true, message: '地址不能为空', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入号码', trigger: 'blur' },
          // {
          //   pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
          //   message: '请输入正确的手机号码',
          //   trigger: 'blur',
          // },
        ],
        creditCode: [{ required: true, message: '请输入信用代码', trigger: 'blur' }],
        addrArea: [{ required: true, message: '区域不能为空', trigger: ['blur', 'change'] }],
        addr: [{ required: true, message: '地址不能为空', trigger: ['blur', 'change'] }],
        name: [{ required: true, message: '联系人不能为空', trigger: 'blur' }],
        dept: [{ required: true, message: '部门不能为空', trigger: 'blur' }],
      },
    };
  },

  mounted() {},

  created() {},
  methods: {
    //添加
    addPayments() {
      var nv = {
        uid: Math.floor(Math.random() * 100) + 1, //临时随机id
      };
      this.form.contactsList.push(nv);
    },

    //删除
    delpm(uid) {
      this.form.contactsList.splice(
        this.form.contactsList.findIndex((item) => item.uid === uid),
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

      if (this.form.contactsList.length == 0) {
        this.$message.error('供应商联系人不能为空');
        return;
      }

      Promise.all([
        this.validateForm('form'),
        ...this.form.contactsList.map((item, index) => this.validateForm(`refForm${index}`)),
      ]).then((res) => {
        if (res) {
          this.commonFun.ConverAreaVal(this.form);
          this.$modal.loading('正在提交，请稍候...');
          supplierAdd(this.form)
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
