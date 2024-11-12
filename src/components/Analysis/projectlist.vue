<template class="app-container">
  <div class="cbody">
    <div class="top">
      <span class="toptitle"> {{ title }}</span>
      <!-- <svg-icon icon-class="more" /> -->
      <a class="toplink" v-show="tolink" @click="check()"> 查看更多</a>
    </div>
    <div class="main" v-if="type == 0"></div>
  </div>
</template>

<script>
import { xxx } from '@/api/data/statistic';
export default {
  name: 'ProjectList', //项目信息列表组件
  props: ['type'],
  data() {
    return {
      title: '', //标题
      tolink: '', //更多链接
      data1: {}, //类型1数据
      data2: {},
    };
  },
  created() {
    this.init();
  },
  methods: {
    //刷新
    refresh() {
      this.init();
    },

    //初始化
    init() {
      switch (this.type) {
        case 0:
          this.title = '项目管理';
          this.tolink = '/project-d/projectCheck';
          break;
        default:
          break;
      }
      this.getData();
    },

    getData() {
      if (this.type == 0) {
        xxx().then((res) => {
          if (res && res.code == 200) {
            this.data1 = res.data;
          }
        });
      }
    },

    check() {
      this.$router.push({ path: this.tolink });
    },
  },
};
</script>
<style lang="scss" scoped>
.cbody {
  background: #fff;
  height: 100%;
  .top {
    background: #fff;
    padding: 0 20px;
    height: 60px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e4e6ed;
    .toptitle {
      font-family: Alibaba PuHuiTi 2;
      font-size: 20px;
      font-weight: 500;
      line-height: 60px;
      letter-spacing: 0em;
      text-align: left;
      margin-right: 20px;
    }
    .toptitle:first-child:before {
      content: '\00a0 ';
      border-left: 3px solid #4da0ff;
      margin-right: 5px;
    }
    span {
      margin: 0px;
      color: #333;
      font-family: Alibaba PuHuiTi 2;
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: 60px;
    }
    a {
      margin-top: 3px;
      color: #409eff;
      font-family: Alibaba PuHuiTi 2;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 60px;
      text-transform: capitalize;
      cursor: pointer;
    }
  }
  .main {
  }
}
</style>
