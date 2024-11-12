<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['资产采购管理', '采购合同管理', '采购合同列表', '固定资产采购合同详情']" />
        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" class="info" @submit.native.prevent>
              <el-form-item label="合 同 编 号">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.contNumber"></InputTip>
                </div>
              </el-form-item>
              <el-form-item label="合 同 名 称" prop="contName">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.contName"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="合 同 金 额" prop="totalAmount">
                <div class="info">{{ commonFun.amountConversion2(form.totalAmount) }}</div>
              </el-form-item>

              <el-form-item label="采 购 部 门">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.applyDept"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="合同负责人">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.applyUser"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="签 约 日 期">
                <div class="info">
                  <!-- <span>{{ commonFun.coverTime(form.contStartDate) }}</span> -->
                  <span>{{ form.contStartDate }}</span>
                </div>
              </el-form-item>

              <el-form-item label="交 货 日 期">
                <div class="info">
                  <!-- <span>{{ commonFun.coverTime(form.arrivalDate) }}</span> -->
                  <span>{{ form.arrivalDate }}</span>
                </div>
              </el-form-item>

              <el-form-item label="合 同 备 注" class="remark">
                <div class="info">
                  <el-input
                    type="textarea"
                    autosize
                    resize="none"
                    readonly
                    v-model="form.contTerm"
                  ></el-input>
                </div>
              </el-form-item>
              <el-form-item label="合 同 附 件" class="file">
                <FilePreview :data="form.annexFile" />
              </el-form-item>
            </el-form>
          </div>

          <!-- <div style="height: 20px"></div> -->
        </div>

        <div class="main2">
          <div class="m2top">
            供应商信息
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
              <el-form :model="form" :inline="true" class="info">
                <el-form-item label="供 应 商 全 称">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.supplierName"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item class="pline" :label="'统 一 社 会\n信 用 代 码'" prop="creditCode">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.creditCode"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item label="联 系 人" prop="contacts">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.contacts"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item label="联 系 号 码" prop="telephone">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.telephone"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item label="注 册 地 址" class="plast">
                  <div class="info">
                    <InputTip :width="inputTipWidth * 2" :text="form.addrArea"></InputTip>
                  </div>
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
            <el-table
              :data="form.trades"
              style="width: 100%"
              :max-height="maxtbheigth"
              ref="multipleTable"
            >
              <el-table-column prop="materialName" label="物品名称"> </el-table-column>
              <el-table-column prop="materialModel" label="规格型号"> </el-table-column>
              <!-- <el-table-column prop="manufacturer" label="品牌"> </el-table-column> -->
              <!-- <el-table-column label="单位">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.unit_of_measurement"
                    :value="scope.row.meterId"
                  />
                </template>
              </el-table-column>
              <el-table-column label="资产类型">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.property_type"
                    :value="scope.row.materialType"
                  />
                </template>
              </el-table-column> -->
              <el-table-column prop="materialTotalValue" label="物品总值（元）" width="200">
              </el-table-column>
              <el-table-column prop="tradePrice" label="单价（元）" width="200"> </el-table-column>
              <el-table-column prop="tradeNum" label="采购数量" width="200"> </el-table-column>
            </el-table>
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
            <el-table
              :data="form.trades2"
              style="width: 100%"
              :max-height="maxtbheigth"
              ref="multipleTable"
            >
              <el-table-column prop="materialName" label="物品名称"> </el-table-column>
              <el-table-column prop="materialModel" label="规格型号"> </el-table-column>
              <!-- <el-table-column prop="manufacturer" label="品牌"> </el-table-column> -->
              <!-- <el-table-column label="单位">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.unit_of_measurement"
                    :value="scope.row.meterId"
                  />
                </template>
              </el-table-column>
              <el-table-column label="资产类型">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.property_type"
                    :value="scope.row.materialType"
                  />
                </template>
              </el-table-column> -->
              <el-table-column prop="materialTotalValue" label="物品总值（元）" width="200">
              </el-table-column>
              <el-table-column prop="tradePrice" label="单价（元）" width="200"> </el-table-column>
              <el-table-column prop="tradeNum" label="采购数量" width="200"> </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" v-show="!form.canDown" @click="exportApply">申请导出</el-button>
          <el-button type="warning" v-show="form.canDown" @click="Output">导出</el-button>
        </div>

        <ApplyDown
          ref="ApplyDown"
          :downSourceName="form.contName"
          :downSourceId="form.id"
          :type="5"
        />
        <BeforeDown ref="BeforeDown" :type="5" />
      </div>
    </div>
  </div>
</template>

<script>
import { acontExport } from '@/api/data/file';
import ApplyDown from '@/views/components/dialog/applyDown';
import { purchaseContInfo } from '@/api/data/contract';
export default {
  name: 'FixedAssetsPCInfo', //固定资产采购合同信息
  components: { ApplyDown },
  dicts: ['unit_of_measurement', 'property_type'],
  data() {
    return {
      maxtbheigth: '300',
      form: {
        trades: [],
        trades2: [],
      },
      infoShow: true,
      paymentShow: true,
      paymentShow2: true,
      inputTipWidth: this.commonFun.inputTipWidth,
      dialogTableVisible: false,
      fileview: '', //文件预览地址
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    //查询信息
    getInfo() {
      if (this.$route.query.id) {
        purchaseContInfo(this.$route.query.id).then((response) => {
          console.log(response);
          const { trades, ...obj } = response.data;
          this.form = { ...this.form, ...obj };
          this.form.trades = [];
          this.form.trades2 = [];

          response.data.trades.forEach((item) => {
            if (item.type == '0') {
              this.form.trades.push({
                uid: Math.floor(Math.random() * 100) + 1, //临时随机id
                materialName: item.materialName, //物品名称
                materialModel: item.materialModel, //规格型号
                materialTotalValue:
                  item.materialTotalValue != null ? item.materialTotalValue : undefined, //物品总值
                tradeNum: item.tradeNum, //采购数量
                tradePrice: item.tradePrice != null ? item.tradePrice : undefined, //单价
                type: 0, //0固定资产1易耗品
              });
            }
            if (item.type == '1') {
              this.form.trades2.push({
                uid: Math.floor(Math.random() * 100) + 1, //临时随机id
                materialName: item.materialName, //物品名称
                materialModel: item.materialModel, //规格型号
                materialTotalValue:
                  item.materialTotalValue != null ? item.materialTotalValue : undefined, //物品总值
                tradeNum: item.tradeNum, //采购数量
                tradePrice: item.tradePrice != null ? item.tradePrice : undefined, //单价
                type: 1, //0固定资产1易耗品
              });
            }
          });
          this.commonFun.ShowAreaVal(this.form, response.data);
        });
      }
    },

    //返回
    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
    },

    //申请导出
    exportApply() {
      this.$refs.ApplyDown.show();
    },

    //下载/导出
    Output() {
      // acontExport(this.form.id);
      this.$refs.BeforeDown.downSourceId = this.form.id;
      this.$refs.BeforeDown.show();
    },

    //刷新视图
    refreshView() {
      this.$store.dispatch('tagsView/delAllCachedViews', this.$route); //删除当前路径所有缓存视图
      const { fullPath } = this.$route; //获取全路径
      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath,
        });
      });
    },
  },
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name) {
        // this.getInfo();
        //this.refreshView();
        this.$tab.refreshPage();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/commonAE.scss';
</style>
