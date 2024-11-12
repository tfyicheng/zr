<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop
          :val="['资产采购管理', '固定资产入库管理', '固定资产入库列表', '编辑固定资产入库']"
        />
        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" ref="form" :rules="ruleData">
              <!-- <el-form-item label="入 库 编 号">
                <el-input placeholder="系统填写" :disabled="true"></el-input>
              </el-form-item> -->

              <!-- <el-form-item label="合 同 编 号">
                <el-input
                  v-model="form.contNumber"
                  placeholder="系统填写"
                  :disabled="true"
                ></el-input>
              </el-form-item> -->

              <el-form-item label="合 同 编 号">
                <el-input
                  v-model="form.contNumber"
                  placeholder="点击选择或输入"
                  clearable
                  @change="$forceUpdate()"
                >
                  <svg-icon
                    slot="suffix"
                    icon-class="choose"
                    style="cursor: pointer; margin-right: 10px"
                    @click.native="chooseAcont"
                /></el-input>
              </el-form-item>

              <el-form-item label="保管部门">
                <DeptChoose
                  :data.sync="form.applyDeptId"
                  :backVal="form.applyDept"
                  :Multiple="false"
                  @getDept="getDept"
                />
              </el-form-item>

              <el-form-item label="保管人" prop="applyUserId">
                <PersonChoose
                  :data.sync="form.applyUserId"
                  :backVal="form.applyUser"
                  :Multiple="false"
                  @getPerson="getPerson"
                />
              </el-form-item>

              <!-- <el-form-item label="供 应 商">
                <el-input
                  v-model="form.supplierName"
                  placeholder="系统填写"
                  :disabled="true"
                ></el-input>
              </el-form-item> -->

              <!-- 
              <el-form-item label="入 库 仓 库" prop="storeId">
                <el-select
                  v-model="form.storeId"
                  filterable
                  allow-create
                  default-first-option
                  placeholder="请选择或输入"
                  clearable
                  @change="getStore"
                >
                  <el-option
                    v-for="item in stores"
                    :key="item.storeId"
                    :label="item.storeName"
                    :value="item.storeName"
                  >
                  </el-option>
                </el-select>
              </el-form-item> -->

              <!-- <el-form-item label="入 库 仓 库" prop="storeId">
                <el-select v-model="form.storeId" placeholder="仓库" clearable @change="getStore">
                  <el-option
                    v-for="item in stores"
                    :key="item.storeId"
                    :label="item.storeName"
                    :value="item.storeId"
                  >
                  </el-option>
                </el-select>
              </el-form-item> -->

              <!-- <el-form-item label="仓库管理员">
                <el-input
                  v-model="form.storeUser"
                  placeholder="系统填写"
                  :disabled="true"
                ></el-input>
              </el-form-item> -->

              <el-form-item label="购 入 时 间">
                <el-date-picker
                  v-model="form.inventoryDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  clearable
                >
                </el-date-picker>
              </el-form-item>
            </el-form>
          </div>

          <div class="p2">
            <div class="p2item">
              <span><i style="color: red; visibility: hidden">*</i>入 库 备 注</span>
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="form.remark"
                maxlength="500"
                show-word-limit
                resize="none"
              >
              </el-input>
            </div>
            <!-- <div class="p2item">
              <span><i style="color: red; visibility: hidden">*</i>合 同 附 件</span>
            </div> -->
          </div>
        </div>

        <div class="main2">
          <div class="m2top">
            入库清单
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
            <div class="m2mt" v-show="form.materials.length > 0">
              <div class="m2mb"><i style="color: red">*</i>资产编号</div>
              <div class="m2mb"><i style="color: red">*</i>资产名称</div>
              <div class="m2mb"><i style="color: red"></i>资产类别</div>
              <div class="m2mb"><i style="color: red"></i>规格型号</div>
              <div class="m2mb"><i style="color: red"></i>凭证时间</div>
              <div class="m2mb"><i style="color: red"></i>购入原值(元)</div>
              <div class="m2mb"><i style="color: red"></i>单价(元)</div>
              <div class="m2mb"><i style="color: red">*</i>入库数量</div>
              <!-- <div class="m2mb"><i style="color: red">*</i>品牌</div>
              <div class="m2mb"><i style="color: red">*</i>单位</div>
              <div class="m2mb"><i style="color: red">*</i>数量</div>
              <div class="m2mb"><i style="color: red">*</i>单价</div> -->
              <!-- <div class="m2mb" style="max-width: 60px">操作</div> -->
            </div>

            <el-form
              v-for="(c, index) in form.materials"
              :key="index"
              :model="c"
              :ref="`refForm${index}`"
              :rules="ruleData"
            >
              <div class="m2mt">
                <div class="m2mb">
                  <el-form-item label="" prop="assetNumber">
                    <el-input
                      v-model="c.assetNumber"
                      placeholder="请输入"
                      clearable
                      disabled
                    ></el-input>
                  </el-form-item>
                </div>

                <div class="m2mb">
                  <el-form-item label="" prop="materialName">
                    <el-input
                      v-model="c.materialName"
                      placeholder="请点击选择"
                      @click.native="chooseMat(c.uid)"
                      readonly
                      disabled
                    >
                      <!-- <svg-icon
                        slot="suffix"
                        icon-class="choose"
                        style="cursor: pointer; margin-right: 10px; width: 14px; height: 14px"
                      /> -->
                    </el-input>
                  </el-form-item>
                </div>

                <div class="m2mb">
                  <el-form-item label="">
                    <el-select v-model="c.propertyType" placeholder="请选择" disabled>
                      <el-option
                        v-for="item in dict.type.property_type2"
                        :key="item.value"
                        :label="item.label"
                        @input="$forceUpdate()"
                        :value="Number(item.value)"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>

                <!-- <div class="m2mb">
                  <el-form-item label="">
                    <el-input
                      v-model="c.manufacturer"
                      placeholder="系统填写"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                </div> -->

                <!-- <div class="m2mb">
                  <el-form-item label="" prop="meterId">
                    <el-select v-model="c.meterId" placeholder="系统填写" :disabled="true">
                      <el-option
                        v-for="item in dict.type.unit_of_measurement"
                        :key="item.value"
                        :label="item.label"
                        @input="$forceUpdate()"
                        :value="Number(item.value)"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div> -->

                <div class="m2mb">
                  <el-form-item label="">
                    <el-input
                      v-model="c.materialModel"
                      placeholder="请输入"
                      clearable
                      disabled
                    ></el-input>
                  </el-form-item>
                </div>

                <div class="m2mb">
                  <el-form-item label="">
                    <el-input
                      v-model="c.voucherTime"
                      placeholder="请输入"
                      clearable
                      disabled
                    ></el-input>
                  </el-form-item>
                </div>

                <div class="m2mb">
                  <el-form-item label="">
                    <!-- <el-input
                      v-model="c.materialTotalValue"
                      @input="$forceUpdate()"
                      @blur="(e) => (c.materialTotalValue = e.target.value)"
                      oninput="value=value.replace(/[^0-9.]/g,'')"
                      placeholder="请输入"
                    ></el-input> -->

                    <el-input-number
                      v-model="c.materialTotalValue"
                      :precision="2"
                      style="width: 100%"
                      :controls="false"
                      :min="0"
                      placeholder="请输入"
                      disabled
                    >
                    </el-input-number>
                  </el-form-item>
                </div>

                <div class="m2mb">
                  <el-form-item label="">
                    <!-- <el-input
                      v-model="c.unitPrice"
                      @input="$forceUpdate()"
                      @blur="(e) => (c.unitPrice = e.target.value)"
                      oninput="value=value.replace(/[^0-9.]/g,'')"
                      placeholder="请输入"
                    ></el-input> -->

                    <el-input-number
                      v-model="c.unitPrice"
                      :precision="2"
                      style="width: 100%"
                      :controls="false"
                      :min="0"
                      placeholder="请输入"
                      disabled
                    >
                    </el-input-number>
                  </el-form-item>
                </div>

                <div class="m2mb">
                  <el-form-item label="" prop="num">
                    <el-input
                      v-model="c.num"
                      @input="$forceUpdate()"
                      @blur="(e) => (c.num = e.target.value)"
                      oninput="value=value.replace(/[^0-9.]/g,'')"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                </div>

                <!-- <div class="m2mb" style="max-width: 60px">
                  <svg-icon icon-class="delete" style="cursor: hand" @click="delpm(c.uid)" />
                </div> -->
              </div>
            </el-form>

            <!-- <div>
              <el-button type="primary" @click="addPayments">添加资产</el-button>
            </div> -->
          </div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>

        <el-dialog :visible.sync="dialogTableVisible">
          <AcontList v-show="this.ChooseOne == 'acontList'" :Multiple="false" ref="acontList" />
          <MatList
            v-show="this.ChooseOne == 'mList'"
            :type="0"
            :Multiple="false"
            ref="mList"
            :defaultParam="0"
          />
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import AcontList from '@/views/components/dialog/acontList';
import MatList from '@/views/components/dialog/matlist';
import { stockInC0Edit, stockInAdd, storeList, stockInC0Info } from '@/api/data/asset';
import { userDeptInfo } from '@/api/data/person';
//import { getInfo } from '@/api/login';
import { purchaseContTrades, purchaseContInfo } from '@/api/data/contract';

export default {
  name: 'AssetInEdit', //编辑资产入库
  components: { AcontList, MatList },
  dicts: ['project_scale', 'unit_of_measurement', 'property_type2'],
  data() {
    return {
      stores: [], //仓库项
      form: {
        applyUserId: null,
        contName: null,
        materials: [],
      },
      paymentShow: true,
      dialogTableVisible: false,
      ChooseOne: '', //当前弹窗目标
      uid: '', //临时记录节点id
      ruleData: {
        contName: [{ required: true, message: '合同名称不能为空', trigger: ['change', 'blur'] }],
        storeId: [{ required: true, message: '仓库不能为空', trigger: 'change' }],
        inventoryDate: [{ required: true, message: '请选择入库日期', trigger: 'blur' }],
        contNumber: [{ required: true, message: '合同编号不能为空', trigger: ['change', 'blur'] }],
        materialName: [{ required: true, message: '请选择资产', trigger: ['change', 'blur'] }],
        meterId: [{ required: true, message: '请选择单位', trigger: ['change', 'blur'] }],
        num: [{ required: true, message: '请输入数量', trigger: ['change', 'blur'] }],
        unitPrice: [{ required: true, message: '请输入单价', trigger: ['change', 'blur'] }],
        applyUserId: [{ required: true, message: '保管人不能为空', trigger: ['change', 'blur'] }],
        assetNumber: [{ required: true, message: '请输入资产编号', trigger: ['change', 'blur'] }],
      },
      flagId: null,
    };
  },

  mounted() {},

  created() {
    //this.getStoreList();
    //this.getUserDept();
    this.getInfo();
  },
  methods: {
    //查询信息
    getInfo() {
      if (this.$route.query.id) {
        this.flagId = this.$route.query.id;
        stockInC0Info(this.$route.query.id).then((response) => {
          if (response.data) {
            this.form = response.data;
            this.form.materials = this.form.materials.map((c) => {
              return {
                uid: Math.floor(Math.random() * 100) + 1,
                id: c.id,
                materialName: c.materialName,
                manufacturer: c.manufacturer,
                meterId: c.meterId,
                unitPrice: c.unitPrice ? c.unitPrice : undefined,
                assetNumber: c.assetNumber,
                num: c.num,
                materialModel: c.materialModel,
                materialType: c.materialType,
                propertyType: c.propertyType,
                voucherTime: c.voucherTime,
                materialTotalValue: c.materialTotalValue ? c.materialTotalValue : undefined,
              };
            });
          }
        });
      }
    },

    //获取自身部门信息
    getUserDept() {
      // getInfo().then((res) => {
      //   userDeptInfo(res.user.userId).then((response) => {
      //     this.form.applyDeptId = response.user.applyDeptId;
      //     this.form.applyDept = response.user.applyDept;
      //   });
      // });
      // let data = this.commonFun.getUserDept(this.$store.state.user.id);
      // console.log(data);
      // if (data) {
      //   this.form.applyDept = data.deptName;
      //   this.form.applyDeptId = data.deptId;
      // }
      this.form.userName = this.$store.state.user.name;
      this.form.applyDept = this.$store.state.user.deptName;
      this.form.applyDeptId = this.$store.state.user.deptId;
    },

    //获取采购合同下的清单信息
    getAcontList(id) {
      if (id) {
        purchaseContInfo(id).then((response) => {
          this.form.materials = [];
          response.data.trades.forEach((item) => {
            if (item.type == '0') {
              this.form.materials.push({
                uid: Math.floor(Math.random() * 100) + 1, //临时随机id
                unitPrice: item.tradePrice ? item.tradePrice : undefined,
                materialName: item.materialName,
                materialTotalValue:
                  item.materialTotalValue != null ? item.materialTotalValue : undefined,
                materialType: 0,
                materialModel: item.materialModel,
                num: item.tradeNum,
              });
            }
          });
        });

        // purchaseContTrades(id).then((response) => {
        //   this.form.materials = [];
        //   this.form.materials = response.data.map((c) => {
        //     return {
        //       uid: Math.floor(Math.random() * 100) + 1, //临时随机id
        //       materialName: c.materialName,
        //       materialId: c.materialId,
        //       manufacturer: c.manufacturer,
        //       meterId: c.meterId,
        //       unitPrice: c.unitPrice ? c.unitPrice : undefined,
        //       assetNumber: c.assetNumber,
        //       num: c.contQuantity,
        //       materialModel: c.materialModel,
        //       materialType: 0,
        //       propertyType: c.propertyType,
        //       voucherTime: c.voucherTime,
        //       materialTotalValue: c.materialTotalValue ? c.materialTotalValue : undefined,
        //       num: item.tradeNum,
        //     };
        //   });
        // });
      }
    },

    //获取仓库列表
    // getStoreList() {
    //   storeList().then((response) => {
    //     console.log(response);
    //     this.stores = response.data;
    //   });
    // },

    //获取仓库管理员
    getStore(val) {
      return;
      let item = this.stores.find((item) => {
        return item.storeId === val;
      });
      if (item) {
        this.form.storeUser = item.storeUser;
      }
    },

    //获取联系人
    getPerson(data) {
      if (data) {
        this.form.applyUser = data[0].userName;
      } else {
        this.form.applyUser = null;
      }
    },

    //获取部门
    getDept(data) {
      if (data) {
        this.form.applyDept = data[0].deptName;
      } else {
        this.form.applyDept = null;
      }
    },

    //选择采购合同id
    chooseAcont() {
      this.dialogTableVisible = true;
      this.ChooseOne = 'acontList';
      this.$nextTick(() => {
        this.$refs.acontList.$off('getChoose', this.getAcont);
        this.$refs.acontList.$on('getChoose', this.getAcont);
        this.$refs.acontList.$on('closeChoose', this.closeChoose);
        this.$refs.acontList.getList();
      }, 500);
    },

    getAcont(data) {
      this.dialogTableVisible = false;
      if (data && data.length > 0) {
        this.form.contNumber = data[0].contNumber;
        this.form.contName = data[0].contName;
        //this.form.supplierId = data[0].supplierId;
        //this.form.supplierName = data[0].supplierName;
        // this.form.applyDeptId = data[0].applyDeptId;
        // this.form.applyDept = data[0].applyDept;
        //只带编号不带清单
        //this.getAcontList(data[0].id);
      }
    },

    //选择资产id
    chooseMat(uid) {
      this.dialogTableVisible = true;
      this.uid = uid;
      this.ChooseOne = 'mList';
      this.$nextTick(() => {
        this.$refs.mList.$off('getChoose', this.getMat);
        this.$refs.mList.$on('getChoose', this.getMat);
        this.$refs.mList.$on('closeChoose', this.closeChoose);
        this.$refs.mList.getList();
      }, 500);
    },

    getMat(data) {
      this.dialogTableVisible = false;
      if (data && data.length > 0) {
        this.form.materials.find((item) => item.uid === this.uid).materialId = data[0].materialId;
        this.form.materials.find((item) => item.uid === this.uid).materialName =
          data[0].materialName;
        this.form.materials.find((item) => item.uid === this.uid).manufacturer =
          data[0].manufacturer;
        this.form.materials.find((item) => item.uid === this.uid).meterId = Number(data[0].meterId);
        this.form.materials.find((item) => item.uid === this.uid).materialType =
          data[0].materialType;
        this.form.materials.find((item) => item.uid === this.uid).materialModel =
          data[0].materialModel;
      }
    },

    //关闭选择弹窗
    closeChoose() {
      this.dialogTableVisible = false;
    },

    //返回
    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
    },

    //添加节点
    addPayments() {
      var nv = {
        uid: Math.floor(Math.random() * 100) + 1, //临时随机id
        materialName: null,
        meterId: null,
        assetNumber: null,
        num: null,
        materialModel: null,
        materialType: null,
        propertyType: null,
        voucherTime: null,
        unitPrice: undefined,
        materialTotalValue: undefined,
      };
      this.form.materials.push(nv);
    },

    //删除收款节点
    delpm(uid) {
      this.form.materials.splice(
        this.form.materials.findIndex((item) => item.uid === uid),
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

      if (this.form.materials.length == 0) {
        this.$message.error('入库清单不能为空');
        return;
      }

      Promise.all([
        this.validateForm('form'),
        ...this.form.materials.map((item, index) => this.validateForm(`refForm${index}`)),
      ]).then((res) => {
        if (res) {
          this.$modal.loading('正在提交，请稍候...');
          stockInC0Edit(this.form)
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
  },

  computed: {},

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
          // .p1item:last-child {
          //   width: 795px;
          //   .el-input {
          //     width: 645px;
          //   }
          // }
        }

        .p2 {
          margin-top: 10px;
          padding-bottom: 15px;
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
              top: -20px;
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
