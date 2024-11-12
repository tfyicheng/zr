<template class="app-container">
  <div class="appo">
    <div class="appi">
      <NavTop :val="['项目管理', '项目资料归档管理']" />
      <!-- <div class="top" style="margin-bottom: 15px">
        <svg-icon
          icon-class="back"
          style="cursor: hand; margin-right: 15px"
          @click="commonFun.goTo('项目管理')"
        />
        <span style="cursor: pointer" @click="commonFun.goTo('项目管理')">项目管理</span>
        <span> > </span>
        <span style="cursor: pointer" @click="commonFun.goTo('项目资料归档统计')"
          >项目资料归档统计</span
        >
      </div> -->

      <div class="part1" style="height: 200px"><TopInfoView :type="32" /></div>

      <div class="part7">
        <div
          v-hasPermi="['project:data:place:add']"
          class="part7item"
          style="background: #409eff"
          @click="goRoute('添加项目资料')"
        >
          添加项目资料
        </div>
        <div
          v-hasPermi="['project:data:place:list']"
          class="part7item"
          style="background: #fac06a"
          @click="goRoute('查找项目资料')"
        >
          查找项目资料
        </div>
        <!-- <div
          v-hasPermi="['project:data:list']"
          class="part7item"
          style="background: #2fd052"
          @click="goRoute('项目资料列表')"
        >
          项目资料列表
        </div> -->
      </div>

      <div class="part6">
        <div class="part6item" style="height: 370px"><TableAll :type="56" /></div>
        <div class="part6item" style="height: 370px"><PieChart :type="12" /></div>
      </div>

      <div class="part2">
        <div class="part2item" style="height: 370px"><BarChart :type="9" /></div>
        <!-- <div class="part2item" style="height: 370px"><LineChart :type="15" /></div>
        <div class="part2item" style="height: 370px"><LineChart :type="4" /></div> -->
        <div class="part2item" style="height: 370px"><LineChart :type="44" /></div>
        <div class="part2item" style="height: 370px"><LineChart :type="45" /></div>
      </div>

      <!-- <div class="part1" style="height: 200px"><TopInfoView :type="32" ref="TopInfoView" /></div>
    
      <div class="part4">
        <div class="part4item" style="height: 370px"><BarChart :type="9" /></div>
        <div class="part4item" style="height: 370px"><LineChart :type="15" /></div>
      </div>
      <div class="part4">
        <div class="part4item" style="height: 370px"><PieChart :type="12" /></div>
        <div class="part4item" style="height: 370px"><LineChart :type="4" /></div>
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
  name: 'ProjectDataIndex', //项目归档 '/data-d/projectdataCheck'
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
        case '添加项目资料':
          this.$router.push({ path: '/project-d/projectDataAdd' });
          break;
        case '查找项目资料':
          this.$router.push({ path: '/project-d/projectdataCheck' });
          break;
        case '项目资料列表':
          this.$router.push({ path: '/project-d/projectdataCheck' });
          break;
        default:
          break;
      }
    },
  },
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name) {
        this.$refs.TopInfoView.refresh();
      }
    },
  },
};
</script>

<style scoped lang="scss">
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
  .part6 {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    .part6item {
      flex: 2.04;
      margin-right: 20px;
      box-shadow: 0px 0px 12px 0px #00000005;
      border-radius: 5px;
      overflow: hidden;
    }
    .part6item:last-child {
      flex: 1;
      margin-right: 0px;
    }
  }

  .part7 {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    .part7item {
      background: #e4e6ed;
      flex: 1;
      margin-right: 20px;
      height: 90px;
      cursor: pointer;
      font-size: 30px;
      line-height: 90px;
      color: #fff;
      box-shadow: 0px 0px 12px 0px #00000005;
      border-radius: 5px;
      overflow: hidden;
      text-align: center;
    }
    .part7item:last-child {
      margin-right: 0px;
    }
  }
}
</style>
