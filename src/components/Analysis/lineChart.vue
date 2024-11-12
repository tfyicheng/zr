<template class="app-container">
  <div class="cbody">
    <div class="top">
      <el-tooltip effect="dark" :content="title" placement="top-start">
        <span class="toptitle"> {{ title }}</span>
      </el-tooltip>

      <div class="topmenu">
        <!-- <svg-icon icon-class="more" /> -->
        <a class="toplink" v-show="tolink" @click="check()"> 查看更多</a>

        <el-date-picker
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

        <el-select
          v-model="assetOption"
          placeholder="次数"
          @change="getDate()"
          v-show="type == 27 || type == 29"
        >
          <el-option
            v-for="item in assetOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <!-- <el-select
          v-model="storeId"
          placeholder="仓库"
          clearable
          @change="getDate()"
          v-show="type == 26 || type == 27 || type == 28 || type == 29"
        >
          <el-option
            v-for="(item, index) in stores"
            :key="index + 1"
            :label="item.storeName"
            :value="item.storeId"
          >
          </el-option>
        </el-select> -->

        <!--
           v-if="type == 39 || type == 40 || type == 41 || type == 42 || type == 43"
          <el-select
          v-if="type != 39 && type != 40 && type != 41 && type != 42 && type != 43"
          v-model="options"
          placeholder="最近一年"
          @change="getDate()"
        >
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
      <div id="myChart" ref="mylineChart"></div>
    </div>
  </div>
</template>

<script>
import {
  certUseInfo,
  prjCont,
  infoOut,
  bidsituation,
  projectDataAdd,
  dtype,
  dapproveinfo,
  outContCont,
  paymentCont,
  paymentContt,
  moneyt,
  moneyo,
  projectstaprojectNum,
  personNum,
  progressStatistic,
  projectDataType,
  contractInfo,
  contractClient,
  contractInfot,
  contractClientt,
  paymentHandleinfot,
  contractpaymentClientt,
  paymentHandleinfo,
  contractpaymentClient,
  contractContInfo,
  inStoreStockNum,
  useStore,
  useStoreo,
  outStore,
  outStoreo,
  outStoret,
  useStoret,
  useOrOut,
  timeUseCarTop,
  situationOutCarTop,
  carStatus,
  carApproveSummary,
  contlabornum,
  worknum,
  performancenum,
  certificateUse,
  contStatistic,
  bidStatistic,
  paymentStatistic,
  companyCertStatistic,
  userCertStatistic,
  prjDataPlaceType,
  prjDataPlaceNewAdd,
  infoCount,
  stockNum,
} from '@/api/data/statistic';
import { storeList } from '@/api/data/asset';
export default {
  name: 'LineChart', //折线组件
  props: ['type'],
  data() {
    return {
      title: '', //标题
      tolink: '', //更多链接
      data1: [], //类型1数据
      data2: [],
      options: [],
      assetOption: 0,
      assetOptions: [
        {
          value: 0,
          label: '次数',
        },
        {
          value: 1,
          label: '数量',
        },
      ],
      storeId: null,
      stores: [], //仓库项
      lineData: [
        // [-12, 37, -69, -2, -48, 67, 94],
        // [-48, -4, 41, -3, 19, -60, 7],
      ], //y轴数据
      xdata: ['', '', ''], //x轴数据
    };
  },

  created() {
    if (this.type == 26 || this.type == 27 || this.type == 28 || this.type == 29) {
      //this.getStoreList();
    }

    this.init();
  },

  beforeDestroy() {
    /* 页面组件销毁的时候，别忘了移除绑定的监听resize事件，否则的话，多渲染几次
    容易导致内存泄漏和额外CPU或GPU占用*/
    window.removeEventListener('resize', () => {
      this.$echarts.init(this.$refs.mylineChart).resize();
    });
  },
  methods: {
    //获取仓库列表
    getStoreList() {
      return;
      storeList().then((response) => {
        console.log(response);
        this.stores = response.data;
      });
    },

    //刷新
    refresh() {
      this.init();
    },

    //初始化
    init() {
      //默认日期
      // this.options.push(this.commonFun.getLastMonth());
      // this.options.push(this.commonFun.getThisMonth());

      this.storeId = this.stores[0] ? this.stores[0].storeId : '';
      this.assetOption = 0;
      this.options = this.commonFun.compoYears[0].value;
      switch (this.type) {
        case 0:
          this.title = '证书大类浏览/使用情况统计';
          this.tolink = '';
          break;
        case 1:
          this.title = '项目合同统计';
          break;
        case 2:
          this.title = '人员外出/请假统计';
          break;
        case 3:
          this.title = '投标情况统计';
          break;
        case 4:
          this.title = '项目资料新增数量统计';
          break;
        case 5:
          this.title = '资料下载类别统计';
          break;
        case 6:
          this.title = '审批处理统计';
          break;
        case 7:
          this.title = '外委合同统计';
          break;
        case 8:
          this.title = '合同收款节点统计';
          break;
        case 9:
          this.title = '合同节点付款情况统计';
          break;
        case 10:
          this.title = '客户签订项目合同TOP';
          break;
        case 11:
          this.title = '客户签订外委合同TOP';
          break;
        case 12:
          this.title = '部门项目数概况';
          break;
        case 13:
          this.title = '项目人员数量统计';
          break;
        case 14:
          this.title = '部门项目进度统计';
          // this.tolink = '/project-d/projectProcessCheck';
          break;
        case 15:
          //this.title = '各类型项目资料数量统计';
          this.title = '项目资料类型统计';
          break;
        case 16:
          this.title = '部门开票统计';
          //this.tolink = '/production-d/billingRequestCheck';
          break;
        case 17:
          this.title = '开票客户统计TOP';
          //this.tolink = '/production-d/billingRequestCheck';
          break;
        case 18:
          this.title = '部门收票统计';
          //this.tolink = '/production-d/receiptRecordCheck';
          break;
        case 19:
          this.title = '收票客户统计TOP';
          //  this.tolink = '/production-d/receiptRecordCheck';
          break;
        case 20:
          this.title = '部门收款统计';
          //  this.tolink = '/production-d/incomeRecordCheck';
          break;
        case 21:
          this.title = '收款客户统计TOP';
          //   this.tolink = '/production-d/incomeRecordCheck';
          break;
        case 22:
          this.title = '部门付款统计';
          //  this.tolink = '/production-d/paymentRequestCheck';
          break;
        case 23:
          this.title = '付款客户统计TOP';
          //   this.tolink = '/production-d/paymentRequestCheck';
          break;
        case 24:
          this.title = '部门新增采购情况统计';
          break;
        case 25:
          this.title = '入库统计';
          break;
        case 26:
          this.title = '领用统计';
          break;
        case 27:
          this.title = '领用资产统计TOP';
          break;
        case 28:
          this.title = '出库统计';
          break;
        case 29:
          this.title = '出库资产统计TOP';
          break;
        case 30:
          this.title = '资产领用/出库统计';
          break;
        case 31:
          this.title = '用车时长情况统计';
          break;
        case 32:
          this.title = '出库申请情况统计';
          break;
        case 33:
          this.title = '车辆状态概况';
          break;
        case 34:
          this.title = '审批处理统计';
          break;
        case 35:
          this.title = '劳动合同数量统计';
          break;
        case 36:
          this.title = '履职经历数量统计';
          break;
        case 37:
          this.title = '人员业绩数量统计';
          break;
        case 38:
          this.title = '证书使用情况统计';
          break;
        //change
        case 39:
          this.title = '合同统计';
          break;
        case 40:
          this.title = '收付款统计';
          break;
        case 41:
          this.title = '投标统计';
          break;
        case 42:
          this.title = '证书统计';
          break;
        case 43:
          this.title = '人员证书统计';
          break;
        case 44:
          this.title = '各类型项目资料数量统计';
          break;
        case 45:
          this.title = '项目资料数量增长统计';
          break;
        case 46:
          this.title = '人员总数统计';
          break;

        case 47:
          this.title = '固定资产入库统计';
          break;
        case 48:
          this.title = '固定资产领用统计';
          break;
        case 49:
          this.title = '固定资产报废统计';
          break;
        case 50:
          this.title = '消耗品入库统计';
          break;
        case 51:
          this.title = '消耗品领用统计';
          break;
        case 52:
          this.title = '消耗品报废统计';
          break;
        default:
          break;
      }
      this.getData();
    },

    getData() {
      if (this.type == 0) {
        if (this.options && this.options.length > 0) {
          certUseInfo({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1, res.data.y2];
              this.reMarkCert();
            }
          });
        }
      } //多条
      if (this.type == 1) {
        if (this.options && this.options.length > 0) {
          prjCont({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0List, res.data.y1List];
              this.reMarkCont();
            }
          });
        }
      }
      if (this.type == 2) {
        if (this.options && this.options.length > 0) {
          infoOut({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1];
              this.reMarkPerOut();
            }
          });
        }
      }
      if (this.type == 3) {
        if (this.options && this.options.length > 0) {
          bidsituation({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0List, res.data.y1List];
              this.reMarkbidsituation();
            }
          });
        }
      }
      if (this.type == 4) {
        if (this.options && this.options.length > 0) {
          projectDataAdd({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y];
              this.reMarkprojectDataAdd();
            }
          });
        }
      } //单条
      if (this.type == 5) {
        if (this.options && this.options.length > 0) {
          dtype({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1];
              this.reMarkprojectdtype();
            }
          });
        }
      }
      if (this.type == 6) {
        if (this.options && this.options.length > 0) {
          dapproveinfo({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1];
              this.reMarkdapproveinfo();
            }
          });
        }
      }
      if (this.type == 7) {
        if (this.options && this.options.length > 0) {
          outContCont({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0List, res.data.y1List];
              this.reMarkoutContCont();
            }
          });
        }
      }
      if (this.type == 8) {
        if (this.options && this.options.length > 0) {
          paymentCont({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0List, res.data.y1List, res.data.y2List];
              this.reMarkpaymentCont();
            }
          });
        }
      }
      if (this.type == 9) {
        if (this.options && this.options.length > 0) {
          paymentContt({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0List, res.data.y1List, res.data.y2List];
              this.reMarkpaymentContt();
            }
          });
        }
      }
      if (this.type == 10) {
        if (this.options && this.options.length > 0) {
          moneyt({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y];
              this.reMarkmoneyt();
            }
          });
        }
      }
      if (this.type == 11) {
        if (this.options && this.options.length > 0) {
          moneyo({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y];
              this.reMarkmoneyo();
            }
          });
        }
      }
      if (this.type == 12) {
        if (this.options && this.options.length > 0) {
          projectstaprojectNum({ startDate: this.options[0], endDate: this.options[1] }).then(
            (res) => {
              if (res && res.code == 200) {
                this.data1 = res.data;
                this.xdata = res.data.x;
                this.lineData = [];
                this.lineData = [res.data.y];
                this.reMarkprojectstaprojectNum();
              }
            },
          );
        }
      }
      if (this.type == 13) {
        if (this.options && this.options.length > 0) {
          personNum({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1];
              this.reMarkpersonNum();
            }
          });
        }
      }
      if (this.type == 14) {
        if (this.options && this.options.length > 0) {
          progressStatistic({ startDate: this.options[0], endDate: this.options[1] }).then(
            (res) => {
              if (res && res.code == 200) {
                this.data1 = res.data;
                this.xdata = res.data.x;
                this.lineData = [];
                this.lineData = [res.data.y0, res.data.y1, res.data.y2];
                this.reMarkprogressStatistic();
              }
            },
          );
        }
      }
      if (this.type == 15) {
        if (this.options && this.options.length > 0) {
          projectDataType({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1];
              this.reMarkprojectDataType();
            }
          });
        }
      }
      if (this.type == 16) {
        if (this.options && this.options.length > 0) {
          contractInfo({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0List, res.data.y1List];
              this.reMarkcontractInfo();
            }
          });
        }
      }
      if (this.type == 17) {
        if (this.options && this.options.length > 0) {
          contractClient({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1];
              this.reMarkcontractClient();
            }
          });
        }
      }
      if (this.type == 18) {
        if (this.options && this.options.length > 0) {
          contractInfot({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0List, res.data.y1List];
              this.reMarkcontractInfot();
            }
          });
        }
      }
      if (this.type == 19) {
        if (this.options && this.options.length > 0) {
          contractClientt({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1];
              this.reMarkcontractClientt();
            }
          });
        }
      }
      if (this.type == 20) {
        if (this.options && this.options.length > 0) {
          paymentHandleinfot({ startDate: this.options[0], endDate: this.options[1] }).then(
            (res) => {
              if (res && res.code == 200) {
                this.data1 = res.data;
                this.xdata = res.data.x;
                this.lineData = [];
                this.lineData = [res.data.y0List, res.data.y1List];
                this.reMarkpaymentHandleinfot();
              }
            },
          );
        }
      }
      if (this.type == 21) {
        if (this.options && this.options.length > 0) {
          contractpaymentClientt({ startDate: this.options[0], endDate: this.options[1] }).then(
            (res) => {
              if (res && res.code == 200) {
                this.data1 = res.data;
                this.xdata = res.data.x;
                this.lineData = [];
                this.lineData = [res.data.y0List, res.data.y1List];
                this.reMarkcontractpaymentClientt();
              }
            },
          );
        }
      }
      if (this.type == 22) {
        if (this.options && this.options.length > 0) {
          paymentHandleinfo({ startDate: this.options[0], endDate: this.options[1] }).then(
            (res) => {
              if (res && res.code == 200) {
                this.data1 = res.data;
                this.xdata = res.data.x;
                this.lineData = [];
                this.lineData = [res.data.y0List, res.data.y1List];
                this.reMarkpaymentHandleinfo();
              }
            },
          );
        }
      }
      if (this.type == 23) {
        if (this.options && this.options.length > 0) {
          contractpaymentClient({ startDate: this.options[0], endDate: this.options[1] }).then(
            (res) => {
              if (res && res.code == 200) {
                this.data1 = res.data;
                this.xdata = res.data.x;
                this.lineData = [];
                this.lineData = [res.data.y0List, res.data.y1List];
                this.reMarkcontractpaymentClient();
              }
            },
          );
        }
      }
      if (this.type == 24) {
        if (this.options && this.options.length > 0) {
          contractContInfo({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0List, res.data.y1List, res.data.y2List];
              this.reMarkcontractContInfo();
            }
          });
        }
      }
      if (this.type == 25) {
        if (this.options && this.options.length > 0) {
          inStoreStockNum({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1];
              this.reMarkinStoreStockNum();
            }
          });
        }
      }
      if (this.type == 26) {
        if (this.options && this.options.length > 0 && this.storeId != null) {
          useStore({
            startDate: this.options[0],
            endDate: this.options[1],
            storeId: this.storeId,
          }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1];
              this.reMarkuseStoreo();
            }
          });
        }
      }
      if (this.type == 27) {
        if (this.options && this.options.length > 0 && this.storeId != null) {
          if (this.assetOption == 0) {
            useStoreo({
              startDate: this.options[0],
              endDate: this.options[1],
              storeId: this.storeId,
            }).then((res) => {
              if (res && res.code == 200) {
                this.data1 = res.data;
                this.xdata = res.data.x;
                this.lineData = [];
                this.lineData = [res.data.y];
                this.reMarkuseStore();
              }
            });
          } else {
            outStoret({
              startDate: this.options[0],
              endDate: this.options[1],
              storeId: this.storeId,
            }).then((res) => {
              if (res && res.code == 200) {
                this.data1 = res.data;
                this.xdata = res.data.x;
                this.lineData = [];
                this.lineData = [res.data.y];
                this.reMarkuseStoret();
              }
            });
          }
        }
      }
      if (this.type == 28) {
        if (this.options && this.options.length > 0 && this.storeId != null) {
          outStore({
            startDate: this.options[0],
            endDate: this.options[1],
            storeId: this.storeId,
          }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1];
              this.reMarkuseStoreo();
            }
          });
        }
      }
      if (this.type == 29) {
        if (this.options && this.options.length > 0 && this.storeId != null) {
          if (this.assetOption == 0) {
            outStoreo({
              startDate: this.options[0],
              endDate: this.options[1],
              storeId: this.storeId,
            }).then((res) => {
              if (res && res.code == 200) {
                this.data1 = res.data;
                this.xdata = res.data.x;
                this.lineData = [];
                this.lineData = [res.data.y];
                this.reMarkuseStore();
              }
            });
          } else {
            useStoret({
              startDate: this.options[0],
              endDate: this.options[1],
              storeId: this.storeId,
            }).then((res) => {
              if (res && res.code == 200) {
                this.data1 = res.data;
                this.xdata = res.data.x;
                this.lineData = [];
                this.lineData = [res.data.y];
                this.reMarkuseStoret();
              }
            });
          }
        }
      }
      if (this.type == 30) {
        if (this.options && this.options.length > 0) {
          useOrOut({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1];
              this.reMarkuseOrOut();
            }
          });
        }
      }
      if (this.type == 31) {
        if (this.options && this.options.length > 0) {
          timeUseCarTop({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1];
              this.reMarktimeUseCarTop();
            }
          });
        }
      }
      if (this.type == 32) {
        if (this.options && this.options.length > 0) {
          situationOutCarTop({ startDate: this.options[0], endDate: this.options[1] }).then(
            (res) => {
              if (res && res.code == 200) {
                this.data1 = res.data;
                this.xdata = res.data.x;
                this.lineData = [];
                this.lineData = [res.data.y0, res.data.y1, res.data.y2];
                this.reMarksituationOutCarTop();
              }
            },
          );
        }
      }
      if (this.type == 33) {
        if (this.options && this.options.length > 0) {
          carStatus({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1, res.data.y2];
              this.reMarkcarStatus();
            }
          });
        }
      }

      if (this.type == 34) {
        if (this.options && this.options.length > 0) {
          carApproveSummary({ startDate: this.options[0], endDate: this.options[1] }).then(
            (res) => {
              if (res && res.code == 200) {
                this.data1 = res.data;
                this.xdata = res.data.x;
                this.lineData = [];
                this.lineData = [res.data.y0, res.data.y1];
                this.reMarkcarApproveSummary();
              }
            },
          );
        }
      }
      if (this.type == 35) {
        if (this.options && this.options.length > 0) {
          contlabornum({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0List, res.data.y1List];
              this.reMarkcontlabornum();
            }
          });
        }
      }

      if (this.type == 36) {
        if (this.options && this.options.length > 0) {
          worknum({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0List, res.data.y1List];
              this.reMarkworknum();
            }
          });
        }
      }

      if (this.type == 37) {
        if (this.options && this.options.length > 0) {
          performancenum({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y];
              this.reMarkperformancenum();
            }
          });
        }
      }

      if (this.type == 38) {
        if (this.options && this.options.length > 0) {
          certificateUse({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1];
              this.reMarkcertificateUse();
            }
          });
        }
      }

      if (this.type == 39) {
        if (this.options && this.options.length > 0) {
          contStatistic({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1];
              this.reMarkcontStatistic();
            }
          });
        }
      }

      if (this.type == 40) {
        if (this.options && this.options.length > 0) {
          paymentStatistic({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1];
              this.reMarkpaymentStatistic();
            }
          });
        }
      }

      if (this.type == 41) {
        if (this.options && this.options.length > 0) {
          bidStatistic({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1];
              this.reMarkbidStatistic();
            }
          });
        }
      }

      if (this.type == 42) {
        if (this.options && this.options.length > 0) {
          companyCertStatistic({ startDate: this.options[0], endDate: this.options[1] }).then(
            (res) => {
              if (res && res.code == 200) {
                this.data1 = res.data;
                this.xdata = res.data.x;
                this.lineData = [];
                this.lineData = [res.data.y0, res.data.y1, res.data.y2];
                this.reMarkcompanyCertStatistic();
              }
            },
          );
        }
      }

      if (this.type == 43) {
        if (this.options && this.options.length > 0) {
          userCertStatistic({ startDate: this.options[0], endDate: this.options[1] }).then(
            (res) => {
              if (res && res.code == 200) {
                this.data1 = res.data;
                this.xdata = res.data.x;
                this.lineData = [];
                this.lineData = [res.data.y0, res.data.y1, res.data.y2];
                this.reMarkuserCertStatistic();
              }
            },
          );
        }
      }

      if (this.type == 44) {
        if (this.options && this.options.length > 0) {
          prjDataPlaceType({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1];
              this.reMarkprjDataPlaceType();
            }
          });
        }
      }

      if (this.type == 45) {
        if (this.options && this.options.length > 0) {
          prjDataPlaceNewAdd({ startDate: this.options[0], endDate: this.options[1] }).then(
            (res) => {
              if (res && res.code == 200) {
                this.data1 = res.data;
                this.xdata = res.data.x;
                this.lineData = [];
                this.lineData = [res.data.y];
                this.reMarkprjDataPlaceNewAdd();
              }
            },
          );
        }
      }

      if (this.type == 46) {
        if (this.options && this.options.length > 0) {
          infoCount({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1];
              this.reMarkinfoCount();
            }
          });
        }
      }

      if (this.type == 47) {
        if (this.options && this.options.length > 0) {
          stockNum({
            type: 0,
            type2: 0,
            startDate: this.options[0],
            endDate: this.options[1],
          }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1];
              this.reMarkstockNum();
            }
          });
        }
      }

      if (this.type == 48) {
        if (this.options && this.options.length > 0) {
          stockNum({
            type: 1,
            type2: 0,
            startDate: this.options[0],
            endDate: this.options[1],
          }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1];
              this.reMarkstockNum();
            }
          });
        }
      }

      if (this.type == 49) {
        if (this.options && this.options.length > 0) {
          stockNum({
            type: 2,
            type2: 0,
            startDate: this.options[0],
            endDate: this.options[1],
          }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1];
              this.reMarkstockNum();
            }
          });
        }
      }

      if (this.type == 50) {
        if (this.options && this.options.length > 0) {
          stockNum({
            type: 0,
            type2: 1,
            startDate: this.options[0],
            endDate: this.options[1],
          }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1];
              this.reMarkstockNum();
            }
          });
        }
      }

      if (this.type == 51) {
        if (this.options && this.options.length > 0) {
          stockNum({
            type: 1,
            type2: 1,
            startDate: this.options[0],
            endDate: this.options[1],
          }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1];
              this.reMarkstockNum();
            }
          });
        }
      }

      if (this.type == 52) {
        if (this.options && this.options.length > 0) {
          stockNum({
            type: 2,
            type2: 1,
            startDate: this.options[0],
            endDate: this.options[1],
          }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1];
              this.reMarkstockNum();
            }
          });
        }
      }

      //
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

    makeSeries(arr) {
      try {
        let colorArr = ['#409EFF', '#2FD052', '#FAC06A', '#DC52FF', '#FF6161', '#F0A2F2'];
        let valArr = [];
        if (arr && arr.length > 0) {
          for (let index = 0; index < arr.length; index++) {
            valArr.push({
              name: arr[index],
              type: 'line',
              data: this.lineData[index],
              color: colorArr[index],
              symbolSize: 6, //设定实心点的大小
              label: {
                show: true, // 在折线拐点上显示数据
                fontSize: 8,
                color: '#fff',
                fontWeight: 10,
                // position: 'top',
                // formatter: function (data) {
                //   return data.value;
                // },
              },
              itemStyle: { normal: { label: { show: true } } },
              areaStyle: {
                origin: 'start',
                color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(64, 158, 255, 0.2)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(64, 158, 255, 0)',
                  },
                ]),
              },
            });
          }
          //console.log(valArr);
          return valArr;
        } else {
          return [
            {
              name: '',
              type: 'line',
              data: this.lineData[0],
              color: '#409EFF',
              symbolSize: 6, //设定实心点的大小
              label: {
                show: true, // 在折线拐点上显示数据
                fontSize: 8,
                color: '#fff',
                fontWeight: 10,
              },
              itemStyle: { normal: { label: { show: true } } },
              areaStyle: {
                origin: 'start',
                color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(64, 158, 255, 0.2)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(64, 158, 255, 0)',
                  },
                ]),
              },
            },
          ];
        }
      } catch (error) {
        return [
          {
            name: '',
            type: 'line',
            data: this.lineData[0],
            color: '#409EFF',
            symbolSize: 6, //设定实心点的大小
            label: {
              show: true, // 在折线拐点上显示数据
              fontSize: 8,
              color: '#fff',
              fontWeight: 10,
            },
            itemStyle: { normal: { label: { show: true } } },
            areaStyle: {
              origin: 'start',
              color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(64, 158, 255, 0.2)',
                },
                {
                  offset: 1,
                  color: 'rgba(64, 158, 255, 0)',
                },
              ]),
            },
          },
        ];
      }
    },

    //计算总数
    getTotal(arr) {
      // console.log(arr.length, this.lineData.length);
      if (arr != null && arr.length > 0) {
        try {
          let flag = false;
          arr.forEach((e) => {
            if (
              e == '总数' ||
              e == '数量' ||
              String(e).includes('总数') ||
              String(e).includes('数量')
            ) {
              flag = true;
            }
          });

          if (flag) {
            if (arr.length > 0 && arr.length == this.lineData.length) {
              let data = '';
              // for (let i = 0; i < arr.length; i++) {
              //   let total = 0;
              //   this.lineData[i].forEach((e) => {
              //     total += Number(e);
              //   });
              //   let newi = arr[i] + '(' + total + ')';
              //   data += newi;
              // }
              let total = 0;
              //追加判断条件，如果有时间选择的话选最后一个数据
              //当前折线图都有时间选择 默认取最后一个数据
              // this.lineData[0].forEach((e) => {
              //   total += Number(e);
              // });
              total = this.lineData[0][this.lineData[0].length - 1];

              //部分总数统计不符合情况无法区分仅保留需要统计的总数
              if (this.type == 46) {
                return (data = '总数(' + total + ')');
              }

              return data;
            } else {
              return '';
            }
          } else {
            return '';
          }
        } catch (error) {
          return '';
        }
      } else {
        return '';
      }
    },

    //初始化图标配置
    InitOptions(arr = null) {
      let option = {
        title: {
          text: this.getTotal(arr),
          // left: '10',
          // top: '10',
          textStyle: {
            fontSize: 17,
          },
        },

        tooltip: {
          trigger: 'axis',
          textStyle: {
            align: 'left',
            color: '#666666',
            fontSize: '15px',
          },
          // backgroundColor: 'rgba(82,82,82,0.4)',
          backgroundColor: 'rgba(255,255,255)',
          //borderColor: 'rgba(82,82,82,0.4)',
        },
        legend: {
          //字体对应折线标识
          data: arr != null ? [...arr] : [''],
          // right: '25%',
          left: 'center',
          top: '5%',
          icon: 'rect',
          textStyle: {
            color: '#666666',
            fontSize: '14px',
          },
          itemWidth: 10, // 长方形宽度
          itemHeight: 10, // 长方形高度
        },
        //折线图位置
        grid: {
          left: '4%',
          right: '4%',
          bottom: '1%',
          top: '24%',
          containLabel: true, //刻度标签
        },
        xAxis: {
          boundaryGap: false,
          axisLabel: {
            rotate: 35, // 设置斜度
            fontSize: '13px', //文字的字体大小
            color: '#666666',
          },
          axisTick: {
            //x轴刻度
            show: false,
          },
          axisLine: {
            //x轴线样式
            show: false,
            lineStyle: {
              color: '#ccc',
              // type: [0, 5],
              // dashOffset: 5,
              width: 3, //线的粗细程度    (用数字表示)
              type: 'solid', //线的类型        (可选solid  dotted  dashed)
              opacity: 1, //线的透明度        (用0~1的小数表示)
            },
          },
          data: this.xdata,
        },
        yAxis: {
          type: 'value',
          //interval: 10, //y轴间隔
          //min: 0, //y轴最小
          //   max: Math.max.apply(
          //     Math,
          //     this.lineData.reduce((acc, val) => acc.concat(val), []),
          //   ), //y轴最大
          // splitNumber: 10,
          //网格线
          splitLine: {
            show: true, //是否显示
            lineStyle: {
              //网格线样式
              color: '#E4E6ED', //网格线颜色
              width: 1, //网格线的加粗程度
              type: 'solid', //网格线类型 border: 1px solid #E4E6ED
            },
          },
          axisLabel: {
            color: '#666666',
            fontSize: '15px',
          },
        },

        series: this.makeSeries(arr),
      };

      var myChart = this.$echarts.init(this.$refs.mylineChart);
      myChart.clear();
      myChart.setOption(option);
      window.addEventListener('resize', () => {
        myChart.resize();
      });
    },

    reMarkstockNum() {
      this.InitOptions(['次数', '数量']);
    },

    reMarkinfoCount() {
      this.InitOptions(['总数', '新增']);
    },

    reMarkprjDataPlaceNewAdd() {
      this.InitOptions(['新增']);
    },

    reMarkprjDataPlaceType() {
      this.InitOptions(['总数', '新增']);
    },

    reMarkcompanyCertStatistic() {
      this.InitOptions(['浏览次数', '导出次数', '新增数量']);
    },

    reMarkuserCertStatistic() {
      this.InitOptions(['浏览次数', '导出次数', '新增数量']);
    },

    reMarkbidStatistic() {
      this.InitOptions(['投标数量', '中标数量']);
    },

    reMarkpaymentStatistic() {
      this.InitOptions(['收款金额(万元)', '付款金额(万元)']);
    },

    reMarkcontStatistic() {
      this.InitOptions(['合同数量', '合同金额(万元)']);
    },

    reMarkperformancenum() {
      this.InitOptions(['业绩数量']);
    },
    reMarkcertificateUse() {
      this.InitOptions(['浏览次数', '使用次数']);
    },

    reMarkworknum() {
      this.InitOptions(['履职总数', '新增履职']);
    },

    reMarkcontlabornum() {
      this.InitOptions(['合同数', '即将到期']);
    },

    reMarkcarApproveSummary() {
      this.InitOptions(['审批中', '已处理']);
    },

    //资料下载类型统计
    reMarkprojectdtype() {
      this.InitOptions(['证书资料', '项目资料']);
    },

    reMarkdapproveinfo() {
      this.InitOptions(['待审批', '已审批']);
    },

    //'用车中', '空闲', '出库'
    reMarkcarStatus() {
      this.InitOptions(['用车中', '空闲', '出库']);
    },

    reMarksituationOutCarTop() {
      this.InitOptions(['申请数量', '同意出库数量', '驳回出库数量']);
    },

    //时长，次数
    reMarktimeUseCarTop() {
      this.InitOptions(['用车时长(h)', '次数']);
    },

    reMarkuseOrOut() {
      this.InitOptions(['领用次数', '出库次数']);
    },

    //次数
    reMarkuseStore() {
      this.InitOptions(['次数']);
    },

    //数量
    reMarkuseStoret() {
      this.InitOptions(['数量']);
    },

    //次数  数量
    reMarkuseStoreo() {
      this.InitOptions(['次数', '数量']);
    },

    reMarkinStoreStockNum() {
      this.InitOptions(['入库数量', '入库次数']);
    },

    reMarkcontractContInfo() {
      this.InitOptions(['固定资产采购合同数量', '服务采购合同数', '合同金额']);
    },
    reMarkpaymentHandleinfot() {
      this.InitOptions(['次数', '金额']);
    },

    reMarkpaymentHandleinfo() {
      this.InitOptions(['次数', '金额']);
    },

    reMarkcontractpaymentClient() {
      this.InitOptions(['次数', '金额']);
    },

    reMarkcontractpaymentClientt() {
      this.InitOptions(['次数', '金额']);
    },

    reMarkcontractInfo() {
      this.InitOptions(['开票次数', '开票金额']);
    },

    reMarkcontractClient() {
      this.InitOptions(['开票次数', '开票金额']);
    },

    reMarkcontractInfot() {
      this.InitOptions(['收票次数', '收票金额']);
    },

    reMarkcontractClientt() {
      this.InitOptions(['收票次数', '收票金额']);
    },

    reMarkprojectDataType() {
      this.InitOptions(['总数', '新增']);
    },

    reMarkprogressStatistic() {
      this.InitOptions(['计划总数', '已完成计划数', '进度填报数']);
    },

    //证书分析重绘
    reMarkCert() {
      this.InitOptions(['浏览次数', '使用次数', '新增数量']);
    },

    //合同分析重绘
    reMarkCont() {
      this.InitOptions(['合同数量', '合同金额']);
    },

    //人员信息重绘
    reMarkPerOut() {
      this.InitOptions(['外出次数', '请假次数']);
    },

    //投标情况重绘
    reMarkbidsituation() {
      this.InitOptions(['投标数量', '下载次数']);
    },

    //项目资料新增数量统计重绘
    reMarkprojectDataAdd() {
      this.InitOptions(['资料总数']);
    },

    reMarkoutContCont() {
      this.InitOptions(['合同数量', '合同金额']);
    },

    reMarkpaymentCont() {
      this.InitOptions(['部分收款', '已收款', '收款金额(万元)']);
    },

    reMarkpaymentContt() {
      this.InitOptions(['部分付款', '已付款', '收款金额(万元)']);
    },

    reMarkmoneyt() {
      this.InitOptions(['合同金额']);
    },

    reMarkmoneyo() {
      this.InitOptions(['合同金额']);
    },

    reMarkprojectstaprojectNum() {
      this.InitOptions(['进行中数量']);
    },

    reMarkpersonNum() {
      this.InitOptions(['项目人员数', '交接次数']);
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
      width: auto;
      overflow: hidden;
    }
    .toptitle:first-child:before {
      content: '\00a0 ';
      border-left: 3px solid #4da0ff;
      margin-right: 5px;
    }
    .toplink {
      float: right;
      background: #409eff;
      width: 100px;
      height: 35px;
      border-radius: 4px;
      font-family: Alibaba PuHuiTi 2;
      font-size: 16px;
      font-weight: 500;
      line-height: 35px;
      letter-spacing: 0em;
      text-align: center;
      color: #fff;
      margin: auto 0;
      margin-left: 20px;
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
    #myChart {
      width: 100%;
      height: 300px;
    }
  }
}
</style>
