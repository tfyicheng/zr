<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['资产采购管理', '资产编码列表', '编辑资产编码']" />
        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" ref="form" :rules="ruleData">
              <el-form-item label="资 产 编 号">
                <el-input
                  v-model="form.materialId"
                  placeholder="系统填写"
                  :disabled="true"
                ></el-input>
              </el-form-item>

              <el-form-item label="资 产 名 称" prop="materialName">
                <el-input
                  v-model="form.materialName"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="资 产 类 型" prop="materialType">
                <el-select v-model="form.materialType" placeholder="点击选择" clearable>
                  <el-option
                    v-for="item in dict.type.property_type"
                    :key="item.value"
                    :label="item.label"
                    :value="Number(item.value)"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="资 产 类 别" prop="propertyType">
                <el-select v-model="form.propertyType" placeholder="点击选择" clearable>
                  <el-option
                    v-for="item in dict.type.property_type2"
                    :key="item.value"
                    :label="item.label"
                    :value="Number(item.value)"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <!-- <el-form-item label="品牌/厂家" prop="manufacturer">
                <el-input
                  v-model="form.manufacturer"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item> -->

              <el-form-item label="规 格 型 号" prop="materialModel">
                <el-input
                  v-model="form.materialModel"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <!-- <el-form-item label="单 位" prop="meterId">
                <el-select v-model="form.meterId" placeholder="点击选择" clearable>
                  <el-option
                    v-for="item in dict.type.unit_of_measurement"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item> -->
            </el-form>
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
import { materialEdit } from '@/api/data/asset';

export default {
  name: 'AssetCodeEdit', //资产编码
  dicts: ['unit_of_measurement', 'property_type', 'property_type2'],
  data() {
    return {
      form: {},
      flagId: null,
      ruleData: {
        materialName: [{ required: true, message: '请选择资产', trigger: ['change', 'blur'] }],
        meterId: [{ required: true, message: '请选择单位', trigger: ['change', 'blur'] }],
        manufacturer: [{ required: true, message: '请输入品牌/厂家', trigger: ['change', 'blur'] }],
        materialModel: [{ required: true, message: '请输入规格型号', trigger: ['change', 'blur'] }],
        materialType: [{ required: true, message: '请选择资产类型', trigger: ['change', 'blur'] }],
        propertyType: [{ required: true, message: '请选择资产类别', trigger: ['change', 'blur'] }],
      },
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
      }

      if (this.$route.query.data) {
        let rdata = JSON.parse(this.$route.query.data);

        this.flagId = rdata.materialId;
        this.form = rdata;
      }
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
          materialEdit(this.form)
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
      if (this.$route.query.data) {
        let rdata = JSON.parse(this.$route.query.data);
        if (to.name == this.$options.name && this.flagId != rdata.materialId) {
          this.getInfo();
        }
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
          // .p1item:last-child {
          //   width: 795px;
          //   .el-input {
          //     width: 645px;
          //   }
          // }
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
