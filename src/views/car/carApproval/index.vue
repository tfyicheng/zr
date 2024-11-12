<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="top" style="margin-bottom: 15px">
        <svg-icon
          icon-class="back"
          style="cursor: hand; margin-right: 15px"
          @click="commonFun.goTo('车辆管理')"
        />
        <span style="cursor: pointer" @click="commonFun.goTo('车辆管理')">车辆管理</span>
        <span> > </span>
        <span style="cursor: pointer" @click="commonFun.goTo('车辆审批统计')">车辆审批统计</span>
      </div>

      <div class="part1" style="height: 200px"><TopInfoView :type="23" /></div>

      <div class="part7">
        <div
          v-hasPermi="['car:car:approve']"
          class="part7item"
          style="background: #409eff"
          @click="goRoute('审批申请')"
        >
          审批申请
        </div>
        <div
          v-hasPermi="['car:car:approve']"
          class="part7item"
          style="background: #fac06a"
          @click="goRoute('查找审批申请')"
        >
          查找审批申请
        </div>
        <div
          v-hasPermi="['car:car:approve']"
          class="part7item"
          style="background: #2fd052"
          @click="goRoute('审批申请列表')"
        >
          审批申请列表
        </div>
      </div>

      <div class="part2">
        <div class="part2item" style="height: 370px"><TableAll :type="62" /></div>
        <div class="part2item" style="height: 370px"><TableAll :type="63" /></div>
        <div class="part2item" style="height: 370px"><LineChart :type="34" /></div>
      </div>

      <div class="part6">
        <div class="part6item" style="height: 370px"><TableAll :type="46" /></div>
        <div class="part6item" style="height: 370px"></div>
      </div>

      <!-- 1 -->
      <!-- <div class="part1" style="height: 200px"><TopInfoView :type="23" ref="TopInfoView" /></div> -->
      <!-- 1:1.5 -->
      <!-- <div class="part4">
        <div class="part4item" style="height: 370px"><BarChart :type="22" /></div>
        <div class="part4item" style="height: 370px"><LineChart :type="34" /></div>
      </div> -->
      <!-- 1:1:1 -->
      <!-- <div class="part2">
        <div class="part2item" style="height: 370px"><BarChart :type="23" /></div>
        <div class="part2item" style="height: 370px"><TabList :type="3" ref="TabList" /></div>
        <div class="part2item" style="height: 370px"></div>
      </div> -->
    </div>
  </div>
</template>

<script>
import RegionView from '@/components/Analysis/regionview';
import TableAll from '@/components/Analysis/tableAll';
import BarChart from '@/components/Analysis/barchart';
import PieChart from '@/components/Analysis/piechart';
import LineChart from '@/components/Analysis/lineChart';
import TopInfoView from '@/components/Analysis/topinfoview';
import TabList from '@/components/Analysis/tabList';
export default {
  name: 'CarApprovalIndex', //审批处理统计'/car-d/carApprovalCheck'
  components: {
    TopInfoView,
    RegionView,
    TabList,
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
        case '审批申请':
          this.$router.push({ path: '/car-d/carApprovalCheck' });
          break;
        case '查找审批申请':
          this.$router.push({ path: '/car-d/carApprovalCheck' });
          break;
        case '审批申请列表':
          this.$router.push({ path: '/car-d/carApprovalCheck' });
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
      //background: #e4e6ed;
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
