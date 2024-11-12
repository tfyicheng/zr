<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['生产管理', '合同范本列表', '添加合同范本']" />
        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" ref="form" :rules="ruleData">
              <el-form-item label="范 本 名 称" prop="templateName">
                <el-input
                  v-model="form.templateName"
                  placeholder="请输入"
                  :maxlength="commonFun.inputMax"
                  clearable
                />
              </el-form-item>
            </el-form>
          </div>

          <div class="p2">
            <div class="p2item">
              <span><i style="color: red; visibility: hidden">*</i>范 本 描 述</span>
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="form.templateDesc"
                maxlength="250"
                show-word-limit
                resize="none"
                clearable
              >
              </el-input>
            </div>
            <div class="p2item">
              <span><i style="color: red">*</i>范 本 附 件</span>
              <!-- <FileUpload ref="uList" /> -->
              <FileUpload2 ref="uList" />
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
import { templateAdd } from '@/api/data/contract';
export default {
  name: 'TemplatetAdd', //添加合同范本
  data() {
    return {
      form: {
        files: [],
      },
      dialogTableVisible: false,
      ChooseOne: '',
      ruleData: {
        templateName: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
      },
    };
  },

  mounted() {
    this.$refs.uList.$on('upload', this.getUlist);
  },

  created() {},
  methods: {
    //关闭选择人员弹窗
    closeChoose() {
      this.dialogTableVisible = false;
    },

    // 获取上传的文件
    getUlist(data) {
      this.form.files = data;
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

    save() {
      if (this.$refs.uList.fileList.length == 0) {
        this.$message.error('附件不能为空');
        return;
      }
      Promise.all([this.validateForm('form')]).then((res) => {
        if (res) {
          // Promise.all([this.$refs.uList.asyncUpFile()]).then((res) => {
          //   console.log('res:', res);
          //   if (res) {
          //   }
          // });

          this.$refs.uList.asyncUpFile().then((res) => {
            if (res) {
              this.$modal.loading('正在提交，请稍候...');
              templateAdd(this.form)
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

    // 保存
    // save0() {
    //   if (this.form.files.length == 0) {
    //     this.$message.error('附件不能为空');
    //     return;
    //   }
    //   Promise.all([this.validateForm('form')]).then((res) => {
    //     if (res) {
    //       console.log(this.form);
    //       this.$modal.loading('正在提交，请稍候...');
    //       templateAdd(this.form)
    //         .then((res) => {
    //           console.log(res);
    //           this.$modal.closeLoading();
    //           if (res.code == 200) {
    //             this.$message.success('添加成功');
    //             this.goback();
    //           }
    //         })
    //         .catch((error) => {
    //           this.$modal.closeLoading();
    //         });
    //     }
    //   });
    // },

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
