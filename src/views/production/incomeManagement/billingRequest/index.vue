<template class="app-container">
  <div class="appo">
    <div class="appi">
      <NavTop :val="['生产管理', '开票记录管理']" />

      <div class="part7">
        <div
          v-hasPermi="['produce:invoice0:add']"
          class="part7item"
          style="background: #409eff"
          @click="goRoute('添加开票记录')"
        >
          添加开票记录
        </div>
        <div
          v-hasPermi="['produce:invoice0:list']"
          class="part7item"
          style="background: #fac06a"
          @click="goRoute('查找开票记录')"
        >
          查找开票记录
        </div>
        <!-- <div
          v-hasPermi="['produce:invoice0:list']"
          class="part7item"
          style="background: #2fd052"
          @click="goRoute('开票记录列表')"
        >
          开票记录列表
        </div> -->
      </div>

      <div class="part6">
        <div class="part6item" style="height: 370px"><TableAll :type="24" /></div>
        <div class="part6item" style="height: 370px"><PieChart :type="13" /></div>
      </div>

      <div class="part2">
        <!-- <div class="part2item" style="height: 370px"><BarChart :type="10" /></div> -->
        <div class="part2item" style="height: 370px"><LineChart :type="16" /></div>
        <div class="part2item" style="height: 370px"><LineChart :type="17" /></div>
        <div class="part2item" style="height: 370px"></div>
      </div>

      <!-- <div class="part4">
        <div class="part4item" style="height: 370px"><BarChart :type="10" /></div>
        <div class="part4item" style="height: 370px"><LineChart :type="16" /></div>
      </div>
      <div class="part4">
        <div class="part4item" style="height: 370px"><PieChart :type="13" /></div>
        <div class="part4item" style="height: 370px"><LineChart :type="17" /></div>
      </div> -->
    </div>
  </div>
</template>

<script>
import TableAll from '@/components/Analysis/tableAll';
import BarChart from '@/components/Analysis/barchart';
import PieChart from '@/components/Analysis/piechart';
import LineChart from '@/components/Analysis/lineChart';
export default {
  name: 'BillingRequestIndex', //开票记录  this.$router.push({ path: "/production-d/billingRequestCheck"})
  components: {
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
        case '添加开票记录':
          this.$router.push({ path: '/production-d/billingRequestAdd' });
          break;
        case '查找开票记录':
          this.$router.push({ path: '/production-d/billingRequestCheck' });
          break;
        case '开票记录列表':
          this.$router.push({ path: '/production-d/billingRequestCheck' });
          break;
        default:
          break;
      }
    },
  },
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name) {
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
