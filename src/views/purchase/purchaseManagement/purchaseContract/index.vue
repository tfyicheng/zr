<template class="app-container">
  <div class="appo">
    <div class="appi">
      <NavTop :val="['资产采购管理', '采购合同管理']" />
      <!-- <div class="top" style="margin-bottom: 15px">
        <svg-icon
          icon-class="back"
          style="cursor: hand; margin-right: 15px"
          @click="commonFun.goTo('资产采购管理')"
        />
        <span style="cursor: pointer" @click="commonFun.goTo('资产采购管理')">资产采购管理</span>
        <span> > </span>
        <span style="cursor: pointer" @click="commonFun.goTo('采购合同统计')">采购合同统计</span>
      </div> -->

      <div class="part1" style="height: 200px"><TopInfoView :type="14" /></div>

      <div class="part7">
        <div
          v-hasPermi="['project:project:add']"
          class="part7item"
          style="background: #409eff"
          @click="goRoute('添加固定资产采购合同')"
        >
          添加固定资产采购合同
        </div>

        <div
          v-hasPermi="['contract:serviceBuy:add']"
          class="part7item"
          style="background: #409eff"
          @click="goRoute('添加服务采购合同')"
        >
          添加服务采购合同
        </div>
        <div
          v-hasPermi="['contract:propertyBuy:list']"
          class="part7item"
          style="background: #fac06a"
          @click="goRoute('固定资产采购合同列表')"
        >
          固定资产采购合同列表
        </div>
        <div
          v-hasPermi="['contract:serviceBuy:list']"
          class="part7item"
          style="background: #2fd052"
          @click="goRoute('服务采购合同列表')"
        >
          服务采购合同列表
        </div>
      </div>

      <div class="part6">
        <div class="part6item" style="height: 370px"><TableAll :type="36" /></div>
        <!-- <div class="part6item" style="height: 370px"><BarChart :type="14" /></div> -->
        <div class="part6item" style="height: 370px"><LineChart :type="24" /></div>
      </div>

      <div class="part2">
        <div class="part2item" style="height: 370px"><PieChart :type="17" /></div>
        <div class="part2item" style="height: 370px"><BarChart :type="15" /></div>
        <div class="part2item" style="height: 370px"></div>
      </div>

      <!-- <div class="part1" style="height: 200px"><TopInfoView :type="14" ref="TopInfoView" /></div>
     
      <div class="part4">
        <div class="part4item" style="height: 370px"><BarChart :type="14" /></div>
        <div class="part4item" style="height: 370px"><LineChart :type="24" /></div>
      </div>
      <div class="part4">
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
  name: 'PurchaseContractIndex', //采购合同统计分析 '/data/contractmanagement/purchaseContractIndex'
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
        case '添加固定资产采购合同':
          this.$router.push({ path: '/purchase-d/fixedAssetsPCAdd' });
          break;
        case '添加服务采购合同':
          this.$router.push({ path: '/purchase-d/servicePCAdd' });
          break;
        case '固定资产采购合同列表':
          this.$router.push({ path: '/purchase-d/purchaseContractIndex', query: { tab: 0 } });
          break;
        case '服务采购合同列表':
          this.$router.push({ path: '/purchase-d/purchaseContractIndex', query: { tab: 1 } });
          break;
        default:
          break;
      }
    },
  },
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name) {
        // this.$refs.TopInfoView.refresh();
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
