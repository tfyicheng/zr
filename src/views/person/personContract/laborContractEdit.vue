<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['人员管理', '人员合同管理', '人员合同列表', '编辑人员合同']" />
        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" ref="form" :rules="ruleData">
              <el-form-item label="合 同 编 号" prop="contId">
                <el-input
                  v-model="form.contId"
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

              <el-form-item label="甲 方">
                <el-input
                  v-model="this.$store.state.user.cdeptName"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  disabled
                ></el-input>
              </el-form-item>

              <el-form-item label="用 人 部 门" prop="deptName">
                <el-input
                  v-model="form.deptName"
                  placeholder="点击选择"
                  @click.native="chooseDept"
                  readonly
                >
                  <svg-icon
                    slot="suffix"
                    icon-class="choose"
                    style="cursor: pointer; margin-right: 10px"
                /></el-input>
              </el-form-item>

              <el-form-item label="签 约 日 期" prop="signingDate">
                <el-date-picker
                  v-model="form.signingDate"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  clearable
                ></el-date-picker>
              </el-form-item>

              <el-form-item label="乙 方" prop="secondParty">
                <el-input
                  v-model="form.secondParty"
                  placeholder="点击选择"
                  @click.native="chooseUser"
                  readonly
                >
                  <svg-icon
                    slot="suffix"
                    icon-class="choose"
                    style="cursor: pointer; margin-right: 10px"
                  />
                </el-input>
              </el-form-item>

              <el-form-item label="合同有效期" prop="validity">
                <el-input
                  v-model="form.validity"
                  @input="$forceUpdate()"
                  @blur="(e) => (form.validity = e.target.value)"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                ></el-input>
              </el-form-item>

              <el-form-item label="身 份 证 号" prop="idNum">
                <el-input
                  v-model="form.idNum"
                  @input="$forceUpdate()"
                  @blur="(e) => (form.idNum = e.target.value)"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="联 系 号 码" prop="phone">
                <el-input
                  v-model="form.phone"
                  @input="$forceUpdate()"
                  @blur="(e) => (form.phone = e.target.value)"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="办 公 地 址">
                <el-input
                  @input="$forceUpdate()"
                  v-model="form.officeAddr"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="邮 箱">
                <el-input
                  v-model="form.email"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="联 系 地 址">
                <el-input
                  v-model="form.userAddr"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>
            </el-form>
          </div>

          <div class="p2">
            <div class="p2item">
              <span><i style="color: red; visibility: hidden">*</i>合 同 条 款</span>
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="form.contTerm"
                maxlength="500"
                show-word-limit
                resize="none"
              >
              </el-input>
            </div>
            <div class="p2item">
              <span><i style="color: red; visibility: hidden">*</i>合 同 附 件</span>
              <!-- <FileUpload ref="uList" :value="form.files" /> -->
              <FileChoose
                ref="FileChoose"
                :value.sync="form.annexFile"
                :extra="1"
                :autoUpload="false"
              />
            </div>
          </div>
        </div>
        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>

        <el-dialog :visible.sync="dialogTableVisible">
          <PersonList v-show="this.ChooseOne == 'pList'" :Multiple="false" ref="pList" />
          <DeptList v-show="this.ChooseOne == 'dList'" :Multiple="false" ref="dList" />
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { laborContInfo, laborContUpdate } from '@/api/data/contract';
import { listDept } from '@/api/system/dept';
import { personList } from '@/api/data/person';
import PersonList from '@/views/components/dialog/personlist';
import DeptList from '@/views/components/dialog/deptlist';

export default {
  name: 'LaborContractEdit', //编辑劳动合同
  components: { PersonList, DeptList },
  data() {
    return {
      form: {
        ChooseDept: '',
        ChooseUser: '',
      },
      dialogTableVisible: false,
      flagId: null,
      ChooseOne: '',
      ruleData: {
        contId: [{ required: true, message: '合同编号不能为空', trigger: 'blur' }],
        contName: [{ required: true, message: '合同名称不能为空', trigger: 'blur' }],
        validity: [{ required: true, message: '合同有效期不能为空', trigger: 'change' }],
        deptName: [{ required: true, message: '请选择部门', trigger: 'change' }],
        secondParty: [{ required: true, message: '请选择乙方', trigger: 'change' }],
        phone: [
          { required: true, message: '请输入号码', trigger: 'blur' },
          // {
          //   pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
          //   message: '请输入正确的手机号码',
          //   trigger: 'blur',
          // },
        ],
        signingDate: [{ required: true, message: '请输入签约日期', trigger: 'blur' }],
        idNum: [{ required: true, message: '请输入身份证号码', trigger: 'blur' }],
      },
    };
  },

  mounted() {
    //this.$refs.uList.$on('upload', this.getUlist);
  },

  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      if (this.$route.query.id) {
        this.flagId = this.$route.query.id;
        laborContInfo(this.$route.query.id).then((response) => {
          console.log(response);
          this.form = response.data;
          this.form.annexFile = response.data.files;
        });
      }
    },

    //选择部门id
    chooseDept() {
      this.dialogTableVisible = true;
      this.ChooseOne = 'dList';
      this.$nextTick(() => {
        this.$refs.dList.$off('getChoose', this.getDept);
        this.$refs.dList.$on('getChoose', this.getDept);
        this.$refs.dList.$on('closeChoose', this.closeChoose);
        this.$refs.dList.getList();
      }, 500);
    },

    getDept(data) {
      this.dialogTableVisible = false;
      if (data && data.length > 0) {
        this.form.deptName = data[0].deptName;
        this.form.firstParty = data[0].deptId;
        this.form.officeAddr = data[0].addr;
      }
    },

    //选择用户id
    chooseUser() {
      this.dialogTableVisible = true;
      this.ChooseOne = 'pList';
      this.$nextTick(() => {
        this.$refs.pList.$off('getChoose', this.getUser);
        this.$refs.pList.$on('getChoose', this.getUser);
        this.$refs.pList.$on('closeChoose', this.closeChoose);
        this.$refs.pList.getList();
      }, 500);
    },

    //获取用户id
    getUser(data) {
      this.dialogTableVisible = false;
      if (data && data.length > 0) {
        this.form.secondParty = data[0].userName;
        this.form.idNum = data[0].idNum;
        this.form.userId = data[0].userId;
        this.form.phone = data[0].phoneNumber;
        this.form.email = data[0].email;
        this.form.userAddr = data[0].fullAddr;
      }
    },

    //关闭选择人员弹窗
    closeChoose() {
      this.dialogTableVisible = false;
    },

    // 获取上传的文件
    getUlist(data) {
      console.log(data);
      this.form.annexFile = data;
    },

    validateForm(refs) {
      console.log(refs);
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
      Promise.all([this.validateForm('form')]).then((res) => {
        if (res) {
          this.$refs.FileChoose.asyncUpFile().then((res) => {
            if (res) {
              this.$modal.loading('正在提交，请稍候...');
              laborContUpdate(this.form)
                .then((res) => {
                  console.log(res);
                  this.$modal.closeLoading();
                  if (res.code == 200) {
                    this.$message.success('修改成功');
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

    // 取消
    goback() {
      this.$store.dispatch('tagsView/delView', this.$route); //关闭当前标签页
      this.$router.go(-1);
    },
  },
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

        .p0 {
          .el-form {
            .el-form-item {
              margin: 20px 10px 20px 10px;
              width: 380px;
              ::v-deep.el-form-item__label {
                font-size: 16px;
                font-weight: 500;
                text-align: center;
                line-height: 37px;
                width: 135px;
                color: black;
              }
              .el-form-item__content {
                line-height: 37px;
                vertical-align: center;
                .el-input,
                .el-date-editor,
                .el-cascader,
                .el-input-number,
                .el-select {
                  width: 240px;
                  height: 37px;
                  ::v-deep.el-input__inner {
                    height: 37px !important;
                  }
                  ::v-deep.el-input__inner::placeholder {
                    font-size: 14px !important;
                  }
                }
              }
            }
            .el-form-item + .plast {
              width: 785px;
              .el-form-item__content {
                .el-input {
                  width: 645px;
                }
              }
            }
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
            .el-input,
            .el-input-number,
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
