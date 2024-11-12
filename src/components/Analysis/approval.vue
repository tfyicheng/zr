<template class="app-container">
  <div>
    <div class="top">
      <span>审批</span>
      <a>查看更多</a>
    </div>
    <div class="main">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待办" name="first">
          <approvallistVue :ainfo="unfinish" />
        </el-tab-pane>
        <el-tab-pane label="已申请" name="second"> 
          <approvallistVue :ainfo="isfinish"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import approvallistVue from './approvallist.vue';
export default {
  name: 'Approval', //审批组件
  components: { approvallistVue },
  data() {
    return {
      activeName: 'first',
      unfinish: [
        {
          title: '张学友申请下载‘优质水利工程奖’证书文件张学友申请下载‘优质水利工程奖’证书文件张学友申请下载‘优质水利工程奖’证书文件张学友申请下载‘优质水利工程奖’证书文件',
          date: '2023-11-12',
          statue: 2,
        },
        {
          title: '张学友申请下载‘优质水利工程奖’证书文件1',
          date: '2023-11-11',
          statue: 1,
        },
        {
          title: '张学友申请下载‘优质水利工程奖’证书文件',
          date: '2023-11-10',
          statue: 0,
        },
        {
          title: '张学友申请下载‘优质水利工程奖’证书文件',
          date: '2023-11-11',
          statue: 1,
        },
        {
          title: '张学友申请下载‘优质水利工程奖’证书文件',
          date: '2023-11-10',
          statue: 0,
        },
        {
          title: '张学友申请下载‘优质水利工程奖’证书文件',
          date: '2023-11-11',
          statue: 1,
        },
        {
          title: '张学友申请下载‘优质水利工程奖’证书文件',
          date: '2023-11-10',
          statue: 0,
        },
      ],
      isfinish: [
        {
          title: '张学友申请下载‘优质水利工程奖’证书文件',
          date: '2023-11-12',
          statue: 2,
        },
        {
          title: '张学友申请下载‘优质水利工程奖’证书文件',
          date: '2023-11-11',
          statue: 1,
        }
      ],
    };
  },
  created() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
<style lang="scss" scoped>
.top {
  padding: 0;
 // margin: 12px 0px;
  display: flex;
  justify-content: space-between;
  height: 40px;
  span {
    color: #333;
    font-family: Alibaba PuHuiTi 2;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 15px;
  }
  a {
    margin-top: 0px;
    color: #409eff;
    font-family: Alibaba PuHuiTi 2;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 15px;
    text-transform: capitalize;
    cursor: pointer;
  }
}
.main {
  border-radius: 4px;
  background: #fff;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.02);
  height: 340px;
  // ::deep el-tabs {
  //   padding-left: 10px!important;
  //   margin-left: 10px;
  // }
}
::v-deep{
  .el-tabs {
    .el-tabs__header{
        margin: 0px;
      }
    .el-tabs__nav-wrap {
      padding-left: 17px;

      .el-tabs__item {
        font-family: Alibaba PuHuiTi 2;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
      }
    }
  }
}
</style>
