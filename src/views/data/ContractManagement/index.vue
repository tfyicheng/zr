<template class="app-container">
  <div class="appo">
    <div class="appi">
      <NavTop :val="['资料管理', '合同管理']" />
      <!-- <div class="top" style="margin-bottom: 15px">
        <svg-icon
          icon-class="back"
          style="cursor: hand; margin-right: 15px"
          @click="commonFun.goTo('资料管理')"
        />
        <span style="cursor: pointer" @click="commonFun.goTo('资料管理')">资料管理</span>
        <span> > </span>
        <span style="cursor: pointer" @click="commonFun.goTo('合同管理')">合同管理</span>
      </div> -->

      <div class="part1" style="height: 200px"><TopInfoView :type="1" ref="TopInfoView" /></div>

      <div class="part7">
        <div
          v-hasPermi="['contract:project:add']"
          class="part7item"
          style="background: #409eff"
          @click="goRoute('添加项目合同')"
        >
          添加项目合同
        </div>
        <div
          v-hasPermi="['contract:outsourcing:add']"
          class="part7item"
          style="background: #fac06a"
          @click="goRoute('添加外委合同')"
        >
          添加外委合同
        </div>
        <!-- <div
          v-hasPermi="['contract:labor:add']"
          class="part7item"
          style="background: #2fd052"
          @click="goRoute('添加劳动合同')"
        >
          添加劳动合同
        </div> -->
        <!-- <div
          v-hasPermi="['contract:propertyBuy:add']"
          class="part7item"
          style="background: #aac1ff"
          @click="goRoute('添加采购合同')"
        >
          添加采购合同
        </div> -->
        <div
          v-hasPermi="['contract:project:list']"
          class="part7item"
          style="background: #2fd052"
          @click="goRoute('查找项目合同')"
        >
          查找项目合同
        </div>

        <div
          v-hasPermi="['contract:outsourcing:list']"
          class="part7item"
          style="background: #aac1ff"
          @click="goRoute('查找外委合同')"
        >
          查找外委合同
        </div>
        <!-- <div
          v-hasPermi="['contract:labor:list']"
          class="part7item"
          style="background: #fac06a"
          @click="goRoute('查找劳动合同')"
        >
          查找劳动合同
        </div> -->
      </div>

      <div class="part6">
        <div class="part6item" style="height: 370px"><TableAll :type="13" /></div>
        <!-- <div class="part6item" style="height: 370px"><LineChart :type="1" ref="LineChart" /></div> -->
        <div class="part6item" style="height: 370px"><RegionView :type="1" /></div>
      </div>

      <div class="part2">
        <!-- <div class="part2item" style="height: 370px"><PieChart :type="0" /></div>
        <div class="part2item" style="height: 370px"><PieChart :type="1" /></div> -->
        <div class="part2item" style="height: 370px"><LineChart :type="1" /></div>
        <div class="part2item" style="height: 370px"><LineChart :type="7" /></div>
        <div class="part2item" style="height: 370px"><PieChart :type="24" /></div>
      </div>
      <!-- 1:1.5 -->
      <!-- <div class="part4">
        <div class="part4item" style="height: 200px">
          <MenuNav :type="1" />
        </div>
        <div class="part4item" style="height: 200px">
          <TopInfoView :type="1" ref="TopInfoView" />
        </div>
      </div>
      <div class="part4">
        <div class="part4item" style="height: 370px"><BarChart :type="0" /></div>
        <div class="part4item" style="height: 370px"><LineChart :type="1" ref="LineChart" /></div>
      </div>
      <div class="part2">
        <div class="part2item" style="height: 370px"><PieChart :type="0" /></div>
        <div class="part2item" style="height: 370px"><PieChart :type="1" /></div>
        <div class="part2item" style="height: 370px"></div>
      </div> -->
    </div>
  </div>
</template>

<script>
import RegionView from '@/components/Analysis/regionview';
import TopInfoView from '@/components/Analysis/topinfoview';
import MenuNav from '@/components/Analysis/menuNav';
import LineChart from '@/components/Analysis/lineChart';
import BarChart from '@/components/Analysis/barchart';
import PieChart from '@/components/Analysis/piechart';
import TableAll from '@/components/Analysis/tableAll';
export default {
  name: 'ContractManagement', //合同管理统计分析
  components: {
    TopInfoView,
    MenuNav,
    LineChart,
    BarChart,
    PieChart,
    TableAll,
    RegionView,
  },
  data() {
    return {};
  },
  methods: {
    goRoute(val) {
      switch (val) {
        case '添加项目合同':
          this.$router.push({ path: '/data-d/projectContractAdd' });
          break;
        case '添加外委合同':
          this.$router.push({ path: '/data-d/outsourcingContractAdd' });
          break;
        case '添加劳动合同':
          this.$router.push({ path: '/data-d/laborContractAdd' });
          break;
        case '添加采购合同':
          this.$router.push({ path: '/data-d/fixedAssetsPCAdd' });
          break;
        case '查找项目合同':
          this.$router.push({ path: '/data/contractmanagement/projectContractIndex' });
          break;
        case '查找劳动合同':
          this.$router.push({ path: '/data/contractmanagement/laborContractIndex' });
          break;
        case '查找外委合同':
          this.$router.push({ path: '/data/contractmanagement/outsourcingContractIndex' });
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
      height: 100px;
      cursor: pointer;
      font-size: 30px;
      line-height: 100px;
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
