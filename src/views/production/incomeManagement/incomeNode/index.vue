<template class="app-container">
  <div class="appo">
    <div class="appi">
      <NavTop :val="['生产管理', '收款节点管理']" />
      <!-- <div class="top" style="margin-bottom: 15px">
        <svg-icon
          icon-class="back"
          style="cursor: hand; margin-right: 15px"
          @click="commonFun.goTo('生产管理')"
        />
        <span style="cursor: pointer" @click="commonFun.goTo('生产管理')">生产管理</span>
        <span> > </span>
        <span style="cursor: pointer" @click="commonFun.goTo('收款节点统计')">收款节点统计</span>
      </div> -->

      <div class="part1" style="height: 200px"><TopInfoView :type="8" ref="TopInfoView" /></div>

      <div class="part7">
        <!-- <div
          v-hasPermi="['contract:payment0:list']"
          class="part7item"
          style="background: #409eff"
          @click="goRoute('编辑收款节点')"
        >
          编辑收款节点
        </div> -->
        <div
          v-hasPermi="['contract:payment0:list']"
          class="part7item"
          style="background: #fac06a"
          @click="goRoute('查找收款节点')"
        >
          查找收款节点
        </div>
        <div
          v-hasPermi="['contract:payment0:list']"
          class="part7item"
          style="background: #2fd052; visibility: hidden"
          @click="goRoute('收款节点列表')"
        >
          收款节点列表
        </div>
      </div>

      <div class="part6">
        <div class="part6item" style="height: 370px"><TableAll :type="22" /></div>
        <div class="part6item" style="height: 370px"><TableAll :type="6" ref="TableAll" /></div>
      </div>

      <div class="part2">
        <div class="part2item" style="height: 370px"><LineChart :type="8" /></div>
        <div class="part2item" style="height: 370px"></div>
        <div class="part2item" style="height: 370px"></div>
      </div>

      <!-- <div class="part1" style="height: 200px"><TopInfoView :type="8" ref="TopInfoView" /></div>

  
      <div class="part4">
        <div class="part4item" style="height: 370px"><TableAll :type="6" ref="TableAll" /></div>
        <div class="part4item" style="height: 370px"><LineChart :type="8" /></div>
      </div> -->
    </div>
  </div>
</template>

<script>
import TableAll from '@/components/Analysis/tableAll';
import LineChart from '@/components/Analysis/lineChart';
import TopInfoView from '@/components/Analysis/topinfoview';
export default {
  name: 'IncomeNodeIndex', //收款节点
  components: {
    TopInfoView,
    LineChart,
    TableAll,
  },
  data() {
    return {};
  },
  methods: {
    goRoute(val) {
      switch (val) {
        case '编辑收款节点':
          this.$router.push({ path: '/production-d/incomeNodeCheck' });
          break;
        case '查找收款节点':
          this.$router.push({ path: '/production-d/incomeNodeCheck' });
          break;
        case '收款节点列表':
          this.$router.push({ path: '/production-d/incomeNodeCheck' });
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
        // this.$refs.TableAll.refresh();
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/indexModel.scss';
// .appo {
//   overflow: auto;
// }

// .appi {
//   margin: 20px;
//   min-width: 1220px;
//   .part1 {
//     background: #e4e6ed;
//     width: 100%;
//     margin-bottom: 30px;
//     box-shadow: 0px 0px 12px 0px #00000005;
//     border-radius: 5px;
//     overflow: hidden;
//   }
//   .part2 {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     margin-bottom: 30px;
//     .part2item {
//       background: #e4e6ed;
//       flex: 1;
//       margin-right: 20px;
//       min-width: 386px;
//       box-shadow: 0px 0px 12px 0px #00000005;
//       border-radius: 5px;
//       overflow: hidden;
//     }
//     .part2item:last-child {
//       margin-right: 0px;
//     }
//   }
//   .part3 {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     .part3item {
//       flex: 1.5;
//       margin-right: 20px;
//       background: #e4e6ed;
//       box-shadow: 0px 0px 12px 0px #00000005;
//       border-radius: 5px;
//       overflow: hidden;
//     }
//     .part3item:last-child {
//       flex: 1;
//       margin-right: 0px;
//     }
//   }
//   .part4 {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     margin-bottom: 30px;
//     .part4item {
//       flex: 0.98;
//       margin-right: 20px;
//       background: #e4e6ed;
//       box-shadow: 0px 0px 12px 0px #00000005;
//       border-radius: 5px;
//       overflow: hidden;
//     }
//     .part4item:last-child {
//       flex: 2;
//       margin-right: 0px;
//     }
//   }
// }
</style>
