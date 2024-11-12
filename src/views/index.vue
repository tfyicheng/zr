<template class="app-container">
  <div class="appo">
    <div class="appi">
      <!-- <div class="part4">
        <div class="part4item" style="height: 370px"><MenuNav :type="0" /></div>
        <div class="part4item" style="height: 370px"><LineChart :type="3" /></div>
      </div>
      <div class="part4">
        <div class="part4item" style="height: 370px"><TableAll :type="1" ref="TableAll" /></div>
        <div class="part4item" style="height: 370px"><LineChart :type="1" /></div>
      </div>
      <div class="part4">
        <div class="part4item" style="height: 370px"><TableAll :type="2" ref="TableAll" /></div>
        <div class="part4item" style="height: 370px"><TableAll :type="3" ref="TableAll" /></div>
      </div> -->

      <!-- 1:1.5 -->
      <div class="top" style="margin-bottom: 15px">
        <span>工作台</span>
      </div>
      <!-- <div class="part3">
        <div class="part3item" style="height: 200px"><MenuNav :type="0" /></div>
        <div class="part3item" style="height: 200px"><FuncNav :type="0" /></div>
      </div>
      
      <div class="part3">
        <div class="part3item" style="height: 370px"><TableAll :type="68" ref="TableAll" /></div>
        <div class="part3item" style="height: 370px"><LineChart :type="39" /></div>
      </div>
      
      <div class="part2">
        <div class="part2item" style="height: 370px"><LineChart :type="40" /></div>
        <div class="part2item" style="height: 370px"><LineChart :type="41" /></div>
      </div>

      <div class="part2">
        <div class="part2item" style="height: 370px"><TableAll :type="69" ref="TableAll" /></div>
      </div> -->

      <div class="part0">
        <div class="part0l">
          <div class="partitem" style="height: 200px"><MenuNav :type="0" /></div>
          <div class="partitem" style="height: 460px"><TableAll :type="68" ref="TableAll" /></div>
          <div class="partitem" style="height: 460px"><TableAll :type="69" ref="TableAll" /></div>
        </div>
        <div class="part0r">
          <div class="partitem" style="height: 370px"><LineChart :type="39" /></div>
          <div class="partitem" style="height: 370px"><LineChart :type="40" /></div>
          <div class="partitem" style="height: 370px"><LineChart :type="41" /></div>
        </div>
      </div>

      <!-- <div class="part3">
        <div class="part3item" style="height: 460px"><TableAll :type="70" ref="TableAll" /></div>
        <div class="part3item" style="height: 46px"></div>
      </div> -->
    </div>
  </div>
</template>

<script>
import MenuNav from '@/components/Analysis/menuNav';
import LineChart from '@/components/Analysis/lineChart';
import TableAll from '@/components/Analysis/tableAll';
import FuncNav from '@/components/Analysis/funcNav';
export default {
  name: 'Index', //工作台首页
  components: {
    LineChart,
    MenuNav,
    TableAll,
    FuncNav,
  },
  data() {
    return {};
  },
  methods: {
    test() {
      this.$router.push({ path: '/data/certificates/certificatesCheck' });
    },
  },
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name) {
        this.$refs.TableAll.refresh();
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
    margin-bottom: 30px;
    .part3item {
      flex: 2.04;
      margin-right: 20px;
      //background: #e4e6ed;
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

  .part0 {
    display: flex;

    .part0l {
      flex: 2;
      //  display: flex;
      // flex-direction: column;
      margin-right: 20px;
      .partitem {
        margin-bottom: 30px;
        background: #e4e6ed;
        box-shadow: 0px 0px 12px 0px #00000005;
        border-radius: 5px;
        overflow: hidden;
      }
    }
    .part0r {
      flex: 1;
      //   display: flex;
      //  flex-direction: column;
      .partitem {
        margin-bottom: 30px;
        background: #e4e6ed;
        box-shadow: 0px 0px 12px 0px #00000005;
        border-radius: 5px;
        overflow: hidden;
      }
    }
  }
}
</style>
