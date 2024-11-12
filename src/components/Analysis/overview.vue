<template class="app-container">
  <div class="cbody">
    <div class="top">
      <span class="toptitle"> {{ title }}</span>
      <!-- <svg-icon icon-class="more" /> -->
      <a class="toplink" v-show="tolink" @click="check()"> 查看更多</a>
    </div>
    <div class="main" v-if="type == 0">
      <div class="part1">
        <span class="part1t">合同概况</span>
        <div class="part1m">
          <div class="part1mi">
            <div class="partmit" style="color: #ff6161">{{ data1.discontinueNum }}</div>
            <div class="partmim">已中止</div>
          </div>
          <div class="part1mi">
            <div class="partmit" style="color: #409eff">{{ data1.executeNum }}</div>
            <div class="partmim">执行中</div>
          </div>
          <div class="part1mi">
            <div class="partmit" style="color: #2fd052">{{ data1.completeNum }}</div>
            <div class="partmim">已完成</div>
          </div>
          <div>
            <div class="partmit" style="color: #333">{{ data1.monthAddNum }}</div>
            <div class="partmim">本月新增</div>
          </div>
        </div>
      </div>
      <div class="part2">
        <span class="part2t">回款概况</span>
        <div class="part2m">
          <div class="part2mi">
            <div class="partmit" style="color: #333">
              {{ data1.canPaymentNum }}
            </div>
            <div class="partmim">可收款合同</div>
          </div>
          <div>
            <div class="partmit" style="color: #333">
              {{ this.commonFun.amountConversion2(data1.totalAmount) }}
              <!-- {{ data1.totalAmount }} -->
            </div>
            <div class="partmim">应回款金额（元）</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="type == 1" class="main2">
      <div class="part1">
        <span class="part1t"></span>
        <div class="part1m">
          <div class="part1mi">
            <div class="partmit" style="color: #409eff">{{ data2.aptitudeNum }}</div>
            <div class="partmim">资质证书</div>
          </div>
          <div class="part1mi">
            <div class="partmit" style="color: #409eff">{{ data2.awardsNum }}</div>
            <div class="partmim">获奖证书</div>
          </div>
          <div>
            <div class="partmit" style="color: #409eff">{{ data2.patentNum }}</div>
            <div class="partmim">专利证书</div>
          </div>
        </div>
      </div>
      <div class="part1">
        <span class="part1t"></span>
        <div class="part1m">
          <div class="part1mi">
            <div class="partmit" style="color: #409eff">0</div>
            <div class="partmim">荣誉证书</div>
          </div>
          <div class="part1mi">
            <div class="partmit" style="color: #409eff">0</div>
            <div class="partmim">软件著作权</div>
          </div>
          <div>
            <div class="partmit" style="color: black">{{ data2.expireNum }}</div>
            <div class="partmim">已过期证书</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { contInfo, certValidity } from '@/api/data/statistic';
export default {
  name: 'Overview', //概况组件
  props: ['type'], //0合同管理 1证书有效期
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
          this.title = '合同管理';
          this.tolink = '/data/contractmanagement/projectContractIndex';

          break;
        case 1:
          this.title = '证书有效期低于一年';
          break;
        default:
          break;
      }
      this.getData();
    },

    getData() {
      if (this.type == 0) {
        contInfo().then((res) => {
          if (res && res.code == 200) {
            this.data1 = res.data;
          }
        });
      }
      if (this.type == 1) {
        certValidity().then((res) => {
          if (res && res.code == 200) {
            this.data2 = res.data;
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
    border-radius: 4px;
    background: #fff;
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.02);
    padding: 10px;
    height: 100%;
    .part1 {
      border-radius: 2px;
      background: linear-gradient(180deg, #ecf5ff 0%, rgba(255, 255, 255, 0) 100%);
      //width: 480px;
      //height: 140px;
      height: auto;
      flex-shrink: 0;
      margin: 10px;
      padding: 0px;
      margin-bottom: 48px;
      .part1t {
        color: #333;
        font-family: Alibaba PuHuiTi 2;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        text-transform: capitalize;
        display: block;
        margin: 10px auto;
        padding-top: 10px;
        padding-bottom: 15px;
        text-align: center;
      }
      .part1m {
        display: flex;
        .part1mi {
          height: 40px;
          flex: 1;
          border-right: 1px solid #e4e6ed;
        }
        div {
          height: 40px;
          flex: 1;
        }
      }
    }
    .part2 {
      border-radius: 2px;
      background: linear-gradient(180deg, rgba(250, 192, 106, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
      //width: 480px;
      //height: 140px;
      height: auto;
      flex-shrink: 0;
      margin: 20px 10px 10px 10px;
      padding: 0px;
      margin-bottom: 48px;
      .part2t {
        color: #333;
        font-family: Alibaba PuHuiTi 2;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        text-transform: capitalize;
        display: block;
        margin: 10px auto;
        padding-top: 10px;
        padding-bottom: 15px;
        text-align: center;
      }
      .part2m {
        display: flex;
        .part2mi {
          height: 40px;
          flex: 1;
          border-right: 1px solid #e4e6ed;
        }
        div {
          height: 40px;
          flex: 3;
        }
      }
    }
    .partmit {
      font-family: Alibaba PuHuiTi 2;
      font-size: 24px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      text-transform: capitalize;
      height: 28px !important;
      display: block;
      margin: 0px auto;
      text-align: center;
    }
    .partmim {
      color: #666;
      font-family: Alibaba PuHuiTi 2;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-transform: capitalize;
      height: 0px !important;
      display: block;
      margin: 0px auto;
      text-align: center;
    }
  }
  .main2 {
    border-radius: 4px;
    background: #fff;
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.02);
    padding: 10px;
    .part1 {
      border-radius: 2px;
      background: linear-gradient(180deg, #ecf5ff 0%, rgba(255, 255, 255, 0) 100%);
      //width: 480px;
      //height: 140px;
      height: auto;
      flex-shrink: 0;
      margin: 10px;
      padding: 0px;
      margin-bottom: 48px;
      .part1t {
        color: #333;
        font-family: Alibaba PuHuiTi 2;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        text-transform: capitalize;
        display: block;
        margin: 10px auto;
        padding-top: 10px;
        padding-bottom: 15px;
        text-align: center;
      }
      .part1m {
        display: flex;
        .part1mi {
          height: 40px;
          flex: 1;
          border-right: 1px solid #e4e6ed;
        }
        div {
          height: 40px;
          flex: 1;
        }
      }
    }
    .part2 {
      border-radius: 2px;
      background: linear-gradient(180deg, rgba(250, 192, 106, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
      //width: 480px;
      //height: 140px;
      height: auto;
      flex-shrink: 0;
      margin: 20px 10px 10px 10px;
      padding: 0px;
      margin-bottom: 48px;
      .part2t {
        color: #333;
        font-family: Alibaba PuHuiTi 2;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        text-transform: capitalize;
        display: block;
        margin: 10px auto;
        padding-top: 10px;
        padding-bottom: 15px;
        text-align: center;
      }
      .part2m {
        display: flex;
        .part2mi {
          height: 40px;
          flex: 1;
          border-right: 1px solid #e4e6ed;
        }
        div {
          height: 40px;
          flex: 3;
        }
      }
    }
    .partmit {
      font-family: Alibaba PuHuiTi 2;
      font-size: 24px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      text-transform: capitalize;
      height: 28px !important;
      display: block;
      margin: 0px auto;
      text-align: center;
    }
    .partmim {
      color: #666;
      font-family: Alibaba PuHuiTi 2;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-transform: capitalize;
      height: 0px !important;
      display: block;
      margin: 0px auto;
      text-align: center;
    }
  }
}
</style>
