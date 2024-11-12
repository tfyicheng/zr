<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <div class="top">
          <svg-icon icon-class="back" style="cursor: hand" @click="goback" />
          添加人员外出信息
        </div>
        <div class="main">
          <div class="p0">
            <el-form :model="data" :inline="true" ref="form" :rules="ruleData">
              <el-form-item label="申 请 人">
                <el-input v-model="form.userName" placeholder="系统填写" disabled></el-input>
              </el-form-item>

              <el-form-item label="申 请 部 门">
                <el-input v-model="form.applyDept" placeholder="系统填写" disabled></el-input>
              </el-form-item>

              <el-form-item label="业 务 类 型" prop="businessType">
                <el-select v-model="data.businessType" placeholder="点击选择" clearable>
                  <el-option
                    v-for="item in dict.type.out_type"
                    :key="item.value"
                    :label="item.label"
                    :value="Number(item.value)"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="开 始 时 间" prop="startTime">
                <el-date-picker
                  v-model="data.startTime"
                  type="datetime"
                  placeholder="选择时间"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  clearable
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="结 束 时 间" prop="endTime">
                <el-date-picker
                  v-model="data.endTime"
                  type="datetime"
                  placeholder="选择时间"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  clearable
                >
                </el-date-picker>
              </el-form-item>
            </el-form>
          </div>

          <div class="p2">
            <div class="p2item">
              <span><i style="color: red">*</i>外 出 事 由</span>
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="data.reason"
                maxlength="500"
                show-word-limit
                resize="none"
              >
              </el-input>
            </div>
            <div class="p2item">
              <span><i style="color: red; visibility: hidden">*</i>申 请 附 件</span>
              <!-- <FileUpload ref="uList" /> -->
              <FileChoose
                ref="FileChoose"
                :value.sync="form.annexFile"
                :extra="1"
                :autoUpload="false"
              />
            </div>
            <!-- <div style="clear: both"></div> -->
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
import { personOuto } from '@/api/data/person';
export default {
  name: 'PersonOutAdd', //添加人员外出信息
  dicts: ['out_type'],
  data() {
    return {
      data: {}, //提交数据
      form: {}, //展示数据
      ruleData: {
        businessType: [{ required: true, message: '类型不能为空', trigger: 'change' }],
        startTime: [{ required: true, message: '请选择开始时间', trigger: 'change' }],
        endTime: [{ required: true, message: '请选择结束时间', trigger: 'change' }],
      },
    };
  },

  mounted() {
    //this.$refs.uList.$on('upload', this.getUlist);
  },

  created() {
    this.getUserDeptInfo();
  },
  methods: {
    //获取自身部门信息，申请人为自己
    getUserDeptInfo() {
      // let data = this.commonFun.getUserDept();
      // if (data) {
      //   this.form.userName = data.userName;
      //   this.data.userId = data.userId;
      //   this.form.applyDept = data.deptName;
      //   this.data.applyDeptId = data.deptId;
      // }
      this.form.userName = this.$store.state.user.name;
      this.data.userId = this.$store.state.user.id;
      this.form.applyDept = this.$store.state.user.deptName;
      this.data.applyDeptId = this.$store.state.user.deptId;
    },

    // 获取上传的文件
    getUlist(data) {
      console.log(data);
      this.data.annexFile = data;
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
      if (!this.data.reason) {
        this.$message.error('外出事由不能为空');
        return;
      }

      Promise.all([this.validateForm('form')]).then((res) => {
        if (res) {
          this.$refs.FileChoose.asyncUpFile().then((res) => {
            if (res) {
              this.data.applyType = 0;
              console.log(this.data);
              this.$modal.loading('正在提交，请稍候...');
              personOuto(this.data)
                .then((res) => {
                  console.log(res);
                  this.$modal.closeLoading();
                  if (res.code == 200) {
                    this.$message.success('添加成功');
                    this.$store.dispatch('tagsView/delView', this.$route);
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

          .p2 {
            position: relative;
            display: inline-block;
            .p2item {
              margin: 4px 10px 0 4px;
              float: left;
              //width: 390px;
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
