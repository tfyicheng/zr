<template class="app-container">
  <div class="appo">
    <div class="appi">
      <!-- 1 -->
      <div class="part1" style="height: 200px"><TopInfoView :type="0" ref="TopInfoView" /></div>

      <!-- 1:1:1 -->
      <div class="part2">
        <div class="part2item" style="height: 370px"></div>
        <div class="part2item" style="height: 370px"></div>
        <div class="part2item" style="height: 370px"></div>
      </div>

      <!-- 1.5:1 -->
      <div class="part3">
        <div class="part3item" style="height: 370px"></div>
        <div class="part3item" style="height: 370px"></div>
      </div>

      <!-- 1:1.5 -->
      <div class="part4">
        <div class="part4item" style="height: 370px"></div>
        <div class="part4item" style="height: 370px"></div>
      </div>

      <!-- 1:2 -->
      <div class="part5">
        <div class="part5item" style="height: 370px"></div>
        <div class="part5item" style="height: 370px"></div>
      </div>

      <!-- 2:1 -->
      <div class="part6">
        <div class="part6item" style="height: 370px"></div>
        <div class="part6item" style="height: 370px"></div>
      </div>

      <!-- 1:1:1:n -->
      <div class="part7">
        <div class="part7item" style="height: 100px"></div>
        <div class="part7item" style="height: 100px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import TopInfoView from '@/components/Analysis/topinfoview';
export default {
  name: 'Index', //首页模版示例
  components: {
    TopInfoView,
  },
  data() {
    return {};
  },
  methods: {},
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
