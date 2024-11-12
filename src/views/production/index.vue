<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <div class="top" style="margin-bottom: 15px">
          <!-- <svg-icon icon-class="back" style="cursor: hand; margin-right: 15px" @click="commonFun.goTo('生产管理')"/> -->
          <span style="cursor: pointer" @click="commonFun.goTo('生产管理')">生产管理</span>
          <!-- <span> > </span>
          <span style="cursor: pointer" @click="commonFun.goTo('证书管理')">证书管理</span> -->
        </div>
        <!-- 2:1 -->
        <div class="part6">
          <div class="part6item" style="height: 200px"><MenuNav :type="5" /></div>
          <div class="part6item" style="height: 200px"><FuncNav :type="2" /></div>
        </div>

        <!-- 1:1:1 -->
        <div class="part2">
          <div class="part2item" style="height: 370px"><TableAll :type="6" /></div>
          <div class="part2item" style="height: 370px"><TableAll :type="7" /></div>
          <!-- <div class="part2item" style="height: 370px"><LineChart :type="3" /></div> -->
          <div class="part2item" style="height: 370px"><LineChart :type="39" /></div>
        </div>

        <!-- 2:1 -->
        <div class="part6">
          <div class="part6item" style="height: 370px"><TableAll :type="18" /></div>
          <!-- <div class="part6item" style="height: 370px"><LineChart :type="1" /></div> -->
          <div class="part6item" style="height: 370px"><LineChart :type="40" /></div>
        </div>

        <div class="part2">
          <div class="part2item" style="height: 370px"><LineChart :type="41" /></div>
          <div class="part2item" style="height: 370px"></div>
          <div class="part2item" style="height: 370px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/Analysis/lineChart';
import TableAll from '@/components/Analysis/tableAll';
import MenuNav from '@/components/Analysis/menuNav';
import FuncNav from '@/components/Analysis/funcNav';
export default {
  name: '', //生产管理门户
  components: { MenuNav, FuncNav, LineChart, TableAll },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.appo {
  overflow: auto;
}

.appi {
  margin: 20px;
  min-width: 1220px;
  .part1 {
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
}
</style>
