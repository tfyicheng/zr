<template class="app-container">
  <div class="cbody">
    <div class="top">
      <!-- style="width: 180; overflow: hidden" -->
      <el-tooltip effect="dark" :content="title" placement="top-start">
        <span class="toptitle"> {{ title }}</span>
      </el-tooltip>
      <!-- <svg-icon icon-class="more" /> -->
      <div class="topmenu">
        <a class="toplink" v-show="tolink" @click="check()"> 查看更多</a>
        <el-date-picker
          v-if="type != 11 && type != 12 && type != 26 && type != 21 && type != 22"
          style="width: 190px"
          unlink-panels
          v-model="options"
          type="monthrange"
          value-format="yyyy-MM"
          range-separator="~"
          @change="getDate()"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <!-- <el-select v-model="options" placeholder="最近一年" @change="getDate()" v-show="type != 11">
          <el-option
            v-for="item in commonFun.compoYears"
            :key="item.key"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select> -->
      </div>
    </div>
    <div class="main">
      <div id="main_pie" ref="main_pie" style="width: 100%; height: 320px"></div>
    </div>
  </div>
</template>

<script>
import {
  prjContAmount,
  prjContPayment,
  infoOuto,
  infoOutt,
  dreason,
  outContAmount,
  outContPayment,
  clientStatus,
  clientNum,
  projectType,
  handoverReason,
  progressStatus,
  projectDataYear,
  contractType,
  contractTypet,
  contractpaymentTypet,
  contractpaymentType,
  contractpaymentClient,
  contractpaymentClientt,
  contMoney,
  useStoreSum,
  outStoreSum,
  useCarType,
  carMileage,
  carBrand,
  performancetype,
  contTypeStatistic,
  bidType,
  prjDataPlaceYear,
  infoSex,
  stockType,
} from '@/api/data/statistic';
export default {
  name: 'PieChart', //饼状图组件
  props: ['type'],
  data() {
    return {
      title: '', //标题
      tolink: '', //更多链接
      options: [],
      data1: [], //类型1数据
      data2: [],
      xy_data: [
        // { name: '一', value: 100, value2: 190 },
        // { name: '二', value: 180, value2: 110 },
        // { name: '三', value: 120, value2: 170 },
        // { name: '四', value: 160, value2: 160 },
        // { name: '五', value: 140, value2: 130 },
        // { name: '六', value: 280, value2: 240 },
        // { name: '七', value: 320, value2: 300 },
      ],
      ec: null,
    };
  },
  mounted() {},
  created() {
    this.init();
    // this.initPie();
  },
  beforeDestroy() {
    // this.ec = this.$echarts.init(document.getElementById('main_pie'));
    if (this.ec) {
      window.removeEventListener('resize', () => {
        this.ec.resize();
      });
      this.ec.dispose();
    }
  },
  methods: {
    destroy() {
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
    },

    initPie() {
      this.$nextTick(() => {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('main_pie'));

        // 指定图表的配置项和数据
        let option = {
          // 全局颜色配置
          color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622'],
          // echarts标题
          title: {
            text: '',
          },
          tooltip: {},
          // legend中的data一定要跟series里面的data的name保持命名一致，否则无效，不会显示legend
          legend: {
            // x:"70%",
            show: true,
            type: 'plain',
            left: 'right',
            top: 'middle',
            width: 100,
            // orient: 'vertical',
            // y: '22%',
            // x: '50%',
            data: this.xy_data.map((item) => {
              return {
                name: item.name.concat('月'),
              };
            }),
          },
          series: [
            {
              center: ['40%', '50%'], //饼图位置
              // 数据全为0也显示扇区
              stillShowZeroSum: true,
              // 是否高亮
              legendHoverLink: true,
              // 玫瑰图
              // roseType: 'area',
              name: '',
              // 如果有两个值，则为圆环图，第一个值为内半径，第二个值为外半径
              // radius: ['20%', '60%'],
              radius: '70%',
              // 饼状图标签
              label: {
                show: true,
                // 标签显示的位置，默认为outside
                // position: 'inside',
                // 字符串模板,可对文本标签内容进行设置
                //{a}：系列名。{b}：数据名。{c}：数据值。{d}：百分比。等等，详细见网站
                formatter: '{b}:{d}%',
              },
              // 此系列自己的调色盘。优先级高于全局颜色配置
              // color: [
              //   '#dd6b66',
              //   '#759aa0',
              //   '#e69d87',
              //   '#8dc1a9',
              //   '#ea7e53',
              //   '#eedd78',
              //   '#73a373',
              // ],
              type: 'pie',
              data: this.xy_data.map((item) => {
                return {
                  name: item.name + '月',
                  value: item.value,
                };
              }),
              grid: {
                //  top: '0px',
                left: '0px',
                //  right: '0px',
                bottom: '0px',
              },
            },
          ],
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener('resize', () => {
          myChart.resize();
        });
      });
    },

    //测试初始化
    init() {
      //默认日期
      //this.options.push(this.commonFun.getLastMonth());
      //this.options.push(this.commonFun.getThisMonth());
      this.options = this.commonFun.compoYears[0].value;

      switch (this.type) {
        case 0:
          this.title = '项目合同金额统计';
          this.tolink = '';
          break;
        case 1:
          this.title = '项目合同收款比例统计';
          this.tolink = '';
          break;
        case 2:
          this.title = '人员外出情况统计';
          break;
        case 3:
          this.title = '人员请假情况统计';
          break;
        case 4:
          this.title = '申请事由统计';
          break;
        case 5:
          this.title = '外委合同金额统计';
          break;
        case 6:
          this.title = '外委合同付款比例统计';
          break;
        case 7:
          this.title = '项目/外委合同状态统计';
          break;
        case 8:
          this.title = '客户签订合同数统计';
          break;
        case 9:
          this.title = '项目类型统计';
          break;
        case 10:
          this.title = '交接原因统计';
          break;
        case 11:
          this.title = '项目计划状态统计';
          break;
        case 12:
          this.title = '项目资料年份统计';
          break;
        case 13:
          this.title = '票据类型统计';
          break;
        case 14:
          this.title = '票据类型统计';
          break;
        case 15:
          this.title = '收款方式统计';
          break;
        case 16:
          this.title = '付款方式统计';
          break;
        case 17:
          this.title = '采购合同金额统计';
          break;
        case 18:
          this.title = '领用仓库统计';
          break;
        case 19:
          this.title = '出库仓库统计';
          break;
        case 20:
          this.title = '车辆类型统计';
          break;
        case 21:
          this.title = '车辆行驶公里数统计';
          break;
        case 22:
          this.title = '车辆品牌统计';
          break;
        case 23:
          this.title = '项目类型统计';
          break;
        case 24:
          this.title = '合同类型统计';
          break;
        case 25:
          this.title = '投标类型统计';
          break;
        case 26:
          this.title = '人员性别统计';
          break;
        case 27:
          this.title = '入库类型统计';
          break;
        case 28:
          this.title = '领用类型统计';
          break;
        case 29:
          this.title = '报废类型统计';
          break;
        case 30:
          this.title = '入库类型统计';
          break;
        case 31:
          this.title = '领用类型统计';
          break;
        case 32:
          this.title = '报废类型统计';
          break;
        default:
          break;
      }
      this.getData();
    },

    getData() {
      if (this.type == 0) {
        if (this.options && this.options.length > 0) {
          prjContAmount({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.xy_data = res.data;
              this.reMarkAmount();
            }
          });
        }
      }
      if (this.type == 1) {
        if (this.options && this.options.length > 0) {
          prjContPayment({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.xy_data = res.data;
              this.reMarkPayment();
            }
          });
        }
      }
      if (this.type == 2) {
        if (this.options && this.options.length > 0) {
          infoOuto({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.xy_data = res.data;
              this.reMarkinfoOuto();
            }
          });
        }
      }
      if (this.type == 3) {
        if (this.options && this.options.length > 0) {
          infoOutt({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.xy_data = res.data;
              this.reMarkinfoOutt();
            }
          });
        }
      }
      if (this.type == 4) {
        if (this.options && this.options.length > 0) {
          dreason({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.xy_data = res.data;
              this.reMarkdreason();
            }
          });
        }
      }
      if (this.type == 5) {
        if (this.options && this.options.length > 0) {
          outContAmount({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.xy_data = res.data;
              this.reMarkoutContAmount();
            }
          });
        }
      }
      if (this.type == 6) {
        if (this.options && this.options.length > 0) {
          outContPayment({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.xy_data = res.data;
              this.reMarkoutContPayment();
            }
          });
        }
      }
      if (this.type == 7) {
        if (this.options && this.options.length > 0) {
          clientStatus({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.xy_data = res.data;
              this.reMarkclientStatus();
            }
          });
        }
      }
      if (this.type == 8) {
        if (this.options && this.options.length > 0) {
          clientNum({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.xy_data = res.data;
              this.reMarkclientNum();
            }
          });
        }
      }
      if (this.type == 9) {
        if (this.options && this.options.length > 0) {
          projectType({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.xy_data = res.data;
              this.reMarkprojectType();
            }
          });
        }
      }
      if (this.type == 10) {
        if (this.options && this.options.length > 0) {
          handoverReason({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.xy_data = res.data;
              this.reMarkhandoverReason();
            }
          });
        }
      }
      if (this.type == 11) {
        if (this.options && this.options.length > 0) {
          progressStatus().then((res) => {
            if (res && res.code == 200) {
              this.xy_data = res.data;
              this.reMarkprogressStatus();
            }
          });
        }
      }

      if (this.type == 12) {
        if (this.options && this.options.length > 0) {
          prjDataPlaceYear().then((res) => {
            // projectDataYear().then((res) => {
            if (res && res.code == 200) {
              this.xy_data = res.data;
              this.reMarkprojectDataYear();
            }
          });
        }
      }
      if (this.type == 13) {
        if (this.options && this.options.length > 0) {
          contractType({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.xy_data = res.data;
              this.reMarkcontractType();
            }
          });
        }
      }
      if (this.type == 14) {
        if (this.options && this.options.length > 0) {
          contractTypet({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.xy_data = res.data;
              this.reMarkcontractTypet();
            }
          });
        }
      }
      if (this.type == 15) {
        if (this.options && this.options.length > 0) {
          contractpaymentTypet({ startDate: this.options[0], endDate: this.options[1] }).then(
            (res) => {
              if (res && res.code == 200) {
                this.xy_data = res.data;
                this.reMarkcontractpaymentTypet();
              }
            },
          );
        }
      }
      if (this.type == 16) {
        if (this.options && this.options.length > 0) {
          contractpaymentType({ startDate: this.options[0], endDate: this.options[1] }).then(
            (res) => {
              if (res && res.code == 200) {
                this.xy_data = res.data;
                this.reMarkcontractpaymentType();
              }
            },
          );
        }
      }
      if (this.type == 17) {
        if (this.options && this.options.length > 0) {
          contMoney({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.xy_data = res.data;
              this.reMarkcontMoney();
            }
          });
        }
      }

      if (this.type == 18) {
        if (this.options && this.options.length > 0) {
          useStoreSum({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.xy_data = res.data;
              this.reMarkuseStore();
            }
          });
        }
      }

      if (this.type == 19) {
        if (this.options && this.options.length > 0) {
          outStoreSum({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.xy_data = res.data;
              this.reMarkoutStoreSum();
            }
          });
        }
      }

      if (this.type == 20) {
        if (this.options && this.options.length > 0) {
          useCarType({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.xy_data = res.data;
              this.reMarkuseCarType();
            }
          });
        }
      }

      if (this.type == 21) {
        if (this.options && this.options.length > 0) {
          carMileage({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.xy_data = res.data;
              this.reMarkcarMileage();
            }
          });
        }
      }

      if (this.type == 22) {
        if (this.options && this.options.length > 0) {
          carBrand({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.xy_data = res.data;
              this.reMarkcarBrand();
            }
          });
        }
      }
      if (this.type == 23) {
        if (this.options && this.options.length > 0) {
          performancetype({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.xy_data = res.data;
              this.reMarkperformancetype();
            }
          });
        }
      }

      if (this.type == 24) {
        if (this.options && this.options.length > 0) {
          contTypeStatistic({ startDate: this.options[0], endDate: this.options[1] }).then(
            (res) => {
              if (res && res.code == 200) {
                this.xy_data = res.data;
                this.reMarkcontTypeStatistic();
              }
            },
          );
        }
      }

      if (this.type == 25) {
        if (this.options && this.options.length > 0) {
          bidType({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.xy_data = res.data;
              this.reMarkbidType();
            }
          });
        }
      }

      if (this.type == 26) {
        if (this.options && this.options.length > 0) {
          infoSex({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.xy_data = res.data;
              this.reMarkinfoSex();
            }
          });
        }
      }

      if (this.type == 27) {
        if (this.options && this.options.length > 0) {
          stockType({
            type: 0,
            type2: 0,
            startDate: this.options[0],
            endDate: this.options[1],
          }).then((res) => {
            if (res && res.code == 200) {
              this.xy_data = res.data;
              this.reMarkstockType();
            }
          });
        }
      }

      if (this.type == 28) {
        if (this.options && this.options.length > 0) {
          stockType({
            type: 1,
            type2: 0,
            startDate: this.options[0],
            endDate: this.options[1],
          }).then((res) => {
            if (res && res.code == 200) {
              this.xy_data = res.data;
              this.reMarkstockType();
            }
          });
        }
      }
      if (this.type == 29) {
        if (this.options && this.options.length > 0) {
          stockType({
            type: 2,
            type2: 0,
            startDate: this.options[0],
            endDate: this.options[1],
          }).then((res) => {
            if (res && res.code == 200) {
              this.xy_data = res.data;
              this.reMarkstockType();
            }
          });
        }
      }

      if (this.type == 30) {
        if (this.options && this.options.length > 0) {
          stockType({
            type: 0,
            type2: 1,
            startDate: this.options[0],
            endDate: this.options[1],
          }).then((res) => {
            if (res && res.code == 200) {
              this.xy_data = res.data;
              this.reMarkstockType();
            }
          });
        }
      }

      if (this.type == 31) {
        if (this.options && this.options.length > 0) {
          stockType({
            type: 1,
            type2: 1,
            startDate: this.options[0],
            endDate: this.options[1],
          }).then((res) => {
            if (res && res.code == 200) {
              this.xy_data = res.data;
              this.reMarkstockType();
            }
          });
        }
      }
      if (this.type == 32) {
        if (this.options && this.options.length > 0) {
          stockType({
            type: 2,
            type2: 1,
            startDate: this.options[0],
            endDate: this.options[1],
          }).then((res) => {
            if (res && res.code == 200) {
              this.xy_data = res.data;
              this.reMarkstockType();
            }
          });
        }
      }
    },

    //触发更新数据
    getDate() {
      console.log(this.options);
      if (!this.options) {
        this.options = this.commonFun.compoYears[0].value;
      }
      this.getData();
    },

    check() {
      this.$router.push({ path: this.tolink });
    },

    // formatter(params){
    //      if (params) {
    //    return `${params.name}` + `\n\n${params.percent === undefined ? 0 params.percent}%`
    //  }
    //  return ''

    // },

    //计算总和
    getTotal() {
      if (this.xy_data && this.xy_data.length > 0) {
        let total = 0;
        this.xy_data.forEach((element) => {
          total += Number(element.value);
        });
        return total;
      } else {
        return 0;
      }
    },

    //初始化表
    initOption() {
      // 指定图表的配置项和数据
      let option = {
        // 全局颜色配置
        color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622'],
        // echarts标题
        title: {
          text: '总数(' + this.getTotal() + ')',
          textStyle: {
            fontSize: 17,
          },
        },
        tooltip: {},
        // legend中的data一定要跟series里面的data的name保持命名一致，否则无效，不会显示legend
        legend: {
          // x:"70%",
          show: true,
          type: 'plain',
          left: 'right',
          top: 'middle',
          width: 100,
          height: '80%', //图例容器的高度，超过会换行展示
          orient: 'vertical',
          //itemGap: 20, //设置图例的间距
          // y: '22%',
          // x: '50%',
          data: this.xy_data,
        },
        series: [
          {
            center: ['40%', '50%'], //饼图位置
            // 数据全为0也显示扇区
            stillShowZeroSum: true,
            // 是否高亮
            legendHoverLink: true,
            // 玫瑰图
            // roseType: 'area',
            name: '',
            // 如果有两个值，则为圆环图，第一个值为内半径，第二个值为外半径
            // radius: ['20%', '60%'],
            radius: '60%',
            // 饼状图标签
            label: {
              show: true,
              // 标签显示的位置，默认为outside
              // position: 'inside',
              // 字符串模板,可对文本标签内容进行设置
              //{a}：系列名。{b}：数据名。{c}：数据值。{d}：百分比。等等，详细见网站
              //formatter: '{b}:{d}%',
              formatter: (params) => {
                if (params.percent) {
                  return params.name + ' ' + params.value + '\n\r(' + params.percent + '%)';
                }
                return params.name + ' ' + params.value + '\n\r(0%)';
              },
            },
            // 此系列自己的调色盘。优先级高于全局颜色配置
            // color: [
            //   '#dd6b66',
            //   '#759aa0',
            //   '#e69d87',
            //   '#8dc1a9',
            //   '#ea7e53',
            //   '#eedd78',
            //   '#73a373',
            // ],
            type: 'pie',
            data: this.xy_data,
            grid: {
              //  top: '0px',
              left: '0px',
              //  right: '0px',
              bottom: '0px',
            },
          },
        ],
      };

      if (this.ec == null || this.ec == undefined) {
        // let myChart = this.$echarts.init(this.$refs.main_pie);
        this.ec = this.$echarts.init(this.$refs.main_pie);
      }

      this.ec.clear();
      this.ec.setOption(option);
      window.addEventListener('resize', () => {
        if (this.ec) {
          this.ec.resize();
        }
      });
    },

    reMarkstockType() {
      this.initOption();
    },

    reMarkinfoSex() {
      this.initOption();
    },
    reMarkbidType() {
      this.initOption();
    },

    reMarkcontTypeStatistic() {
      this.initOption();
    },

    reMarkperformancetype() {
      this.initOption();
    },

    reMarkcarMileage() {
      this.initOption();
    },

    reMarkcarBrand() {
      this.initOption();
    },

    reMarkuseCarType() {
      this.initOption();
    },

    reMarkoutStoreSum() {
      this.initOption();
    },

    reMarkuseStore() {
      this.initOption();
    },

    reMarkcontMoney() {
      this.initOption();
    },

    reMarkcontractpaymentType() {
      this.initOption();
    },
    reMarkcontractpaymentTypet() {
      this.initOption();
    },

    reMarkcontractType() {
      this.initOption();
    },

    reMarkcontractTypet() {
      this.initOption();
    },

    reMarkprojectDataYear() {
      this.initOption();
    },
    reMarkprogressStatus() {
      this.initOption();
    },

    reMarkAmount() {
      this.initOption();
    },

    reMarkPayment() {
      this.initOption();
    },

    reMarkinfoOuto() {
      this.initOption();
    },

    reMarkinfoOutt() {
      this.initOption();
    },

    reMarkdreason() {
      this.initOption();
    },

    reMarkoutContAmount() {
      this.initOption();
    },

    reMarkoutContPayment() {
      this.initOption();
    },

    reMarkclientNum() {
      this.initOption();
    },

    reMarkclientStatus() {
      this.initOption();
    },

    reMarkprojectType() {
      this.initOption();
    },
    reMarkhandoverReason() {
      this.initOption();
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
      // font-family: Alibaba PuHuiTi 2;
      // font-size: 20px;
      // font-weight: 500;
      // line-height: 60px;
      // letter-spacing: 0em;
      // text-align: left;
      // margin-right: 20px;

      font-family: Alibaba PuHuiTi 2;
      font-size: 20px;
      font-weight: 500;
      line-height: 60px;
      letter-spacing: 0em;
      text-align: left;
      width: auto;
      overflow: hidden;
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
    .topmenu {
      margin: auto 0;
      height: 40px;
      display: flex;
      justify-content: flex-end;
      .el-select {
        height: 40px;
        width: 120px;
        margin-left: 10px;
        float: right;
      }
    }
  }
  .main {
    //     height: 100%;
    // overflow: auto;
  }
}
</style>
