<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['资产采购管理', '资产报废管理', '资产报废列表', '资产报废登记']" />
        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" ref="form" :rules="ruleData">
              <!-- <el-form-item label="报 废 编 号">
                <el-input placeholder="系统填写" :disabled="true"></el-input>
              </el-form-item> -->

              <!-- <el-form-item label="报 废 名 称" prop="name">
                <el-input
                  v-model="form.name"
                  placeholder="请输入"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item> -->

              <!-- <el-form-item label="报 废 类 型" prop="outType">
                <el-select v-model="form.outType" placeholder="报废类型" clearable>
                  <el-option
                    v-for="item in dict.type.store_out_type"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item> -->

              <!-- <el-form-item label="报 废 部 门">
                <el-input
                  v-model="form.applyDept"
                  placeholder="系统填写"
                  :disabled="true"
                ></el-input>
              </el-form-item> -->

              <!-- <el-form-item label="报 废 人" prop="applyUser">
                <el-input
                  v-model="form.applyUser"
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
              </el-form-item> -->

              <!-- <el-form-item label="报 废 时 间" prop="inventoryDate">
                <el-date-picker
                  v-model="form.inventoryDate"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  clearable
                ></el-date-picker>
              </el-form-item> -->

              <el-form-item label="报 废 部 门">
                <DeptChoose :data.sync="form.applyDeptId" :Multiple="false" @getDept="getDept" />
              </el-form-item>

              <el-form-item label="报 废 人" prop="applyUserId">
                <PersonChoose
                  :data.sync="form.applyUserId"
                  :Multiple="false"
                  @getPerson="getPerson"
                />
              </el-form-item>

              <!-- <el-form-item label="申 请 人">
                <el-input
                  v-model="form.userName"
                  placeholder="系统填写"
                  :disabled="true"
                ></el-input>
              </el-form-item> -->

              <!-- <el-form-item label="报 废 仓 库" prop="storeId">
                <el-select v-model="form.storeId" placeholder="仓库" clearable @change="getStore">
                  <el-option
                    v-for="item in stores"
                    :key="item.storeId"
                    :label="item.storeName"
                    :value="item.storeId"
                    clearable
                  >
                  </el-option>
                </el-select>
              </el-form-item> -->
            </el-form>
          </div>

          <div class="p2">
            <div class="p2item">
              <span><i style="color: red; visibility: hidden">*</i>报 废 备 注</span>
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
            报废清单
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
            <div class="m2mt" v-show="data.materials.length > 0">
              <div class="m2mb"><i style="color: red"></i>资产编号</div>
              <div class="m2mb"><i style="color: red">*</i>资产名称</div>
              <div class="m2mb"><i style="color: red"></i>资产类型</div>
              <div class="m2mb"><i style="color: red"></i>规格型号</div>
              <div class="m2mb"><i style="color: red"></i>凭证时间</div>
              <!-- <div class="m2mb"><i style="color: red"></i>单价(元)</div> -->
              <div class="m2mb"><i style="color: red"></i>库存</div>
              <div class="m2mb"><i style="color: red">*</i>报废数量</div>
              <div class="m2mb" style="max-width: 60px">操作</div>
            </div>

            <el-form
              v-for="(c, index) in data.materials"
              :key="index"
              :model="c"
              :ref="`refForm${index}`"
              :rules="ruleData"
            >
              <div class="m2mt">
                <div class="m2mb">
                  <el-form-item label="">
                    <el-input
                      v-model="c.assetNumber"
                      placeholder="请输入"
                      :disabled="true"
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
                      ><svg-icon
                        slot="suffix"
                        icon-class="choose"
                        style="cursor: pointer; margin-right: 10px; width: 14px; height: 14px"
                      />
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

                <!-- <div class="m2mb">
                  <el-form-item label="">
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
                </div> -->

                <div class="m2mb">
                  <el-form-item label="">
                    <el-input
                      v-model="c.totalNum"
                      placeholder="请输入"
                      clearable
                      disabled
                    ></el-input>
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
                      clearable
                    ></el-input>
                  </el-form-item>
                </div>

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

        <el-dialog :visible.sync="dialogTableVisible">
          <PersonList v-show="this.ChooseOne == 'pList'" :type="1" :Multiple="false" ref="pList" />
          <AcontList v-show="this.ChooseOne == 'acontList'" :Multiple="false" ref="acontList" />
          <MatList
            v-show="this.ChooseOne == 'mList'"
            :type="2"
            :storeId="form.storeId"
            :Multiple="false"
            ref="mList"
          />
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import PersonList from '@/views/components/dialog/personlist';
import AcontList from '@/views/components/dialog/acontList';
import MatList from '@/views/components/dialog/matlist';
import { stockOutC0, stockOutAdd, storeList } from '@/api/data/asset';
import { purchaseContTrades } from '@/api/data/contract';
import { MessageBox } from 'element-ui';
export default {
  name: 'AssetOutAdd', //报废登记
  components: { AcontList, MatList, PersonList },
  dicts: ['project_scale', 'store_out_type', 'property_type2'],
  data() {
    return {
      stores: [], //仓库项
      form: {
        applyUser: null,
        materials: [],
      },
      data: {
        materials: [
          {
            uid: Math.floor(Math.random() * 100) + 1,
            materialName: null,
            num: null,
          },
        ],
      },
      paymentShow: true,
      dialogTableVisible: false,
      ChooseOne: '', //当前弹窗目标
      uid: '', //临时记录节点id
      storeId: '', //已经选择的仓库id，重新选择置空清单
      ruleData: {
        name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        storeId: [{ required: true, message: '请选择仓库', trigger: 'change' }],
        outType: [{ required: true, message: '请选择类型', trigger: 'change' }],
        applyUser: [{ required: true, message: '请选择', trigger: ['change', 'blur'] }],
        materialName: [{ required: true, message: '请选择资产', trigger: ['change', 'blur'] }],
        meterId: [{ required: true, message: '请选择单位', trigger: ['change', 'blur'] }],
        num: [{ required: true, message: '请输入数量', trigger: ['change', 'blur'] }],
        unitPrice: [{ required: true, message: '请输入单价', trigger: ['change', 'blur'] }],
        inventoryDate: [{ required: true, message: '请选择时间', trigger: ['change', 'blur'] }],
        applyUserId: [{ required: true, message: '报废人不能为空', trigger: ['change', 'blur'] }],
      },
    };
  },

  mounted() {},

  created() {
    ////this.getStoreList();
    //this.getUserDept();
  },
  methods: {
    //获取自身部门信息
    getUserDept() {
      // let data = this.commonFun.getUserDept(this.$store.state.user.id);
      // if (data) {
      //   this.form.applyDept = data.deptName;
      //   this.form.applyDeptId = data.deptId;
      // }
      this.form.userName = this.$store.state.user.name;
      this.form.applyDept = this.$store.state.user.deptName;
      this.form.applyDeptId = this.$store.state.user.deptId;
    },

    getStore(val) {
      if (val != this.storeId) {
        this.data.materials = [];
        this.storeId = val;
      }
    },

    //获取采购合同下的清单信息
    getAcontList(id) {
      if (id) {
        purchaseContTrades(id).then((response) => {
          this.data.materials = response.data.map((c) => {
            return {
              materialName: c.materialName,
              materialId: c.materialId,
              manufacturer: c.manufacturer,
              meterId: c.meterId,
              unitPrice: c.unitPrice,
              num: c.contQuantity,
            };
          });
        });
      }
    },

    //获取仓库列表
    // getStoreList() {
    //   storeList().then((response) => {
    //     console.log(response);
    //     this.stores = response.data;
    //   });
    // },

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
        this.form.contNumber = data[0].id;
        this.form.contName = data[0].contName;
        this.form.supplierId = data[0].supplierId;
        // this.form.applyDeptId = data[0].applyDeptId;
        // this.form.applyDept = data[0].applyDept;
        this.getAcontList(data[0].id);
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
        var nd = this.data.materials.find((item) => item.uid === this.uid);

        if (nd) {
          nd.id = data[0].id;
          nd.assetNumber = data[0].assetNumber;
          nd.projectCode = data[0].projectCode;
          nd.materialName = data[0].materialName;
          nd.materialModel = data[0].materialModel;
          nd.materialType = data[0].materialType;
          nd.propertyType = data[0].propertyType;
          nd.voucherTime = data[0].voucherTime;
          nd.unitPrice = data[0].unitPrice;
          nd.totalNum = data[0].num;
          nd.materialTotalValue = data[0].materialTotalValue;
        }

        // this.data.materials.find((item) => item.uid === this.uid).materialId = data[0].materialId;
        // this.data.materials.find((item) => item.uid === this.uid).materialName =
        //   data[0].materialName;
        // this.data.materials.find((item) => item.uid === this.uid).manufacturer =
        //   data[0].manufacturer;
        // this.data.materials.find((item) => item.uid === this.uid).meterId = data[0].meterId;
        // this.data.materials.find((item) => item.uid === this.uid).stockNum = data[0].stockNum;
        // this.data.materials.find((item) => item.uid === this.uid).id = data[0].id;
        // this.data.materials.find((item) => item.uid === this.uid).materialModel =
        //   data[0].materialModel;
        // this.data.materials.find((item) => item.uid === this.uid).materialCode =
        //   data[0].materialCode;
        // this.form.materials.find((item) => item.uid === this.uid).materialType =
        //   data[0].materialType;
        // this.form.materials.find((item) => item.uid === this.uid).materialModel =
        //   data[0].materialModel;

        // "assetNumber": "资产编号001", //资产编号
        // "projectCode": "1826171589299339264",
        // "materialName": "资产名称11", //资产名称
        // "materialModel": "规格型号11", //规格型号
        // "materialType": 0,
        // "propertyType": 0, //资产类别
        // "voucherTime": "凭证时间", //凭证时间
        // "unitPrice": 25, //单价
        // "totalNum": 500, //库存
        // "materialTotalValue": 200, //购买原值
        // "num": 200, //领用数量
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
        this.form.applyUser = data[0].userName;
        this.form.applyUserId = data[0].userId;
        this.form.applyDept = data[0].deptName;
        this.form.applyDeptId = data[0].deptId;
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
      // if (this.form.storeId == null || this.form.storeId == undefined || this.form.storeId == '') {
      //   this.$message.error('请先选择仓库');
      //   return;
      // }

      var nv = {
        uid: Math.floor(Math.random() * 100) + 1, //临时随机id
        materialName: null,
        num: null,
      };
      this.data.materials.push(nv);
    },

    //删除收款节点
    delpm(uid) {
      this.data.materials.splice(
        this.data.materials.findIndex((item) => item.uid === uid),
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

      if (this.data.materials.length == 0) {
        this.$message.error('报废清单不能为空');
        return;
      }
      let this_ = this;
      Promise.all([
        this.validateForm('form'),
        ...this.data.materials.map((item, index) => this.validateForm(`refForm${index}`)),
      ]).then((res) => {
        if (res) {
          MessageBox.confirm('该操作不可逆！是否确定报废？', '系统提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            showCancelButton: true,
            type: 'warning',
          })
            .then(() => {
              this.form.materials = this.data.materials.map((c) => {
                return {
                  id: c.id,
                  num: c.num,
                };
              });
              this.$modal.loading('正在提交，请稍候...');
              stockOutC0(this.form)
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
            })
            .catch(() => {});
        }
      });
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
