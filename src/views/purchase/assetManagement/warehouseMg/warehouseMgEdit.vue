<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <div class="top">
          <svg-icon icon-class="back" style="cursor: hand" @click="goback" />
          编辑仓库
        </div>
        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" ref="form" :rules="ruleData">
              <el-form-item label="仓 库 编 号">
                <el-input v-model="form.storeId" placeholder="系统填写" :disabled="true"></el-input>
              </el-form-item>

              <el-form-item label="仓 库 名 称" prop="storeName">
                <el-input
                  v-model="form.storeName"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="仓库负责人" prop="storeUser">
                <el-input
                  v-model="form.storeUser"
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

              <el-form-item label="状 态" prop="status">
                <el-select v-model="form.status" placeholder="状态" clearable>
                  <el-option
                    v-for="item in dict.type.sys_normal_disable"
                    :key="item.value"
                    :label="item.label"
                    :value="Number(item.value)"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item class="plast" label="仓 库 地 址" prop="storeAddr">
                <el-input
                  v-model="form.storeAddr"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>

        <el-dialog :visible.sync="dialogTableVisible">
          <PersonList v-show="this.ChooseOne == 'pList'" ref="pList" />
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { storeAdd } from '@/api/data/asset';
import PersonList from '@/views/components/dialog/personlist';
export default {
  name: 'WarehouseMgEdit', //编辑仓库
  dicts: ['sys_normal_disable'],
  components: { PersonList },
  data() {
    return {
      form: {},
      ChooseOne: '',
      dialogTableVisible: false,
      flagId: null,
      ruleData: {
        storeUser: [{ required: true, message: '请选择负责人', trigger: ['change', 'blur'] }],
        storeAddr: [{ required: true, message: '请输入地址', trigger: ['change', 'blur'] }],
        storeName: [{ required: true, message: '请输入名称', trigger: ['change', 'blur'] }],
        status: [{ required: true, message: '请选择状态', trigger: ['change', 'blur'] }],
      },
    };
  },

  mounted() {},

  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      if (this.$route.query.data) {
        this.flagId = this.$route.query.data.storeId;
        this.form = this.$route.query.data;
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
      if (data) {
        this.form.storeUser = '';
        this.form.storeUserId = '';
        data.forEach((item) => {
          this.form.storeUser += item.userName + ',';
          this.form.storeUserId += item.userId + ',';
        });

        this.form.storeUser = this.form.storeUser.slice(0, this.form.storeUser.length - 1);
        this.form.storeUserId = this.form.storeUserId.slice(0, this.form.storeUserId.length - 1);
        // for (let i = 0; i < data.length; i++) {
        //   this.form.storeUser += data[i].userName + (i++ == data.length ? '' : ',');
        //   this.form.storeUserId += data[i].userId + (i++ == data.length ? '' : ',');
        // }
      }
    },

    //关闭选择人员弹窗
    closeChoose() {
      this.dialogTableVisible = false;
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

      Promise.all([this.validateForm('form')]).then((res) => {
        if (res) {
          this.$modal.loading('正在提交，请稍候...');
          storeAdd(this.form)
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
    },

    // 取消
    goback() {
      this.$store.dispatch('tagsView/delView', this.$route); //关闭当前标签页
      this.$router.go(-1);
    },
  },
  computed: {},
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name && this.flagId != this.$route.query.data.storeId) {
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
              margin: 0 40px 0 30px;
              font-family: Alibaba PuHuiTi 2;
              font-size: 16px;
              font-weight: 500;
            }
            .el-textarea {
              height: 100px !important;
              width: 645px;
              border-radius: 4px;
              border: 1px;
              ::v-deep textarea {
                height: 100px !important;
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
              top: -35px;
            }
          }
          .p2item:last-child {
            span {
              float: left;
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
