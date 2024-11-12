<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['车辆管理', '车辆统计', '车辆列表', '添加车辆']" />
        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" ref="form" :rules="ruleData">
              <el-form-item label="车 牌 号" prop="plateNumber">
                <el-input
                  v-model="form.plateNumber"
                  placeholder="请输入"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="发 动 机 号" prop="engineNumber">
                <el-input
                  v-model="form.engineNumber"
                  placeholder="请输入"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="车 架 号" prop="frameNumber">
                <el-input
                  v-model="form.frameNumber"
                  placeholder="请输入"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="品 牌" prop="brand">
                <el-input
                  v-model="form.brand"
                  placeholder="请输入"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="型 号" prop="model">
                <el-input
                  v-model="form.model"
                  placeholder="请输入"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="购 买 日 期" prop="buyDate">
                <el-date-picker
                  v-model="form.buyDate"
                  type="date"
                  placeholder="选择时间"
                  value-format="yyyy-MM-dd"
                  clearable
                >
                </el-date-picker>
              </el-form-item>
            </el-form>
          </div>
          <div class="p2">
            <div class="p2item">
              <span>车 辆 照 片</span>
              <!-- <FileUpload ref="uList" /> -->
              <FileChoose
                ref="FileChoose"
                :value.sync="form.annexFile"
                :extra="1"
                :autoUpload="false"
              />
            </div>
          </div>
          <div style="clear: both"></div>
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
import { carAdd } from '@/api/data/car';

export default {
  name: 'CarManagementAdd', //添加车辆
  data() {
    return {
      form: {},
      ruleData: {
        brand: [{ required: true, message: '请输入内容', trigger: ['change', 'blur'] }],
        engineNumber: [{ required: true, message: '请输入内容', trigger: ['change', 'blur'] }],
        frameNumber: [{ required: true, message: '请输入内容', trigger: ['change', 'blur'] }],
        model: [{ required: true, message: '请输入内容', trigger: ['change', 'blur'] }],
        plateNumber: [{ required: true, message: '请输入内容', trigger: ['change', 'blur'] }],
        buyDate: [{ required: true, message: '请选择日期', trigger: ['change', 'blur'] }],
      },
    };
  },

  mounted() {
    //this.$refs.uList.$on('upload', this.getUlist);
  },

  created() {},
  methods: {
    // 获取上传的文件
    getUlist(data) {
      console.log(data);
      this.form.annexFile = data;
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
          this.$refs.FileChoose.asyncUpFile().then((res) => {
            if (res) {
              this.$modal.loading('正在提交，请稍候...');
              carAdd(this.form)
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
        }

        .p2 {
          margin-top: 10px;
          .p2item {
            span {
              line-height: 100px;
              text-align: center;
              margin: 0 30px 0 30px;
              font-family: Alibaba PuHuiTi 2;
              font-size: 16px;
              font-weight: 500;
              width: 85px;
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
              //margin-top: 30px;
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
