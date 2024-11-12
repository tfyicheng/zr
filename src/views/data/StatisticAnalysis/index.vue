<template class="app-container" >
  <div class="appo">
    <div class="appi">
    <div class="container">
      <div class="item" style="">
        <Approval />
      </div>
      <div class="item" style="">
        <Overview />
      </div>
      <div class="item" style="">
        <Toplist />
      </div>
    </div>
    <div class="container">
      <div class="item2" style="width: 60%;">
        <CurveChart />
      </div>
      <div class="item2" style="width: 40%;">
        <PieChart />
      </div>
    </div>
    <div>
      <div class="container2" ></div>
    </div>
  </div>
  </div>

</template>

<script>
import Approval from '@/components/Analysis/approval';
import Overview from '@/components/Analysis/overview';
import Toplist from '@/components/Analysis/toplist';
import CurveChart from '@/components/Analysis/curvechart';
import PieChart from '@/components/Analysis/piechart';

export default {
  name: 'StatisticAnalysis',//统计分析
  components: {
    Approval,
    Overview,
    Toplist,
    CurveChart,
    PieChart,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.appo{
  overflow: auto;
  .appi{
  min-width: 1220px;
}
}

.container {
  display: flex; 
  justify-content: center; 
  align-items: center; 
  padding:12px;
  .item {
    flex: 1;
    margin: 12px;
    padding: 2px;
    //height: 340px;
    height: 370px;
    min-width: 386px;
    //background-color: #f5f5f5;
    //border: 1px solid #ccc;
  }

  .item2 {
    margin: 12px;
    //margin-top:0px;
    padding: 0px;
    height: 470px;
    //background-color: #f5f5f5;
    //border: 1px solid #ccc;
  }


}
.container2 {
  margin: 12px;
  //margin-top:0px;
  padding: 0px;
  height: 450px;
  border: 1px solid #ccc;
  background-color: #e79494;
  }
</style>
