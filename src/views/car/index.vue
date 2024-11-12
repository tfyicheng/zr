<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <div class="top" style="margin-bottom: 15px">
          <!-- <svg-icon icon-class="back" style="cursor: hand; margin-right: 15px" @click="commonFun.goTo('生产管理')"/> -->
          <span style="cursor: pointer" @click="commonFun.goTo('车辆管理')">车辆管理</span>
          <!-- <span> > </span>
          <span style="cursor: pointer" @click="commonFun.goTo('证书管理')">证书管理</span> -->
        </div>

        <div class="part6">
          <div class="part6item" style="height: 200px"><MenuNav :type="8" /></div>
          <div class="part6item" style="height: 200px"><FuncNav :type="5" /></div>
        </div>

        <div class="part2">
          <div class="part2item" style="height: 370px"><TableAll :type="9" /></div>
          <div class="part2item" style="height: 370px"><TableAll :type="10" /></div>
          <div class="part2item" style="height: 370px"><LineChart :type="33" /></div>
        </div>

        <div class="part6">
          <div class="part6item" style="height: 370px"><TableAll :type="42" /></div>
          <!-- <div class="part6item" style="height: 370px"><PieChart :type="20" /></div> -->
          <div class="part6item" style="height: 370px"><PieChart :type="22" /></div>
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
import PieChart from '@/components/Analysis/piechart';
export default {
  name: '', //车辆管理门户
  components: { MenuNav, FuncNav, LineChart, TableAll, BarChart, PieChart },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/indexModel.scss';
</style>
