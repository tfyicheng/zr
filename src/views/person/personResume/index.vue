<template class="app-container">
  <div class="appo">
    <div class="appi">
      <NavTop :val="['人员管理', '履职经历管理']" />

      <div class="part1" style="height: 200px"><TopInfoView :type="27" /></div>

      <div class="part7">
        <div
          v-hasPermi="['person:work:add']"
          class="part7item"
          style="background: #409eff"
          @click="goRoute('添加履职经历')"
        >
          添加履职经历
        </div>
        <div
          v-hasPermi="['person:work:list']"
          class="part7item"
          style="background: #fac06a"
          @click="goRoute('查找履职经历')"
        >
          查找履职经历
        </div>
        <!-- <div
          v-hasPermi="['person:work:list']"
          class="part7item"
          style="background: #2fd052"
          @click="goRoute('履职经历列表')"
        >
          履职经历列表
        </div> -->
      </div>

      <div class="part6">
        <div class="part6item" style="height: 370px"><TableAll :type="51" /></div>
        <div class="part6item" style="height: 370px"><LineChart :type="36" /></div>
      </div>

      <!-- 1 -->
      <!-- <div class="part1" style="height: 200px"><TopInfoView :type="27" ref="TopInfoView" /></div> -->

      <!-- 1:1.5 -->
      <!-- <div class="part4">
        <div class="part4item" style="height: 370px"><BarChart :type="27" /></div>
        <div class="part4item" style="height: 370px"><LineChart :type="36" /></div>
      </div> -->
    </div>
  </div>
</template>

<script>
import TableAll from '@/components/Analysis/tableAll';

import BarChart from '@/components/Analysis/barchart';
import LineChart from '@/components/Analysis/lineChart';
import TopInfoView from '@/components/Analysis/topinfoview';
export default {
  name: 'PersonResumeIndex', //履职经历统计分析'/person-d/personResumeCheck'
  components: {
    TopInfoView,
    BarChart,
    LineChart,
    TableAll,
  },
  data() {
    return {};
  },
  methods: {
    goRoute(val) {
      switch (val) {
        case '添加履职经历':
          this.$router.push({ path: '/person-d/personResumeAdd' });
          break;
        case '查找履职经历':
          this.$router.push({ path: '/person-d/personResumeCheck' });
          break;
        case '履职经历列表':
          this.$router.push({ path: '/person-d/personResumeCheck' });
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
}
</style>
