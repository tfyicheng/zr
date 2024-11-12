<template class="app-container">
  <div class="appo">
    <div class="appi">
      <NavTop :val="['资产采购管理', '供应商管理']" />
      <!-- <div class="top" style="margin-bottom: 15px">
        <svg-icon
          icon-class="back"
          style="cursor: hand; margin-right: 15px"
          @click="commonFun.goTo('资产采购管理')"
        />
        <span style="cursor: pointer" @click="commonFun.goTo('资产采购管理')">资产采购管理</span>
        <span> > </span>
        <span style="cursor: pointer" @click="commonFun.goTo('供应商统计')">供应商统计</span>
      </div> -->

      <div class="part1" style="height: 200px"><TopInfoView :type="15" /></div>

      <div class="part7">
        <div
          v-hasPermi="['property:supplier:add']"
          class="part7item"
          style="background: #409eff"
          @click="goRoute('添加供应商')"
        >
          添加供应商
        </div>
        <div
          v-hasPermi="['property:supplier:list']"
          class="part7item"
          style="background: #fac06a"
          @click="goRoute('查找供应商')"
        >
          查找供应商
        </div>
        <!-- <div
          v-hasPermi="['property:supplier:list']"
          class="part7item"
          style="background: #2fd052"
          @click="goRoute('供应商列表')"
        >
          供应商列表
        </div> -->
      </div>

      <div class="part6">
        <div class="part6item" style="height: 370px"><TableAll :type="37" /></div>
        <div class="part6item" style="height: 370px"><PieChart :type="17" /></div>
      </div>

      <!-- 1 -->
      <!-- <div class="part1" style="height: 200px"><TopInfoView :type="15" ref="TopInfoView" /></div> -->
      <!-- 1:1.5 -->
      <!-- <div class="part4">
        <div class="part4item" style="height: 370px"><PieChart :type="17" /></div>
        <div class="part4item" style="height: 370px"><BarChart :type="15" /></div>
      </div> -->
    </div>
  </div>
</template>

<script>
import TableAll from '@/components/Analysis/tableAll';
import BarChart from '@/components/Analysis/barchart';
import PieChart from '@/components/Analysis/piechart';
import LineChart from '@/components/Analysis/lineChart';
import TopInfoView from '@/components/Analysis/topinfoview';
export default {
  name: 'SupplierIndex', //供应商统计分析'/purchase-d/supplierCheck'
  components: {
    TopInfoView,
    BarChart,
    PieChart,
    LineChart,
    TableAll,
  },
  data() {
    return {};
  },
  methods: {
    goRoute(val) {
      switch (val) {
        case '添加供应商':
          this.$router.push({ path: '/purchase-d/supplierAdd' });
          break;
        case '查找供应商':
          this.$router.push({ path: '/purchase-d/supplierCheck' });
          break;
        case '供应商列表':
          this.$router.push({ path: '/purchase-d/supplierCheck' });
          break;
        default:
          break;
      }
    },
  },
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name) {
        //this.$refs.TopInfoView.refresh();
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/indexModel.scss';
.appo {
  overflow: auto;
}

.appi {
  margin: 20px;
  min-width: 1220px;
  .part1 {
    background: #e4e6ed;
    width: 100%;
    margin-bottom: 30px;
    box-shadow: 0px 0px 12px 0px #00000005;
    border-radius: 5px;
    overflow: hidden;
  }
  .part2 {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    .part2item {
      background: #e4e6ed;
      flex: 1;
      margin-right: 20px;
      min-width: 386px;
      box-shadow: 0px 0px 12px 0px #00000005;
      border-radius: 5px;
      overflow: hidden;
    }
    .part2item:last-child {
      margin-right: 0px;
    }
  }
  .part3 {
    display: flex;
    justify-content: center;
    align-items: center;
    .part3item {
      flex: 1.5;
      margin-right: 20px;
      background: #e4e6ed;
      box-shadow: 0px 0px 12px 0px #00000005;
      border-radius: 5px;
      overflow: hidden;
    }
    .part3item:last-child {
      flex: 1;
      margin-right: 0px;
    }
  }
  .part4 {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    .part4item {
      flex: 0.98;
      margin-right: 20px;
      background: #e4e6ed;
      box-shadow: 0px 0px 12px 0px #00000005;
      border-radius: 5px;
      overflow: hidden;
    }
    .part4item:last-child {
      flex: 2;
      margin-right: 0px;
    }
  }
}
</style>
