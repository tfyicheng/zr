<template class="app-container">
  <div class="appo">
    <div class="appi">
      <!-- <div class="top" style="margin-bottom: 15px">
        <svg-icon
          icon-class="back"
          style="cursor: hand; margin-right: 15px"
          @click="commonFun.goTo('资料管理')"
        />
        <span style="cursor: pointer" @click="commonFun.goTo('资料管理')">资料管理</span>
        <span> > </span>
        <span style="cursor: pointer" @click="commonFun.goTo('人员信息统计')">人员信息统计</span>
      </div> -->

      <NavTop :val="['资料管理', '人员管理']" />

      <div class="part1" style="height: 200px"><TopInfoView :type="26" ref="TopInfoView" /></div>

      <div class="part7">
        <div
          v-hasPermi="['certificate:cert1:add']"
          class="part7item"
          style="background: #409eff"
          @click="goRoute('添加人员证书')"
        >
          添加人员证书
        </div>
        <div
          v-hasPermi="['certificate:cert1:list']"
          class="part7item"
          style="background: #fac06a"
          @click="goRoute('查找人员证书')"
        >
          查找人员证书
        </div>
        <!-- <div
          v-hasPermi="['certificate:cert1:list']"
          class="part7item"
          style="background: #2fd052"
          @click="goRoute('人员证书列表')"
        >
          人员证书列表
        </div> -->
      </div>

      <div class="part6">
        <div class="part6item" style="height: 370px"><TableAll :type="14" /></div>
        <!-- <div class="part6item" style="height: 370px"><LineChart :type="0" ref="LineChart" /></div> -->
        <div class="part6item" style="height: 370px"><LineChart :type="43" ref="LineChart" /></div>
      </div>

      <!-- <div class="part2">
        <div class="part2item" style="height: 370px"><LineChart :type="38" ref="LineChart" /></div>
        <div class="part2item" style="height: 370px"></div>
        <div class="part2item" style="height: 370px"></div>
      </div> -->

      <!-- <div class="part4">
        <div class="part4item" style="height: 200px">
          <MenuNav :type="2" />
        </div>
        <div class="part4item" style="height: 200px">
          <TopInfoView :type="2" ref="TopInfoView" />
        </div>
      </div>
      <div class="part4">
        <div class="part4item" style="height: 370px"><TabList :type="0" ref="TabList" /></div>
        <div class="part4item" style="height: 370px"><LineChart :type="2" ref="LineChart" /></div>
      </div>
      <div class="part2">
        <div class="part2item" style="height: 370px"><TabList :type="1" ref="TabList" /></div>
        <div class="part2item" style="height: 370px"><PieChart :type="2" /></div>
        <div class="part2item" style="height: 370px"><PieChart :type="3" /></div>
      </div> -->
    </div>
  </div>
</template>

<script>
import TableAll from '@/components/Analysis/tableAll';
import TopInfoView from '@/components/Analysis/topinfoview';
import MenuNav from '@/components/Analysis/menuNav';
import LineChart from '@/components/Analysis/lineChart';
import BarChart from '@/components/Analysis/barchart';
import PieChart from '@/components/Analysis/piechart';
import TabList from '@/components/Analysis/tabList';

export default {
  name: 'PersonnelInformation', //人员信息
  components: {
    TopInfoView,
    MenuNav,
    LineChart,
    BarChart,
    PieChart,
    TabList,
    TableAll,
  },
  data() {
    return {};
  },
  methods: {
    goRoute(val) {
      switch (val) {
        case '添加人员证书':
          this.$router.push({ path: '/data-d/pcertificatesAdd' });
          break;
        case '查找人员证书':
          this.$router.push({ path: '/data-d/pcertificatesCheck' });
          break;
        case '人员证书列表':
          this.$router.push({ path: '/data-d/pcertificatesCheck' });
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
        this.$refs.TabList.refresh();
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
      background: #e4e6ed;
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
