<template>
  <!-- -->
  <el-dialog :visible.sync="visible" width="600px" top="45vh" append-to-body>
    <div class="mbody">
      <div class="appc">
        <div class="top">{{ title }}</div>
        <div class="main" v-if="type == 0 || type == 1">
          <div class="p0">
            <el-form :model="queryParams" :inline="true" ref="form" :rules="ruleData">
              <el-form-item label="中 止 事 由" class="remark" prop="remark">
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="queryParams.remark"
                  maxlength="250"
                  show-word-limit
                  resize="none"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="中 止 附 件" class="file" prop="fileIds">
                <FileChoose
                  ref="FileChoose"
                  :value.sync="queryParams.fileIds"
                  :autoUpload="false"
                />
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div class="p4">
          <el-button @click="visible = false">返回</el-button>
          <el-button type="primary" @click="save">确定</el-button>
          <div style="clear: both"></div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { fileApply, templateExport } from '@/api/data/file';
import { projectContTermination, outContTermination } from '@/api/data/contract';
export default {
  name: 'ApprovalDialog', //事务弹窗 中止
  dicts: ['reason_type'],
  props: {
    type: {
      type: Number,
      default: 0,
    }, //类型  0项目合同中止 1外委合同中止
    // 资源id
    sourceId: {
      type: [Number, String],
    },
    sourceName: '',
  },
  data() {
    return {
      title: '审批',
      // 遮罩层
      visible: false,
      queryParams: {
        watermark: null,
        fileIds: [],
      },
      ruleData: {
        remark: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        fileIds: [{ required: true, message: '附件不能为空', trigger: 'blur' }],
      },
    };
  },
  mounted() {
    // this.$refs.uList.$on('upload', this.getUlist);
  },

  created() {
    this.init();
  },

  methods: {
    init() {
      switch (this.type) {
        case 0:
          this.title = '项目合同中止';
          break;
        case 1:
          this.title = '外委合同中止';
          break;
        default:
          break;
      }
    },

    //文件上传方案2
    // 获取上传的文件
    getUlist(data) {
      console.log('获取上传的文件:', data);
      this.queryParams.fileIds = data;
    },

    // 显示弹框
    show() {
      //this.init();
      this.visible = true;
      // this.queryParams.downSourceId = this.downSourceId;
      // this.queryParams.type = this.type;
      // this.queryParams.applyDeptId = this.$store.state.user.deptId;
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

    /** 确认操作 */
    save() {
      // this.$emit('ok', this.queryParams.downSourceId);
      // this.$modal.loading('正在提交，请稍候...');
      // fileApply(this.queryParams)
      //   .then((res) => {
      //     this.$modal.closeLoading();
      //     if (res.code === 200) {
      //       this.visible = false;
      //       this.$message.success('提交成功');
      //       this.$emit('ok');
      //     }
      //   })
      //   .catch((error) => {
      //     this.$modal.closeLoading();
      //   });

      this.$refs.FileChoose.asyncUpFile().then((res) => {
        if (res) {
          switch (this.type) {
            case 0:
              this.save0();
              break;
            case 1:
              this.save1();
              break;
            default:
              break;
          }
        }
      });
    },

    save0() {
      //  this.$refs['form'].validateField('watermark', (valid) => {
      //   if (!valid) {
      //     console.log('true');
      //     this.visible = false;
      //     templateExport(this.downSourceId, this.queryParams.watermark);
      //   }
      // });

      if (this.queryParams.fileIds.length == 0) {
        this.$message.error('附件不能为空');
        return;
      }

      let qs = {
        contId: this.sourceId,
        remark: this.queryParams.remark,
        fileIds: this.queryParams.fileIds,
        // fileIds: this.queryParams.files.map((c) => {
        //   return c;
        // }),
      };
      console.log(qs);
      projectContTermination(qs)
        .then((res) => {
          this.$modal.closeLoading();
          if (res.code === 200) {
            this.visible = false;
            this.$message.success('提交成功');
          }
        })
        .catch((error) => {
          this.$modal.closeLoading();
        });
    },

    save1() {
      if (this.queryParams.fileIds.length == 0) {
        this.$message.error('附件不能为空');
        return;
      }

      let qs = {
        contId: this.sourceId,
        remark: this.queryParams.remark,
        fileIds: this.queryParams.fileIds,
      };
      console.log(qs);
      outContTermination(qs)
        .then((res) => {
          this.$modal.closeLoading();
          if (res.code === 200) {
            this.visible = false;
            this.$message.success('提交成功');
          }
        })
        .catch((error) => {
          this.$modal.closeLoading();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.mbody {
  .appc {
    .top {
      font-family: Alibaba PuHuiTi 2;
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
      letter-spacing: 0em;
      text-align: left;
      margin: 10px;
    }
    .top::before {
      content: '\00a0 ';
      border-left: 3px solid #4da0ff;
      margin-right: 5px;
    }
    i {
      float: right;
      cursor: pointer;
      font-weight: 700;
      font-size: 30px;
    }
    .main {
      background: #fff;
      border-radius: 4px;
      margin: 20px 10px 0 10px;

      .p0 {
        .el-form {
          .el-form-item {
            margin: 20px 10px 20px 10px;
            width: 550px;
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
              .el-textarea {
                height: 120px !important;
                width: 400px !important;
                border-radius: 4px;
                border: 1px;
                ::v-deep textarea {
                  height: 120px !important;
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
          .el-form-item + .remark {
            width: 700px !important;
            .el-form-item__content {
              .el-textarea {
                height: 120px !important;
                width: 400px !important;
                border-radius: 4px;
                border: 1px;
                ::v-deep textarea {
                  height: 120px !important;
                }
              }
            }
          }
          .el-form-item + .file {
            width: 700px;
            .upload-file {
              width: 400px;
              display: inline-block;
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
          width: 380px;
          height: auto;
          span {
            width: 78px;
            margin-left: 20px;
            float: left;
            text-align: center;
            line-height: 60px;
            font-size: 16px;
          }
          .el-cascader,
          .el-input,
          .el-date-editor,
          .el-textarea,
          .el-select {
            float: left;
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
            margin: 0 37px 0 25px;
            font-family: Alibaba PuHuiTi 2;
            font-size: 16px;
            font-weight: 500;
          }
          .el-textarea {
            height: 120px !important;
            width: 440px;
            border-radius: 4px;
            border: 1px;
            ::v-deep textarea {
              height: 120px !important;
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
            top: -60px;
          }
        }
        .p2item:last-child {
          span {
            float: left;
          }
        }
      }

      .p3 {
        margin: 15px;
        margin-bottom: 0px;
        .pagination-container {
          margin-bottom: 0px;
          .el-pagination {
            margin: 15px;
            margin-top: 20px;
            text-align: right;
            padding-bottom: 0px;
          }
        }
      }
    }

    .p4 {
      margin: 0px 0px;
      width: 98%;

      .el-button {
        float: right;
        border: 0;
        margin: 20px 20px 20px 0px;
        width: 100px;
        border-radius: 4px;
      }
      .el-button:first-child {
        background: #f3f4f8;
      }
    }
  }
}
</style>
