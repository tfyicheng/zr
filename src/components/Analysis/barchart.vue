<template class="app-container">
  <div class="cbody">
    <div class="top">
      <!-- style="width: 180; overflow: hidden" -->
      <!-- <el-tooltip class="item" effect="dark" :content="title" placement="top">
      
      </el-tooltip> -->
      <el-tooltip effect="dark" :content="title" placement="top-start">
        <span class="toptitle"> {{ title }}</span>
      </el-tooltip>

      <!-- <svg-icon icon-class="more" /> -->
      <div class="topmenu">
        <a class="toplink" v-show="tolink" @click="check()"> 查看更多</a>
        <el-date-picker
          v-if="type != 29 && type != 30"
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

        <!-- <el-select v-model="options" placeholder="最近一年" @change="getDate()">
          <el-option
            v-for="item in commonFun.compoYears"
            :key="item.key"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select> -->

        <el-select v-model="request" placeholder="申请类型" v-show="type == 25" @change="getDate()">
          <el-option
            v-for="item in requestTypes"
            :key="item.value"
            :label="item.label"
            :value="Number(item.value)"
          >
          </el-option>
        </el-select>

        <el-select
          style="width: 100px; margin-right: 5px"
          v-model="projType"
          placeholder="合同类型"
          clearable
          v-show="type == 15"
          @change="getDate()"
        >
          <el-option
            v-for="item in projTypes"
            :key="item.value"
            :label="item.label"
            :value="Number(item.value)"
          >
          </el-option>
        </el-select>

        <el-select
          style="width: 100px; margin-right: 5px"
          v-model="status"
          placeholder="项目状态"
          v-show="type == 6"
          @change="getDate()"
        >
          <el-option
            v-for="item in dict.type.project_status"
            :key="item.value"
            :label="item.label"
            :value="Number(item.value)"
          >
          </el-option>
        </el-select>

        <el-select
          style="width: 100px; margin-right: 5px"
          v-model="role"
          placeholder="项目角色"
          clearable
          v-show="type == 6"
          @change="getDate()"
        >
          <el-option
            v-for="item in dict.type.project_role"
            :key="item.value"
            :label="item.label"
            :value="Number(item.value)"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="main">
      <div id="mybarChart" ref="myBarChart"></div>
    </div>
  </div>
</template>

<script>
import {
  prjContLeader,
  duserApply,
  bidClientTop,
  bidperson,
  outContLeader,
  projectProgress,
  prjRole,
  projectleader,
  progressNum,
  projectDataArea,
  contractStatistic,
  contractStatistict,
  paymentHandle,
  paymentHandlet,
  contractApply,
  contMoneyo,
  contMoneyt,
  inStoreStock,
  userNum,
  outNum,
  personUseCarTop,
  personOutCarTop,
  carTop,
  useCarApprove,
  outCarApprove,
  personuserNum,
  personOuto,
  personOutt,
  contlaborage,
  worklaborage,
  performancetotal,
  prjDataPlaceArea,
  infoAge,
  infoEdu,
  stockDept,
} from '@/api/data/statistic';
import { number } from 'echarts';
export default {
  name: 'BarChart', //柱状图组件
  props: ['type'],
  dicts: ['project_status', 'project_role'],
  data() {
    return {
      title: '', //标题
      tolink: '', //更多链接
      options: [],
      status: null,
      projType: 0,
      request: 0,
      role: null,
      data1: [], //类型1数据
      data2: [],
      projTypes: [
        {
          value: 0,
          label: '固定资产采购合同',
        },
        {
          value: 1,
          label: '服务采购合同',
        },
      ],
      requestTypes: [
        {
          value: 0,
          label: '外出申请',
        },
        {
          value: 1,
          label: '请假申请',
        },
      ],
    };
  },
  created() {
    this.init();
  },
  beforeDestroy() {
    /* 页面组件销毁的时候，别忘了移除绑定的监听resize事件，否则的话，多渲染几次
    容易导致内存泄漏和额外CPU或GPU占用*/
    window.removeEventListener('resize', () => {
      console.log('销毁');
      this.$echarts.init(this.$refs.myBarChart).resize();
    });
  },
  mounted() {},
  methods: {
    //刷新
    refresh() {
      this.init();
      6;
    },

    //#region  初始化

    //初始化
    init() {
      //默认日期
      // this.options.push(this.commonFun.getLastMonth());
      // this.options.push(this.commonFun.getThisMonth());
      this.options = this.commonFun.compoYears[0].value;
      this.status = 0;
      this.role = 0;
      this.projType = 0;
      switch (this.type) {
        case 0:
          this.title = '项目合同负责人统计TOP';
          this.tolink = '';
          break;
        case 1:
          this.title = '资料下载申请人统计TOP';
          break;
        case 2:
          this.title = '投标客户统计TOP';
          break;
        case 3:
          this.title = '投标人员统计TOP';
          break;
        case 4:
          this.title = '外委合同负责人统计TOP';
          break;
        case 5:
          this.title = '项目总体进度统计';
          break;
        case 6:
          this.title = '项目角色统计TOP';
          break;
        case 7:
          this.title = '项目负责人统计TOP';
          break;
        case 8:
          this.title = '项目进度填报统计TOP';
          break;
        case 9:
          this.title = '地区项目资料统计TOP';
          break;
        case 10:
          this.title = '开票记录人统计TOP';
          break;
        case 11:
          this.title = '收票申请人统计TOP';
          break;
        case 12:
          this.title = '收款经办人统计TOP';
          break;
        case 13:
          this.title = '付款经办人统计TOP';
          break;
        case 14:
          this.title = '采购合同申请人统计TOP';
          break;
        case 15:
          this.title = '签订采购合同供应商TOP';
          break;
        case 16:
          this.title = '仓库资产数量统计TOP';
          break;
        case 17:
          this.title = '领用申请人统计TOP';
          break;
        case 18:
          this.title = '出库申请人统计TOP';
          break;
        case 19:
          this.title = '人员用车TOP';
          break;
        case 20:
          this.title = '出库申请人TOP';
          break;
        case 21:
          this.title = '用车车辆TOP';
          break;
        case 22:
          this.title = '用车申请人统计TOP';
          break;
        case 23:
          this.title = '出库申请人统计TOP';
          break;
        case 24:
          this.title = '人员数量统计';
          break;
        case 25:
          this.title = '外出请假申请统计TOP';
          break;
        case 26:
          this.title = '人员年龄分布';
          break;
        case 27:
          this.title = '人员履职统计TOP';
          break;
        case 28:
          this.title = '人员业绩统计TOP';
          break;
        case 29:
          this.title = '人员年龄统计';
          break;
        case 30:
          this.title = '人员学历统计';
          break;
        case 31:
          this.title = '入库部门统计TOP';
          break;
        case 32:
          this.title = '领用部门统计TOP';
          break;
        case 33:
          this.title = '报废部门统计TOP';
          break;
        case 34:
          this.title = '入库部门统计TOP';
          break;
        case 35:
          this.title = '领用部门统计TOP';
          break;
        case 36:
          this.title = '报废部门统计TOP';
          break;
        default:
          break;
      }
      this.getData();
    },

    //#endregion

    //#region   获取数据

    getData() {
      if (this.type == 0) {
        if (this.options && this.options.length > 0) {
          prjContLeader({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0List, res.data.y1List];
              this.reMarkLeader();
            }
          });
        }
      } //多条
      if (this.type == 1) {
        if (this.options && this.options.length > 0) {
          duserApply({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y];
              this.reMarkduserApply();
            }
          });
        }
      } //单条
      if (this.type == 2) {
        if (this.options && this.options.length > 0) {
          bidClientTop({
            startDate: this.options[0],
            endDate: this.options[1],
          }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y];
              this.reMarkbidClientTop();
            }
          });
        }
      }
      if (this.type == 3) {
        if (this.options && this.options.length > 0) {
          bidperson({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0List, res.data.y1List];
              this.reMarkbidperson();
            }
          });
        }
      }
      if (this.type == 4) {
        if (this.options && this.options.length > 0) {
          outContLeader({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0List, res.data.y1List];
              this.reMarkoutContLeader();
            }
          });
        }
      }
      if (this.type == 5) {
        if (this.options && this.options.length > 0) {
          projectProgress({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1, res.data.y2, res.data.y3, res.data.y4];
              this.reMarkprojectProgress();
            }
          });
        }
      }
      if (this.type == 6) {
        if (this.options && this.options.length > 0 && this.status != null && this.role != null) {
          prjRole({
            startDate: this.options[0],
            endDate: this.options[1],
            status: this.status,
            prjRole: this.role,
          }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y];
              this.reMarkprjRole();
            }
          });
        }
      }
      if (this.type == 7) {
        if (this.options && this.options.length > 0) {
          projectleader({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1];
              this.reMarkprojectleader();
            }
          });
        }
      }
      if (this.type == 8) {
        if (this.options && this.options.length > 0) {
          progressNum({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y];
              this.reMarkprogressNum();
            }
          });
        }
      }
      if (this.type == 9) {
        if (this.options && this.options.length > 0) {
          prjDataPlaceArea({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            //projectDataArea({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1];
              this.reMarkprojectDataArea();
            }
          });
        }
      }
      if (this.type == 10) {
        if (this.options && this.options.length > 0) {
          contractStatistic({ startDate: this.options[0], endDate: this.options[1] }).then(
            (res) => {
              if (res && res.code == 200) {
                this.data1 = res.data;
                this.xdata = res.data.x;
                this.lineData = [];
                this.lineData = [res.data.y0List, res.data.y1List];
                this.reMarkcontractStatistic();
              }
            },
          );
        }
      }
      if (this.type == 11) {
        if (this.options && this.options.length > 0) {
          contractStatistict({ startDate: this.options[0], endDate: this.options[1] }).then(
            (res) => {
              if (res && res.code == 200) {
                this.data1 = res.data;
                this.xdata = res.data.x;
                this.lineData = [];
                this.lineData = [res.data.y0List, res.data.y1List];
                this.reMarkcontractStatistict();
              }
            },
          );
        }
      }
      if (this.type == 12) {
        if (this.options && this.options.length > 0) {
          paymentHandlet({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0List, res.data.y1List];
              this.reMarkpaymentHandlet();
            }
          });
        }
      }

      if (this.type == 13) {
        if (this.options && this.options.length > 0) {
          paymentHandle({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0List, res.data.y1List];
              this.reMarkpaymentHandle();
            }
          });
        }
      }
      if (this.type == 14) {
        if (this.options && this.options.length > 0) {
          contractApply({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0List, res.data.y1List];
              this.reMarkcontractApply();
            }
          });
        }
      }
      if (this.type == 15) {
        if (this.options && this.options.length > 0) {
          if (this.projType == 0) {
            contMoneyo({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
              if (res && res.code == 200) {
                this.data1 = res.data;
                this.xdata = res.data.x;
                this.lineData = [];
                this.lineData = [res.data.y];
                this.reMarkcontMoneyo();
              }
            });
          } else {
            contMoneyt({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
              if (res && res.code == 200) {
                this.data1 = res.data;
                this.xdata = res.data.x;
                this.lineData = [];
                this.lineData = [res.data.y];
                this.reMarkcontMoneyo();
              }
            });
          }
        }
      }
      if (this.type == 16) {
        if (this.options && this.options.length > 0) {
          inStoreStock({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y];
              this.reMarkinStoreStock();
            }
          });
        }
      }
      if (this.type == 17) {
        if (this.options && this.options.length > 0) {
          userNum({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y];
              this.reMarkuserNum();
            }
          });
        }
      }
      if (this.type == 18) {
        if (this.options && this.options.length > 0) {
          outNum({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y];
              this.reMarkoutNum();
            }
          });
        }
      }
      if (this.type == 19) {
        if (this.options && this.options.length > 0) {
          personUseCarTop({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1];
              this.reMarkpersonUseCarTop();
            }
          });
        }
      }
      if (this.type == 20) {
        if (this.options && this.options.length > 0) {
          personOutCarTop({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1];
              this.reMarkpersonOutCarTop();
            }
          });
        }
      }

      if (this.type == 21) {
        if (this.options && this.options.length > 0) {
          carTop({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1];
              this.reMarkcarTop();
            }
          });
        }
      }

      if (this.type == 22) {
        if (this.options && this.options.length > 0) {
          useCarApprove({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y];
              this.reMarkuseCarApprove();
            }
          });
        }
      }

      if (this.type == 23) {
        if (this.options && this.options.length > 0) {
          outCarApprove({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y];
              this.reMarkoutCarApprove();
            }
          });
        }
      }

      if (this.type == 24) {
        if (this.options && this.options.length > 0) {
          personuserNum({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1, res.data.y2];
              this.reMarkpersonuserNum();
            }
          });
        }
      }

      if (this.type == 25) {
        if (this.options && this.options.length > 0) {
          if (this.request == 0) {
            personOuto({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
              if (res && res.code == 200) {
                this.data1 = res.data;
                this.xdata = res.data.x;
                this.lineData = [];
                this.lineData = [res.data.y];
                this.reMarkpersonOuto();
              }
            });
          } else {
            personOutt({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
              if (res && res.code == 200) {
                this.data1 = res.data;
                this.xdata = res.data.x;
                this.lineData = [];
                this.lineData = [res.data.y];
                this.reMarkpersonOuto();
              }
            });
          }
        }
      }
      if (this.type == 26) {
        if (this.options && this.options.length > 0) {
          contlaborage({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1];
              this.reMarkcontlaborage();
            }
          });
        }
      }
      if (this.type == 27) {
        if (this.options && this.options.length > 0) {
          worklaborage({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1];
              this.reMarkworklaborage();
            }
          });
        }
      }
      if (this.type == 28) {
        if (this.options && this.options.length > 0) {
          performancetotal({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y0, res.data.y1];
              this.reMarkperformancetotal();
            }
          });
        }
      }

      if (this.type == 29) {
        if (this.options && this.options.length > 0) {
          infoAge({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y];
              this.reMarkinfoAge();
            }
          });
        }
      }

      if (this.type == 30) {
        if (this.options && this.options.length > 0) {
          infoEdu({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.data1 = res.data;
              this.xdata = res.data.x;
              this.lineData = [];
              this.lineData = [res.data.y];
              this.reMarkinfoEdu();
            }
          });
        }
      }

      if (this.type == 31) {
        if (this.options && this.options.length > 0) {
          stockDept({
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
              this.reMarkstockDept();
            }
          });
        }
      }

      if (this.type == 32) {
        if (this.options && this.options.length > 0) {
          stockDept({
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
              this.reMarkstockDept();
            }
          });
        }
      }

      if (this.type == 33) {
        if (this.options && this.options.length > 0) {
          stockDept({
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
              this.reMarkstockDept();
            }
          });
        }
      }

      if (this.type == 34) {
        if (this.options && this.options.length > 0) {
          stockDept({
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
              this.reMarkstockDept();
            }
          });
        }
      }

      if (this.type == 35) {
        if (this.options && this.options.length > 0) {
          stockDept({
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
              this.reMarkstockDept();
            }
          });
        }
      }

      if (this.type == 36) {
        if (this.options && this.options.length > 0) {
          stockDept({
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
              this.reMarkstockDept();
            }
          });
        }
      }
    },

    //#endregion

    //触发更新数据
    getDate() {
      console.log('更新数据', this.options);
      if (!this.options) {
        this.options = this.commonFun.compoYears[0].value;
      }
      this.getData();
    },

    check() {
      this.$router.push({ path: this.tolink });
    },

    //#region   处理重绘

    makeSeries(arr) {
      try {
        let colorArr = ['#409EFF', '#2FD052', '#FAC06A', '#DC52FF', '#FF6161', '#F0A2F2'];
        let valArr = [];
        if (arr && arr.length > 0) {
          for (let index = 0; index < arr.length; index++) {
            valArr.push({
              name: arr[index],
              type: 'bar',
              //stack: 'Search Engine', 堆叠柱形图
              data: this.lineData[index],
              color: colorArr[index],
              label: {
                show: true,
                position: 'top',
                formatter: function (data) {
                  return data.value;
                },
              },
            });
          }
          //console.log(valArr);
          return valArr;
        } else {
          return [
            {
              name: '',
              type: 'bar',
              //stack: 'Search Engine', 堆叠柱形图
              data: this.lineData[0],
              color: '#409EFF',
              label: {
                show: true,
                position: 'top',
                formatter: function (data) {
                  return data.value;
                },
              },
            },
          ];
        }
      } catch (error) {
        return [
          {
            name: '',
            type: 'bar',
            //stack: 'Search Engine', 堆叠柱形图
            data: this.lineData[0],
            color: '#409EFF',
            label: {
              show: true,
              position: 'top',
              formatter: function (data) {
                return data.value;
              },
            },
          },
        ];
      }
    },

    //计算总数
    getTotal(arr) {
      //console.log(arr.length, this.lineData.length);
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
              this.lineData[0].forEach((e) => {
                total += Number(e);
              });

              //部分总数统计不符合情况无法区分仅保留需要统计的总数
              if (this.type == 29 || this.type == 30) {
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
          //left: 'center',
          textStyle: {
            fontSize: 17,
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: arr != null ? [...arr] : [''],
          //data: this.getValTotal(arr),报错：组件名字必须跟y轴名字一样方可控制Legend data should be same with series name or data name.
          // right: '25%',
          left: 'center',
          top: '4%',
          icon: 'rect',
          type: 'scroll',
          textStyle: {
            color: '#666666',
            fontSize: '14px',
          },
          itemWidth: 10, // 长方形宽度
          itemHeight: 10, // 长方形高度
        },
        grid: {
          top: '24%',
          left: '5%',
          right: '4%',
          bottom: '0%',
          containLabel: true,
        },
        xAxis: [
          {
            axisLabel: {
              rotate: 23, // 设置斜度 旋转角度
              fontSize: '13px', //文字的字体大小
            },
            type: 'category',
            data: this.xdata,
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: this.makeSeries(arr),
      };
      //this.$nextTick(() => {
      var myChart = this.$echarts.init(this.$refs.myBarChart);
      myChart.clear();
      myChart.setOption(option);
      window.addEventListener('resize', () => {
        myChart.resize();
      });
      //});
    },

    reMarkstockDept() {
      this.InitOptions(['次数', '数量']);
    },

    reMarkinfoEdu() {
      this.InitOptions(['总数']);
    },

    reMarkinfoAge() {
      this.InitOptions(['总数']);
    },

    reMarkperformancetotal() {
      this.InitOptions(['业绩总数', '新增业绩']);
    },

    reMarkworklaborage() {
      this.InitOptions(['总数', '最近一年内新增']);
    },

    reMarkcontlaborage() {
      this.InitOptions(['男', '女']);
    },

    reMarkpersonOuto() {
      this.InitOptions();
    },

    reMarkpersonuserNum() {
      this.InitOptions(['人员总数', '在岗人员数', '离职人员数']);
    },

    reMarkoutCarApprove() {
      this.InitOptions();
    },

    reMarkuseCarApprove() {
      this.InitOptions();
    },

    reMarkcarTop() {
      //   this.reMarkpersonOutCarTop();
      this.InitOptions(['用车时长(h)', '用车次数']);
    },

    //'用车时长(h)', '用车次数'
    reMarkpersonOutCarTop() {
      this.InitOptions(['用车时长(h)', '用车次数']);
    },

    reMarkpersonUseCarTop() {
      this.InitOptions(['用车时长(h)', '用车次数']);
    },

    reMarkoutNum() {
      this.InitOptions(['数量']);
    },

    reMarkuserNum() {
      this.InitOptions(['数量']);
    },

    reMarkinStoreStock() {
      this.InitOptions(['数量']);
    },

    reMarkcontMoneyo() {
      this.InitOptions(['金额']);
    },

    reMarkcontractApply() {
      this.InitOptions(['合同数量', '合同金额(万元)']);
    },

    reMarkpaymentHandlet() {
      this.InitOptions(['收款次数', '收款金额']);
    },

    reMarkpaymentHandle() {
      this.InitOptions(['付款次数', '付款金额']);
    },

    reMarkcontractStatistic() {
      this.InitOptions(['开票次数', '开票金额']);
    },

    reMarkcontractStatistict() {
      this.InitOptions(['收票次数', '收票金额']);
    },

    //多条
    reMarkLeader() {
      this.InitOptions(['合同数量', '合同金额(万元)']);
    },

    //单条
    reMarkduserApply() {
      this.InitOptions(['资料下载']);
    },

    reMarkbidClientTop() {
      this.InitOptions(['投标次数']);
    },

    reMarkbidperson() {
      this.InitOptions(['参与投标次数', '担当负责人次数']);
    },

    reMarkoutContLeader() {
      this.InitOptions(['合同数量', '合同金额(万元)']);
    },

    reMarkprojectProgress() {
      this.InitOptions(['项目进行中', '项目完成', '未签订项目进行中', '项目超期', '项目中止']);
    },

    reMarkprjRole() {
      this.InitOptions(['角色统计']);
    },

    reMarkprojectleader() {
      this.InitOptions(['负责项目数量', '按期完成数量']);
    },

    //9
    reMarkprojectDataArea() {
      this.InitOptions(['总数', '新增']);
    },

    //8
    reMarkprogressNum() {
      this.InitOptions(['填报数量']);
    },
    //#endregion
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
      // min-width: 250px;
      font-family: Alibaba PuHuiTi 2;
      font-size: 20px;
      font-weight: 500;
      line-height: 60px;
      letter-spacing: 0em;
      text-align: left;
      width: auto;
      overflow: hidden;
      //margin-right: 20px;
      //white-space: nowrap;
      // overflow: hidden;
      // text-overflow: ellipsis;
      // white-space: nowrap;
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
      //1比1.5组件菜单多个选项样式处理
      // min-width: 260px;
      // margin: auto 0;
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
    #mybarChart {
      width: 100%;
      height: 300px;
    }
  }
}
</style>
