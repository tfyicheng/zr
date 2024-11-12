<template class="app-container">
  <div class="appo">
    <div class="appi">
      <NavTop :val="['资产采购管理', '消耗品领用管理']" />

      <div class="part1" style="height: 200px"><TopInfoView :type="39" /></div>

      <div class="part7">
        <div
          v-hasPermi="['property:stock1:use']"
          class="part7item"
          style="background: #409eff"
          @click="goRoute('添加领用申请')"
        >
          添加领用申请
        </div>
        <div
          v-hasPermi="['property:stock1:use:list']"
          class="part7item"
          style="background: #fac06a"
          @click="goRoute('查找领用申请')"
        >
          查找领用申请
        </div>
        <!-- <div
          v-hasPermi="['property:stock:useList']"
          class="part7item"
          style="background: #2fd052"
          @click="goRoute('领用申请列表')"
        >
          领用申请列表
        </div> -->
      </div>

      <!-- <div class="part2">
        <div class="part2item" style="height: 370px"><BarChart :type="17" /></div>
        <div class="part2item" style="height: 370px"><LineChart :type="26" /></div>
        <div class="part2item" style="height: 370px"><LineChart :type="27" /></div>
        <div class="part2item" style="height: 370px"></div>
      </div> -->

      <div class="part6">
        <div class="part6item" style="height: 370px"><TableAll :type="72" /></div>
        <div class="part6item" style="height: 370px"><PieChart :type="31" /></div>
      </div>

      <!-- 1:1:1 -->
      <div class="part2">
        <div class="part2item" style="height: 370px"><BarChart :type="35" /></div>
        <div class="part2item" style="height: 370px"><LineChart :type="51" /></div>
        <div class="part2item" style="height: 370px"></div>
      </div>

      <!-- 1 -->
      <!-- <div class="part1" style="height: 200px"><TopInfoView :type="17" ref="TopInfoView" /></div> -->

      <!-- 1:1.5 -->
      <!-- <div class="part4">
        <div class="part4item" style="height: 370px"><BarChart :type="17" /></div>
        <div class="part4item" style="height: 370px"><LineChart :type="26" /></div>
      </div>
      <div class="part4">
        <div class="part4item" style="height: 370px"><PieChart :type="18" /></div>
        <div class="part4item" style="height: 370px"><LineChart :type="27" /></div>
      </div> -->
    </div>
  </div>
</template>

<script>
import TableAll from '@/components/Analysis/tableAll';
import PieChart from '@/components/Analysis/piechart';
import TopInfoView from '@/components/Analysis/topinfoview';
import BarChart from '@/components/Analysis/barchart';
import LineChart from '@/components/Analysis/lineChart';
export default {
  name: 'AssetAcquisitionIndex', //资产领用统计 '/purchase-d/AssetAcquisitionCheck'
  components: {
    TopInfoView,
    BarChart,
    LineChart,
    PieChart,
    TableAll,
  },
  data() {
    return {};
  },
  methods: {
    goRoute(val) {
      switch (val) {
        case '添加领用申请':
          this.$router.push({ path: '/purchase-d/assetAcquisitionAdd2' });
          break;
        case '查找领用申请':
          this.$router.push({ path: '/purchase-d/AssetAcquisitionCheck2' });
          break;
        case '领用申请列表':
          this.$router.push({ path: '/purchase-d/AssetAcquisitionCheck2' });
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
