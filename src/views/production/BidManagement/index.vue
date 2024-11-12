<template class="app-container">
  <div class="appo">
    <div class="appi">
      <NavTop :val="['生产管理', '投标管理']" />

      <div class="part1" style="height: 200px"><TopInfoView :type="5" /></div>

      <div class="part7">
        <div
          v-hasPermi="['produce:bid:add']"
          class="part7item"
          style="background: #409eff"
          @click="goRoute('添加投标')"
        >
          添加投标
        </div>
        <div
          v-hasPermi="['produce:bid:list']"
          class="part7item"
          style="background: #fac06a"
          @click="goRoute('查找投标信息')"
        >
          查找投标信息
        </div>
        <!-- <div
          v-hasPermi="['produce:bid:list']"
          class="part7item"
          style="background: #2fd052"
          @click="goRoute('投标列表')"
        >
          投标列表
        </div> -->
      </div>

      <div class="part6">
        <div class="part6item" style="height: 370px"><TableAll :type="19" /></div>
        <!-- <div class="part6item" style="height: 370px"><BarChart :type="2" /></div> -->
        <div class="part6item" style="height: 370px"><LineChart :type="3" /></div>
      </div>

      <div class="part2">
        <!-- <div class="part2item" style="height: 370px"><BarChart :type="3" /></div>
        <div class="part2item" style="height: 370px"><LineChart :type="3" /></div> -->
        <div class="part2item" style="height: 370px"><PieChart :type="25" /></div>
        <div class="part2item" style="height: 370px"><RegionView :type="3" /></div>
        <div class="part2item" style="height: 370px"></div>
      </div>

      <!-- <div class="part1" style="height: 200px"><TopInfoView :type="5" /></div>
     
      <div class="part4">
        <div class="part4item" style="height: 370px"><BarChart :type="2" /></div>
        <div class="part4item" style="height: 370px"><LineChart :type="3" /></div>
      </div>
      <div class="part4">
        <div class="part4item" style="height: 370px"><BarChart :type="3" /></div>
        <div class="part4item" style="height: 370px"></div>
      </div> -->
    </div>
  </div>
</template>

<script>
import RegionView from '@/components/Analysis/regionview';
import PieChart from '@/components/Analysis/piechart';
import TableAll from '@/components/Analysis/tableAll';
import TopInfoView from '@/components/Analysis/topinfoview';
import LineChart from '@/components/Analysis/lineChart';
import BarChart from '@/components/Analysis/barchart';
export default {
  name: 'bidManagementIndex', //投标管理首页
  components: {
    TopInfoView,
    LineChart,
    BarChart,
    TableAll,
    RegionView,
    PieChart,
  },
  data() {
    return {};
  },
  methods: {
    goRoute(val) {
      switch (val) {
        case '添加投标':
          this.$router.push({ path: '/production-d/bidManagementAdd' });
          break;
        case '查找投标信息':
          this.$router.push({ path: '/production-d/bidManagementCheck' });
          break;
        case '投标列表':
          this.$router.push({ path: '/production-d/bidManagementCheck' });
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
  .part5 {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    .part5item {
      flex: 1;
      margin-right: 20px;
      background: #e4e6ed;
      box-shadow: 0px 0px 12px 0px #00000005;
      border-radius: 5px;
      overflow: hidden;
    }
    .part5item:last-child {
      flex: 2.04;
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
