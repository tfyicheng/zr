<template class="app-container">
  <div class="cbody">
    <div class="top">
      <span class="toptitle"> {{ title }}</span>
      <!-- <svg-icon icon-class="more" /> -->
      <div class="topmenu">
        <a class="toplink" v-show="tolink" @click="check()"> 查看更多</a>
      </div>
    </div>

    <div class="main">
      <div class="m1">
        <div
          v-for="(c, index) in data.slice(0, 3)"
          :key="index + 1"
          class="mitem"
          @click="toRoute(c.rname)"
        >
          {{ c.rname }}
        </div>
      </div>
      <div class="m1">
        <div
          v-for="(c, index) in data.slice(3)"
          :key="index + 1"
          class="mitem"
          @click="toRoute(c.rname)"
        >
          {{ c.rname }}
        </div>
      </div>
    </div>

    <!-- <div class="main" v-if="type == 0">
      <div class="m1">
        <div class="mitem one" @click="toRoute('项目资料')">项目资料</div>
        <div class="mitem two" @click="toRoute('项目合同')">项目合同</div>
        <div class="mitem three" @click="toRoute('投标管理')">投标管理</div>
      </div>
      <div class="m1">
        <div class="mitem one" @click="toRoute('用车申请')">用车申请</div>
        <div class="mitem two" @click="toRoute('收款记录')">收款记录</div>
        <div class="mitem three" @click="toRoute('收款记录')">收款记录</div>
      </div>
    </div>
    <div class="main" v-if="type == 1">
      <div class="m1">
        <div class="mitem one" @click="toRoute('添加项目资料')">添加项目资料</div>
        <div class="mitem two" @click="toRoute('添加项目合同')">添加项目合同</div>
        <div class="mitem three" @click="toRoute('添加项目资料')">添加项目资料</div>
      </div>
      <div class="m1">
        <div class="mitem one" @click="toRoute('用车申请')">用车申请</div>
        <div class="mitem two" @click="toRoute('收款记录')">收款记录</div>
        <div class="mitem three" @click="toRoute('人员请假')">人员请假</div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { getRoute } from '@/api/system/operlog';
export default {
  name: 'FuncNav', //最近使用功能导航组件
  props: ['type'], //0
  data() {
    return {
      title: '最近使用功能', //标题
      tolink: '', //更多链接
      data: [
        // {
        //   rname: '项目资料',
        // },
      ], //数据
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
        default:
          break;
      }
      this.getData();
    },

    getData() {
      if (this.type == 0) {
        getRoute(-1).then((res) => {
          if (res && res.code == 200) {
            this.data = this.filterData(res.data);
          }
        });
      }
      if (this.type == 1) {
        getRoute('data').then((res) => {
          if (res && res.code == 200) {
            this.data = this.filterData(res.data);
          }
        });
      }
      if (this.type == 2) {
        getRoute('production').then((res) => {
          if (res && res.code == 200) {
            this.data = this.filterData(res.data);
          }
        });
      }
      if (this.type == 3) {
        getRoute('project').then((res) => {
          if (res && res.code == 200) {
            this.data = this.filterData(res.data);
          }
        });
      }
      if (this.type == 4) {
        getRoute('purchase').then((res) => {
          if (res && res.code == 200) {
            this.data = this.filterData(res.data);
          }
        });
      }
      if (this.type == 5) {
        getRoute('car').then((res) => {
          if (res && res.code == 200) {
            this.data = this.filterData(res.data);
          }
        });
      }
      if (this.type == 6) {
        getRoute('person').then((res) => {
          if (res && res.code == 200) {
            this.data = this.filterData(res.data);
          }
        });
      }
    },

    //过滤数据
    filterData(val) {
      return val
        .map((c) => {
          return {
            rname: this.commonFun.getRouteKey(c.component),
          };
        })
        .filter((item) => {
          return item.rname !== null;
        });
    },

    toRoute(val) {
      this.commonFun.goTo(val, false);
      return;
      switch (val) {
        case '资料管理':
          this.$router.push({ path: '/data-d/projectdataCheck' });
          break;
        case '项目合同':
          this.$router.push({ path: '/data/contractmanagement/projectContractIndex' });
          break;
        case '项目管理':
          this.$router.push({ path: '/project-d/projectCheck' });
          break;
        case '投标管理':
          this.$router.push({ path: '/production-d/bidManagementCheck' });
          break;
        case '项目资料':
          this.$router.push({ path: '/data-d/projectdataCheck' });
          break;
        case '收款记录':
          this.$router.push({ path: '/production-d/incomeRecordCheck' });
          break;
        case '用车申请':
          this.$router.push({ path: '/car-d/carRequestCheck' });
          break;
        case '外出申请':
          this.$router.push({ path: '/person-d/personOutCheck' });
          break;
        case '外委合同':
          this.$router.push({ path: '/data/contractmanagement/outsourcingContractIndex' });
          break;
        case '劳动合同':
          this.$router.push({ path: '/data/contractmanagement/laborContractIndex' });
          break;
        case '采购合同':
          this.$router.push({ path: '/data/contractmanagement/purchaseContractIndex' });
          break;
        case '人员信息':
          this.$router.push({ path: '/data-d/personnelInfoCheck' });
          break;
        case '人员外出':
          this.$router.push({ path: '/person-d/personOutCheck' });
          break;
        case '人员请假':
          this.$router.push({ path: '/person-d/personLeaveCheck' });
          break;
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
    .topmenu {
      margin: auto 0;
      .el-select {
        width: 120px;
      }
    }
  }
  .main {
    //     height: 100%;
    // overflow: auto;
    padding: 20px 15px 20px 20px;
    .m1 {
      display: flex;
      .mitem {
        margin: 0px 10px 10px 0;
        flex: 0 0 31.5%;
        width: 150px;
        height: 50px;
        background: #409eff;
        border-radius: 5px;
        cursor: pointer;
        color: #fff;
        font-size: 18px;
        line-height: 50px;
        text-align: center;
      }
      // .mitem.one {
      //   background: #409eff;
      // }
      // .mitem.two {
      //   background: #fac06a;
      // }
      // .mitem.three {
      //   background: #2fd052;
      // }
      .mitem:nth-child(n + 1) {
        background: #409eff;
      }
      .mitem:nth-child(n + 2) {
        background: #fac06a;
      }
      .mitem:nth-child(n + 3) {
        background: #2fd052;
      }
    }
  }
}
</style>
