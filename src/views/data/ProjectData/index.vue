<template class="app-container">
  <div class="appo">
    <div class="appi">
      <NavTop :val="['资料管理', '项目资料管理']" />

      <div class="part1" style="height: 200px"><TopInfoView :type="3" /></div>

      <div class="part7">
        <div
          v-hasPermi="['project:data:add']"
          class="part7item"
          style="background: #409eff"
          @click="goRoute('添加项目资料')"
        >
          添加项目资料
        </div>
        <div
          v-hasPermi="['project:data:list']"
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
        <div class="part6item" style="height: 370px"><TableAll :type="15" /></div>
        <div class="part6item" style="height: 370px"><RegionView :type="0" /></div>
      </div>

      <div class="part6">
        <div class="part6item" style="height: 370px"><LineChart :type="4" /></div>
        <div class="part6item" style="height: 370px"></div>
      </div>
    </div>
    <!-- <div class="part1" style="height: 200px"><TopInfoView :type="3" /></div>
      
      <div class="part4">
        <div class="part4item" style="height: 370px"><RegionView :type="0" /></div>
        <div class="part4item" style="height: 370px"><LineChart :type="4" /></div>
      </div> -->
  </div>
</template>

<script>
import TableAll from '@/components/Analysis/tableAll';
import TopInfoView from '@/components/Analysis/topinfoview';
import LineChart from '@/components/Analysis/lineChart';
import RegionView from '@/components/Analysis/regionview';
export default {
  name: 'ProjectData', //项目资料首页
  components: {
    TopInfoView,
    LineChart,
    RegionView,
    TableAll,
  },
  data() {
    return {};
  },
  methods: {
    goRoute(val) {
      switch (val) {
        case '添加项目资料':
          this.$router.push({ path: '/data-d/projectDataAdd' });
          break;
        case '查找项目资料':
          this.$router.push({ path: '/data-d/projectdataCheck' });
          break;
        case '项目资料列表':
          this.$router.push({ path: '/data-d/projectdataCheck' });
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
