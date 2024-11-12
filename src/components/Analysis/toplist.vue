<template class="app-container">
  <div div class="cbody">
    <div class="top">
      <span class="toptitle"> {{ title }}</span>
      <!-- <a>查看更多</a> -->
    </div>
    <div class="main" v-if="type == 0">
      <div class="content">
        <!-- .slice(0, forlimt) -->
        <div class="limian" v-for="(item, index) in data1" :key="index">
          <div class="litop">
            <el-tooltip
              aria-disabled="no"
              :content="item.name"
              placement="top"
              :disabled="istooltipshow(item.name)"
            >
              <div class="litopt">
                {{ item.name }}
              </div>
            </el-tooltip>
          </div>

          <div class="licontent">
            <div>
              <el-progress
                :percentage="formatShow(item.totalAmount, index)"
                :show-text="true"
                :text-inside="true"
                :format="format1(item)"
              ></el-progress>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { contAmountTop } from '@/api/data/statistic';

export default {
  name: 'Toplist', //top列表组件
  props: ['type'],
  data() {
    return {
      title: '',
      data1: [], //类型1数据
      forlimt: 10, //限制展示数
      // linfo: [
      //   {
      //     title: '公司组织/个人证书',
      //     number: 995714.729,
      //   },
      //   {
      //     title: '项目合同',
      //     number: 412056.21,
      //   },
      //   {
      //     title: '项目信息',
      //     number: 287097.59,
      //   },
      //   {
      //     title: '个人信息',
      //     number: 157407.09,
      //   },
      //   {
      //     title: '个人信息个人信息个人信息个人信息个人信息个人信息个人信息',
      //     number: 1100,
      //   },
      // ],
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
          this.title = '客户合同签约金额TOP5';
          break;
        default:
          break;
      }
      this.getData();
    },

    getData() {
      if (this.type == 0) {
        contAmountTop().then((res) => {
          if (res && res.code == 200) {
            this.data1 = res.data;
          }
        });
      }
    },

    istooltipshow(val) {
      if (val.length > 20) {
        return false;
      } else {
        return true;
      }
    },

    format1(row) {
      return () => {
        return this.commonFun.amountConversion(row.totalAmount);
      };
    },

    //样式长度
    formatShow(varr, index) {
      try {
        //最终要减少30预留展示空间
        if (index == 0) {
          return 70;
        } else {
          // console.log(index + '----' + (varr / this.data1[0].totalAmount) * 0.7);
          if ((varr / this.data1[0].totalAmount) * 100 * 0.7 < 5) {
            return 5;
          } else {
            return (varr / this.data1[0].totalAmount) * 100 * 0.7;
          }
        }
      } catch (error) {
        console.log(error);
        return 70;
      }
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
      line-height: 12px;
      text-transform: capitalize;
      cursor: pointer;
    }
  }
  .main {
    border-radius: 4px;
    background: #fff;
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.02);
    //height: 340px;
    height: 100%;
    overflow-y: hidden;
    .content {
      //height: 340px;
      height: 100%;
      overflow-y: hidden;
      .limian {
        margin: 20px;
        .litop {
          .litopt {
            width: 300px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        .licontent {
          .licontentval {
            height: 64px;
            line-height: 64px;
          }
        }
      }
    }
  }

  .main :hover {
    overflow-y: overlay;
  }

  ::v-deep {
    .el-progress-bar {
      pointer-events: none;
      .el-progress-bar__outer {
        margin-top: 15px;
        background: none !important;
        height: 16px !important;

        .el-progress-bar__inner {
          height: 16px;

          .el-progress-bar__innerText {
            height: 14px !important;
            line-height: 14px;
            margin-left: 10px;
            font-size: 14px;
            position: absolute;
          }
        }
      }
    }

    // .el-progress .el-progress__text {
    //   height: 14px !important;
    //   line-height: 14px;
    //   margin-left: 10px;
    //   font-size: 14px!important;
    //   position: absolute;
    // }
  }
}
</style>
