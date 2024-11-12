<template class="app-container">
  <div class="appo">
    <div class="appi">
      <NavTop :val="['项目管理', '项目计划管理']" />
      <!-- <div class="top" style="margin-bottom: 15px">
        <svg-icon
          icon-class="back"
          style="cursor: hand; margin-right: 15px"
          @click="commonFun.goTo('项目管理')"
        />
        <span style="cursor: pointer" @click="commonFun.goTo('项目管理')">项目管理</span>
        <span> > </span>
        <span style="cursor: pointer" @click="commonFun.goTo('项目计划统计')">项目计划统计</span>
      </div> -->

      <div class="part1" style="height: 200px"><TopInfoView :type="13" ref="TopInfoView" /></div>

      <div class="part7">
        <!-- <div
          v-hasPermi="['project:project:editPlan']"
          class="part7item"
          style="background: #409eff"
          @click="goRoute('添加项目计划')"
        >
          添加项目计划
        </div> -->
        <div
          v-hasPermi="['project:project:listPlan']"
          class="part7item"
          style="background: #fac06a"
          @click="goRoute('查找项目计划')"
        >
          查找项目计划
        </div>
        <div
          v-hasPermi="['project:project:listPlan']"
          class="part7item"
          style="background: #2fd052; visibility: hidden"
          @click="goRoute('项目计划列表')"
        >
          项目计划列表
        </div>
      </div>

      <div class="part6">
        <div class="part6item" style="height: 370px"><TableAll :type="32" /></div>
        <div class="part6item" style="height: 370px"><TableAll :type="8" /></div>
      </div>

      <div class="part2">
        <div class="part2item" style="height: 370px"><BarChart :type="7" /></div>
        <div class="part2item" style="height: 370px"></div>
        <div class="part2item" style="height: 370px"></div>
      </div>

      <!-- 1 -->
      <!-- <div class="part1" style="height: 200px"><TopInfoView :type="13" ref="TopInfoView" /></div> -->
      <!-- 1:1.5 -->
      <!-- <div class="part4">
        <div class="part4item" style="height: 790px">
          <div class="part4items"><BarChart :type="7" /></div>
          <div class="part4items"><TableAll :type="8" ref="TableAll" /></div>
        </div>
        <div class="part4item" style="height: 790px"><IndexCard :type="0" ref="IndexCard" /></div>
      </div> -->
    </div>
  </div>
</template>

<script>
import TopInfoView from '@/components/Analysis/topinfoview';
import TableAll from '@/components/Analysis/tableAll';
import BarChart from '@/components/Analysis/barchart';
import IndexCard from '@/components/Analysis/indexCard';
export default {
  name: 'ProjectPlanIndex', //项目计划统计分析
  components: {
    TopInfoView,
    TableAll,
    BarChart,
    IndexCard,
  },
  data() {
    return {};
  },
  methods: {
    goRoute(val) {
      switch (val) {
        case '添加项目计划':
          this.$router.push({ path: '/project-d/projectPlanCheck' });
          break;
        case '查找项目计划':
          this.$router.push({ path: '/project-d/projectPlanCheck' });
          break;
        case '项目计划列表':
          this.$router.push({ path: '/project-d/projectPlanCheck' });
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
        // this.$refs.IndexCard.refresh();
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/indexModel.scss';
</style>
