<template class="app-container">
  <div>
    <div class="top">
      <!-- 选项 -->
      <div>
        <el-tabs v-model="selectName" @tab-click="handleClick">
          <el-tab-pane
            v-if="selects.length == 1"
            :label="selects[0].title"
            :name="selects[0].title"
          >
          </el-tab-pane>
          <el-tab-pane
            :if="selects.length > 1"
            v-for="(item, index) in selects"
            :label="item.title"
            :name="item.title"
            :key="index"
          >
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- 月份 -->
      <div>
        <el-select
          :default-first-option="true"
          v-model="optionValue"
          placeholder="年份"
          clearable
          size="small"
          @change="yearOptChange"
        >
          <el-option
            v-for="item in options"
            :key="item.label"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
        <el-select v-model="optionValue2" placeholder="月份" size="small" @change="monthOptChange">
          <el-option
            v-for="item in options2"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="main">
      <div>
        <div class="maint">
          <div class="part1m">
            <div class="part1mi" v-for="(item, index) in GetForValue()" :key="index">
              <div
                class="partmit"
                :style="commonFun.markRed.includes(item.name) ? 'color:#FF6161' : 'color:#409EFF'"
              >
                {{ item.number }}
              </div>
              <div class="partmim">{{ item.name }}</div>
            </div>
          </div>
        </div>
        <div>
          <div id="main"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurveChart', //曲线图组件
  data() {
    return {
      selectName: '',
      selects: [
        {
          title: '人员出差概况',
          value: [
            {
              name: '出差总费用（元）',
              number: 8369147.67,
            },
            {
              name: '出差人数',
              number: 358,
            },
            {
              name: '出差次数',
              number: 2537,
            },
          ],
        },
        {
          title: '人员请假概况',
          value: [
            {
              name: '请假总费用（元）',
              number: 8369147.67,
            },
            {
              name: '请假人数',
              number: 358,
            },
            {
              name: '请假次数',
              number: 2537,
            },
            {
              name: '请假均数',
              number: 25,
            },
          ],
        },
      ],
      options: [
        {
          label: '2023',
        },
        {
          label: '2022',
        },
        {
          label: '2021',
        },
        {
          label: '2020',
        },
      ],
      optionValue: '',
      optionValue2: '',
      options2: this.commonFun.months,
      chartOption: {
        title: {
          text: '',
        },
        tooltip: {},
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {},
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true,
          },
        ],
        grid: {
          // 让图表占满容器
          top: '10px',
          left: '50px',
          right: '0px',
          bottom: '50px',
        },
      },
      chartOption2: {
        title: {
          text: '',
        },
        tooltip: {},
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {},
        series: [
          {
            data: [920, 1032, 901, 934, 1090, 830, 320],
            type: 'line',
            smooth: true,
          },
        ],
        grid: {
          // 让图表占满容器
          top: '10px',
          left: '50px',
          right: '0px',
          bottom: '50px',
        },
      },
    };
  },
  mounted() {
    //默认选择
    this.selectName = this.selects[0].title;
    this.optionValue = this.options[0].label;
    this.optionValue2 = this.options2[0].label;

    // 基于准备好的dom，初始化echarts实例
    this.$nextTick(() => {
      var myChart = this.$echarts.init(document.getElementById('main'));
      // 使用刚指定的配置项和数据显示图表。

      myChart.setOption(this.chartOption);
      window.addEventListener('resize', () => {
        myChart.resize();
      });
    });

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: '',
      },
      tooltip: {},
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {},
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true,
        },
      ],
      grid: {
        // 让图表占满容器
        top: '10px',
        left: '50px',
        right: '0px',
        bottom: '50px',
      },
    };
  },

  created() {},

  beforeDestroy() {
    /* 页面组件销毁的时候，别忘了移除绑定的监听resize事件，否则的话，多渲染几次
    容易导致内存泄漏和额外CPU或GPU占用*/
    window.removeEventListener('resize', () => {
      this.$echarts.init(document.getElementById('main')).resize();
    });
  },
  methods: {
    GetForValue() {
      //console.log("val1"+ this.selects[0].title);
      //console.log("val"+this.selects.find(c=>c.title == this.selectName).value == undefined ? this.selects[0].value: this.selects.find(c=>c.title == this.selectName).value);
      return this.selects.find((c) => c.title == this.selectName).value == undefined
        ? this.selects[0].value
        : this.selects.find((c) => c.title == this.selectName).value;
    },
    //概况选择触发变化
    handleClick(tab, event) {
      //console.log(tab, event);
      console.log(this.selectName);
      this.chartChange();
    },
    handle() {
      // 第六步，执行echarts自带的resize方法，即可做到让echarts图表自适应
      this.myChart.resize();
      // 如果有多个echarts，就在这里执行多个echarts实例的resize方法,不过一般要做组件化开发，即一个.vue文件只会放置一个echarts实例
      /*
      this.myChart2.resize();
      this.myChart3.resize();
      ......
      */
    },
    //年份选择触发变化
    yearOptChange(value) {
      console.log(value);
      this.chartChange();
    },
    //月份选择触发变化
    monthOptChange(value) {
      console.log(value);
      this.chartChange();
    },

    //曲线图变化
    chartChange() {
      var myChart = this.$echarts.init(document.getElementById('main'));
      if (this.optionValue == '2022') {
        myChart.setOption(this.chartOption);
      } else {
        myChart.setOption(this.chartOption2);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.top {
  padding: 0;
  margin: 0px 0px;
  display: flex;
  justify-content: space-between;
}

.main {
  border-radius: 4px;
  background: #fff;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.02);
  height: 420px;
  padding: 24px;
  .maint {
    margin-bottom: 24px;
    height: 80px;
    flex-shrink: 0;
    border-radius: 4px;
    background: #f3f4f8;
    .part1m {
      display: flex;
      .part1mi {
        text-align: center;
        margin: 20px 0 0px 20px;
        height: 40px;
        flex: 1;
        border-right: 1px solid #e4e6ed;
        .partmit {
          color: #409eff;
          font-family: Alibaba PuHuiTi 2;
          font-size: 24px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
        }
        .partmim {
          color: #666;
          font-family: Alibaba PuHuiTi 2;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }
      .part1mi:last-child {
        border-right: 0px;
      }
    }
  }
  #main {
    //padding:24px;
    width: auto;
    height: 280px;
  }
}
::v-deep {
  .el-tabs__header {
    //margin-top:-20px;
    transform: translateY(-20%);

    .el-tabs__item {
      font-family: Alibaba PuHuiTi 2;
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
    }
  }

  .el-select {
    width: 100px;
    height: 32px;
    margin-left: 14px;
  }

  .el-tabs__nav-wrap::after {
    position: static !important;
  }
}
</style>
