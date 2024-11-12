<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['资产采购管理', '采购合同管理', '采购合同列表', '添加固定资产采购合同']" />
        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" ref="form" :rules="ruleData">
              <el-form-item label="合 同 编 号" prop="contNumber">
                <el-input
                  v-model="form.contNumber"
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

              <el-form-item label="总金额(元)" prop="totalAmount">
                <el-input-number
                  v-model="form.totalAmount"
                  :precision="2"
                  :controls="false"
                  :min="0"
                  placeholder="0.00元"
                  clearable
                >
                </el-input-number>
              </el-form-item>

              <el-form-item label="采 购 部 门" prop="applyDeptId">
                <DeptChoose :data.sync="form.applyDeptId" :Multiple="false" />
              </el-form-item>

              <el-form-item label="合 同 负 责 人" prop="userId">
                <PersonChoose :data.sync="form.userId" :Multiple="false" />
              </el-form-item>

              <el-form-item label="签 约 日 期">
                <el-date-picker
                  v-model="form.contStartDate"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  clearable
                ></el-date-picker>
              </el-form-item>

              <el-form-item label="到 货 日 期">
                <el-date-picker
                  v-model="form.arrivalDate"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  clearable
                ></el-date-picker>
              </el-form-item>

              <el-form-item label="合 同 备 注" class="remark">
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="form.remark"
                  maxlength="500"
                  show-word-limit
                  resize="none"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="合 同 附 件" class="file">
                <FileChoose
                  ref="FileChoose"
                  :value.sync="form.annexFile"
                  :extra="1"
                  :autoUpload="false"
                />
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div class="main2">
          <div class="m2top">
            供应商
            <div class="m2topm">
              <span v-show="infoShow" @click="infoShow ? (infoShow = false) : (infoShow = true)"
                >收起 <i class="el-icon-caret-top"></i>
              </span>
              <span v-show="!infoShow" @click="infoShow ? (infoShow = false) : (infoShow = true)"
                >展开 <i class="el-icon-caret-bottom"></i>
              </span>
            </div>
          </div>
          <div class="m2main" v-show="infoShow">
            <div class="p0">
              <el-form :model="form" :inline="true" ref="form2" :rules="ruleData">
                <el-form-item label="供 应 商 全 称" prop="supplierId">
                  <SupChoose :data.sync="form.supplierId" :Multiple="false" @getSup="getSup" />
                  <!-- <el-input
                  v-model="form.ChooseSup"
                  placeholder="点击选择"
                  @click.native="chooseSup"
                  readonly
                >
                  <svg-icon slot="suffix" icon-class="choose" style="cursor: pointer; margin-right: 10px""
                /></el-input> -->
                </el-form-item>

                <el-form-item class="pline" :label="'统 一 社 会\n信 用 代 码'">
                  <el-input
                    v-model="form.creditCode"
                    placeholder="请输入内容"
                    :maxlength="commonFun.inputMax"
                    clearable
                  ></el-input>
                </el-form-item>

                <el-form-item label="联 系 人" prop="contacts">
                  <PersonChoose
                    :extra="form.supplierId"
                    :value.sync="form.contacts"
                    :Multiple="false"
                    :type="3"
                    @getPerson="getPerson"
                  />
                </el-form-item>

                <el-form-item label="联 系 号 码" prop="telephone">
                  <el-input
                    v-model="form.telephone"
                    @input="$forceUpdate()"
                    @blur="(e) => (form.telephone = e.target.value)"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    placeholder="请输入内容"
                    :maxlength="commonFun.inputMax"
                    clearable
                  ></el-input>
                </el-form-item>

                <el-form-item label="注 册 区 域">
                  <AddrCascader ref="AddrCascader" :data.sync="form.addrArea" />
                </el-form-item>

                <el-form-item label="注册详细地址">
                  <el-input
                    v-model="form.addr"
                    placeholder="请输入内容"
                    :maxlength="commonFun.inputMax"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>

        <div class="main2">
          <div class="m2top">
            固定资产采购清单
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
            <div class="m2mt" v-show="form.trades.length > 0">
              <!-- <div class="m2mb"><i style="color: red">*</i>资产</div> -->
              <!-- <div class="m2mb"><i style="color: red">*</i>数量</div> -->
              <!-- <div class="m2mb"><i style="color: red">*</i>单价</div> -->
              <div class="m2mb"><i style="color: red">*</i>物品名称</div>
              <div class="m2mb"><i style="color: red"></i>规格型号</div>
              <div class="m2mb" style="max-width: 180px">
                <i style="color: red"></i>物品总值(元)
              </div>
              <div class="m2mb" style="max-width: 180px"><i style="color: red"></i>单价(元)</div>
              <div class="m2mb" style="max-width: 180px"><i style="color: red">*</i>采购数量</div>
              <div class="m2mb" style="max-width: 60px">操作</div>
            </div>

            <el-form
              v-for="(c, index) in form.trades"
              :key="index"
              :model="c"
              :ref="`refForm${index}`"
              :rules="ruleData"
            >
              <div class="m2mt">
                <!-- <div class="m2mb">
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
                </div> -->

                <div class="m2mb">
                  <el-form-item label="" prop="materialName">
                    <el-input v-model="c.materialName" placeholder="请输入" clearable></el-input>
                  </el-form-item>
                </div>

                <div class="m2mb">
                  <el-form-item label="">
                    <el-input v-model="c.materialModel" placeholder="请输入" clearable></el-input>
                  </el-form-item>
                </div>

                <div class="m2mb" style="max-width: 180px">
                  <el-form-item label="">
                    <el-input-number
                      v-model="c.materialTotalValue"
                      :precision="2"
                      style="width: 100%"
                      :controls="false"
                      :min="0"
                      placeholder="请输入"
                    >
                    </el-input-number>
                  </el-form-item>
                </div>

                <div class="m2mb" style="max-width: 180px">
                  <el-form-item label="">
                    <el-input-number
                      v-model="c.tradePrice"
                      :precision="2"
                      style="width: 100%"
                      :controls="false"
                      :min="0"
                      placeholder="请输入"
                    >
                    </el-input-number>
                  </el-form-item>
                </div>

                <div class="m2mb" style="max-width: 180px">
                  <el-form-item label="" prop="tradeNum">
                    <el-input
                      v-model="c.tradeNum"
                      @input="$forceUpdate()"
                      @blur="(e) => (c.tradeNum = e.target.value)"
                      oninput="value=value.replace(/[^\d]/g,'')"
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
              <el-button type="primary" @click="addPayments">添加物品</el-button>
            </div>
          </div>
        </div>

        <div class="main2">
          <div class="m2top">
            消耗品采购清单
            <div class="m2topm">
              <span
                v-show="paymentShow2"
                @click="paymentShow2 ? (paymentShow2 = false) : (paymentShow2 = true)"
                >收起 <i class="el-icon-caret-top"></i>
              </span>
              <span
                v-show="!paymentShow2"
                @click="paymentShow2 ? (paymentShow2 = false) : (paymentShow2 = true)"
                >展开 <i class="el-icon-caret-bottom"></i>
              </span>
            </div>
          </div>
          <div class="m2main" v-show="paymentShow2">
            <div class="m2mt" v-show="form.trades2.length > 0">
              <!-- <div class="m2mb"><i style="color: red">*</i>资产</div> -->
              <!-- <div class="m2mb"><i style="color: red">*</i>数量</div> -->
              <!-- <div class="m2mb"><i style="color: red">*</i>单价</div> -->
              <div class="m2mb"><i style="color: red">*</i>物品名称</div>
              <div class="m2mb"><i style="color: red"></i>规格型号</div>
              <div class="m2mb" style="max-width: 180px">
                <i style="color: red"></i>物品总值(元)
              </div>
              <div class="m2mb" style="max-width: 180px"><i style="color: red"></i>单价(元)</div>
              <div class="m2mb" style="max-width: 180px"><i style="color: red">*</i>采购数量</div>
              <div class="m2mb" style="max-width: 60px">操作</div>
            </div>

            <el-form
              v-for="(c, index) in form.trades2"
              :key="index"
              :model="c"
              :ref="`refForm2${index}`"
              :rules="ruleData"
            >
              <div class="m2mt">
                <!-- <div class="m2mb">
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
                </div> -->

                <div class="m2mb">
                  <el-form-item label="" prop="materialName">
                    <el-input v-model="c.materialName" placeholder="请输入" clearable></el-input>
                  </el-form-item>
                </div>

                <div class="m2mb">
                  <el-form-item label="">
                    <el-input v-model="c.materialModel" placeholder="请输入" clearable></el-input>
                  </el-form-item>
                </div>

                <div class="m2mb" style="max-width: 180px">
                  <el-form-item label="">
                    <el-input-number
                      v-model="c.materialTotalValue"
                      :precision="2"
                      style="width: 100%"
                      :controls="false"
                      :min="0"
                      placeholder="请输入"
                    >
                    </el-input-number>
                  </el-form-item>
                </div>

                <div class="m2mb" style="max-width: 180px">
                  <el-form-item label="">
                    <el-input-number
                      v-model="c.tradePrice"
                      :precision="2"
                      style="width: 100%"
                      :controls="false"
                      :min="0"
                      placeholder="请输入"
                    >
                    </el-input-number>
                  </el-form-item>
                </div>

                <div class="m2mb" style="max-width: 180px">
                  <el-form-item label="" prop="tradeNum">
                    <el-input
                      v-model="c.tradeNum"
                      @input="$forceUpdate()"
                      @blur="(e) => (c.tradeNum = e.target.value)"
                      oninput="value=value.replace(/[^\d]/g,'')"
                      placeholder="请输入"
                      clearable
                    ></el-input>
                  </el-form-item>
                </div>

                <div class="m2mb" style="max-width: 60px">
                  <svg-icon icon-class="delete" style="cursor: hand" @click="delpm2(c.uid)" />
                </div>
              </div>
            </el-form>

            <div>
              <el-button type="primary" @click="addPayments2">添加物品</el-button>
            </div>
          </div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>

        <el-dialog :visible.sync="dialogTableVisible">
          <MatList v-show="this.ChooseOne == 'mList'" :Multiple="false" ref="mList" />
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import MatList from '@/views/components/dialog/matlist';

import { purchaseContAdd } from '@/api/data/contract';
import { supplierContactsInfo } from '@/api/data/asset';
export default {
  name: 'FixedAssetsPCAdd', //添加固定资产采购合同
  components: { MatList },
  data() {
    return {
      form: {
        id: '',
        creditCode: null,
        contName: '', //合同名称
        applyUserId: null, //申请人用户
        applyDeptId: null, //申请人部门ID
        totalAmount: undefined, //总金额
        supplierId: null, //供应商ID
        contacts: '', //联系人
        telephone: '', //联系电话
        email: '', //联系邮箱
        addr: '', //联系地址
        contStartDate: '', //签约日期
        arrivalDate: '', //交货日期
        remark: '', //合同条款
        annexFile: [],
        trades: [],
        trades2: [],
      },
      infoShow: true,
      paymentShow: true,
      paymentShow2: true,
      dialogTableVisible: false,
      uid: '', //临时记录节点id
      ChooseOne: '', //当前弹窗目标
      ruleData: {
        contNumber: [{ required: true, message: '合同编号不能为空', trigger: 'blur' }],
        contName: [{ required: true, message: '合同名称不能为空', trigger: 'blur' }],
        totalAmount: [
          { required: true, message: '合同金额不能为空', trigger: 'blur' },
          {
            validator: function (rule, value, callback) {
              if (value) {
                callback();
              } else {
                let tip = '';

                if (value * 1 === 0) {
                  tip = '金额应大于0';
                }

                if (tip) {
                  callback(new Error(tip));
                } else {
                  callback();
                }
              }
            },
            trigger: ['blur', 'change'],
          },
        ],
        ChooseDept: [{ required: true, message: '请选择部门', trigger: 'change' }],
        ChooseClient: [{ required: true, message: '请选择客户', trigger: 'change' }],
        ChooseUser: [{ required: true, message: '请选择申请人', trigger: 'change' }],
        ChooseSup: [{ required: true, message: '请选择供应商', trigger: 'change' }],
        contacts: [{ required: true, message: '联系人不能为空', trigger: 'change' }],
        phone: [
          { required: true, message: '请输入号码', trigger: 'change' },
          // {
          //   pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
          //   message: '请输入正确的手机号码',
          //   trigger: 'blur',
          // },
        ],
        annexFile: [{ required: true, message: '附件不能为空', trigger: ['blur', 'change'] }],
        userId: [{ required: true, message: '请选择负责人', trigger: ['blur', 'change'] }],
        contStartDate: [{ required: true, message: '请输入签约日期', trigger: 'blur' }],
        arrivalDate: [{ required: true, message: '请输入到货日期', trigger: 'blur' }],
        materialName: [{ required: true, message: '请输入名称', trigger: ['blur', 'change'] }],
        tradeNum: [{ required: true, message: '请输入数量', trigger: 'blur' }],
        tradePrice: [{ required: true, message: '请输入单价', trigger: 'blur' }],
        supplierId: [{ required: true, message: '请选择供应商', trigger: ['blur', 'change'] }],
        creditCode: [{ required: true, message: '请输入信用代码', trigger: 'blur' }],
        contacts: [{ required: true, message: '联系人不能为空', trigger: ['blur', 'change'] }],
        telephone: [{ required: true, message: '请输入联系号码', trigger: ['blur', 'change'] }],
      },
    };
  },

  mounted() {},

  created() {},
  methods: {
    //获取客户联系人
    getPerson(data) {
      if (data) {
        this.form.contacts = data[0].name;
        this.form.telephone = data[0].phone;
      }
    },

    //获取供应商信息
    getSup(data) {
      this.dialogTableVisible = false;
      if (data && data.length > 0) {
        this.form.supplierName = data[0].supplierName;
        supplierContactsInfo(data[0].supplierId).then((res) => {
          if (res.data) {
            this.form.creditCode = res.data.creditCode;
            this.form.addr = res.data.addr;
            this.commonFun.backAreaVal(this.form, res.data);
            this.$forceUpdate();
          }
        });
      } else {
        this.form.supplierName = null;
        this.$refs.form2.resetFields();
        this.$refs.AddrCascader.clearSel();
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
        this.form.trades.find((item) => item.uid === this.uid).materialId = data[0].materialId;
        this.form.trades.find((item) => item.uid === this.uid).materialName = data[0].materialName;
      }
    },

    //关闭选择弹窗
    closeChoose() {
      this.dialogTableVisible = false;
    },

    // 获取上传的文件
    getUlist(data) {
      console.log(data);
      this.form.annexFile = data;
    },

    //返回
    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
    },

    //添加固定资产  "type": 0 //0固定资产1易耗品
    addPayments() {
      var nv = {
        uid: Math.floor(Math.random() * 100) + 1, //临时随机id
        materialName: null,
        tradeNum: null,
        type: 0,
      };
      this.form.trades.push(nv);
    },

    addPayments2() {
      var nv = {
        uid: Math.floor(Math.random() * 100) + 1, //临时随机id
        materialName: null,
        tradeNum: null,
        type: 1,
      };
      this.form.trades2.push(nv);
    },

    //删除收款节点
    delpm(uid) {
      this.form.trades.splice(
        this.form.trades.findIndex((item) => item.uid === uid),
        1,
      );
    },

    delpm2(uid) {
      this.form.trades2.splice(
        this.form.trades2.findIndex((item) => item.uid === uid),
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

      if (!this.form.trades || this.form.trades.length == 0) {
        this.$message.error('固定资产采购清单不能为空');
        return;
      }

      if (!this.form.trades2 || this.form.trades2.length == 0) {
        this.$message.error('消耗品采购清单不能为空');
        return;
      }

      if (this.$refs.FileChoose.fileList.length == 0) {
        this.$message.error('附件不能为空');
        return;
      }

      Promise.all([
        this.validateForm('form'),
        this.validateForm('form2'),
        ...this.form.trades.map((item, index) => this.validateForm(`refForm${index}`)),
        ...this.form.trades2.map((item, index) => this.validateForm(`refForm2${index}`)),
      ]).then((res) => {
        if (res) {
          this.$refs.FileChoose.asyncUpFile().then((res) => {
            if (res) {
              this.form.trades = [...this.form.trades, ...this.form.trades2];
              this.commonFun.ConverAreaVal(this.form);
              this.$modal.loading('正在提交，请稍候...');
              purchaseContAdd(this.form)
                .then((res) => {
                  this.$modal.closeLoading();
                  console.log(res);
                  if (res.code == 200) {
                    this.$message.success('添加成功');
                    this.goback();
                  }
                })
                .catch((error) => {
                  this.form.trades = [...this.form.trades.filter((item) => item.type == 0)];
                  this.$modal.closeLoading();
                  //console.log('重置trades', this.form.trades);
                });
            }
          });
        }
      });
    },
  },

  computed: {},
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/commonAE.scss';
</style>
