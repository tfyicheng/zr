<template class="app-container">
  <div class="appo">
    <div class="appi">
      <NavTop :val="['项目管理', '项目进度管理']" />
      <!-- <div class="top" style="margin-bottom: 15px">
        <svg-icon
          icon-class="back"
          style="cursor: hand; margin-right: 15px"
          @click="commonFun.goTo('项目管理')"
        />
        <span style="cursor: pointer" @click="commonFun.goTo('项目管理')">项目管理</span>
        <span> > </span>
        <span style="cursor: pointer" @click="commonFun.goTo('项目进度统计')">项目进度统计</span>
      </div> -->

      <div class="part7">
        <!-- <div
          v-hasPermi="['project:progress:edit']"
          class="part7item"
          style="background: #409eff"
          @click="goRoute('添加项目进度')"
        >
          添加项目进度
        </div> -->
        <div
          v-hasPermi="['project:progress:list']"
          class="part7item"
          style="background: #fac06a"
          @click="goRoute('查找项目进度')"
        >
          查找项目进度
        </div>
        <div
          v-hasPermi="['project:progress:list']"
          class="part7item"
          style="background: #2fd052; visibility: hidden"
          @click="goRoute('项目进度列表')"
        >
          项目进度列表
        </div>
      </div>

      <div class="part6">
        <div class="part6item" style="height: 370px"><TableAll :type="3" /></div>
        <div class="part6item" style="height: 370px"><PieChart :type="11" /></div>
      </div>

      <div class="part6">
        <div class="part6item" style="height: 370px"><TableAll :type="33" /></div>
        <div class="part6item" style="height: 370px"><LineChart :type="14" /></div>
      </div>

      <!-- 1:1.5 -->
      <!-- <div class="part4">
        <div class="part4item" style="height: 370px"><BarChart :type="8" /></div>
        <div class="part4item" style="height: 370px"><LineChart :type="14" /></div>
      </div>
      <div class="part4">
        <div class="part4item" style="height: 370px"><PieChart :type="11" /></div>
        <div class="part4item" style="height: 370px"><TableAll :type="3" ref="TableAll" /></div>
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
  name: 'ProjectProcessIndex', //项目进度统计分析
  components: {
    TableAll,
    BarChart,
    PieChart,
    LineChart,
  },
  data() {
    return {};
  },
  methods: {
    goRoute(val) {
      switch (val) {
        case '添加项目进度':
          this.$router.push({ path: '/project-d/projectProcessCheck' });
          break;
        case '查找项目进度':
          this.$router.push({ path: '/project-d/projectProcessCheck' });
          break;
        case '项目进度列表':
          this.$router.push({ path: '/project-d/projectProcessCheck' });
          break;
        default:
          break;
      }
    },
  },
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name) {
        // this.$refs.TableAll.refresh();
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/indexModel.scss';
</style>
