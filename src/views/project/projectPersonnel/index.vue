<template class="app-container">
  <div class="appo">
    <div class="appi">
      <NavTop :val="['项目管理', '项目人员管理']" />
      <!-- <div class="top" style="margin-bottom: 15px">
        <svg-icon
          icon-class="back"
          style="cursor: hand; margin-right: 15px"
          @click="commonFun.goTo('项目管理')"
        />
        <span style="cursor: pointer" @click="commonFun.goTo('项目管理')">项目管理</span>
        <span> > </span>
        <span style="cursor: pointer" @click="commonFun.goTo('项目人员统计')">项目人员统计</span>
      </div> -->

      <div class="part1" style="height: 200px"><TopInfoView :type="12" ref="TopInfoView" /></div>

      <div class="part7">
        <!-- <div
          v-hasPermi="['project:project:editPerson']"
          class="part7item"
          style="background: #409eff"
          @click="goRoute('添加项目人员')"
        >
          添加项目人员
        </div> -->
        <div
          v-hasPermi="['project:project:listPerson']"
          class="part7item"
          style="background: #fac06a"
          @click="goRoute('查找项目人员')"
        >
          查找项目人员
        </div>
        <div
          v-hasPermi="['project:project:listPerson']"
          class="part7item"
          style="background: #2fd052; visibility: hidden"
          @click="goRoute('项目人员列表')"
        >
          项目人员列表
        </div>
      </div>

      <div class="part6">
        <div class="part6item" style="height: 370px"><TableAll :type="31" /></div>
        <div class="part6item" style="height: 370px"><BarChart :type="6" /></div>
      </div>

      <div class="part2">
        <div class="part2item" style="height: 370px"><PieChart :type="10" /></div>
        <div class="part2item" style="height: 370px"><LineChart :type="13" /></div>
        <div class="part2item" style="height: 370px"></div>
      </div>

      <!-- <div class="part1" style="height: 200px"><TopInfoView :type="12" ref="TopInfoView" /></div>  
      <div class="part4">
        <div class="part4item" style="height: 370px"><BarChart :type="6" /></div>
        <div class="part4item" style="height: 370px"><LineChart :type="13" /></div>
      </div>
      <div class="part4">
        <div class="part4item" style="height: 370px"><PieChart :type="10" /></div>
        <div class="part4item" style="height: 370px"></div>
      </div> -->
    </div>
  </div>
</template>

<script>
import TableAll from '@/components/Analysis/tableAll';
import TopInfoView from '@/components/Analysis/topinfoview';
import BarChart from '@/components/Analysis/barchart';
import PieChart from '@/components/Analysis/piechart';
import LineChart from '@/components/Analysis/lineChart';
export default {
  name: 'ProjectPersonnelIndex', //项目人员统计分析
  components: {
    TopInfoView,
    PieChart,
    LineChart,
    BarChart,
    TableAll,
  },
  data() {
    return {};
  },
  methods: {
    goRoute(val) {
      switch (val) {
        case '添加项目人员':
          this.$router.push({ path: '/project-d/projectPersonnelCheck' });
          break;
        case '查找项目人员':
          this.$router.push({ path: '/project-d/projectPersonnelCheck' });
          break;
        case '项目人员列表':
          this.$router.push({ path: '/project-d/projectPersonnelCheck' });
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
      flex: 1.4;
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
