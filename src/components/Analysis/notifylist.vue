<template class="app-container">
  <div class="cbody">
    <div class="top">
      <span class="toptitle"> {{ title }}</span>
      <!-- <svg-icon icon-class="more" /> -->
      <a class="toplink" v-show="tolink" @click="check()"> 查看更多</a>
    </div>
    <div class="main" v-if="type == 0">
      <div class="mitem" v-for="(c, index) in data1" :key="index">
        <div class="iteml" @click="toHandle(c)">
          {{ c.handleContent }}
        </div>
        <div class="itemr">{{ c.createTime }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { notice } from '@/api/data/statistic';
export default {
  name: 'NotifyList', //通知公告组件
  props: ['type'],
  data() {
    return {
      title: '', //标题
      tolink: '', //更多链接
      data1: {}, //类型1数据
      data2: [
        //   businessId
        // :
        // "1754437251646459904"
        // createTime
        // :
        // "2024-03-07 07:12:02"
        // handleContent
        // :
        // "null进度已更新"
        // type
        // :
        // 8
      ],
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
          this.title = '通知公告';
          this.tolink = '';
          break;
        default:
          break;
      }
      this.getData();
    },

    getData() {
      if (this.type == 0) {
        notice().then((res) => {
          if (res && res.code == 200) {
            this.data1 = res.data;
          }
        });
      }
    },

    check() {
      this.$router.push({ path: this.tolink });
    },

    toHandle(c) {
      //判断类型去查看页面
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
    padding: 20px;
    height: 100%;
    overflow: auto;
    .mitem {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      .iteml {
        flex: 1;
        cursor: pointer;
        margin-right: 10px;
      }
      .iteml:hover {
        color: #409eff;
      }
      .itemr {
        width: 170px;
        text-align: top;
      }
    }
  }
}
</style>
