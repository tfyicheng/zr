<template class="app-container">
  <div class="cbody">
    <div class="top">
      <el-tooltip effect="dark" :content="title" placement="top-start">
        <span class="toptitle"> {{ title }}</span>
      </el-tooltip>
      <!-- <svg-icon icon-class="more" /> -->

      <div class="topmenu">
        <!-- <svg-icon icon-class="more" /> -->
        <a class="toplink" v-show="tolink" @click="check()"> 查看更多</a>
        <!-- daterange monthrange -->

        <!-- <el-select v-model="options" placeholder="最近一年" @change="getDate()">
          <el-option
            v-for="item in commonFun.compoYears"
            :key="item.key"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select> -->

        <el-select
          v-show="type == 2"
          v-model="deptId"
          placeholder="部门"
          clearable
          @change="getDate()"
        >
          <el-option
            v-for="item in depts"
            :key="item.deptId"
            :label="item.deptName"
            :value="item.deptId"
          >
          </el-option>
        </el-select>

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
      </div>
    </div>
    <div class="main">
      <div id="main_chart" ref="chartone"></div>
    </div>
  </div>
</template>

<script>
import { listDept } from '@/api/system/dept';
import {
  projectDataDistribution,
  projectArea,
  distributionUseCar,
  bidArea,
} from '@/api/data/statistic';
import '@/utils/china.js';
export default {
  name: 'RegionView', //区域分布组件
  props: ['type'], //0地区资料分布
  data() {
    return {
      mdata: [
        // { name: '北京', value: '100' },
        // { name: '天津', value: '400' },
        // {name: '上海',value: randomData() },{name: '重庆',value: randomData() },
        // {name: '河北',value: randomData() },{name: '河南',value: randomData() },
        // {name: '云南',value: randomData() },{name: '辽宁',value: randomData() },
        // {name: '黑龙江',value: randomData() },{name: '湖南',value: randomData() },
        // {name: '安徽',value: randomData() },{name: '山东',value: randomData() },
        // { name: '新疆', value: this.randomData() },
        // { name: '江苏', value: this.randomData() },
        // {name: '浙江',value: randomData() },{name: '江西',value: randomData() },
        // {name: '湖北',value: randomData() },{name: '广西',value: randomData() },
        // {name: '甘肃',value: randomData() },{name: '山西',value: randomData() },
        // {name: '内蒙古',value: randomData() },{name: '陕西',value: randomData() },
        // {name: '吉林',value: randomData() },{name: '福建',value: randomData() },
        // {name: '贵州',value: randomData() },{name: '广东',value: randomData() },
        // {name: '青海',value: randomData() },{name: '西藏',value: randomData() },
        // {name: '四川',value: randomData() },{name: '宁夏',value: randomData() },
        // {name: '海南',value: randomData() },{name: '台湾',value: randomData() },
        // {name: '香港',value: randomData() },{name: '澳门',value: randomData() }
      ],
      tolink: '',
      title: '',
      depts: [], //部门项
      deptId: null,
      options: [],
    };
  },
  created() {
    // this.TestInit();
    this.init();
    this.getDeptList();
  },
  methods: {
    //获取部门列表
    getDeptList() {
      if (this.type == 2) {
        listDept().then((response) => {
          console.log(response);
          this.depts = response.data;
        });
      }
    },

    //刷新
    refresh() {
      this.init();
      this.getDeptList();
    },

    //初始化
    init() {
      this.options = this.commonFun.compoYears[0].value;
      switch (this.type) {
        case 0:
          this.title = '地区资料分布';
          this.tolink = '';
          break;
        case 1:
          this.title = '项目区域分布';
          break;
        case 2:
          this.title = '到达地点分布';
          break;
        case 3:
          this.title = '投标业务分布';
          break;

        default:
          break;
      }
      this.getData();
    },

    getData() {
      if (this.type == 0) {
        if (this.options && this.options.length > 0) {
          projectDataDistribution({ startDate: this.options[0], endDate: this.options[1] }).then(
            (res) => {
              if (res && res.code == 200) {
                this.mdata = res.data.map((c) => {
                  return {
                    name: this.nameCover(c.name),
                    value: c.value,
                  };
                });
                this.reMarkDistribution();
              }
            },
          );
        }
      }
      if (this.type == 1) {
        if (this.options && this.options.length > 0) {
          projectArea({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.mdata = res.data.map((c) => {
                return {
                  name: this.nameCover(c.name),
                  value: c.value,
                };
              });
              this.reMarkprojectArea();
            }
          });
        }
      }
      if (this.type == 2) {
        if (this.options && this.options.length > 0) {
          distributionUseCar({
            startDate: this.options[0],
            endDate: this.options[1],
            deptId: this.deptId,
          }).then((res) => {
            if (res && res.code == 200) {
              this.mdata = res.data.map((c) => {
                return {
                  name: this.nameCover(c.name),
                  value: c.value,
                };
              });
              this.reMarkdistributionUseCar();
            }
          });
        }
      }

      if (this.type == 3) {
        if (this.options && this.options.length > 0) {
          bidArea({ startDate: this.options[0], endDate: this.options[1] }).then((res) => {
            if (res && res.code == 200) {
              this.mdata = res.data.map((c) => {
                return {
                  name: this.nameCover(c.name),
                  value: c.value,
                };
              });
              this.reMarkbidArea();
            }
          });
        }
      }
    },

    //地区名称处理
    nameCover(val) {
      try {
        if (val.includes('省') || val.includes('市')) {
          return val.slice(0, -1);
        } else {
          return val;
        }
      } catch (error) {
        return val;
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

    randomData() {
      return Math.round(Math.random() * 500);
    },

    TestInit() {
      this.$nextTick(() => {
        function randomData() {
          return Math.round(Math.random() * 500);
        }

        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(this.$refs.chartone);
        // 指定图表的配置项和数据
        var optionMap = {
          backgroundColor: '#FFFFFF',
          title: {
            text: '',
            subtext: '',
            y: '5%',
            x: 'center',
          },
          tooltip: {
            trigger: 'item',
          },
          layoutCenter: ['0%', '50%'], //位置
          //左侧小导航图标
          visualMap: {
            show: true,
            x: 'right',
            y: 'center',
            splitList: [
              { start: 500, end: 600 },
              { start: 400, end: 500 },
              { start: 300, end: 400 },
              { start: 200, end: 300 },
              { start: 100, end: 200 },
              { start: 0, end: 100 },
            ],
            color: ['#5475f5', '#9feaa5', '#85daef', '#74e2ca', '#e6ac53', '#9fb5ea'],
          },

          //配置属性
          series: [
            {
              name: '数据',
              type: 'map',
              mapType: 'china',
              roam: true,
              label: {
                normal: {
                  show: false, //省份名称
                },
                emphasis: {
                  show: false,
                },
              },
              data: this.mdata, //数据
            },
          ],
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(optionMap);
        window.addEventListener('resize', () => {
          myChart.resize();
        });
      });
    },

    //计算总数
    getTotal() {
      if (this.mdata != null && this.mdata.length > 0) {
        try {
          let data = '';
          let total = 0;
          this.mdata.forEach((e) => {
            total += Number(e.value);
          });
          data = '总数(' + total + ')';

          return data;
        } catch (error) {
          return '';
        }
      } else {
        return '';
      }
    },

    InitOptions() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.chartone);
      // 指定图表的配置项和数据
      var optionMap = {
        backgroundColor: '#FFFFFF',
        title: {
          text: this.getTotal(),
          //subtext: '',
          //y: '5%',
          //x: 'center',
          textStyle: {
            fontSize: 17,
          },
        },
        tooltip: {
          trigger: 'item',
        },

        // layoutCenter: ['70%', '50%'], //距离左右，上下距离的百分比
        //  layoutSize: '130%', //map百分比大小
        //左侧小导航图标
        visualMap: {
          show: true,
          x: 'right',
          y: 'center',
          splitList: [
            { start: 500, end: 600 },
            { start: 400, end: 500 },
            { start: 300, end: 400 },
            { start: 200, end: 300 },
            { start: 100, end: 200 },
            { start: 0, end: 100 },
          ],
          color: ['#5475f5', '#9feaa5', '#85daef', '#74e2ca', '#e6ac53', '#9fb5ea'],
        },

        //配置属性
        series: [
          {
            name: '数据',
            type: 'map',
            mapType: 'china',
            roam: true,
            label: {
              normal: {
                show: false, //省份名称
              },
              emphasis: {
                show: false,
              },
            },
            data: this.mdata, //数据
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.clear();
      myChart.setOption(optionMap);
      window.addEventListener('resize', () => {
        myChart.resize();
      });
    },

    reMarkbidArea() {
      this.InitOptions();
    },

    reMarkdistributionUseCar() {
      this.InitOptions();
    },

    //项目资料地区资料分布重绘
    reMarkDistribution() {
      this.InitOptions();
    },

    reMarkprojectArea() {
      this.InitOptions();
    },
  },

  beforeDestroy() {
    window.removeEventListener('resize', () => {
      this.$echarts.init(this.$refs.chartone).resize();
    });
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
      // float: left;

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
      // min-width: 330px;
      .el-date-editor,
      .el-select {
        width: 120px;
        margin-left: 10px;
        float: right;
      }
    }
  }
  .main {
    //     height: 100%;
    // overflow: auto;
    #main_chart {
      width: 100%;
      height: 300px;
    }
  }
}
</style>
