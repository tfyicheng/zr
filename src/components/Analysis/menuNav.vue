<template class="app-container">
  <div class="cbody">
    <div class="top">
      <span class="toptitle"> {{ title }}</span>
      <!-- <svg-icon icon-class="more" /> -->
      <a class="toplink" v-show="tolink" @click="check()"> 查看更多</a>
    </div>
    <div class="main" v-if="type == 0">
      <div class="mainitem" @click="toCheck('资料管理')" v-show="isShow('资料管理')">
        <div class="iconbg">
          <svg-icon icon-class="datamg" />
        </div>
        <div class="itemt">资料管理</div>
      </div>
      <!-- <div class="mainitem" @click="toCheck('项目合同')" v-show="isShow('项目合同')">
        <div class="iconbg" style="background: #fac06a">
          <svg-icon icon-class="menu-xmht" />
        </div>
        <div class="itemt">项目合同</div>
      </div> -->
      <div class="mainitem" @click="toCheck('生产管理')" v-show="isShow('生产管理')">
        <div class="iconbg" style="background: #2fd052">
          <svg-icon icon-class="menu-scgl" />
        </div>
        <div class="itemt">生产管理</div>
      </div>
      <div class="mainitem" @click="toCheck('项目管理')" v-show="isShow('项目管理')">
        <div class="iconbg" style="background: #fac06a">
          <svg-icon icon-class="menu-xmgl2" />
        </div>
        <div class="itemt">项目管理</div>
      </div>
      <div class="mainitem" @click="toCheck('资产采购管理')" v-show="isShow('资产采购管理')">
        <div class="iconbg" style="background: #aac1ff">
          <svg-icon icon-class="menu-zccggl" />
        </div>
        <div class="itemt">资产采购管理</div>
      </div>
      <div class="mainitem" @click="toCheck('车辆管理')" v-show="isShow('车辆管理')">
        <div class="iconbg" style="background: #409eff">
          <svg-icon icon-class="menu-clgl" />
        </div>
        <div class="itemt">车辆管理</div>
      </div>
      <div class="mainitem" @click="toCheck('人员管理')" v-show="isShow('人员管理')">
        <div class="iconbg" style="background: #fac06a">
          <svg-icon icon-class="menu-rygl" />
        </div>
        <div class="itemt">人员管理</div>
      </div>

      <div class="mainitem" @click="toCheck('权限管理')" v-show="isShow('权限管理')">
        <div class="iconbg" style="background: #2fd052">
          <svg-icon icon-class="menu-qxgl" />
        </div>
        <div class="itemt">权限管理</div>
      </div>
      <!-- <div class="mainitem" @click="toCheck('投标管理')" v-show="isShow('投标管理')">
        <div class="iconbg" style="background: #aac1ff">
          <svg-icon icon-class="menu-tbgl" />
        </div>
        <div class="itemt">投标管理</div>
      </div> -->
      <!-- <div class="mainitem" @click="toCheck('项目资料')" v-show="isShow('项目资料')">
        <div class="iconbg">
          <svg-icon icon-class="menu-xmzl" />
        </div>
        <div class="itemt">项目资料</div>
      </div> -->
      <!-- <div class="mainitem" @click="toCheck('收款记录')" v-show="isShow('收款记录')">
        <div class="iconbg" style="background: #fac06a">
          <svg-icon icon-class="menu-skjl" />
        </div>
        <div class="itemt">收款记录</div>
      </div> -->
      <!-- <div class="mainitem" @click="toCheck('用车申请')" v-show="isShow('用车申请')">
        <div class="iconbg" style="background: #2fd052">
          <svg-icon icon-class="menu-ycsq" />
        </div>
        <div class="itemt">用车申请</div>
      </div>
      <div class="mainitem" @click="toCheck('人员外出')" v-show="isShow('人员外出')">
        <div class="iconbg" style="background: #aac1ff">
          <svg-icon icon-class="menu-wcsq" />
        </div>
        <div class="itemt">人员外出</div>
      </div> -->
    </div>
    <div class="main" v-if="type == 1">
      <div class="mainitem" @click="toCheck('项目合同')" v-hasPermi="['contract:project:list']">
        <div class="iconbg">
          <svg-icon icon-class="menu-xmht" />
        </div>
        <div class="itemt">项目合同</div>
      </div>
      <div class="mainitem" @click="toCheck('外委合同')" v-hasPermi="['contract:outsourcing:list']">
        <div class="iconbg" style="background: #fac06a">
          <svg-icon icon-class="menu-wwht" />
        </div>
        <div class="itemt">外委合同</div>
      </div>
      <div class="mainitem" @click="toCheck('劳动合同')" v-hasPermi="['contract:labor:list']">
        <div class="iconbg" style="background: #2fd052">
          <svg-icon icon-class="menu-ldht" />
        </div>
        <div class="itemt">劳动合同</div>
      </div>
      <div
        class="mainitem"
        @click="toCheck('采购合同')"
        v-hasPermi="['contract:propertyBuy:list', 'contract:serviceBuy:list']"
      >
        <div class="iconbg" style="background: #aac1ff">
          <svg-icon icon-class="menu-cght" />
        </div>
        <div class="itemt">采购合同</div>
      </div>
    </div>
    <div class="main" v-if="type == 2">
      <div class="mainitem" @click="toCheck('人员信息')" v-show="isShow('人员信息')">
        <div class="iconbg">
          <svg-icon icon-class="menu-ryxx" />
        </div>
        <div class="itemt">人员信息</div>
      </div>
      <div class="mainitem" @click="toCheck('劳动合同')" v-show="isShow('劳动合同')">
        <div class="iconbg" style="background: #2fd052">
          <svg-icon icon-class="menu-ldht" />
        </div>
        <div class="itemt">劳动合同</div>
      </div>
      <div class="mainitem" @click="toCheck('人员外出')" v-show="isShow('人员外出')">
        <div class="iconbg" style="background: #fac06a">
          <svg-icon icon-class="menu-rywc" />
        </div>
        <div class="itemt">人员外出</div>
      </div>
      <div class="mainitem" @click="toCheck('人员请假')" v-show="isShow('人员请假')">
        <div class="iconbg" style="background: #aac1ff">
          <svg-icon icon-class="menu-ryqj" />
        </div>
        <div class="itemt">人员请假</div>
      </div>
    </div>
    <div class="main" v-if="type == 3">
      <div class="mainitem" @click="toCheck('项目合同')" v-show="isShow('项目合同')">
        <div class="iconbg">
          <svg-icon icon-class="menu-xmht" />
        </div>
        <div class="itemt">项目合同</div>
      </div>
      <div class="mainitem" @click="toCheck('外委合同')" v-show="isShow('外委合同')">
        <div class="iconbg" style="background: #fac06a">
          <svg-icon icon-class="menu-wwht" />
        </div>
        <div class="itemt">外委合同</div>
      </div>
    </div>
    <!-- -->
    <div class="main" v-if="type == 4">
      <div
        class="mainitem"
        @click="toCheck2('/data/certificates')"
        v-show="isShow2('/data/certificates')"
      >
        <div class="iconbg">
          <svg-icon icon-class="menu-zsgl" />
        </div>
        <div class="itemt">证书管理</div>
      </div>
      <div
        class="mainitem"
        @click="toCheck2('/data/contractmanagement/index')"
        v-show="isShow2('/data/contractmanagement/index')"
      >
        <div class="iconbg" style="background: #fac06a">
          <svg-icon icon-class="menu-htgl" />
        </div>
        <div class="itemt">合同管理</div>
      </div>
      <div
        class="mainitem"
        @click="toCheck2('/data/personnelInformationIndex')"
        v-show="isShow2('/data/personnelInformationIndex')"
      >
        <div class="iconbg" style="background: #2fd052">
          <svg-icon icon-class="menu-ryxx" />
        </div>
        <div class="itemt">人员证书</div>
      </div>
      <div
        class="mainitem"
        @click="toCheck2('/data/projectdataIndex')"
        v-show="isShow2('/data/projectdataIndex')"
      >
        <div class="iconbg" style="background: #aac1ff">
          <svg-icon icon-class="menu-xmzl" />
        </div>
        <div class="itemt">项目资料</div>
      </div>
      <div
        class="mainitem"
        @click="toCheck2('/data/projectperformance')"
        v-show="isShow2('/data/projectperformance')"
      >
        <div class="iconbg">
          <svg-icon icon-class="menu-xmyj" />
        </div>
        <div class="itemt">项目业绩</div>
      </div>
    </div>
    <div class="main" v-if="type == 5">
      <div
        class="mainitem"
        @click="toCheck2('/production/bidManagementIndex')"
        v-show="isShow2('/production/bidManagementIndex')"
      >
        <div class="iconbg">
          <svg-icon icon-class="menu-tbgl" />
        </div>
        <div class="itemt">投标管理</div>
      </div>
      <div
        class="mainitem"
        @click="toCheck2('/production/contractmanagement/projectContractIndex')"
        v-show="isShow2('/production/contractmanagement/projectContractIndex')"
      >
        <div class="iconbg">
          <svg-icon icon-class="menu-xmht" />
        </div>
        <div class="itemt">项目合同</div>
      </div>
      <div
        class="mainitem"
        @click="toCheck2('/production/contractmanagement/outsourcingContractIndex')"
        v-show="isShow2('/production/contractmanagement/outsourcingContractIndex')"
      >
        <div class="iconbg" style="background: #fac06a">
          <svg-icon icon-class="menu-wwht" />
        </div>
        <div class="itemt">外委合同</div>
      </div>
      <div
        class="mainitem"
        @click="toCheck2('/production/collectionManagement/incomeNodeIndex')"
        v-show="isShow2('/production/collectionManagement/incomeNodeIndex')"
      >
        <div class="iconbg" style="background: #2fd052">
          <svg-icon icon-class="menu-skgl" />
        </div>
        <div class="itemt">收款节点</div>
      </div>
      <!-- <div
        class="mainitem"
        @click="toCheck2('/production/collectionManagement/incomeRecordIndex')"
        v-show="isShow2('/production/collectionManagement/incomeRecordIndex')"
      >
        <div class="iconbg" style="background: #aac1ff">
          <svg-icon icon-class="menu-xmzl" />
        </div>
        <div class="itemt">收款记录</div>
      </div>
      <div
        class="mainitem"
        @click="toCheck2('/production/collectionManagement/billingRequestIndex')"
        v-show="isShow2('/production/collectionManagement/billingRequestIndex')"
      >
        <div class="iconbg">
          <svg-icon icon-class="menu-clgl" />
        </div>
        <div class="itemt">开票记录</div>
      </div> -->
      <div
        class="mainitem"
        @click="toCheck2('/production/paymentManagement/paymentNodeIndex')"
        v-show="isShow2('/production/paymentManagement/paymentNodeIndex')"
      >
        <div class="iconbg" style="background: #aac1ff">
          <svg-icon icon-class="menu-fkgl" />
        </div>
        <div class="itemt">付款节点</div>
      </div>
      <!-- <div
        class="mainitem"
        @click="toCheck2('/production/paymentManagement/paymentRequestIndex')"
        v-show="isShow2('/production/paymentManagement/paymentRequestIndex')"
      >
        <div class="iconbg" style="background: #aac1ff">
          <svg-icon icon-class="menu-xmzl" />
        </div>
        <div class="itemt">付款记录</div>
      </div>
      <div
        class="mainitem"
        @click="toCheck2('/production/paymentManagement/receiptRecordIndex')"
        v-show="isShow2('/production/paymentManagement/receiptRecordIndex')"
      >
        <div class="iconbg">
          <svg-icon icon-class="menu-clgl" />
        </div>
        <div class="itemt">收票记录</div>
      </div> -->
      <div
        class="mainitem"
        @click="toCheck2('/production/customerManagementIndex')"
        v-show="isShow2('/production/customerManagementIndex')"
      >
        <div class="iconbg" style="background: #fac06a">
          <svg-icon icon-class="menu-khgl" />
        </div>
        <div class="itemt">客户管理</div>
      </div>
    </div>
    <div class="main" v-if="type == 6">
      <div
        class="mainitem"
        @click="toCheck2('/project/projectManagementIndex')"
        v-show="isShow2('/project/projectManagementIndex')"
      >
        <div class="iconbg">
          <svg-icon icon-class="menu-xmlist" />
        </div>
        <div class="itemt">项目列表</div>
      </div>
      <div
        class="mainitem"
        @click="toCheck2('/project/projectPersonnelIndex')"
        v-show="isShow2('/project/projectPersonnelIndex')"
      >
        <div class="iconbg">
          <svg-icon icon-class="menu-xmry" />
        </div>
        <div class="itemt">项目人员</div>
      </div>
      <div
        class="mainitem"
        @click="toCheck2('/project/projectPlanIndex')"
        v-show="isShow2('/project/projectPlanIndex')"
      >
        <div class="iconbg" style="background: #fac06a">
          <svg-icon icon-class="menu-xmjh" />
        </div>
        <div class="itemt">项目计划</div>
      </div>
      <div
        class="mainitem"
        @click="toCheck2('/project/projectProcessIndex')"
        v-show="isShow2('/project/projectProcessIndex')"
      >
        <div class="iconbg" style="background: #2fd052">
          <svg-icon icon-class="menu-xmjd" />
        </div>
        <div class="itemt">项目进度</div>
      </div>
      <div
        class="mainitem"
        @click="toCheck2('/project/projectDataIndex')"
        v-show="isShow2('/project/projectDataIndex')"
      >
        <div class="iconbg" style="background: #aac1ff">
          <svg-icon icon-class="menu-xmzlgd" />
        </div>
        <div class="itemt">项目资料归档</div>
      </div>
    </div>
    <div class="main" v-if="type == 7">
      <div
        class="mainitem"
        @click="toCheck2('/purchase/purchaseManagement/purchaseContractIndex')"
        v-show="isShow2('/purchase/purchaseManagement/purchaseContractIndex')"
      >
        <div class="iconbg">
          <svg-icon icon-class="menu-htgl" />
        </div>
        <div class="itemt">采购合同</div>
      </div>
      <div
        class="mainitem"
        @click="toCheck2('/purchase/purchaseManagement/supplierIndex')"
        v-show="isShow2('/purchase/purchaseManagement/supplierIndex')"
      >
        <div class="iconbg">
          <svg-icon icon-class="menu-xmht" />
        </div>
        <div class="itemt">供应商</div>
      </div>
      <div
        class="mainitem"
        @click="toCheck2('/purchase/assetManagement/assetInIndex')"
        v-show="isShow2('/purchase/assetManagement/assetInIndex')"
      >
        <div class="iconbg" style="background: #fac06a">
          <svg-icon icon-class="menu-zcrk" />
        </div>
        <div class="itemt">资产入库</div>
      </div>
      <div
        class="mainitem"
        @click="toCheck2('/purchase/assetManagement/assetAcquisitionIndex')"
        v-show="isShow2('/purchase/assetManagement/assetAcquisitionIndex')"
      >
        <div class="iconbg" style="background: #aac1ff">
          <svg-icon icon-class="menu-zccggl" />
        </div>
        <div class="itemt">资产领用</div>
      </div>
      <div
        class="mainitem"
        @click="toCheck2('/purchase/assetManagement/assetOutIndex')"
        v-show="isShow2('/purchase/assetManagement/assetOutIndex')"
      >
        <div class="iconbg">
          <svg-icon icon-class="menu-fkgl" />
        </div>
        <div class="itemt">资产报废</div>
      </div>
      <div
        class="mainitem"
        @click="toCheck2('/purchase/assetManagement/assetQueryIndex')"
        v-show="isShow2('/purchase/assetManagement/assetQueryIndex')"
      >
        <div class="iconbg" style="background: #2fd052">
          <svg-icon icon-class="menu-ryxx" />
        </div>
        <div class="itemt">资产查询</div>
      </div>
      <!-- <div
        class="mainitem"
        @click="toCheck2('/purchase/assetManagement/approvalHandleIndex')"
        v-show="isShow2('/purchase/assetManagement/approvalHandleIndex')"
      >
        <div class="iconbg" style="background: #aac1ff">
          <svg-icon icon-class="menu-xmzl" />
        </div>
        <div class="itemt">审批处理</div>
      </div> -->
      <div
        class="mainitem"
        @click="toCheck2('/purchase/assetCodeIndex')"
        v-show="isShow2('/purchase/assetCodeIndex')"
      >
        <div class="iconbg">
          <svg-icon icon-class="skill" />
        </div>
        <div class="itemt">资产编码</div>
      </div>
      <!-- <div
        class="mainitem"
        @click="toCheck2('/purchase/assetManagement/warehouseMgIndex')"
        v-show="isShow2('/purchase/assetManagement/warehouseMgIndex')"
      >
        <div class="iconbg" style="background: #fac06a">
          <svg-icon icon-class="menu-scgl" />
        </div>
        <div class="itemt">仓库管理</div>
      </div> -->
    </div>
    <div class="main" v-if="type == 8">
      <div
        class="mainitem"
        @click="toCheck2('/car/carRequestIndex')"
        v-show="isShow2('/car/carRequestIndex')"
      >
        <div class="iconbg">
          <svg-icon icon-class="menu-xmjh" />
        </div>
        <div class="itemt">用车申请</div>
      </div>
      <div
        class="mainitem"
        @click="toCheck2('/car/carOutRequestIndex')"
        v-show="isShow2('/car/carOutRequestIndex')"
      >
        <div class="iconbg">
          <svg-icon icon-class="menu-wcsq" />
        </div>
        <div class="itemt">出库申请</div>
      </div>
      <div
        class="mainitem"
        @click="toCheck2('/car/carManagementIndex')"
        v-show="isShow2('/car/carManagementIndex')"
      >
        <div class="iconbg" style="background: #fac06a">
          <svg-icon icon-class="menu-clgl" />
        </div>
        <div class="itemt">车辆列表</div>
      </div>
      <!-- <div
        class="mainitem"
        @click="toCheck2('/car/carApprovalIndex')"
        v-show="isShow2('/car/carApprovalIndex')"
      >
        <div class="iconbg" style="background: #2fd052">
          <svg-icon icon-class="menu-ryxx" />
        </div>
        <div class="itemt">审批处理</div>
      </div> -->
    </div>
    <div class="main" v-if="type == 9">
      <div
        class="mainitem"
        @click="toCheck2('/person/personInfoIndex')"
        v-show="isShow2('/person/personInfoIndex')"
      >
        <div class="iconbg">
          <svg-icon icon-class="menu-ryxx" />
        </div>
        <div class="itemt">人员信息</div>
      </div>
      <div
        class="mainitem"
        @click="toCheck2('/person/personContractIndex')"
        v-show="isShow2('/person/personContractIndex')"
      >
        <div class="iconbg" style="background: #aac1ff">
          <svg-icon icon-class="menu-htgl" />
        </div>
        <div class="itemt">劳动合同</div>
      </div>
      <div
        class="mainitem"
        @click="toCheck2('/person/personCertificateIndex')"
        v-show="isShow2('/person/personCertificateIndex')"
      >
        <div class="iconbg" style="background: #fac06a">
          <svg-icon icon-class="menu-khgl" />
        </div>
        <div class="itemt">人员证书</div>
      </div>
      <div
        class="mainitem"
        @click="toCheck2('/person/personResumeIndex')"
        v-show="isShow2('/person/personResumeIndex')"
      >
        <div class="iconbg" style="background: #2fd052">
          <svg-icon icon-class="menu-xmzl" />
        </div>
        <div class="itemt">履职经历</div>
      </div>
      <div
        class="mainitem"
        @click="toCheck2('/person/personAchievementIndex')"
        v-show="isShow2('/person/personAchievementIndex')"
      >
        <div class="iconbg">
          <svg-icon icon-class="menu-zsgl" />
        </div>
        <div class="itemt">人员业绩</div>
      </div>
      <!-- <div
        class="mainitem"
        @click="toCheck2('/person/personOutIndex')"
        v-show="isShow2('/person/personOutIndex')"
      >
        <div class="iconbg" style="background: #2fd052">
          <svg-icon icon-class="menu-ryxx" />
        </div>
        <div class="itemt">人员外出</div>
      </div>
      <div
        class="mainitem"
        @click="toCheck2('/person/personLeaveIndex')"
        v-show="isShow2('/person/personLeaveIndex')"
      >
        <div class="iconbg" style="background: #aac1ff">
          <svg-icon icon-class="menu-xmzl" />
        </div>
        <div class="itemt">人员请假</div>
      </div>

      <div
        class="mainitem"
        @click="toCheck2('/person/personApprovalIndex')"
        v-show="isShow2('/person/personApprovalIndex')"
      >
        <div class="iconbg" style="background: #fac06a">
          <svg-icon icon-class="menu-scgl" />
        </div>
        <div class="itemt">审批处理</div>
      </div> -->
    </div>
    <div style="clear: both"></div>
  </div>
</template>

<script>
//import { xxx } from '@/api/data/statistic';
export default {
  name: 'MenuNav', //菜单导航组件
  props: ['type'], //0 工作台 1 合同管理 2人员信息  3项目合同
  data() {
    return {
      title: '功能导航', //标题
      tolink: '', //更多链接
      data1: {}, //类型1数据
      data2: {},
      routes: [], //路由信息
      routes2: [], //路由信息
    };
  },
  created() {
    this.init();
    // console.log(this.$store.state.permission.routes);
    // console.log(this.$store.state.permission.allRoutes);
    this.getRouters();
  },
  methods: {
    getRouters() {
      this.$store.state.permission.routes.forEach((item) => {
        if (item.meta) {
          if (item.meta.title) {
            this.routes.push(item.meta.title);
            this.routes2.push(item.meta.activeMenu);
          }
        }
        if (item.children && item.children.length > 0) {
          item.children.forEach((item2) => {
            if (item2.meta) {
              if (item2.meta.title) {
                this.routes.push(item2.meta.title);
                this.routes2.push(item2.meta.activeMenu);
              }
            }
          });
        }
        //console.log(this.routes);
        //console.log(this.routes2);
      });
    },

    //判断是否具有该路由再显示
    isShow(val) {
      if (this.routes.includes(val)) {
        return true;
      } else {
        return false;
      }
    },

    //根据路由判断是否具有该路由再显示
    isShow2(val) {
      if (this.$store.state.permission.allRoutes.includes(val)) {
        return true;
      } else {
        return false;
      }
    },

    //刷新
    refresh() {
      this.init();
    },

    //初始化
    init() {
      switch (this.type) {
        case 0:
          break;
        default:
          break;
      }
      this.getData();
    },

    getData() {
      if (this.type == 0) {
        // xxx().then((res) => {
        //   if (res && res.code == 200) {
        //     this.data1 = res.data;
        //   }
        // });
      }
    },

    check() {
      this.$router.push({ path: this.tolink });
    },

    //菜单导航跳转
    toCheck(val) {
      this.commonFun.goTo(val, false);
      return;
      console.log(val);
      switch (val) {
        case '资料管理':
          this.$router.push({ path: '/data/index' });
          break;
        case '项目合同':
          this.$router.push({ path: '/data/contractmanagement/projectContractIndex' });
          break;
        case '项目管理':
          this.$router.push({ path: '/project/index' });
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
        case '人员管理':
          this.$router.push({ path: '/person/index' });
          break;
        case '车辆管理':
          this.$router.push({ path: '/car/index' });
          break;
        case '权限管理':
          this.$router.push({ path: '/system/user' });
          break;
        case '生产管理':
          this.$router.push({ path: '/production/index' });
          break;
        case '资产采购管理':
          this.$router.push({ path: '/purchase/index' });
          break;

        default:
          break;
      }
    },

    toCheck2(val) {
      if (val) {
        this.$router.push({ path: val });
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
  }
  .main {
    height: 100%;
    overflow: auto;
    .mainitem {
      float: left;
      text-align: center;
      margin: 25px 10px 20px 15px;
      width: 100px;
      height: 110px;
      cursor: pointer;
      //border-right: 1px solid #e4e6ed;
      position: relative;
      .iconbg {
        margin-bottom: 10px;
        display: inline-block;
        background: #409eff;
        box-shadow: 2px 2px 8px 0px #0000000d;
        width: 64px;
        height: 64px;
        border-radius: 50%;
        position: relative;
        //float: left;
        .svg-icon {
          margin: 0 auto;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          width: 32px;
          height: 32px;
          color: white;
        }
      }

      .itemt {
        margin-bottom: 20px;
        display: inline-block;
        height: 64px;
        position: relative;
      }
    }
  }
}
</style>
