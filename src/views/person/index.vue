<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <div class="appc">
          <div class="top" style="margin-bottom: 15px">
            <!-- <svg-icon icon-class="back" style="cursor: hand; margin-right: 15px" @click="commonFun.goTo('生产管理')"/> -->
            <span style="cursor: pointer" @click="commonFun.goTo('人员管理')">人员管理</span>
            <!-- <span> > </span>
          <span style="cursor: pointer" @click="commonFun.goTo('证书管理')">证书管理</span> -->
          </div>

          <div class="part6">
            <div class="part6item" style="height: 200px"><MenuNav :type="9" /></div>
            <div class="part6item" style="height: 200px"><FuncNav :type="6" /></div>
          </div>

          <!-- <div class="part2">
            <div class="part2item" style="height: 370px"><TableAll :type="66" /></div>
            <div class="part2item" style="height: 370px"><TableAll :type="67" /></div>
            <div class="part2item" style="height: 370px"><LineChart :type="2" /></div>
          </div> -->

          <div class="part6">
            <div class="part6item" style="height: 370px"><TableAll :type="47" /></div>
            <div class="part6item" style="height: 370px"><LineChart :type="2" /></div>
          </div>
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
  name: '', //人员管理总统计首页
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
