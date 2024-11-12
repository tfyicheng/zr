<template class="app-container">
  <div class="appo">
    <div class="appi">
      <NavTop :val="['资料管理', '证书管理']" />

      <div class="part1" style="height: 200px"><TopInfoView :type="0" ref="TopInfoView" /></div>

      <div class="part7">
        <div
          v-hasPermi="['certificate:cert0:add']"
          class="part7item"
          style="background: #409eff"
          @click="goRoute('添加证书')"
        >
          添加证书
        </div>
        <div
          v-hasPermi="['certificate:cert0:list']"
          class="part7item"
          style="background: #fac06a"
          @click="goRoute('查找证书')"
        >
          查找证书
        </div>
      </div>

      <div class="part1" style="height: 660px"><TableAll :type="0" ref="TableAll" /></div>

      <!-- <div class="part4">
        <div class="part4item" style="height: 380px"><OverView :type="1" ref="OverView" /></div>
        <div class="part4item" style="height: 380px"></div>
      </div> -->

      <div class="part6">
        <div class="part6item" style="height: 370px"><TableAll :type="12" /></div>
        <!-- <div class="part6item" style="height: 370px"><LineChart :type="0" ref="LineChart" /></div> -->
        <div class="part6item" style="height: 370px"><LineChart :type="42" ref="LineChart" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import OverView from '@/components/Analysis/overview';
import TopInfoView from '@/components/Analysis/topinfoview';
import LineChart from '@/components/Analysis/lineChart';
import TableAll from '@/components/Analysis/tableAll';

export default {
  name: 'CertificatesIndex', //证书管理概览
  components: {
    TopInfoView,
    OverView,
    LineChart,
    TableAll,
  },
  data() {
    return {
      goRoute(val) {
        switch (val) {
          case '添加证书':
            this.$router.push({ path: '/data-d/certificatesAdd' });
            break;
          case '查找证书':
            this.$router.push({ path: '/data-d/certificatesCheck' });
            break;
          case '证书列表':
            this.$router.push({ path: '/data-d/certificatesCheck' });
            break;
          default:
            break;
        }
      },
    };
  },
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name) {
        // this.$refs.TopInfoView.refresh();
        // this.$refs.OverView.refresh();
        // this.$refs.LineChart.refresh();
        // this.$refs.TableAll.refresh();
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
      height: 370px;
      //min-width: 386px;
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
      height: 500px;
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
      height: 90px;
      cursor: pointer;
      line-height: 90px;
      color: #fff;
      font-size: 30px;
      margin-right: 20px;
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
