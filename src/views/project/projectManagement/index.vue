<template class="app-container">
  <div class="appo">
    <div class="appi">
      <!-- <div class="top" style="margin-bottom: 15px">
        <svg-icon
          icon-class="back"
          style="cursor: hand; margin-right: 15px"
          @click="commonFun.goTo('项目管理')"
        />
        <span style="cursor: pointer" @click="commonFun.goTo('项目管理')">项目管理</span>
        <span> > </span>
        <span style="cursor: pointer" @click="commonFun.goTo('项目管理统计')">项目管理统计</span>
      </div> -->
      <NavTop :val="['项目管理', '项目管理统计']" />
      <div class="part1" style="height: 200px"><TopInfoView :type="11" /></div>

      <div class="part7">
        <div
          v-hasPermi="['project:project:add']"
          class="part7item"
          style="background: #409eff"
          @click="goRoute('添加项目')"
        >
          添加项目
        </div>
        <div
          v-hasPermi="['project:project:list']"
          class="part7item"
          style="background: #fac06a"
          @click="goRoute('查找项目')"
        >
          查找项目
        </div>
        <!-- <div
          v-hasPermi="['project:project:list']"
          class="part7item"
          style="background: #2fd052"
          @click="goRoute('项目列表')"
        >
          项目列表
        </div> -->
      </div>

      <div class="part6">
        <div class="part6item" style="height: 370px"><TableAll :type="30" /></div>
        <div class="part6item" style="height: 370px"><BarChart :type="5" /></div>
      </div>

      <div class="part2">
        <div class="part2item" style="height: 370px"><PieChart :type="9" /></div>
        <div class="part2item" style="height: 370px"><RegionView :type="1" /></div>
        <div class="part2item" style="height: 370px"><LineChart :type="12" /></div>
      </div>

      <!-- <div class="part1" style="height: 200px"><TopInfoView :type="11" ref="TopInfoView" /></div>
     
      <div class="part4">
        <div class="part4item" style="height: 370px"><BarChart :type="5" /></div>
        <div class="part4item" style="height: 370px"><LineChart :type="12" /></div>
      </div>
     
      <div class="part2">
        <div class="part2item" style="height: 370px"><PieChart :type="9" /></div>
        <div class="part2item" style="height: 370px"><RegionView :type="1" /></div>
        <div class="part2item" style="height: 370px"></div>
      </div> -->
    </div>
  </div>
</template>

<script>
import TableAll from '@/components/Analysis/tableAll';
import BarChart from '@/components/Analysis/barchart';
import PieChart from '@/components/Analysis/piechart';
import LineChart from '@/components/Analysis/lineChart';
import RegionView from '@/components/Analysis/regionview';
import TopInfoView from '@/components/Analysis/topinfoview';
export default {
  name: 'ProjectManagementIndex', //项目列表
  components: {
    TopInfoView,
    BarChart,
    PieChart,
    LineChart,
    RegionView,
    TableAll,
  },
  data() {
    return {};
  },
  methods: {
    goRoute(val) {
      switch (val) {
        case '添加项目':
          this.$router.push({ path: '/project-d/projectAdd' });
          break;
        case '查找项目':
          this.$router.push({ path: '/project-d/projectCheck' });
          break;
        case '项目列表':
          this.$router.push({ path: '/project-d/projectCheck' });
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
