<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="top" style="margin-bottom: 15px">
        <svg-icon
          icon-class="back"
          style="cursor: hand; margin-right: 15px"
          @click="commonFun.goTo('人员管理')"
        />
        <span style="cursor: pointer" @click="commonFun.goTo('人员管理')">人员管理</span>
        <span> > </span>
        <span style="cursor: pointer" @click="commonFun.goTo('人员审批统计')">人员审批统计</span>
      </div>

      <div class="part1" style="height: 200px"><TopInfoView :type="31" /></div>

      <div class="part7">
        <div
          v-hasPermi="['person:apply:listApprove0']"
          class="part7item"
          style="background: #409eff"
          @click="goRoute('外出审批列表')"
        >
          外出审批列表
        </div>
        <div
          v-hasPermi="['person:apply:listApprove1']"
          class="part7item"
          style="background: #2fd052"
          @click="goRoute('请假审批列表')"
        >
          请假审批列表
        </div>
      </div>

      <div class="part2">
        <div class="part2item" style="height: 370px"><TableAll :type="64" /></div>
        <div class="part2item" style="height: 370px"><TableAll :type="65" /></div>
        <div class="part2item" style="height: 370px"><LineChart :type="2" /></div>
      </div>

      <div class="part6">
        <div class="part6item" style="height: 370px"><TableAll :type="55" /></div>
        <div class="part6item" style="height: 370px"></div>
      </div>

      <!-- 1 -->
      <!-- <div class="part1" style="height: 200px"><TopInfoView :type="31" ref="TopInfoView" /></div> -->
      <!-- 1:1.5 -->
      <!-- <div class="part4">
        <div class="part4item" style="height: 370px"><TabList :type="4" ref="TabList" /></div>
        <div class="part4item" style="height: 370px"><LineChart :type="2" /></div>
      </div> -->
    </div>
  </div>
</template>

<script>
import TableAll from '@/components/Analysis/tableAll';
import TabList from '@/components/Analysis/tabList';
import BarChart from '@/components/Analysis/barchart';
import PieChart from '@/components/Analysis/piechart';
import LineChart from '@/components/Analysis/lineChart';
import TopInfoView from '@/components/Analysis/topinfoview';
export default {
  name: 'PersonApprovalIndex', //人员审批处理'/person-d/personApprovalCheck'
  components: {
    TopInfoView,
    BarChart,
    PieChart,
    LineChart,
    TabList,
    TableAll,
  },
  data() {
    return {};
  },
  methods: {
    goRoute(val) {
      switch (val) {
        case '外出审批列表':
          this.$router.push({ path: '/person-d/personApprovalCheck', query: { tab: 0 } });
          break;
        case '请假审批列表':
          this.$router.push({ path: '/person-d/personApprovalCheck', query: { tab: 1 } });
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
        // this.$refs.TabList.refresh();
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
      //background: #e4e6ed;
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
