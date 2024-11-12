<template>
  <div class="cbody">
    <div class="top">
      <span class="toptitle"> {{ title }}</span>
      <!-- <svg-icon icon-class="more" /> -->
      <div class="topmenu">
        <a class="toplink" v-show="tolink" @click="check()"> 查看更多</a>
      </div>
    </div>
    <div class="main">
      <el-card class="box-card">
        <div class="box-card-main">
          <el-row :gutter="20">
            <el-col :span="8" v-for="(c, index) in data" :key="index">
              <div class="row-content">
                <div class="grid-content bg-purple">
                  <!-- <i ></i> -->
                  <svg-icon class="el-icon-refresh-left" icon-class="card-xmxx" />
                  <InputTip class="inputTip" :width="itemWidth" :text="c.prjName"></InputTip>
                </div>
                <div class="purple-row">
                  <el-row :gutter="24">
                    <el-col :span="6">
                      <div class="bg-purple-col">进行</div>
                      <div class="color-409EFF">{{ c.progressNum }}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="bg-purple-col">完成</div>
                      <div class="color-2FD052">{{ c.completeNum }}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="bg-purple-col">超期</div>
                      <div class="color-FF6161">{{ c.overdueNum }}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="bg-purple-col">等待开始</div>
                      <div class="color-666666">{{ c.waitNum }}</div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { planNum } from '@/api/data/statistic';
import * as echarts from 'echarts';
export default {
  props: ['type'], //0
  data() {
    return {
      itemWidth: 210,
      title: '', //标题
      tolink: '', //更多链接
      data: [], //数据
      test: '广州国际金融中项目',
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
          this.title = '项目计划概况统计';
          this.tolink = '';
          break;
        default:
          break;
      }
      this.getData();
    },

    getData() {
      if (this.type == 0) {
        planNum().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
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

<style scoped>
.cbody {
  background: #fff;
  height: 100%;
}
.top {
  background: #fff;
  padding: 0 20px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e4e6ed;
}

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
.topmenu {
  margin: auto 0;
}
.topmenu .el-select {
  width: 120px;
}

.main {
  overflow: auto;
  height: 100%;
  padding-bottom: 50px;
}

.el-card.is-always-shadow {
  box-shadow: none;
  border: none;
}

.clearfix {
  height: 40px;
  line-height: 40px;
  font-weight: 1000;
  font-size: 20px;
}
.clearfix-titie-icon {
  color: #409eff;
  position: relative;
  font-size: 20px;
  top: -1px;
  margin-right: 10px;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #ecf5ff;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 16px;
  color: #409eff;
}

/* .grid-content-title {
  width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
} */

.el-icon-refresh-left {
  transform: translateY(-25px);
}

.inputTip {
  display: inline;
}
.inputTip >>> .content {
  color: #409eff;
  font-weight: bold;
  text-align: center;
}

.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-content {
  border: 1px solid #efefef;
  border-radius: 5px;
}
.el-col {
  margin-bottom: 20px;
}
.purple-row {
  padding: 10px 20px 0px 20px;
}
.bg-purple-col {
  background: #fff;
  text-align: left;
  font-size: 12px;
  margin-bottom: 10px;
}
.color-409EFF {
  color: #409eff;
}
.color-2FD052 {
  color: #2fd052;
}
.color-FF6161 {
  color: #ff6161;
}
.color-6666666 {
  color: #666666;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
