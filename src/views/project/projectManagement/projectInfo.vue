<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['项目管理', '项目管理统计', '项目列表', '项目信息详情']" />
        <div class="top">
          <img class="topbg" src="@/assets/images/infobg.svg" />
        </div>
        <div class="main">
          <div class="mt">
            {{ form.name }}
            <el-button style="background: #f3f4f8" @click="goback">返回</el-button>
          </div>
          <div class="mb">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="基本信息" name="info"
                ><Info :uid="form.id" ref="info"
              /></el-tab-pane>
              <el-tab-pane label="项目成员" name="person"
                ><Person :uid="form.prjNumber" ref="person"
              /></el-tab-pane>
              <el-tab-pane label="合同" name="contract"
                ><Cont :uid="form.prjNumber" ref="contract"
              /></el-tab-pane>
              <el-tab-pane label="收款" name="collect"
                ><Income :uid="form.prjNumber" ref="collect"
              /></el-tab-pane>
              <el-tab-pane label="付款" name="pay"
                ><Pay :uid="form.prjNumber" ref="pay"
              /></el-tab-pane>
              <el-tab-pane label="计划" name="plan"
                ><Plan :uid="form.prjNumber" ref="plan"
              /></el-tab-pane>
              <el-tab-pane label="进度" name="process"
                ><Prog :uid="form.prjNumber" ref="process"
              /></el-tab-pane>
              <el-tab-pane label="归档" name="file"
                ><Data :uid="form.prjNumber" ref="file"
              /></el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Info from './tabs/Info';
import Person from './tabs/Person';
import Cont from './tabs/Cont';
import Income from './tabs/Income';
import Pay from './tabs/Pay';
import Plan from './tabs/Plan';
import Prog from './tabs/Prog';
import Data from './tabs/Data';
export default {
  name: 'ProjectInfo', //项目信息
  components: { Info, Person, Cont, Income, Data, Pay, Plan, Prog },
  data() {
    return {
      activeName: 'info',
      form: {
        id: null,
        name: '广州机场建设项目',
        prjNumber: null,
      },
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    //获取基本信息
    getInfo() {
      if (this.$route.query.id) {
        this.form.id = this.$route.query.id;
        //this.$refs.info.getList(this.$route.query.id);
      }
      if (this.$route.query.name) {
        this.form.name = this.$route.query.name;
      }
      if (this.$route.query.prjNumber) {
        this.form.prjNumber = this.$route.query.prjNumber;
      }
      // if (this.$route.query.id) {
      //   personInfo(this.$route.query.id).then((response) => {
      //     this.form = response.data;
      //   });
      // }
      this.handleClick();
    },

    handleClick(val) {
      switch (this.activeName) {
        case 'person':
          this.$refs.person.getList(this.$route.query.id);
          break;
        case 'contract':
          this.$refs.contract.getList(this.$route.query.id);
          break;
        case 'collect':
          this.$refs.collect.getList(this.$route.query.id);
          break;
        case 'pay':
          this.$refs.pay.getList(this.$route.query.id);
          break;
        case 'plan':
          this.$refs.plan.getList(this.$route.query.id);
          break;
        case 'process':
          this.$refs.process.getList(this.$route.query.id);
          break;
        case 'file':
          this.$refs.file.getList(this.$route.query.id);
          break;
        default:
          break;
      }
    },

    //返回
    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
    },
  },
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name) {
        this.getInfo();
        //  this.$tab.refreshPage();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.appo {
  overflow: auto;
  .appi {
    padding: 20px;
    min-width: 1220px;
    .top {
      margin: 0px;
      padding: 0px;
      background: pink;
      .topbg {
        display: block;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
    .main {
      background: #fff;

      .mt {
        font-family: Alibaba PuHuiTi 2;
        font-size: 24px;
        font-weight: 700;
        line-height: 34px;
        letter-spacing: 0em;
        text-align: left;
        padding: 10px 10px;
        .el-button {
          float: right;
          margin-left: 15px;
          border: 0;
          min-width: 100px;
        }
      }

      .mt::before {
        content: '●';
        color: #409eff;
        margin: 10px;
        font-size: 35px;
      }
      .mb {
        ::v-deep .el-tabs {
          .el-tabs__nav-wrap {
            padding-left: 20px;
          }

          .el-tabs__content {
            padding: 20px;
            padding-top: 5px;
          }
        }
      }
    }
  }
}
</style>
