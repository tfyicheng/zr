<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['资产采购管理', '资产编码列表', '添加资产编码']" />

        <div class="main2">
          <div class="m2top">
            资产编码信息
            <div class="m2topm">
              <span
                v-show="paymentShow"
                @click="paymentShow ? (paymentShow = false) : (paymentShow = true)"
                >收起 <i class="el-icon-caret-top"></i>
              </span>
              <span
                v-show="!paymentShow"
                @click="paymentShow ? (paymentShow = false) : (paymentShow = true)"
                >展开 <i class="el-icon-caret-bottom"></i>
              </span>
            </div>
          </div>
          <div class="m2main" v-show="paymentShow">
            <div class="m2mt" v-show="payments.length > 0">
              <div class="m2mb"><i style="color: red">*</i>资产名称</div>
              <div class="m2mb"><i style="color: red">*</i>资产类型</div>
              <div class="m2mb"><i style="color: red">*</i>资产类别</div>
              <!-- <div class="m2mb"><i style="color: red">*</i>品牌/厂家</div> -->
              <div class="m2mb"><i style="color: red">*</i>规格型号</div>
              <!-- <div class="m2mb"><i style="color: red">*</i>单位</div> -->
              <div class="m2mb" style="max-width: 60px">操作</div>
            </div>

            <el-form
              v-for="(c, index) in payments"
              :key="index"
              :model="c"
              :ref="`refForm${index}`"
              :rules="ruleData"
            >
              <div class="m2mt">
                <div class="m2mb">
                  <el-form-item label="" prop="materialName">
                    <el-input
                      v-model="c.materialName"
                      placeholder="请输入内容"
                      :maxlength="commonFun.inputMax"
                      clearable
                    ></el-input>
                  </el-form-item>
                </div>

                <div class="m2mb">
                  <el-form-item label="" prop="propertyType">
                    <el-select v-model="c.propertyType" placeholder="点击选择">
                      <el-option
                        v-for="item in dict.type.property_type2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>

                <div class="m2mb">
                  <el-form-item label="" prop="materialType">
                    <el-select v-model="c.materialType" placeholder="点击选择">
                      <el-option
                        v-for="item in dict.type.property_type"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>

                <!-- <div class="m2mb">
                  <el-form-item label="" prop="manufacturer">
                    <el-input
                      v-model="c.manufacturer"
                      placeholder="请输入内容"
                      :maxlength="commonFun.inputMax"
                      clearable
                    ></el-input>
                  </el-form-item>
                </div> -->

                <div class="m2mb">
                  <el-form-item label="" prop="materialModel">
                    <el-input
                      v-model="c.materialModel"
                      placeholder="请输入内容"
                      :maxlength="commonFun.inputMax"
                      clearable
                    ></el-input>
                  </el-form-item>
                </div>
                <!-- <div class="m2mb">
                  <el-form-item label="" prop="meterId">
                    <el-select v-model="c.meterId" placeholder="点击选择">
                      <el-option
                        v-for="item in dict.type.unit_of_measurement"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div> -->

                <div class="m2mb" style="max-width: 60px">
                  <svg-icon icon-class="delete" style="cursor: hand" @click="delpm(c.uid)" />
                </div>
              </div>
            </el-form>

            <div>
              <el-button type="primary" @click="addPayments">添加</el-button>
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
import { materialAdd } from '@/api/data/asset';

export default {
  name: 'AssetCodeAdd', //添加资产编码
  dicts: ['unit_of_measurement', 'property_type', 'property_type2'],
  data() {
    return {
      payments: [],
      paymentShow: true,
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
  created() {},
  methods: {
    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
    },

    //删除节点
    delpm(uid) {
      this.payments.splice(
        this.payments.findIndex((item) => item.uid === uid),
        1,
      );
    },

    //添加节点
    addPayments() {
      var nv = {
        uid: Math.floor(Math.random() * 100) + 1, //临时随机id
        materialName: null,
        manufacturer: null,
        materialModel: null,
        meterId: null,
      };
      this.payments.push(nv);
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
      console.log(this.payments);

      if (this.payments.length == 0) {
        this.$message.error('资产编码信息不能为空');
        return;
      }

      Promise.all([
        ...this.payments.map((item, index) => this.validateForm(`refForm${index}`)),
      ]).then((res) => {
        if (res) {
          this.$modal.loading('正在提交，请稍候...');
          materialAdd(this.payments)
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
                width: 36px;
                height: 36px;
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
