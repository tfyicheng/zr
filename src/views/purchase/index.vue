<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <div class="top" style="margin-bottom: 15px">
          <!-- <svg-icon icon-class="back" style="cursor: hand; margin-right: 15px" @click="commonFun.goTo('生产管理')"/> -->
          <span style="cursor: pointer" @click="commonFun.goTo('资产采购管理')">资产采购管理</span>
          <!-- <span> > </span>
          <span style="cursor: pointer" @click="commonFun.goTo('证书管理')">证书管理</span> -->
        </div>

        <div class="part6">
          <div class="part6item" style="height: 200px"><MenuNav :type="7" /></div>
          <div class="part6item" style="height: 200px"><FuncNav :type="4" /></div>
        </div>

        <div class="part6">
          <div class="part6item" style="height: 370px"><TableAll :type="35" /></div>
          <div class="part6item" style="height: 370px"><LineChart :type="24" /></div>
        </div>

        <div class="part2">
          <div class="part2item" style="height: 370px"><LineChart :type="28" /></div>
          <div class="part2item" style="height: 370px"><LineChart :type="26" /></div>
          <div class="part2item" style="height: 370px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from '@/components/Analysis/barchart';
import LineChart from '@/components/Analysis/lineChart';
import TableAll from '@/components/Analysis/tableAll';
import MenuNav from '@/components/Analysis/menuNav';
import FuncNav from '@/components/Analysis/funcNav';
export default {
  name: '', //资产采购管理门户
  components: { MenuNav, FuncNav, LineChart, TableAll, BarChart },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/indexModel.scss';
// .appo {
//   overflow: auto;
//   .appi {
//     padding: 20px;
//     min-width: 1220px;
//   }
// }
</style>
