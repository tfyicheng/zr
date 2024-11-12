import Vue from 'vue';
import Router from 'vue-router';
import ParentView from '@/components/ParentView';
Vue.use(Router);

/* Layout */
import Layout from '@/layout';

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/test',
    component: () => import('@/views/data/PersonnelInformation/personnelInfo'),
  },

  {
    path: '/noRouter',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'noRouter',
        component: () => import('@/views/test'),
      },
    ],
  },

  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect'),
      },
    ],
  },

  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true,
  },
  {
    path: '/forgetPwd',
    component: () => import('@/views/forgetPwd'),
    hidden: true,
  },
  {
    path: '/register',
    component: () => import('@/views/register'),
    hidden: true,
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true,
  },
  // {
  //   path: '',
  //   component: Layout,
  //   redirect: 'index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/index'),
  //       name: 'Index',
  //       meta: { title: '工作台', icon: 'workbench', noCache: true }, //affix: true
  //     },
  //   ],
  // },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: () => import('@/views/system/user/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' },
      },
    ],
  },

  //#region  按钮权限或者自身权限

  // {
  //   path: '/data/contractmanagement/index',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       hidden: true,
  //       path: 'contractManagement',
  //       component: () => import('@/views/data/ContractManagement/index'),
  //       meta: { title: '合同管理', activeMenu: '/data/contractmanagement/index', noCache: true },
  //       name: 'ContractManagement',
  //     },
  //   ],
  // },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    children: [
      {
        hidden: true,
        path: 'myRequestCheck',
        component: () => import('@/views/data/DataDown/MyRequest/myRequestCheck'),
        meta: { title: '我的申请', activeMenu: '/data/datadown/myRequestIndex' },
        name: 'MyRequestCheck',
      },
    ],
  },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    children: [
      {
        hidden: true,
        path: 'myRequestInfo',
        component: () => import('@/views/data/DataDown/MyRequest/myRequestInfo'),
        meta: { title: '申请详情', activeMenu: '/data/datadown/myRequestIndex' },
        name: 'MyRequestInfo',
      },
    ],
  },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    children: [
      {
        hidden: true,
        path: 'myRequestHandle',
        component: () => import('@/views/data/DataDown/MyRequest/myRequestHandle'),
        meta: { title: '申请处理', activeMenu: '/data/datadown/myRequestIndex' },
        name: 'MyRequestHandle',
      },
    ],
  },

  {
    path: '/car-d',
    component: Layout,
    hidden: true,
    children: [
      {
        hidden: true,
        path: 'carOutRequestAdd',
        component: () => import('@/views/car/carOutRequest/carOutRequestAdd'),
        meta: { title: '添加车辆出库申请', activeMenu: '/car/carOutRequestIndex' },
        name: 'CarOutRequestAdd',
      },
    ],
  },

  {
    path: '/car-d',
    component: Layout,
    hidden: true,
    children: [
      {
        hidden: true,
        path: 'carRequestReback',
        component: () => import('@/views/car/carRequest/carRequestReback'),
        meta: { title: '用车归还', activeMenu: '/car/carRequestIndex' },
        name: 'CarRequestReback',
      },
    ],
  },

  {
    path: '/car-d',
    component: Layout,
    hidden: true,
    children: [
      {
        hidden: true,
        path: 'carRequestEdit',
        component: () => import('@/views/car/carRequest/carRequestEdit'),
        meta: { title: '编辑用车申请', activeMenu: '/car/carRequestIndex' },
        name: 'CarRequestEdit',
      },
    ],
  },

  {
    path: '/car-d',
    component: Layout,
    hidden: true,
    children: [
      {
        hidden: true,
        path: 'carOutRequestEdit',
        component: () => import('@/views/car/carOutRequest/carOutRequestEdit'),
        meta: { title: '编辑车辆出库申请', activeMenu: '/car/carOutRequestIndex' },
        name: 'CarOutRequestEdit',
      },
    ],
  },

  {
    path: '/car-d',
    component: Layout,
    hidden: true,
    children: [
      {
        hidden: true,
        path: 'carReceiveHandle',
        component: () => import('@/views/car/carApproval/carReceiveHandle'),
        meta: { title: '车辆领用审批', activeMenu: '/car/carApprovalIndex' },
        name: 'CarReceiveHandle',
      },
    ],
  },

  {
    path: '/car-d',
    component: Layout,
    hidden: true,
    children: [
      {
        hidden: true,
        path: 'carReceiveInfo',
        component: () => import('@/views/car/carApproval/carReceiveInfo'),
        meta: { title: '车辆领用信息', activeMenu: '/car/carApprovalIndex' },
        name: 'CarReceiveInfo',
      },
    ],
  },

  {
    path: '/car-d',
    component: Layout,
    hidden: true,
    children: [
      {
        hidden: true,
        path: 'carOutboundHandle',
        component: () => import('@/views/car/carApproval/carOutboundHandle'),
        meta: { title: '车辆出库审批', activeMenu: '/car/carApprovalIndex' },
        name: 'CarOutboundHandle',
      },
    ],
  },

  {
    path: '/car-d',
    component: Layout,
    hidden: true,
    children: [
      {
        hidden: true,
        path: 'carOutboundInfo',
        component: () => import('@/views/car/carApproval/carOutboundInfo'),
        meta: { title: '车辆出库信息', activeMenu: '/car/carApprovalIndex' },
        name: 'CarOutboundInfo',
      },
    ],
  },

  {
    path: '/person-d',
    component: Layout,
    hidden: true,
    children: [
      {
        hidden: true,
        path: 'personOutHandle',
        component: () => import('@/views/person/personApproval/personOutHandle'),
        meta: { title: '人员外出审批处理', activeMenu: '/person/personApprovalIndex' },
        name: 'PersonOutHandle',
      },
    ],
  },

  {
    path: '/person-d',
    component: Layout,
    hidden: true,
    children: [
      {
        hidden: true,
        path: 'personLeaveHandle',
        component: () => import('@/views/person/personApproval/personLeaveHandle'),
        meta: { title: '人员请假审批处理', activeMenu: '/person/personApprovalIndex' },
        name: 'PersonLeaveHandle',
      },
    ],
  },

  // {
  //   path: '/data-d',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'personnelInfoEdit',
  //       component: () => import('@/views/data/PersonnelInformation/personnelInfoEdit'),
  //       name: 'PersonnelInfoAdd',
  //       meta: { title: '编辑人员信息', activeMenu: '/data/personnelInformationIndex' },
  //     },
  //   ],
  // },

  {
    path: '/person-d',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'personnelInfoEdit',
        component: () => import('@/views/person/personInfo/personnelInfoEdit'),
        name: 'PersonnelInfoAdd',
        meta: { title: '编辑人员信息', activeMenu: '/person/personInfoIndex' },
      },
    ],
  },

  {
    path: '/project-d',
    component: Layout,
    hidden: true,
    children: [
      {
        hidden: true,
        path: 'projectInfo',
        component: () => import('@/views/project/projectManagement/projectInfo'),
        meta: { title: '项目信息', activeMenu: '/project/projectManagementIndex' },
        name: 'ProjectInfo',
      },
    ],
  },

  {
    path: '/project-d',
    component: Layout,
    hidden: true,
    children: [
      {
        hidden: true,
        path: 'projectEdit',
        component: () => import('@/views/project/projectManagement/projectEdit'),
        meta: { title: '编辑项目信息', activeMenu: '/project/projectManagementIndex' },
        name: 'ProjectEdit',
      },
    ],
  },

  {
    path: '/project-d',
    component: Layout,
    hidden: true,
    children: [
      {
        hidden: true,
        path: 'projectPersonnelEdit',
        component: () => import('@/views/project/projectPersonnel/projectPersonnelEdit'),
        meta: { title: '编辑项目人员', activeMenu: '/project/projectPersonnelIndex' },
        name: 'ProjectPersonnelEdit',
      },
    ],
  },

  {
    path: '/project-d',
    component: Layout,
    hidden: true,
    children: [
      {
        hidden: true,
        path: 'projectPlanAdjustment',
        component: () => import('@/views/project/projectPlan/projectPlanAdjustment'),
        meta: { title: '调整项目计划', activeMenu: '/project/projectPlanIndex' },
        name: 'ProjectPlanAdjustment',
      },
    ],
  },

  {
    path: '/project-d',
    component: Layout,
    hidden: true,
    children: [
      {
        hidden: true,
        path: 'projectProcessEdit',
        component: () => import('@/views/project/projectProcess/projectProcessEdit'),
        meta: { title: '编辑项目进度', activeMenu: '/project/projectProcessIndex' },
        name: 'ProjectProcessEdit',
      },
    ],
  },

  {
    path: '/safety',
    component: Layout,
    hidden: true,
    children: [
      {
        hidden: true,
        path: 'safetyInfo2',
        component: () => import('@/views/safety/safetyInfo2'),
        name: 'SafetyInfo2',
        meta: { title: '安全生产资料详情', activeMenu: '/index' },
      },
    ],
  },

  //#endregion

  //#region

  // {
  //   path: '/data',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   meta: { title: '资料管理', icon: 'datamg', breadcrumb: false },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/data/StatisticAnalysis/index'),
  //       name: 'StatisticAnalysis', //要跟组件设置的name一致否则不会缓存
  //       meta: { title: '统计分析' },
  //     },
  //     {
  //       path: 'certificates',
  //       redirect: '/data/certificates/certificatesIndex',
  //       name: 'Certificates',
  //       component: ParentView,
  //       meta: { title: '证书管理' },
  //       children: [
  //         {
  //           path: 'certificatesIndex',
  //           component: () => import('@/views/data/Certificates/index'),
  //           name: 'CertificatesIndex',
  //           hidden: true,
  //           meta: { title: '证书管理统计分析', activeMenu: '/data/certificates' },
  //         },
  //         {
  //           path: 'certificatesCheck',
  //           component: () => import('@/views/data/Certificates/certificatesCheck'),
  //           name: 'CertificatesCheck',
  //           hidden: true,
  //           meta: { title: '查看证书', activeMenu: '/data/certificates',noCache:false },
  //         },
  //         {
  //           path: 'certificatesAdd',
  //           component: () => import('@/views/data/Certificates/certificatesAdd'),
  //           name: 'CertificatesAdd',
  //           hidden: true,
  //           meta: { title: '添加证书', activeMenu: '/data/certificates' },
  //         },
  //         {
  //           path: 'certificatesEdit',
  //           component: () => import('@/views/data/Certificates/certificatesEdit'),
  //           name: 'CertificatesEdit',
  //           hidden: true,
  //           meta: { title: '编辑证书', activeMenu: '/data/certificates' },
  //         },
  //         {
  //           path: 'certificatesInfo',
  //           component: () => import('@/views/data/Certificates/certificatesInfo'),
  //           name: 'CertificatesInfo',
  //           hidden: true,
  //           meta: { title: '证书信息', activeMenu: '/data/certificates' },
  //         },
  //       ],
  //     },
  //     {
  //       path: 'contractmanagement',
  //       redirect: 'noRedirect',
  //       component: ParentView,
  //       name: 'Contractmanagement',
  //       meta: { title: '合同管理' },
  //       children: [
  //         {
  //           path: 'index',
  //           component: () => import('@/views/data/ContractManagement/index'),
  //           name: 'Contractmanagementindex',
  //           meta: { title: '统计分析' },
  //         },
  //         {
  //           path: 'projectContract',
  //           redirect: '/data/contractmanagement/projectContract/projectContractIndex', //三级子路由导航至完整路径
  //           component: ParentView,
  //           name: 'ProjectContract',
  //           meta: { title: '项目合同' },
  //           children: [
  //             {
  //               hidden: true,
  //               path: 'projectContractIndex',
  //               component: () => import('@/views/data/ContractManagement/ProjectContract/index'),
  //               meta: { title: '项目合同', activeMenu: '/data/contractmanagement/projectContract' },
  //               name: 'ProjectContractIndex',
  //             },
  //             {
  //               hidden: true,
  //               path: 'projectContractAdd',
  //               component: () =>
  //                 import('@/views/data/ContractManagement/ProjectContract/projectContractAdd'),
  //               meta: {
  //                 title: '添加项目合同',
  //                 activeMenu: '/data/contractmanagement/projectContract',
  //               },
  //               name: 'ProjectContractAdd',
  //             },
  //             {
  //               hidden: true,
  //               path: 'projectContractInfo',
  //               component: () =>
  //                 import('@/views/data/ContractManagement/ProjectContract/projectContractInfo'),
  //               meta: {
  //                 title: '项目合同信息',
  //                 activeMenu: '/data/contractmanagement/projectContract',
  //               },
  //               name: 'ProjectContractInfo',
  //             },
  //           ],
  //         },
  //         {
  //           path: 'laborContract',
  //           redirect: '/data/contractmanagement/laborContract/laborContractIndex',
  //           component: ParentView,
  //           name: 'laborContract',
  //           meta: { title: '劳动合同' },
  //           children: [
  //             {
  //               hidden: true,
  //               path: 'laborContractIndex',
  //               component: () => import('@/views/data/ContractManagement/LaborContract/index'),
  //               meta: { title: '劳动合同', activeMenu: '/data/contractmanagement/laborContract' },
  //               name: 'LaborContractIndex',
  //             },
  //             {
  //               hidden: true,
  //               path: 'laborContractAdd',
  //               component: () =>
  //                 import('@/views/data/ContractManagement/LaborContract/laborContractAdd'),
  //               meta: {
  //                 title: '添加劳动合同',
  //                 activeMenu: '/data/contractmanagement/laborContract',
  //               },
  //               name: 'LaborContractAdd',
  //             },
  //             {
  //               hidden: true,
  //               path: 'laborContractInfo',
  //               component: () =>
  //                 import('@/views/data/ContractManagement/LaborContract/laborContractInfo'),
  //               meta: {
  //                 title: '劳动合同信息',
  //                 activeMenu: '/data/contractmanagement/laborContract',
  //               },
  //               name: 'LaborContractInfo',
  //             },
  //           ],
  //         },
  //         {
  //           path: 'purchaseContract',
  //           redirect: '/data/contractmanagement/purchaseContract/purchaseContractIndex',
  //           component: ParentView,
  //           name: 'purchaseContract',
  //           meta: { title: '采购合同' },
  //           children: [
  //             {
  //               hidden: true,
  //               path: 'purchaseContractIndex',
  //               component: () => import('@/views/data/ContractManagement/PurchaseContract/index'),
  //               meta: {
  //                 title: '采购合同',
  //                 activeMenu: '/data/contractmanagement/purchaseContract',
  //               },
  //               name: 'PurchaseContractIndex',
  //             },
  //             {
  //               hidden: true,
  //               path: 'fixedAssetsPCAdd',
  //               component: () =>
  //                 import('@/views/data/ContractManagement/PurchaseContract/fixedAssetsPCAdd'),
  //               meta: {
  //                 title: '添加固定资产采购合同',
  //                 activeMenu: '/data/contractmanagement/laborContract',
  //               },
  //               name: 'FixedAssetsPCAdd',
  //             },
  //             {
  //               hidden: true,
  //               path: 'fixedAssetsPCInfo',
  //               component: () =>
  //                 import('@/views/data/ContractManagement/PurchaseContract/fixedAssetsPCInfo'),
  //               meta: {
  //                 title: '固定资产采购合同信息',
  //                 activeMenu: '/data/contractmanagement/laborContract',
  //               },
  //               name: 'FixedAssetsPCInfo',
  //             },
  //             {
  //               hidden: true,
  //               path: 'servicePCAdd',
  //               component: () =>
  //                 import('@/views/data/ContractManagement/PurchaseContract/servicePCAdd'),
  //               meta: {
  //                 title: '添加服务采购合同',
  //                 activeMenu: '/data/contractmanagement/laborContract',
  //               },
  //               name: 'ServicePCAdd',
  //             },
  //             {
  //               hidden: true,
  //               path: 'servicePCInfo',
  //               component: () =>
  //                 import('@/views/data/ContractManagement/PurchaseContract/servicePCInfo'),
  //               meta: {
  //                 title: '服务采购合同信息',
  //                 activeMenu: '/data/contractmanagement/laborContract',
  //               },
  //               name: 'ServicePCInfo',
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       path: 'personnelinformation',
  //       redirect: '/data/personnelinformation/personnelinformationIndex',
  //       component: ParentView,
  //       name: 'Personnelinformation',
  //       meta: { title: '人员信息' },
  //       children: [
  //         {
  //           path: 'personnelInformationIndex',
  //           component: () => import('@/views/data/PersonnelInformation/index'),
  //           name: 'PersonnelInformationIndex',
  //           hidden: true,
  //           meta: { title: '人员信息', activeMenu: '/data/personnelinformation' },
  //         },
  //         {
  //           path: 'personnelInformationCheck',
  //           component: () => import('@/views/data/PersonnelInformation/personnelInformationCheck'),
  //           name: 'PersonnelInformationCheck',
  //           hidden: true,
  //           meta: { title: '查看人员信息', activeMenu: '/data/personnelinformation' },
  //         },
  //         {
  //           path: 'personnelInformationAdd',
  //           component: () => import('@/views/data/PersonnelInformation/personnelInformationAdd'),
  //           name: 'PersonnelInformationAdd',
  //           hidden: true,
  //           meta: { title: '添加人员信息', activeMenu: '/data/personnelinformation' },
  //         },
  //       ],
  //     },
  //     {
  //       path: 'projectdata',
  //       redirect: '/data/projectdata/projectdataIndex',
  //       component: ParentView,
  //       name: 'Projectdata',
  //       meta: { title: '项目资料' },
  //       children: [
  //         {
  //           path: 'projectdataIndex',
  //           component: () => import('@/views/data/ProjectData/index'),
  //           name: 'ProjectdataIndex',
  //           hidden: true,
  //           meta: { title: '项目资料', activeMenu: '/data/projectdata' },
  //         },
  //         {
  //           path: 'projectdataCheck',
  //           component: () => import('@/views/data/ProjectData/projectdataCheck'),
  //           name: 'ProjectdataCheck',
  //           hidden: true,
  //           meta: { title: '查看项目资料', activeMenu: '/data/projectdata' },
  //         },
  //         {
  //           path: 'projectdataAdd',
  //           component: () => import('@/views/data/ProjectData/projectdataAdd'),
  //           name: 'ProjectdataAdd',
  //           hidden: true,
  //           meta: { title: '添加项目资料', activeMenu: '/data/projectdata' },
  //         },
  //         {
  //           path: 'projectdataInfo',
  //           component: () => import('@/views/data/ProjectData/projectdataInfo'),
  //           name: 'ProjectdataInfo',
  //           hidden: true,
  //           meta: { title: '项目资料信息', activeMenu: '/data/projectdata' },
  //         },
  //       ],
  //     },
  //     {
  //       path: 'projectperformance',
  //       component: () => import('@/views/data/ProjectPerformance/index'),
  //       name: 'Projectperformance',
  //       meta: { title: '项目业绩' },
  //     },
  //   ],
  // },

  // {
  //   path: '/production',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   meta: { title: '生产管理', icon: 'productionmg' },
  //   children: [
  //     {
  //       path: 'bidManagement',
  //       redirect: '/production/bidManagement/bidManagementIndex',
  //       component: ParentView,
  //       name: 'BidManagement',
  //       meta: { title: '投标管理' },
  //       children: [
  //         {
  //           path: 'bidManagementIndex',
  //           component: () => import('@/views/production/BidManagement/index'),
  //           name: 'BidManagementIndex',
  //           hidden: true,
  //           meta: { title: '投标管理统计分析', activeMenu: '/production/bidManagement' },
  //         },
  //         {
  //           path: 'bidManagementCheck',
  //           component: () => import('@/views/production/BidManagement/bidManagementCheck'),
  //           name: 'BidManagementCheck',
  //           hidden: true,
  //           meta: { title: '查看投标信息', activeMenu: '/production/bidManagement' },
  //         },
  //         {
  //           path: 'bidManagementAdd',
  //           component: () => import('@/views/production/BidManagement/bidManagementAdd'),
  //           name: 'BidManagementAdd',
  //           hidden: true,
  //           meta: { title: '添加投标', activeMenu: '/production/bidManagement' },
  //         },
  //         {
  //           path: 'bidManagementInfo',
  //           component: () => import('@/views/production/BidManagement/bidManagementInfo'),
  //           name: 'BidManagementInfo',
  //           hidden: true,
  //           meta: { title: '投标信息', activeMenu: '/production/bidManagement' },
  //         },
  //       ],
  //     },
  //     {
  //       path: 'contractManagement',
  //       redirect: '/production/contractManagement/contractManagementIndex',
  //       component: ParentView,
  //       name: 'ContractManagement',
  //       meta: { title: '合同管理' },
  //       children: [
  //         {
  //           path: 'contractManagementIndex',
  //           component: () => import('@/views/production/ContractManagement/index'),
  //           name: 'ContractManagementIndex',
  //           hidden: true,
  //           meta: { title: '合同管理统计分析', activeMenu: '/production/contractManagement' },
  //         },
  //         {
  //           path: 'contractManagementCheck',
  //           component: () =>
  //             import('@/views/production/ContractManagement/contractManagementCheck'),
  //           name: 'ContractManagementCheck',
  //           hidden: true,
  //           meta: { title: '查看合同信息', activeMenu: '/production/contractManagement' },
  //         },
  //         {
  //           path: 'contractManagementAdd',
  //           component: () => import('@/views/production/ContractManagement/contractManagementAdd'),
  //           name: 'ContractManagementAdd',
  //           hidden: true,
  //           meta: { title: '添加合同', activeMenu: '/production/contractManagement' },
  //         },
  //         {
  //           path: 'contractManagementInfo',
  //           component: () => import('@/views/production/ContractManagement/contractManagementInfo'),
  //           name: 'ContractManagementInfo',
  //           hidden: true,
  //           meta: { title: '合同信息', activeMenu: '/production/contractManagement' },
  //         },
  //       ],
  //     },
  //     {
  //       path: 'collectionManagement',
  //       redirect: 'noRedirect',
  //       component: ParentView,
  //       name: 'CollectionManagement',
  //       meta: { title: '收款管理' },
  //       children: [
  //         {
  //           path: 'collectionPlan',
  //           redirect: '/production/collectionManagement/collectionPlan/collectionPlanIndex',
  //           component: ParentView,
  //           name: 'CollectionPlan',
  //           meta: { title: '收款计划'},
  //           children: [
  //             {
  //               hidden: true,
  //               path: 'collectionPlanIndex',
  //               component: () =>import('@/views/production/CollectionManagement/CollectionPlan/index'),
  //               meta: { title: '收款计划统计分析', activeMenu: '/production/collectionManagement/collectionPlan'},
  //               name: 'CollectionPlanIndex',
  //             },
  //             {
  //               hidden: true,
  //               path: 'collectionPlanCheck',
  //               component: () =>import('@/views/production/CollectionManagement/CollectionPlan/collectionPlanCheck'),
  //               meta: { title: '查看收款计划', activeMenu: '/production/collectionManagement/collectionPlan'},
  //               name: 'CollectionPlanCheck',
  //             },
  //             {
  //               hidden: true,
  //               path: 'collectionPlanAdd',
  //               component: () =>import('@/views/production/CollectionManagement/CollectionPlan/collectionPlanAdd'),
  //               meta: { title: '添加收款计划',activeMenu: '/production/collectionManagement/collectionPlan'},
  //               name: 'CollectionPlanAdd',
  //             },
  //             {
  //               hidden: true,
  //               path: 'collectionPlanInfo',
  //               component: () =>import('@/views/production/CollectionManagement/CollectionPlan/collectionPlanInfo'),
  //               meta: { title: '收款计划信息',activeMenu: '/production/collectionManagement/collectionPlan'},
  //               name: 'CollectionPlanInfo',
  //             },
  //           ],
  //         },
  //         {
  //           path: 'billingRequest',
  //           redirect: '/production/collectionManagement/billingRequest/billingRequestIndex',
  //           component: ParentView,
  //           name: 'BillingRequest',
  //           meta: { title: '开票记录' },
  //           children: [
  //             {
  //               hidden: true,
  //               path: 'billingRequestIndex',
  //               component: () =>import('@/views/production/CollectionManagement/BillingRequest/index'),
  //               meta: { title: '开票记录统计分析', activeMenu: '/production/collectionManagement/billingRequest'},
  //               name: 'BillingRequestIndex',
  //             },
  //             {
  //               hidden: true,
  //               path: 'billingRequestCheck',
  //               component: () =>import('@/views/production/CollectionManagement/BillingRequest/billingRequestCheck'),
  //               meta: { title: '开票记录列表', activeMenu: '/production/collectionManagement/billingRequest'},
  //               name: 'BillingRequestCheck',
  //             },
  //             {
  //               hidden: true,
  //               path: 'billingRequestAdd',
  //               component: () =>import('@/views/production/CollectionManagement/BillingRequest/billingRequestAdd'),
  //               meta: { title: '添加开票记录', activeMenu: '/production/collectionManagement/billingRequest'},
  //               name: 'BillingRequestAdd',
  //             },
  //             {
  //               hidden: true,
  //               path: 'billingRequestInfo',
  //               component: () =>import('@/views/production/CollectionManagement/BillingRequest/billingRequestInfo'),
  //               meta: {title: '开票记录信息', activeMenu: '/production/collectionManagement/billingRequest'},
  //               name: 'BillingRequestInfo',
  //             },
  //           ],
  //         },
  //         {
  //           path: 'paymentRecord',
  //           redirect: '/production/collectionManagement/paymentRecord/paymentRecordIndex',
  //           component: ParentView,
  //           name: 'PaymentRecord',
  //           meta: { title: '收款记录' },
  //           children: [
  //             {
  //               hidden: true,
  //               path: 'paymentRecordIndex',
  //               component: () =>
  //                 import('@/views/production/CollectionManagement/PaymentRecord/index'),
  //               meta: {
  //                 title: '收款记录统计分析',
  //                 activeMenu: '/production/collectionManagement/paymentRecord',
  //               },
  //               name: 'PaymentRecordIndex',
  //             },
  //             {
  //               hidden: true,
  //               path: 'paymentRecordCheck',
  //               component: () =>
  //                 import(
  //                   '@/views/production/CollectionManagement/PaymentRecord/paymentRecordCheck'
  //                 ),
  //               meta: {
  //                 title: '收款记录列表',
  //                 activeMenu: '/production/collectionManagement/paymentRecord',
  //               },
  //               name: 'PaymentRecordCheck',
  //             },
  //             {
  //               hidden: true,
  //               path: 'paymentRecordInfo',
  //               component: () =>
  //                 import('@/views/production/CollectionManagement/PaymentRecord/paymentRecordInfo'),
  //               meta: {
  //                 title: '收款记录信息',
  //                 activeMenu: '/production/collectionManagement/paymentRecord',
  //               },
  //               name: 'PaymentRecordInfo',
  //             },
  //             {
  //               hidden: true,
  //               path: 'paymentRecordAdd',
  //               component: () =>
  //                 import('@/views/production/CollectionManagement/PaymentRecord/paymentRecordAdd'),
  //               meta: {
  //                 title: '添加收款记录',
  //                 activeMenu: '/production/collectionManagement/paymentRecord',
  //               },
  //               name: 'PaymentRecordAdd',
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       path: 'paymentManagement',
  //       redirect: 'noRedirect',
  //       component: ParentView,
  //       name: 'PaymentManagement',
  //       meta: { title: '付款管理' },
  //       children: [
  //         {
  //           path: 'paymentRequest',
  //           redirect: '/production/paymentManagement/paymentRequest/paymentRequestIndex',
  //           component: ParentView,
  //           name: 'PaymentRequest',
  //           meta: { title: '付款申请' },
  //           children: [
  //             {
  //               hidden: true,
  //               path: 'paymentRequestIndex',
  //               component: () =>
  //                 import('@/views/production/PaymentManagement/PaymentRequest/index'),
  //               meta: {
  //                 title: '付款申请统计分析',
  //                 activeMenu: '/production/paymentManagement/paymentRequest',
  //               },
  //               name: 'PaymentRequestIndex',
  //             },
  //             {
  //               hidden: true,
  //               path: 'paymentRequestCheck',
  //               component: () =>
  //                 import('@/views/production/PaymentManagement/PaymentRequest/paymentRequestCheck'),
  //               meta: {
  //                 title: '付款申请查看',
  //                 activeMenu: '/production/paymentManagement/paymentRequest',
  //               },
  //               name: 'PaymentRequestCheck',
  //             },
  //             {
  //               hidden: true,
  //               path: 'paymentRequestAdd',
  //               component: () =>
  //                 import('@/views/production/PaymentManagement/PaymentRequest/paymentRequestAdd'),
  //               meta: {
  //                 title: '添加付款记录',
  //                 activeMenu: '/production/paymentManagement/paymentRequest',
  //               },
  //               name: 'PaymentRequestAdd',
  //             },
  //             {
  //               hidden: true,
  //               path: 'paymentRequestInfo',
  //               component: () =>
  //                 import('@/views/production/PaymentManagement/PaymentRequest/paymentRequestInfo'),
  //               meta: {
  //                 title: '付款申请信息',
  //                 activeMenu: '/production/paymentManagement/paymentRequest',
  //               },
  //               name: 'PaymentRequestInfo',
  //             },
  //           ],
  //         },
  //         {
  //           path: 'ticketRecord',
  //           redirect: '/production/paymentManagement/ticketRecord/ticketRecordIndex',
  //           component: ParentView,
  //           name: 'TicketRecord',
  //           meta: { title: '收票记录' },
  //           children: [
  //             {
  //               hidden: true,
  //               path: 'ticketRecordIndex',
  //               component: () => import('@/views/production/PaymentManagement/TicketRecord/index'),
  //               meta: {
  //                 title: '收票记录统计分析',
  //                 activeMenu: '/production/paymentManagement/ticketRecord',
  //               },
  //               name: 'TicketRecordIndex',
  //             },
  //             {
  //               hidden: true,
  //               path: 'ticketRecordCheck',
  //               component: () =>
  //                 import('@/views/production/PaymentManagement/TicketRecord/ticketRecordCheck'),
  //               meta: {
  //                 title: '查看收票记录',
  //                 activeMenu: '/production/paymentManagement/ticketRecord',
  //               },
  //               name: 'TicketRecordCheck',
  //             },
  //             {
  //               hidden: true,
  //               path: 'ticketRecordAdd',
  //               component: () =>
  //                 import('@/views/production/PaymentManagement/TicketRecord/ticketRecordAdd'),
  //               meta: {
  //                 title: '添加收票记录',
  //                 activeMenu: '/production/paymentManagement/ticketRecord',
  //               },
  //               name: 'TicketRecordAdd',
  //             },
  //             {
  //               hidden: true,
  //               path: 'ticketRecordInfo',
  //               component: () =>
  //                 import('@/views/production/PaymentManagement/TicketRecord/ticketRecordInfo'),
  //               meta: {
  //                 title: '收票记录信息',
  //                 activeMenu: '/production/paymentManagement/ticketRecord',
  //               },
  //               name: 'TicketRecordInfo',
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       path: 'customerManagement',
  //       redirect: '/production/CustomerManagement/CustomerManagementIndex',
  //       component: ParentView,
  //       name: 'CustomerManagement',
  //       meta: { title: '客户管理' },
  //       children: [
  //         {
  //           path: 'customerManagementIndex',
  //           component: () => import('@/views/production/CustomerManagement/index'),
  //           name: 'CustomerManagementIndex',
  //           hidden: true,
  //           meta: { title: '客户管理统计分析', activeMenu: '/production/customerManagement' },
  //         },
  //         {
  //           path: 'customerManagementCheck',
  //           component: () =>
  //             import('@/views/production/CustomerManagement/customerManagementCheck'),
  //           name: 'CustomerManagementCheck',
  //           hidden: true,
  //           meta: { title: '查看客户', activeMenu: '/production/customerManagement' },
  //         },
  //         {
  //           path: 'customerManagementAdd',
  //           component: () => import('@/views/production/CustomerManagement/customerManagementAdd'),
  //           name: 'CustomerManagementAdd',
  //           hidden: true,
  //           meta: { title: '添加客户', activeMenu: '/production/customerManagement' },
  //         },
  //         {
  //           path: 'customerManagementInfo',
  //           component: () => import('@/views/production/CustomerManagement/customerManagementInfo'),
  //           name: 'CustomerManagementInfo',
  //           hidden: true,
  //           meta: { title: '客户信息', activeMenu: '/production/customerManagement' },
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   path: '/project',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   meta: { title: '项目管理', icon: 'projectmg' },
  //   children: [
  //     {
  //       path: 'projectManagement',
  //       redirect: '/project/projectManagement/projectManagementIndex',
  //       component: ParentView,
  //       name: 'projectManagement',
  //       meta: { title: '项目管理' },
  //       children: [
  //         {
  //           path: 'projectManagementIndex',
  //           component: () => import('@/views/project/projectManagement/index'),
  //           name: 'ProjectManagementIndex',
  //           hidden: true,
  //           meta: { title: '项目管理统计分析', activeMenu: '/project/projectManagement' },
  //         },
  //         {
  //           path: 'projectCheck',
  //           component: () => import('@/views/project/projectManagement/projectCheck'),
  //           name: 'ProjectCheck',
  //           hidden: true,
  //           meta: { title: '查看项目列表', activeMenu: '/project/projectManagement' },
  //         },
  //         {
  //           path: 'projecttAdd',
  //           component: () => import('@/views/project/projectManagement/projecttAdd'),
  //           name: 'ProjecttAdd',
  //           hidden: true,
  //           meta: { title: '添加项目', activeMenu: '/project/projectManagement' },
  //         },
  //         {
  //           path: 'projectInfo',
  //           component: () => import('@/views/project/projectManagement/projectInfo'),
  //           name: 'ProjectInfo',
  //           hidden: true,
  //           meta: { title: '项目信息', activeMenu: '/project/projectManagement' },
  //         },
  //       ],
  //     },
  //     {
  //       path: 'projectPersonnel',
  //       redirect: '/project/projectPersonnel/projectPersonnelIndex',
  //       component: ParentView,
  //       name: 'ProjectPersonnel',
  //       meta: { title: '项目人员' },
  //       children: [
  //         {
  //           path: 'projectPersonnelIndex',
  //           component: () => import('@/views/project/projectPersonnel/index'),
  //           name: 'ProjectPersonnelIndex',
  //           hidden: true,
  //           meta: { title: '项目人员统计分析', activeMenu: '/project/projectPersonnel' },
  //         },
  //         {
  //           path: 'projectPersonnelCheck',
  //           component: () => import('@/views/project/projectPersonnel/projectPersonnelCheck'),
  //           name: 'ProjectPersonnelCheck',
  //           hidden: true,
  //           meta: { title: '查看项目人员', activeMenu: '/project/projectPersonnel' },
  //         },
  //         {
  //           path: 'projectPersonnelAdd',
  //           component: () => import('@/views/project/projectPersonnel/projectPersonnelAdd'),
  //           name: 'ProjectPersonnelAdd',
  //           hidden: true,
  //           meta: { title: '添加项目人员', activeMenu: '/project/projectPersonnel' },
  //         },
  //         {
  //           path: 'projectPersonnelInfo',
  //           component: () => import('@/views/project/projectPersonnel/projectPersonnelInfo'),
  //           name: 'ProjectPersonnelInfo',
  //           hidden: true,
  //           meta: { title: '项目人员信息', activeMenu: '/project/projectPersonnel' },
  //         },
  //       ],
  //     },
  //     {
  //       path: 'projectPlan',
  //       redirect: '/project/projectPlan/projectPlanIndex',
  //       component: ParentView,
  //       name: 'ProjectPlan',
  //       meta: { title: '项目计划' },
  //       children: [
  //         {
  //           path: 'projectPlanIndex',
  //           component: () => import('@/views/project/projectPlan/index'),
  //           name: 'ProjectPlanIndex',
  //           hidden: true,
  //           meta: { title: '项目计划统计分析', activeMenu: '/project/projectPlan' },
  //         },
  //         {
  //           path: 'projectPlanCheck',
  //           component: () => import('@/views/project/projectPlan/projectPlanCheck'),
  //           name: 'ProjectPlanCheck',
  //           hidden: true,
  //           meta: { title: '查看项目计划', activeMenu: '/project/projectPlan' },
  //         },
  //         {
  //           path: 'projectPlanAdjustment',
  //           component: () => import('@/views/project/projectPlan/projectPlanAdjustment'),
  //           name: 'ProjectPlanAdjustment',
  //           hidden: true,
  //           meta: { title: '调整项目计划', activeMenu: '/project/projectPlan' },
  //         },
  //         {
  //           path: 'projectPlanDecompose',
  //           component: () => import('@/views/project/projectPlan/projectPlanDecompose'),
  //           name: 'ProjectPlanDecompose',
  //           hidden: true,
  //           meta: { title: '分解项目计划', activeMenu: '/project/projectPlan' },
  //         },
  //       ],
  //     },
  //     {
  //       path: 'projectProcess',
  //       redirect: '/project/projectProcess/projectProcessIndex',
  //       component: ParentView,
  //       name: 'ProjectProcess',
  //       meta: { title: '项目进度' },
  //       children: [
  //         {
  //           path: 'projectProcessIndex',
  //           component: () => import('@/views/project/projectProcess/index'),
  //           name: 'projectProcessIndex',
  //           hidden: true,
  //           meta: { title: '项目进度统计分析', activeMenu: '/project/projectProcess' },
  //         },
  //         {
  //           path: 'projectProcessCheck',
  //           component: () => import('@/views/project/projectProcess/projectProcessCheck'),
  //           name: 'ProjectProcessCheck',
  //           hidden: true,
  //           meta: { title: '查看项目进度', activeMenu: '/project/projectProcess'  },
  //         },
  //         {
  //           path: 'projectProcessAdd',
  //           component: () => import('@/views/project/projectProcess/projectProcessAdd'),
  //           name: 'ProjectProcessAdd',
  //           hidden: true,
  //           meta: { title: '添加项目进度', activeMenu: '/project/projectProcess' },
  //         },
  //         {
  //           path: 'projectProcessInfo',
  //           component: () => import('@/views/project/projectProcess/projectProcessInfo'),
  //           name: 'ProjectProcessInfo',
  //           hidden: true,
  //           meta: { title: '项目进度信息', activeMenu: '/project/projectProcess' },
  //         },
  //       ],
  //     },
  //     {
  //       path: 'projectData',
  //       redirect: '/project/projectData/projectDataIndex',
  //       component: ParentView,
  //       name: 'ProjectData',
  //       meta: { title: '项目资料归档' },
  //       children: [
  //         {
  //           path: 'projectDataIndex',
  //           component: () => import('@/views/project/projectData/index'),
  //           name: 'ProjectDataIndex',
  //           hidden: true,
  //           meta: { title: '项目资料统计分析', activeMenu: '/project/projectData' },
  //         },
  //         {
  //           path: 'projectDataCheck',
  //           component: () => import('@/views/project/projectData/projectDataCheck'),
  //           name: 'ProjectDataCheck',
  //           hidden: true,
  //           meta: { title: '查看项目资料', activeMenu: '/project/projectData'},
  //         },
  //         {
  //           path: 'projectDataAdd',
  //           component: () => import('@/views/project/projectData/projectDataAdd'),
  //           name: 'ProjectDataAdd',
  //           hidden: true,
  //           meta: { title: '添加项目资料', activeMenu: '/project/projectData' },
  //         },
  //         {
  //           path: 'projectDataInfo',
  //           component: () => import('@/views/project/projectData/projectDataInfo'),
  //           name: 'ProjectDataInfo',
  //           hidden: true,
  //           meta: { title: '项目资料信息', activeMenu: '/project/projectData' },
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   path: '/purchase',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   meta: { title: '资产采购管理', icon: 'purchasemg' },
  //   children: [
  //     {
  //       path: 'purchaseManagement',
  //       redirect: 'noRedirect',
  //       component: ParentView,
  //       name: 'PurchaseManagement',
  //       meta: { title: '采购管理' },
  //       children: [
  //         {
  //           path: 'purchaseContract',
  //           redirect: '/purchase/purchaseManagement/purchaseContract/purchaseContractIndex',
  //           component: ParentView,
  //           name: 'purchaseContract',
  //           meta: { title: '采购合同' },
  //           children: [
  //             {
  //               hidden: true,
  //               path: 'purchaseContractIndex',
  //               component: () => import('@/views/data/ContractManagement/PurchaseContract/index'),
  //               meta: {
  //                 title: '采购合同统计',
  //                 activeMenu: '/purchase/purchaseManagement/purchaseContract',
  //               },
  //               name: 'PurchaseContractIndex',
  //             },
  //             {
  //               hidden: true,
  //               path: 'fixedAssetsPCAdd',
  //               component: () =>
  //                 import('@/views/data/ContractManagement/PurchaseContract/fixedAssetsPCAdd'),
  //               meta: {
  //                 title: '添加固定资产采购合同',
  //                 activeMenu: '/purchase/purchaseManagement/purchaseContract',
  //               },
  //               name: 'FixedAssetsPCAdd',
  //             },
  //             {
  //               hidden: true,
  //               path: 'fixedAssetsPCInfo',
  //               component: () =>
  //                 import('@/views/data/ContractManagement/PurchaseContract/fixedAssetsPCInfo'),
  //               meta: {
  //                 title: '固定资产采购合同信息',
  //                 activeMenu: '/purchase/purchaseManagement/purchaseContract',
  //               },
  //               name: 'FixedAssetsPCInfo',
  //             },
  //             {
  //               hidden: true,
  //               path: 'servicePCAdd',
  //               component: () =>
  //                 import('@/views/data/ContractManagement/PurchaseContract/servicePCAdd'),
  //               meta: {
  //                 title: '添加服务采购合同',
  //                 activeMenu: '/purchase/purchaseManagement/purchaseContract',
  //               },
  //               name: 'ServicePCAdd',
  //             },
  //             {
  //               hidden: true,
  //               path: 'servicePCInfo',
  //               component: () =>
  //                 import('@/views/data/ContractManagement/PurchaseContract/servicePCInfo'),
  //               meta: {
  //                 title: '服务采购合同信息',
  //                 activeMenu: '/purchase/purchaseManagement/purchaseContract',
  //               },
  //               name: 'ServicePCInfo',
  //             },
  //           ],
  //         },
  //         {
  //           path: 'supplier',
  //           redirect: '/purchase/purchaseManagement/supplier/supplierIndex',
  //           component: ParentView,
  //           name: 'Supplier',
  //           meta: { title: '供应商' },
  //           children: [
  //             {
  //               hidden: true,
  //               path: 'supplierIndex',
  //               component: () => import('@/views/purchase/purchaseManagement/supplier/index'),
  //               meta: {
  //                 title: '供应商统计分析',
  //                 activeMenu: '/purchase/purchaseManagement/supplier',
  //               },
  //               name: 'SupplierIndex',
  //             },
  //             {
  //               hidden: true,
  //               path: 'supplierCheck',
  //               component: () => import('@/views/purchase/purchaseManagement/supplier/supplierCheck'),
  //               meta: {
  //                 title: '查看供应商',
  //                 activeMenu: '/purchase/purchaseManagement/supplier',
  //               },
  //               name: 'SupplierCheck',
  //             },
  //             {
  //               hidden: true,
  //               path: 'supplierAdd',
  //               component: () => import('@/views/purchase/purchaseManagement/supplier/supplierAdd'),
  //               meta: {
  //                 title: '添加供应商',
  //                 activeMenu: '/purchase/purchaseManagement/supplier',
  //               },
  //               name: 'SupplierAdd',
  //             },
  //             {
  //               hidden: true,
  //               path: 'supplierInfo',
  //               component: () => import('@/views/purchase/purchaseManagement/supplier/supplierInfo'),
  //               meta: {
  //                 title: '供应商信息',
  //                 activeMenu: '/purchase/purchaseManagement/supplier',
  //               },
  //               name: 'SupplierInfo',
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       path: 'assetManagement',
  //       redirect: 'noRedirect',
  //       component: ParentView,
  //       name: 'AssetManagement',
  //       meta: { title: '资产管理' },
  //       children: [
  //         {
  //           path: 'assetIn',
  //           redirect: '/purchase/assetManagement/assetIn/assetInIndex',
  //           component: ParentView,
  //           name: 'AssetIn',
  //           meta: { title: '资产入库' },
  //           children: [
  //             {
  //               hidden: true,
  //               path: 'assetInIndex',
  //               component: () => import('@/views/purchase/assetManagement/assetIn/index'),
  //               meta: {
  //                 title: '资产入库统计分析',
  //                 activeMenu: '/purchase/assetManagement/assetIn',
  //               },
  //               name: 'AssetInIndex',
  //             },
  //             {
  //               hidden: true,
  //               path: 'assetInCheck',
  //               component: () => import('@/views/purchase/assetManagement/assetIn/assetInCheck'),
  //               meta: {
  //                 title: '查看资产入库',
  //                 activeMenu: '/purchase/assetManagement/assetIn',
  //               },
  //               name: 'AssetInCheck',
  //             },
  //             {
  //               hidden: true,
  //               path: 'assetInAdd',
  //               component: () => import('@/views/purchase/assetManagement/assetIn/assetInAdd'),
  //               meta: { title: '入库登记', activeMenu: '/purchase/assetManagement/assetIn',},
  //               name: 'AssetInAdd',
  //             },
  //             {
  //               hidden: true,
  //               path: 'assetInInfo',
  //               component: () => import('@/views/purchase/assetManagement/assetIn/assetInInfo'),
  //               meta: {
  //                 title: '资产入库信息',
  //                 activeMenu: '/purchase/assetManagement/assetIn',
  //               },
  //               name: 'AssetInInfo',
  //             },
  //           ],
  //         },
  //         {
  //           path: 'assetAcquisition',
  //           redirect: '/purchase/assetManagement/assetAcquisition/assetAcquisitionIndex',
  //           component: ParentView,
  //           name: 'AssetAcquisition',
  //           meta: { title: '资产领用' },
  //           children: [
  //             {
  //               hidden: true,
  //               path: 'assetAcquisitionIndex',
  //               component: () => import('@/views/purchase/assetManagement/assetAcquisition/index'),
  //               meta: {
  //                 title: '资产领用统计',
  //                 activeMenu: '/purchase/assetManagement/assetAcquisition',
  //               },
  //               name: '',
  //             },
  //             {
  //               hidden: true,
  //               path: 'assetAcquisitionCheck',
  //               component: () => import('@/views/purchase/assetManagement/assetAcquisition/assetAcquisitionCheck'),
  //               meta: {
  //                 title: '查看资产领用',
  //                 activeMenu: '/purchase/assetManagement/assetAcquisition',
  //               },
  //               name: 'AssetAcquisitionCheck',
  //             },
  //             {
  //               hidden: true,
  //               path: 'assetAcquisitionAdd',
  //               component: () => import('@/views/purchase/assetManagement/assetAcquisition/assetAcquisitionAdd'),
  //               meta: {
  //                 title: '资产领用登记',
  //                 activeMenu: '/purchase/assetManagement/assetAcquisition',
  //               },
  //               name: 'AssetAcquisitionAdd',
  //             },
  //             {
  //               hidden: true,
  //               path: 'assetAcquisitionInfo',
  //               component: () => import('@/views/purchase/assetManagement/assetAcquisition/assetAcquisitionInfo'),
  //               meta: {
  //                 title: '资产领用信息',
  //                 activeMenu: '/purchase/assetManagement/assetAcquisition',
  //               },
  //               name: 'AssetAcquisitionInfo',
  //             },
  //           ],
  //         },
  //         {
  //           path: 'assetOut',
  //           redirect: '/purchase/assetManagement/assetOut/assetOutIndex',
  //           component: ParentView,
  //           name: 'AssetOut',
  //           meta: { title: '资产报废' },
  //           children: [
  //             {
  //               hidden: true,
  //               path: 'assetOutIndex',
  //               component: () => import('@/views/purchase/assetManagement/assetOut/index'),
  //               meta: {
  //                 title: '资产报废统计分析',
  //                 activeMenu: '/purchase/assetManagement/assetOut',
  //               },
  //               name: 'AssetOutIndex',
  //             },
  //             {
  //               hidden: true,
  //               path: 'assetOutCheck',
  //               component: () => import('@/views/purchase/assetManagement/assetOut/assetOutCheck'),
  //               meta: {
  //                 title: '查看资产报废',
  //                 activeMenu: '/purchase/assetManagement/assetOut',
  //               },
  //               name: 'AssetOutCheck',
  //             },
  //             {
  //               hidden: true,
  //               path: 'assetOutAdd',
  //               component: () => import('@/views/purchase/assetManagement/assetOut/assetOutAdd'),
  //               meta: { title: '出库登记', activeMenu: '/purchase/assetManagement/assetOut',},
  //               name: 'AssetOutAdd',
  //             },
  //             {
  //               hidden: true,
  //               path: 'assetOutInfo',
  //               component: () => import('@/views/purchase/assetManagement/assetOut/assetOutInfo'),
  //               meta: {
  //                 title: '资产报废信息',
  //                 activeMenu: '/purchase/assetManagement/assetOut',
  //               },
  //               name: 'AssetOutInfo',
  //             },
  //           ],
  //         },
  //         {
  //           path: 'assetQuery',
  //           redirect: '/purchase/assetManagement/assetQuery/assetQueryIndex',
  //           component: ParentView,
  //           name: 'assetQuery',
  //           meta: { title: '资产查询' },
  //           children: [
  //             {
  //               hidden: true,
  //               path: 'assetQueryIndex',
  //               component: () => import('@/views/purchase/assetManagement/assetQuery/index'),
  //               meta: {
  //                 title: '资产库存',
  //                 activeMenu: '/purchase/assetManagement/assetQuery',
  //               },
  //               name: 'AssetQueryIndex',
  //             },
  //           ],
  //         },
  //         {
  //           path: 'approvalHandle',
  //           redirect: '/purchase/assetManagement/approvalHandle/approvalHandleIndex',
  //           component: ParentView,
  //           name: 'ApprovalHandle',
  //           meta: { title: '审批处理' },
  //           children: [
  //             {
  //               hidden: true,
  //               path: 'approvalHandleIndex',
  //               component: () => import('@/views/purchase/assetManagement/approvalHandle/index'),
  //               meta: { title: '审批统计', activeMenu: '/purchase/assetManagement/approvalHandle' },
  //               name: 'ApprovalHandleIndex',
  //             },
  //             {
  //               hidden: true,
  //               path: 'approvalHandleCheck',
  //               component: () => import('@/views/purchase/assetManagement/approvalHandle/approvalHandleCheck'),
  //               meta: { title: '查看审批', activeMenu: '/purchase/assetManagement/approvalHandle'  },
  //               name: 'ApprovalHandleCheck',
  //             },
  //             {
  //               hidden: true,
  //               path: 'receiveHandle',
  //               component: () => import('@/views/purchase/assetManagement/approvalHandle/receiveHandle'),
  //               meta: { title: '处理领用审批', activeMenu: '/purchase/assetManagement/approvalHandle' },
  //               name: 'ReceiveHandle',
  //             },
  //             {
  //               hidden: true,
  //               path: 'outboundHandle',
  //               component: () => import('@/views/purchase/assetManagement/approvalHandle/outboundHandle'),
  //               meta: {
  //                 title: '处理出库审批',
  //                 activeMenu: '/purchase/assetManagement/approvalHandle'
  //               },
  //               name: 'OutboundHandle',
  //             },
  //           ],
  //         },
  //         {
  //           path: 'assetCode',
  //           redirect: '/purchase/assetManagement/assetCode/assetCodeIndex',
  //           component: ParentView,
  //           name: 'AssetCode',
  //           meta: { title: '资产编码' },
  //           children: [
  //             {
  //               hidden: true,
  //               path: 'assetCodeIndex',
  //               component: () =>import('@/views/purchase/assetManagement/assetCode/index'),
  //               meta: {
  //                 title: '资产编码统计',
  //                 activeMenu: '/purchase/assetManagement/assetCode',
  //               },
  //               name: 'AssetCodeIndex',
  //             },
  //             {
  //               hidden: true,
  //               path: 'assetCodeCheck',
  //               component: () =>import('@/views/purchase/assetManagement/assetCode/assetCodeCheck'),
  //               meta: {
  //                 title: '查看资产编码',
  //                 activeMenu: '/purchase/assetManagement/assetCode',
  //               },
  //               name: 'AssetCodeCheck',
  //             },
  //             {
  //               hidden: true,
  //               path: 'assetCodeAdd',
  //               component: () =>import('@/views/purchase/assetManagement/assetCode/assetCodeAdd'),
  //               meta: {
  //                 title: '添加资产编码',
  //                 activeMenu: '/purchase/assetManagement/assetCode',
  //               },
  //               name: 'AssetCodeAdd',
  //             },
  //             {
  //               hidden: true,
  //               path: 'assetCodeInfo',
  //               component: () =>import('@/views/purchase/assetManagement/assetCode/assetCodeInfo'),
  //               meta: {
  //                 title: '资产编码信息',
  //                 activeMenu: '/purchase/assetManagement/assetCode',
  //               },
  //               name: 'AssetCodeInfo',
  //             },
  //           ],
  //         },
  //         {
  //           path: 'warehouseMg',
  //           redirect: '/purchase/assetManagement/warehouseMg/warehouseMgIndex',
  //           component: ParentView,
  //           name: 'WarehouseMg',
  //           meta: { title: '仓库管理' },
  //           children: [
  //             {
  //               hidden: true,
  //               path: 'warehouseMgIndex',
  //               component: () => import('@/views/purchase/assetManagement/warehouseMg/index'),
  //               meta: {title: '仓库管理统计', activeMenu: '/purchase/assetManagement/warehouseMg' },
  //               name: 'WarehouseMgIndex',
  //             },
  //             {
  //               hidden: true,
  //               path: 'warehouseMgCheck',
  //               component: () => import('@/views/purchase/assetManagement/warehouseMg/warehouseMgCheck'),
  //               meta: {title: '查看仓库管理',  activeMenu: '/purchase/assetManagement/warehouseMg'},
  //               name: 'WarehouseMgCheck',
  //             },
  //             {
  //               hidden: true,
  //               path: 'warehouseMgAdd',
  //               component: () => import('@/views/purchase/assetManagement/warehouseMg/warehouseMgAdd'),
  //               meta: { title: '添加仓库', activeMenu: '/purchase/assetManagement/warehouseMg',},
  //               name: 'WarehouseMgAdd',
  //             },
  //             {
  //               hidden: true,
  //               path: 'warehouseMgInfo',
  //               component: () => import('@/views/purchase/assetManagement/warehouseMg/warehouseMgInfo'),
  //               meta: { title: '仓库信息', activeMenu: '/purchase/assetManagement/warehouseMg',},
  //               name: 'WarehouseMgInfo',
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   path: '/car',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   meta: { title: '车辆管理', icon: 'carmg' },
  //   children: [
  //     {
  //       path: 'carRequest',
  //       redirect: '/car/carRequest/carRequestIndex',
  //       component: ParentView,
  //       name: 'CarRequest',
  //       meta: { title: '用车申请' },
  //       children: [
  //         {
  //           path: 'carRequestIndex',
  //           component: () => import('@/views/car/carRequest/index'),
  //           name: 'CarRequestIndex',
  //           hidden: true,
  //           meta: { title: '用车申请统计', activeMenu: '/car/carRequest' },
  //         },
  //         {
  //           path: 'carRequestCheck',
  //           component: () => import('@/views/car/carRequest/carRequestCheck'),
  //           name: 'CarRequestCheck',
  //           hidden: true,
  //           meta: { title: '查看用车申请', activeMenu: '/car/carRequest' },
  //         },
  //         {
  //           path: 'carRequestAdd',
  //           component: () => import('@/views/car/carRequest/carRequestAdd'),
  //           name: 'CarRequestAdd',
  //           hidden: true,
  //           meta: { title: '添加用车申请', activeMenu: '/car/carRequest' },
  //         },
  //         {
  //           path: 'carRequestInfo',
  //           component: () => import('@/views/car/carRequest/carRequestInfo'),
  //           name: 'CarRequestInfo',
  //           hidden: true,
  //           meta: { title: '用车申请信息', activeMenu: '/car/carRequest' },
  //         },
  //       ],
  //     },
  //     {
  //       path: 'outboundRequest',
  //       redirect: '/car/outboundRequest/outboundRequestIndex',
  //       component: ParentView,
  //       name: 'OutboundRequest',
  //       meta: { title: '出库申请' },
  //       children: [
  //         {
  //           path: 'outboundRequestIndex',
  //           component: () => import('@/views/car/outboundRequest/index'),
  //           name: 'OutboundRequestIndex',
  //           hidden: true,
  //           meta: { title: '出库申请统计分析', activeMenu: '/car/outboundRequest' },
  //         },
  //         {
  //           path: 'outboundRequestCheck',
  //           component: () => import('@/views/car/outboundRequest/outboundRequestCheck'),
  //           name: 'OutboundRequestCheck',
  //           hidden: true,
  //           meta: { title: '查看出库申请', activeMenu: '/car/outboundRequest' },
  //         },
  //         {
  //           path: 'outboundRequestAdd',
  //           component: () => import('@/views/car/outboundRequest/outboundRequestAdd'),
  //           name: 'OutboundRequestAdd',
  //           hidden: true,
  //           meta: { title: '添加出库申请', activeMenu: '/car/outboundRequest' },
  //         },
  //         {
  //           path: 'outboundRequestInfo',
  //           component: () => import('@/views/car/outboundRequest/outboundRequestInfo'),
  //           name: 'OutboundRequestInfo',
  //           hidden: true,
  //           meta: { title: '出库申请信息', activeMenu: '/car/outboundRequest' },
  //         },
  //       ],
  //     },
  //     {
  //       path: 'carManagement',
  //       redirect: '/car/carManagement/carManagementIndex',
  //       component: ParentView,
  //       name: 'CarManagement',
  //       meta: { title: '车辆管理' },
  //       children: [
  //         {
  //           path: 'carManagementIndex',
  //           component: () => import('@/views/car/carManagement/index'),
  //           name: 'carManagementIndex',
  //           hidden: true,
  //           meta: { title: '车辆管理统计', activeMenu: '/car/carManagement'},
  //         },
  //         {
  //           path: 'carManagementCheck',
  //           component: () => import('@/views/car/carManagement/carManagementCheck'),
  //           name: 'CarManagementCheck',
  //           hidden: true,
  //           meta: { title: '查看车辆管理', activeMenu: '/car/carManagement'},
  //         },
  //         {
  //           path: 'carManagementAdd',
  //           component: () => import('@/views/car/carManagement/carManagementAdd'),
  //           name: 'CarManagementAdd',
  //           hidden: true,
  //           meta: { title: '添加车辆', activeMenu: '/car/carManagement'},
  //         },
  //         {
  //           path: 'carManagementInfo',
  //           component: () => import('@/views/car/carManagement/carManagementInfo'),
  //           name: 'CarManagementInfo',
  //           hidden: true,
  //           meta: { title: '车辆信息', activeMenu: '/car/carManagement'},
  //         },
  //       ],
  //     },
  //     {
  //       path: 'carApproval',
  //       redirect: '/car/carApproval/carApprovalIndex',
  //       component: ParentView,
  //       name: 'CarApproval',
  //       meta: { title: '审批处理' },
  //       children: [
  //         {
  //           path: 'carApprovalIndex',
  //           component: () => import('@/views/car/carApproval/index'),
  //           name: 'CarApprovalIndex',
  //           hidden: true,
  //           meta: { title: '审批处理统计', activeMenu: '/car/carApproval' },
  //         },
  //         {
  //           path: 'carApprovalCheck',
  //           component: () => import('@/views/car/carApproval/carApprovalCheck'),
  //           name: 'CarApprovalCheck',
  //           hidden: true,
  //           meta: { title: '查看审批处理', activeMenu: '/car/carApproval'  },
  //         },
  //         {
  //           path: 'carApprovalAdd',
  //           component: () => import('@/views/car/carApproval/carApprovalAdd'),
  //           name: 'CarApprovalAdd',
  //           hidden: true,
  //           meta: { title: '添加审批处理', activeMenu: '/car/carApproval' },
  //         },
  //         {
  //           path: 'carApprovalInfo',
  //           component: () => import('@/views/car/carApproval/carApprovalInfo'),
  //           name: 'CarApprovalInfo',
  //           hidden: true,
  //           meta: { title: '审批处理信息', activeMenu: '/car/carApproval' },
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   path: '/person',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   meta: { title: '人员管理', icon: 'personmg' },
  //   children: [
  //     {
  //       path: 'personInfo',
  //       redirect: '/person/personInfo/personInfoIndex',
  //       component: ParentView,
  //       name: 'PersonInfo',
  //       meta: { title: '人员信息' },
  //       children: [
  //         {
  //           path: 'personInfoIndex',
  //           component: () => import('@/views/person/personInfo/index'),
  //           name: 'PersonInfoIndex',
  //           hidden: true,
  //           meta: { title: '人员信息统计分析', activeMenu: '/person/personInfo'},
  //         },
  //         {
  //           path: 'personInfoCheck',
  //           component: () => import('@/views/person/personInfo/personInfoCheck'),
  //           name: 'PersonInfoCheck',
  //           hidden: true,
  //           meta: { title: '查看人员信息', activeMenu: '/person/personInfo'},
  //         },
  //         {
  //           path: 'personInfoAdd',
  //           component: () => import('@/views/person/personInfo/personInfoAdd'),
  //           name: 'PersonInfoAdd',
  //           hidden: true,
  //           meta: { title: '添加人员信息', activeMenu: '/person/personInfo'},
  //         },
  //         {
  //           path: 'personInfoInfo',
  //           component: () => import('@/views/person/personInfo/personInfoInfo'),
  //           name: 'PersonInfoInfo',
  //           hidden: true,
  //           meta: { title: '人员信息', activeMenu: '/person/personInfo'},
  //         },
  //       ],
  //     },
  //     {
  //       path: 'personContract',
  //       redirect: '/person/personContract/personContractIndex',
  //       component: ParentView,
  //       name: 'PersonContract',
  //       meta: { title: '劳动合同' },
  //       children: [
  //         {
  //           path: 'personContractIndex',
  //           component: () => import('@/views/person/personContract/index'),
  //           name: 'PersonContractIndex',
  //           hidden: true,
  //           meta: { title: '劳动合同统计分析', activeMenu: '/person/personContract' },
  //         },
  //         {
  //           path: 'personContractCheck',
  //           component: () => import('@/views/person/personContract/personContractCheck'),
  //           name: 'PersonContractCheck',
  //           hidden: true,
  //           meta: { title: '查看劳动合同', activeMenu: '/person/personContract' },
  //         },
  //         {
  //           path: 'personContractAdd',
  //           component: () => import('@/views/person/personContract/personContractAdd'),
  //           name: 'PersonContractAdd',
  //           hidden: true,
  //           meta: { title: '添加劳动合同', activeMenu: '/person/personContract' },
  //         },
  //         {
  //           path: 'personContractInfo',
  //           component: () => import('@/views/person/personContract/personContractInfo'),
  //           name: 'PersonContractInfo',
  //           hidden: true,
  //           meta: { title: '劳动合同信息', activeMenu: '/person/personContract' },
  //         },
  //       ],
  //     },
  //     {
  //       path: 'personCertificate',
  //       redirect: '/person/personCertificate/personCertificateIndex',
  //       component: ParentView,
  //       name: 'PersonCertificate',
  //       meta: { title: '人员证书' },
  //       children: [
  //         {
  //           path: 'personCertificateIndex',
  //           component: () => import('@/views/person/personCertificate/index'),
  //           name: 'PersonCertificateIndex',
  //           hidden: true,
  //           meta: { title: '人员证书统计分析', activeMenu: '/person/personCertificate' },
  //         },
  //         {
  //           path: 'personCertificateCheck',
  //           component: () => import('@/views/person/personCertificate/personCertificateCheck'),
  //           name: 'PersonCertificateCheck',
  //           hidden: true,
  //           meta: { title: '查看人员证书', activeMenu: '/person/personCertificate' },
  //         },
  //         {
  //           path: 'personCertificateAdd',
  //           component: () => import('@/views/person/personCertificate/personCertificateAdd'),
  //           name: 'PersonCertificateAdd',
  //           hidden: true,
  //           meta: { title: '添加人员证书', activeMenu: '/person/personCertificate' },
  //         },
  //         {
  //           path: 'personCertificateInfo',
  //           component: () => import('@/views/person/personCertificate/personCertificateInfo'),
  //           name: 'PersonCertificateInfo',
  //           hidden: true,
  //           meta: { title: '人员证书信息', activeMenu: '/person/personCertificate' },
  //         },
  //       ],
  //     },
  //     {
  //       path: 'personResume',
  //       redirect: '/person/personResume/personResumeIndex',
  //       component: ParentView,
  //       name: 'PersonResume',
  //       meta: { title: '履职经历' },
  //       children: [
  //         {
  //           path: 'personResumeIndex',
  //           component: () => import('@/views/person/personResume/index'),
  //           name: 'PersonResumeIndex',
  //           hidden: true,
  //           meta: { title: '履职经历统计分析', activeMenu: '/person/personResume' },
  //         },
  //         {
  //           path: 'personResumeCheck',
  //           component: () => import('@/views/person/personResume/personResumeCheck'),
  //           name: 'PersonResumeCheck',
  //           hidden: true,
  //           meta: { title: '查看履职经历', activeMenu: '/person/personResume' },
  //         },
  //         {
  //           path: 'personResumeAdd',
  //           component: () => import('@/views/person/personResume/personResumeAdd'),
  //           name: 'PersonResumeAdd',
  //           hidden: true,
  //           meta: { title: '添加履职经历', activeMenu: '/person/personResume' },
  //         },
  //         {
  //           path: 'personResumeInfo',
  //           component: () => import('@/views/person/personResume/personResumeInfo'),
  //           name: 'PersonResumeInfo',
  //           hidden: true,
  //           meta: { title: '履职经历信息', activeMenu: '/person/personResume' },
  //         },
  //       ],
  //     },
  //     {
  //       path: 'personAchievement',
  //       redirect: '/person/personAchievement/personAchievementIndex',
  //       component: ParentView,
  //       name: 'PersonAchievement',
  //       meta: { title: '人员业绩' },
  //       children: [
  //         {
  //           path: 'personAchievementIndex',
  //           component: () => import('@/views/person/personAchievement/index'),
  //           name: 'PersonAchievementIndex',
  //           hidden: true,
  //           meta: { title: '人员业绩统计分析', activeMenu: '/person/personAchievement' },
  //         },
  //         {
  //           path: 'personAchievementCheck',
  //           component: () => import('@/views/person/personAchievement/personAchievementCheck'),
  //           name: 'PersonAchievementCheck',
  //           hidden: true,
  //           meta: { title: '查看人员业绩', activeMenu: '/person/personAchievement' },
  //         },
  //         {
  //           path: 'personAchievementAdd',
  //           component: () => import('@/views/person/personAchievement/personAchievementAdd'),
  //           name: 'PersonAchievementAdd',
  //           hidden: true,
  //           meta: { title: '添加人员业绩', activeMenu: '/person/personAchievement' },
  //         },
  //         {
  //           path: 'personAchievementInfo',
  //           component: () => import('@/views/person/personAchievement/personAchievementInfo'),
  //           name: 'PersonAchievementInfo',
  //           hidden: true,
  //           meta: { title: '人员业绩信息', activeMenu: '/person/personAchievement' },
  //         },
  //       ],
  //     },
  //     {
  //       path: 'personOut',
  //       redirect: '/person/personOut/personOutIndex',
  //       component: ParentView,
  //       name: 'PersonOut',
  //       meta: { title: '人员外出' },
  //       children: [
  //         {
  //           path: 'personOutIndex',
  //           component: () => import('@/views/person/personOut/index'),
  //           name: 'PersonOutIndex',
  //           hidden: true,
  //           meta: { title: '人员外出统计分析', activeMenu: '/person/personOut' },
  //         },
  //         {
  //           path: 'personOutCheck',
  //           component: () => import('@/views/person/personOut/personOutCheck'),
  //           name: 'PersonOutCheck',
  //           hidden: true,
  //           meta: { title: '查看人员外出信息', activeMenu: '/person/personOut' },
  //         },
  //         {
  //           path: 'personOutAdd',
  //           component: () => import('@/views/person/personOut/personOutAdd'),
  //           name: 'PersonOutAdd',
  //           hidden: true,
  //           meta: { title: '添加人员外出信息', activeMenu: '/person/personOut' },
  //         },
  //         {
  //           path: 'personOutInfo',
  //           component: () => import('@/views/person/personOut/personOutInfo'),
  //           name: 'PersonOutInfo',
  //           hidden: true,
  //           meta: { title: '人员外出信息', activeMenu: '/person/personOut' },
  //         },
  //       ],
  //     },
  //     {
  //       path: 'personLeave',
  //       redirect: '/person/personLeave/personLeaveIndex',
  //       component: ParentView,
  //       name: 'PersonLeave',
  //       meta: { title: '人员请假' },
  //       children: [
  //         {
  //           path: 'personLeaveIndex',
  //           component: () => import('@/views/person/personLeave/index'),
  //           name: 'PersonLeaveIndex',
  //           hidden: true,
  //           meta: { title: '人员请假统计分析', activeMenu: '/person/personLeave' },
  //         },
  //         {
  //           path: 'personLeaveCheck',
  //           component: () => import('@/views/person/personLeave/personLeaveCheck'),
  //           name: 'PersonLeaveCheck',
  //           hidden: true,
  //           meta: { title: '查看人员请假', activeMenu: '/person/personLeave' },
  //         },
  //         {
  //           path: 'personLeaveAdd',
  //           component: () => import('@/views/person/personLeave/personLeaveAdd'),
  //           name: 'PersonLeaveAdd',
  //           hidden: true,
  //           meta: { title: '添加人员请假信息', activeMenu: '/person/personLeave' },
  //         },
  //         {
  //           path: 'personLeaveInfo',
  //           component: () => import('@/views/person/personLeave/personLeaveInfo'),
  //           name: 'PersonLeaveInfo',
  //           hidden: true,
  //           meta: { title: '人员请假信息', activeMenu: '/person/personLeave' },
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   path: '/production',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   meta: { title: '权限管理', icon: 'authoritymg' },
  // },

  //#endregion
];

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [
  //#region  权限

  {
    path: '/system/post-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:post:edit'],
    children: [
      {
        path: 'role/:postId(\\d+)',
        component: () => import('@/views/system/dept/authPostRole'),
        name: 'AuthPostRole',
        meta: { title: '分配权限', activeMenu: '/person/dept' },
      },
    ],
  },
  {
    path: '/system/user-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [
      {
        path: 'role/:userId(\\d+)',
        component: () => import('@/views/system/user/authRole'),
        name: 'AuthRole',
        meta: { title: '分配角色', activeMenu: '/system/user' },
      },
    ],
  },
  {
    path: '/system/post-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:role:edit'],
    children: [
      {
        path: 'user/:postId(\\d+)',
        component: () => import('@/views/system/dept/authPostUser'),
        name: 'AuthPostUser',
        meta: { title: '人员配置', activeMenu: '/person/dept' },
      },
    ],
  },
  {
    path: '/system/role-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:role:edit'],
    children: [
      {
        path: 'user/:roleId(\\d+)',
        component: () => import('@/views/system/role/authUser'),
        name: 'AuthUser',
        meta: { title: '分配管理员', activeMenu: '/system/role' },
      },
    ],
  },
  {
    path: '/system/dict-data',
    component: Layout,
    hidden: true,
    permissions: ['system:dict:list'],
    children: [
      {
        path: 'index/:dictId(\\d+)',
        component: () => import('@/views/system/dict/data'),
        name: 'Data',
        meta: { title: '字典数据', activeMenu: '/system/dict' },
      },
    ],
  },
  {
    path: '/monitor/job-log',
    component: Layout,
    hidden: true,
    permissions: ['monitor:job:list'],
    children: [
      {
        path: 'index/:jobId(\\d+)',
        component: () => import('@/views/monitor/job/log'),
        name: 'JobLog',
        meta: { title: '调度日志', activeMenu: '/monitor/job' },
      },
    ],
  },
  {
    path: '/tool/gen-edit',
    component: Layout,
    hidden: true,
    permissions: ['tool:gen:edit'],
    children: [
      {
        path: 'index/:tableId(\\d+)',
        component: () => import('@/views/tool/gen/editTable'),
        name: 'GenEdit',
        meta: { title: '修改生成配置', activeMenu: '/tool/gen' },
      },
    ],
  },

  //#endregion

  //#region  资料管理

  // {
  //   path: '/data-d',
  //   component: Layout,
  //   hidden: true,
  //   permissions: ['certificate:cert:list'],
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/data/index'),
  //       name: 'Index',
  //       meta: { title: '资料管理分析', activeMenu: '/data/index' },
  //     },
  //   ],
  // },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['certificate:cert0:list'],
    children: [
      {
        path: 'certificatesCheck',
        component: () => import('@/views/data/Certificates/certificatesCheck'),
        name: 'CertificatesCheck',
        meta: { title: '查看证书', activeMenu: '/data/certificates' },
      },
    ],
  },
  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['certificate:cert0:add'],
    children: [
      {
        path: 'certificatesAdd',
        component: () => import('@/views/data/Certificates/certificatesAdd'),
        name: 'CertificatesAdd',
        meta: { title: '添加证书', activeMenu: '/data/certificates' },
      },
    ],
  },
  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['certificate:cert0:edit'],
    children: [
      {
        path: 'certificatesEdit',
        component: () => import('@/views/data/Certificates/certificatesEdit'),
        name: 'CertificatesEdit',
        meta: { title: '编辑证书', activeMenu: '/data/certificates' },
      },
    ],
  },
  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['certificate:cert0:query'],
    children: [
      {
        path: 'certificatesInfo',
        component: () => import('@/views/data/Certificates/certificatesInfo'),
        name: 'CertificatesInfo',
        meta: { title: '证书信息', activeMenu: '/data/certificates' },
      },
    ],
  },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:project:add'],
    children: [
      {
        hidden: true,
        path: 'projectContractAdd',
        component: () =>
          import('@/views/data/ContractManagement/ProjectContract/projectContractAdd'),
        meta: {
          title: '添加项目合同',
          activeMenu: '/data/contractmanagement/projectContractIndex',
        },
        name: 'ProjectContractAdd',
      },
    ],
  },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:project:edit'],
    children: [
      {
        hidden: true,
        path: 'projectContractEdit',
        component: () =>
          import('@/views/data/ContractManagement/ProjectContract/projectContractEdit'),
        meta: {
          title: '变更项目合同',
          activeMenu: '/data/contractmanagement/projectContractIndex',
        },
        name: 'ProjectContractEdit',
      },
    ],
  },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:project:query'],
    children: [
      {
        hidden: true,
        path: 'projectContractInfo',
        component: () =>
          import('@/views/data/ContractManagement/ProjectContract/projectContractInfo'),
        meta: {
          title: '项目合同信息',
          activeMenu: '/data/contractmanagement/projectContractIndex',
        },
        name: 'ProjectContractInfo',
      },
    ],
  },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:plan:list0'],
    children: [
      {
        hidden: true,
        path: 'taskSheetP',
        component: () => import('@/views/data/ContractManagement/ProjectContract/taskSheetP'),
        meta: {
          title: '项目任务单',
          activeMenu: '/data/contractmanagement/projectContractIndex',
        },
        name: 'TaskSheetP',
      },
    ],
  },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:outsourcing:add'],
    children: [
      {
        hidden: true,
        path: 'outsourcingContractAdd',
        component: () =>
          import('@/views/data/ContractManagement/OutsourcingContract/outsourcingContractAdd'),
        meta: {
          title: '添加外委合同',
          activeMenu: '/data/contractmanagement/outsourcingContractIndex',
        },
        name: 'OutsourcingContractAdd',
      },
    ],
  },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:outsourcing:edit'],
    children: [
      {
        hidden: true,
        path: 'outsourcingContractEdit',
        component: () =>
          import('@/views/data/ContractManagement/OutsourcingContract/outsourcingContractEdit'),
        meta: {
          title: '变更外委合同',
          activeMenu: '/data/contractmanagement/outsourcingContractIndex',
        },
        name: 'OutsourcingContractEdit',
      },
    ],
  },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:outsourcing:query'],
    children: [
      {
        hidden: true,
        path: 'outsourcingContractInfo',
        component: () =>
          import('@/views/data/ContractManagement/OutsourcingContract/outsourcingContractInfo'),
        meta: {
          title: '外委合同信息',
          activeMenu: '/data/contractmanagement/outsourcingContractIndex',
        },
        name: 'OutsourcingContractInfo',
      },
    ],
  },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:plan:list1'],
    children: [
      {
        hidden: true,
        path: 'taskSheetO',
        component: () => import('@/views/data/ContractManagement/OutsourcingContract/taskSheetO'),
        meta: {
          title: '外委任务单',
          activeMenu: '/data/contractmanagement/outsourcingContractIndex',
        },
        name: 'TaskSheetO',
      },
    ],
  },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:labor:add'],
    children: [
      {
        hidden: true,
        path: 'laborContractAdd',
        component: () => import('@/views/data/ContractManagement/LaborContract/laborContractAdd'),
        meta: { title: '添加劳动合同', activeMenu: '/data/contractmanagement/laborContractIndex' },
        name: 'LaborContractAdd',
      },
    ],
  },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:labor:edit'],
    children: [
      {
        hidden: true,
        path: 'laborContractEdit',
        component: () => import('@/views/data/ContractManagement/LaborContract/laborContractEdit'),
        meta: { title: '编辑劳动合同', activeMenu: '/data/contractmanagement/laborContractIndex' },
        name: 'LaborContractEdit',
      },
    ],
  },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:labor:query'],
    children: [
      {
        hidden: true,
        path: 'laborContractInfo',
        component: () => import('@/views/data/ContractManagement/LaborContract/laborContractInfo'),
        meta: { title: '劳动合同信息', activeMenu: '/data/contractmanagement/laborContractIndex' },
        name: 'LaborContractInfo',
      },
    ],
  },

  // {
  //   path: '/data-d',
  //   component: Layout,
  //   hidden: true,
  //   permissions: ['person:user:list'],
  //   children: [
  //     {
  //       path: 'personnelInfoCheck',
  //       component: () => import('@/views/data/PersonnelInformation/personnelInfoCheck'),
  //       name: 'PersonnelInfoCheck',
  //       meta: { title: '查看人员', activeMenu: '/data/personnelInformationIndex' },
  //     },
  //   ],
  // },
  // {
  //   path: '/data-d',
  //   component: Layout,
  //   hidden: true,
  //   permissions: ['person:user:add'],
  //   children: [
  //     {
  //       path: 'personnelInfoAdd',
  //       component: () => import('@/views/data/PersonnelInformation/personnelInfoAdd'),
  //       name: 'PersonnelInfoAdd',
  //       meta: { title: '添加人员信息', activeMenu: '/data/personnelInformationIndex' },
  //     },
  //   ],
  // },

  // {
  //   path: '/data-d',
  //   component: Layout,
  //   hidden: true,
  //   permissions: ['person:user:query'],
  //   children: [
  //     {
  //       path: 'personnelInfo',
  //       component: () => import('@/views/data/PersonnelInformation/personnelInfo'),
  //       name: 'PersonnelInfo',
  //       meta: { title: '人员信息', activeMenu: '/data/personnelInformationIndex' },
  //     },
  //   ],
  // },

  // {
  //   path: '/data-d',
  //   component: Layout,
  //   hidden: true,
  //   permissions: ['person:user:edit'],
  //   children: [
  //     {
  //       path: 'personnelInfoEdit',
  //       component: () => import('@/views/data/PersonnelInformation/personnelInfoEdit'),
  //       name: 'PersonnelInfoAdd',
  //       meta: { title: '编辑人员信息', activeMenu: '/data/personnelInformationIndex' },
  //     },
  //   ],
  // },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['certificate:cert1:list'],
    children: [
      {
        path: 'pcertificatesCheck',
        component: () => import('@/views/data/PersonnelInformation/certificatesCheck'),
        name: 'PCertificatesCheck',
        meta: { title: '查看人员证书', activeMenu: '/data/personnelInformationIndex' },
      },
    ],
  },
  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['certificate:cert1:add'],
    children: [
      {
        path: 'pcertificatesAdd',
        component: () => import('@/views/data/PersonnelInformation/certificatesAdd'),
        name: 'PCertificatesAdd',
        meta: { title: '添加人员证书', activeMenu: '/data/personnelInformationIndex' },
      },
    ],
  },
  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['certificate:cert1:edit'],
    children: [
      {
        path: 'pcertificatesEdit',
        component: () => import('@/views/data/PersonnelInformation/certificatesEdit'),
        name: 'PCertificatesEdit',
        meta: { title: '编辑人员证书', activeMenu: '/data/personnelInformationIndex' },
      },
    ],
  },
  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['certificate:cert1:query'],
    children: [
      {
        path: 'pcertificatesInfo',
        component: () => import('@/views/data/PersonnelInformation/certificatesInfo'),
        name: 'PCertificatesInfo',
        meta: { title: '人员证书信息', activeMenu: '/data/personnelInformationIndex' },
      },
    ],
  },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:propertyBuy:add'],
    children: [
      {
        hidden: true,
        path: 'fixedAssetsPCAdd',
        component: () =>
          import('@/views/data/ContractManagement/PurchaseContract/fixedAssetsPCAdd'),
        meta: {
          title: '添加固定资产采购合同',
          activeMenu: '/data/contractmanagement/purchaseContractIndex',
        },
        name: 'FixedAssetsPCAdd',
      },
    ],
  },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:propertyBuy:edit'],
    children: [
      {
        hidden: true,
        path: 'fixedAssetsPCEdit',
        component: () =>
          import('@/views/data/ContractManagement/PurchaseContract/fixedAssetsPCEdit'),
        meta: {
          title: '编辑固定资产采购合同',
          activeMenu: '/data/contractmanagement/purchaseContractIndex',
        },
        name: 'FixedAssetsPCEdit',
      },
    ],
  },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:propertyBuy:query'],
    children: [
      {
        hidden: true,
        path: 'fixedAssetsPCInfo',
        component: () =>
          import('@/views/data/ContractManagement/PurchaseContract/fixedAssetsPCInfo'),
        meta: {
          title: '固定资产采购合同信息',
          activeMenu: '/data/contractmanagement/purchaseContractIndex',
        },
        name: 'FixedAssetsPCInfo',
      },
    ],
  },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:serviceBuy:add'],
    children: [
      {
        hidden: true,
        path: 'servicePCAdd',
        component: () => import('@/views/data/ContractManagement/PurchaseContract/servicePCAdd'),
        meta: {
          title: '添加服务采购合同',
          activeMenu: '/data/contractmanagement/purchaseContractIndex',
        },
        name: 'ServicePCAdd',
      },
    ],
  },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:serviceBuy:edit'],
    children: [
      {
        hidden: true,
        path: 'servicePCEdit',
        component: () => import('@/views/data/ContractManagement/PurchaseContract/servicePCEdit'),
        meta: {
          title: '编辑服务采购合同',
          activeMenu: '/data/contractmanagement/purchaseContractIndex',
        },
        name: 'ServicePCEdit',
      },
    ],
  },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:serviceBuy:query'],
    children: [
      {
        hidden: true,
        path: 'servicePCInfo',
        component: () => import('@/views/data/ContractManagement/PurchaseContract/servicePCInfo'),
        meta: {
          title: '服务采购合同信息',
          activeMenu: '/data/contractmanagement/purchaseContractIndex',
        },
        name: 'ServicePCInfo',
      },
    ],
  },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['project:data:list'],
    children: [
      {
        hidden: true,
        path: 'projectDataCheck',
        component: () => import('@/views/data/ProjectData/projectDataCheck'),
        meta: { title: '查看项目资料', activeMenu: '/data/projectdataIndex' },
        name: 'ProjectDataCheck',
      },
    ],
  },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['project:data:add'],
    children: [
      {
        hidden: true,
        path: 'projectDataAdd',
        component: () => import('@/views/data/ProjectData/projectDataAdd'),
        meta: { title: '添加项目资料', activeMenu: '/data/projectdataIndex' },
        name: 'ProjectDataAdd',
      },
    ],
  },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['project:data:edit'],
    children: [
      {
        hidden: true,
        path: 'projectDataEdit',
        component: () => import('@/views/data/ProjectData/projectDataEdit'),
        meta: { title: '编辑项目资料', activeMenu: '/data/projectdataIndex' },
        name: 'ProjectDataEdit',
      },
    ],
  },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['project:data:query'],
    children: [
      {
        hidden: true,
        path: 'projectDataInfo',
        component: () => import('@/views/data/ProjectData/projectDataInfo'),
        meta: { title: '项目资料信息', activeMenu: '/data/projectdataIndex' },
        name: 'ProjectDataInfo',
      },
    ],
  },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['file:apply:list'],
    children: [
      {
        hidden: true,
        path: 'downApprovalCheck',
        component: () => import('@/views/data/DataDown/DownApproval/downApprovalCheck'),
        meta: { title: '查看下载审批', activeMenu: '/data/datadown/downApprovalIndex' },
        name: 'DownApprovalCheck',
      },
    ],
  },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['file:apply:approve'],
    children: [
      {
        hidden: true,
        path: 'downApprovalInfo',
        component: () => import('@/views/data/DataDown/DownApproval/downApprovalInfo'),
        meta: { title: '查看下载审批信息', activeMenu: '/data/datadown/downApprovalIndex' },
        name: 'DownApprovalInfo',
      },
    ],
  },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['file:apply:approve'],
    children: [
      {
        hidden: true,
        path: 'downApprovalHandle',
        component: () => import('@/views/data/DataDown/DownApproval/downApprovalHandle'),
        meta: { title: '处理下载审批信息', activeMenu: '/data/datadown/downApprovalIndex' },
        name: 'DownApprovalHandle',
      },
    ],
  },

  // {
  //   path: '/data-d',
  //   component: Layout,
  //   hidden: true,
  //   // permissions: ['file:apply:export0'],我的权限
  //   children: [
  //     {
  //       hidden: true,
  //       path: 'myRequestCheck',
  //       component: () => import('@/views/data/DataDown/MyRequest/myRequestCheck'),
  //       meta: { title: '我的申请', activeMenu: '/data/datadown/myRequestIndex' },
  //       name: 'MyRequestCheck',
  //     },
  //   ],
  // },

  // {
  //   path: '/data-d',
  //   component: Layout,
  //   hidden: true,
  //   // permissions: ['certificate:cert:list'],我的权限
  //   children: [
  //     {
  //       hidden: true,
  //       path: 'myRequestInfo',
  //       component: () => import('@/views/data/DataDown/MyRequest/myRequestInfo'),
  //       meta: { title: '申请详情', activeMenu: '/data/datadown/myRequestIndex' },
  //       name: 'MyRequestInfo',
  //     },
  //   ],
  // },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:template:add'],
    children: [
      {
        hidden: true,
        path: 'templatetAdd',
        component: () =>
          import('@/views/data/ContractManagement/ContractTemplate/contractTemplateAdd'),
        meta: {
          title: '添加合同范本',
          activeMenu: '/data/contractmanagement/contractTemplateIndex',
        },
        name: 'TemplatetAdd',
      },
    ],
  },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:template:edit'],
    children: [
      {
        hidden: true,
        path: 'templatetEdit',
        component: () =>
          import('@/views/data/ContractManagement/ContractTemplate/contractTemplateEdit'),
        meta: {
          title: '编辑合同范本',
          activeMenu: '/data/contractmanagement/contractTemplateIndex',
        },
        name: 'TemplatetEdit',
      },
    ],
  },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:template:list'],
    children: [
      {
        hidden: true,
        path: 'templatetInfo',
        component: () =>
          import('@/views/data/ContractManagement/ContractTemplate/contractTemplateInfo'),
        meta: {
          title: '合同范本信息',
          activeMenu: '/data/contractmanagement/contractTemplateIndex',
        },
        name: 'TemplatetInfo',
      },
    ],
  },

  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['certificate:cert0:add'],
    children: [
      {
        path: 'safetyAdd',
        component: () => import('@/views/safety/safetyAdd'),
        name: 'SafetyAdd',
        meta: { title: '添加安全生产资料', activeMenu: '/data/safetyCheck' },
      },
    ],
  },
  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['certificate:cert0:edit'],
    children: [
      {
        path: 'safetyEdit',
        component: () => import('@/views/safety/safetyEdit'),
        name: 'SafetyEdit',
        meta: { title: '编辑安全生产资料', activeMenu: '/data/safetyCheck' },
      },
    ],
  },
  {
    path: '/data-d',
    component: Layout,
    hidden: true,
    permissions: ['certificate:cert0:query'],
    children: [
      {
        path: 'safetyInfo',
        component: () => import('@/views/safety/safetyInfo'),
        name: 'SafetyInfo',
        meta: { title: '安全生产资料详情', activeMenu: '/data/safetyCheck' },
      },
    ],
  },

  //#endregion

  //#region  生产管理

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['produce:bid:list'],
    children: [
      {
        hidden: true,
        path: 'bidManagementCheck',
        component: () => import('@/views/production/bidManagement/bidManagementCheck'),
        meta: { title: '查看投标信息', activeMenu: '/production/bidManagementIndex' },
        name: 'BidManagementCheck',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['produce:bid:add'],
    children: [
      {
        hidden: true,
        path: 'bidManagementAdd',
        component: () => import('@/views/production/bidManagement/bidManagementAdd'),
        meta: { title: '添加投标信息', activeMenu: '/production/bidManagementIndex' },
        name: 'BidManagementAdd',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['produce:bid:edit'],
    children: [
      {
        hidden: true,
        path: 'bidManagementEdit',
        component: () => import('@/views/production/bidManagement/bidManagementEdit'),
        meta: { title: '编辑投标信息', activeMenu: '/production/bidManagementIndex' },
        name: 'BidManagementEdit',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['produce:bid:query'],
    children: [
      {
        hidden: true,
        path: 'bidManagementInfo',
        component: () => import('@/views/production/bidManagement/bidManagementInfo'),
        meta: { title: '投标信息详情', activeMenu: '/production/bidManagementIndex' },
        name: 'BidManagementInfo',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:project:list'],
    children: [
      {
        hidden: true,
        path: 'projectContractIndex',
        component: () =>
          import('@/views/production/contractManagement/projectContract/projectContractIndex'),
        meta: {
          title: '查看项目合同',
          activeMenu: '/production/contractmanagement/projectContractIndex',
        },
        name: 'ProjectContractIndex',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:project:add'],
    children: [
      {
        hidden: true,
        path: 'projectContractAdd',
        component: () =>
          import('@/views/production/contractManagement/projectContract/projectContractAdd'),
        meta: {
          title: '添加项目合同',
          activeMenu: '/production/contractmanagement/projectContractIndex',
        },
        name: 'ProjectContractAdd',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:project:edit'],
    children: [
      {
        hidden: true,
        path: 'projectContractEdit',
        component: () =>
          import('@/views/production/contractManagement/projectContract/projectContractEdit'),
        meta: {
          title: '变更项目合同',
          activeMenu: '/production/contractmanagement/projectContractIndex',
        },
        name: 'ProjectContractEdit',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:project:query'],
    children: [
      {
        hidden: true,
        path: 'projectContractInfo',
        component: () =>
          import('@/views/production/contractManagement/projectContract/projectContractInfo'),
        meta: {
          title: '项目合同信息',
          activeMenu: '/production/contractmanagement/projectContractIndex',
        },
        name: 'ProjectContractInfo',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:plan:edit0'],
    children: [
      {
        hidden: true,
        path: 'taskSheetP',
        component: () => import('@/views/production/contractManagement/projectContract/taskSheetP'),
        meta: {
          title: '项目任务单',
          activeMenu: '/production/contractmanagement/projectContractIndex',
        },
        name: 'TaskSheetP',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:outsourcing:list'],
    children: [
      {
        hidden: true,
        path: 'outsourcingContractIndex',
        component: () =>
          import(
            '@/views/production/contractManagement/outsourcingContract/outsourcingContractIndex'
          ),
        meta: {
          title: '查看外委合同',
          activeMenu: '/production/contractmanagement/outsourcingContractIndex',
        },
        name: 'OutsourcingContractIndex',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:outsourcing:add'],
    children: [
      {
        hidden: true,
        path: 'outsourcingContractAdd',
        component: () =>
          import(
            '@/views/production/contractManagement/outsourcingContract/outsourcingContractAdd'
          ),
        meta: {
          title: '添加外委合同',
          activeMenu: '/production/contractmanagement/outsourcingContractIndex',
        },
        name: 'OutsourcingContractAdd',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:outsourcing:edit'],
    children: [
      {
        hidden: true,
        path: 'outsourcingContractEdit',
        component: () =>
          import(
            '@/views/production/contractManagement/outsourcingContract/outsourcingContractEdit'
          ),
        meta: {
          title: '变更外委合同',
          activeMenu: '/production/contractmanagement/outsourcingContractIndex',
        },
        name: 'OutsourcingContractEdit',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:outsourcing:query'],
    children: [
      {
        hidden: true,
        path: 'outsourcingContractInfo',
        component: () =>
          import(
            '@/views/production/contractManagement/outsourcingContract/outsourcingContractInfo'
          ),
        meta: {
          title: '外委合同信息',
          activeMenu: '/production/contractmanagement/outsourcingContractIndex',
        },
        name: 'OutsourcingContractInfo',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:plan:edit1'],
    children: [
      {
        hidden: true,
        path: 'taskSheetO',
        component: () =>
          import('@/views/production/contractManagement/outsourcingContract/taskSheetO'),
        meta: {
          title: '外委任务单',
          activeMenu: '/production/contractmanagement/outsourcingContractIndex',
        },
        name: 'TaskSheetO',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:template:add'],
    children: [
      {
        hidden: true,
        path: 'templatetAdd',
        component: () =>
          import('@/views/production/contractManagement/ContractTemplate/contractTemplateAdd'),
        meta: {
          title: '添加合同范本',
          activeMenu: '/production/contractmanagement/contractTemplateIndex',
        },
        name: 'TemplatetAdd',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:template:edit'],
    children: [
      {
        hidden: true,
        path: 'templatetEdit',
        component: () =>
          import('@/views/production/contractManagement/ContractTemplate/contractTemplateEdit'),
        meta: {
          title: '编辑合同范本',
          activeMenu: '/production/contractmanagement/contractTemplateIndex',
        },
        name: 'TemplatetEdit',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:template:list'],
    children: [
      {
        hidden: true,
        path: 'templatetInfo',
        component: () =>
          import('@/views/production/contractManagement/ContractTemplate/contractTemplateInfo'),
        meta: {
          title: '合同范本信息',
          activeMenu: '/production/contractmanagement/contractTemplateIndex',
        },
        name: 'TemplatetInfo',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:payment0:list'],
    children: [
      {
        hidden: true,
        path: 'incomeNodeCheck',
        component: () => import('@/views/production/incomeManagement/incomeNode/incomeNodeCheck'),
        meta: {
          title: '查看收款节点',
          activeMenu: '/production/collectionManagement/incomeNodeIndex',
        },
        name: 'IncomeNodeCheck',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:payment0:edit'],
    children: [
      {
        hidden: true,
        path: 'incomeNodeAdd',
        component: () => import('@/views/production/incomeManagement/incomeNode/incomeNodeAdd'),
        meta: {
          title: '添加收款节点',
          activeMenu: '/production/collectionManagement/incomeNodeIndex',
        },
        name: 'IncomeNodeAdd',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:payment0:edit'],
    children: [
      {
        hidden: true,
        path: 'incomeNodeEdit',
        component: () => import('@/views/production/incomeManagement/incomeNode/incomeNodeEdit'),
        meta: {
          title: '编辑收款节点',
          activeMenu: '/production/collectionManagement/incomeNodeIndex',
        },
        name: 'IncomeNodeEdit',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:payment0:list'],
    children: [
      {
        hidden: true,
        path: 'incomeNodeInfo',
        component: () => import('@/views/production/incomeManagement/incomeNode/incomeNodeInfo'),
        meta: {
          title: '收款节点信息',
          activeMenu: '/production/collectionManagement/incomeNodeIndex',
        },
        name: 'IncomeNodeInfo',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['produce:payment1:list'],
    children: [
      {
        hidden: true,
        path: 'incomeRecordCheck',
        component: () =>
          import('@/views/production/incomeManagement/incomeRecord/incomeRecordCheck'),
        meta: {
          title: '收款记录列表',
          activeMenu: '/production/collectionManagement/incomeRecordIndex',
        },
        name: 'IncomeRecordCheck',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['produce:payment1:add'],
    children: [
      {
        hidden: true,
        path: 'incomeRecordAdd',
        component: () => import('@/views/production/incomeManagement/incomeRecord/incomeRecordAdd'),
        meta: {
          title: '添加收款记录',
          activeMenu: '/production/collectionManagement/incomeRecordIndex',
        },
        name: 'IncomeRecordAdd',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['produce:payment1:edit'],
    children: [
      {
        hidden: true,
        path: 'incomeRecordEdit',
        component: () =>
          import('@/views/production/incomeManagement/incomeRecord/incomeRecordEdit'),
        meta: {
          title: '编辑收款记录',
          activeMenu: '/production/collectionManagement/incomeRecordIndex',
        },
        name: 'IncomeRecordEdit',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['produce:payment1:query'],
    children: [
      {
        hidden: true,
        path: 'incomeRecordInfo',
        component: () =>
          import('@/views/production/incomeManagement/incomeRecord/incomeRecordInfo'),
        meta: {
          title: '收款记录信息',
          activeMenu: '/production/collectionManagement/incomeRecordIndex',
        },
        name: 'IncomeRecordInfo',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['produce:invoice0:list'],
    children: [
      {
        hidden: true,
        path: 'billingRequestCheck',
        component: () =>
          import('@/views/production/incomeManagement/billingRequest/billingRequestCheck'),
        meta: {
          title: '开票记录列表',
          activeMenu: '/production/collectionManagement/billingRequestIndex',
        },
        name: 'BillingRequestCheck',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['produce:invoice0:add'],
    children: [
      {
        hidden: true,
        path: 'billingRequestAdd',
        component: () =>
          import('@/views/production/incomeManagement/billingRequest/billingRequestAdd'),
        meta: {
          title: '添加开票记录',
          activeMenu: '/production/collectionManagement/billingRequestIndex',
        },
        name: 'BillingRequestAdd',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['produce:invoice0:edit'],
    children: [
      {
        hidden: true,
        path: 'billingRequestEdit',
        component: () =>
          import('@/views/production/incomeManagement/billingRequest/billingRequestEdit'),
        meta: {
          title: '编辑开票记录',
          activeMenu: '/production/collectionManagement/billingRequestIndex',
        },
        name: 'BillingRequestEdit',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['produce:invoice0:info'],
    children: [
      {
        hidden: true,
        path: 'billingRequestInfo',
        component: () =>
          import('@/views/production/incomeManagement/billingRequest/billingRequestInfo'),
        meta: {
          title: '开票记录信息',
          activeMenu: '/production/collectionManagement/billingRequestIndex',
        },
        name: 'BillingRequestInfo',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:payment1:list'],
    children: [
      {
        hidden: true,
        path: 'paymentNodeCheck',
        component: () =>
          import('@/views/production/paymentManagement/paymentNode/paymentNodeCheck'),
        meta: {
          title: '查看付款节点',
          activeMenu: '/production/paymentManagement/paymentNodeIndex',
        },
        name: 'PaymentNodeCheck',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:payment1:edit'],
    children: [
      {
        hidden: true,
        path: 'paymentNodeAdd',
        component: () => import('@/views/production/paymentManagement/paymentNode/paymentNodeAdd'),
        meta: {
          title: '添加付款节点',
          activeMenu: '/production/paymentManagement/paymentNodeIndex',
        },
        name: 'PaymentNodeAdd',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:payment1:edit'],
    children: [
      {
        hidden: true,
        path: 'paymentNodeEdit',
        component: () => import('@/views/production/paymentManagement/paymentNode/paymentNodeEdit'),
        meta: {
          title: '编辑付款节点',
          activeMenu: '/production/paymentManagement/paymentNodeIndex',
        },
        name: 'PaymentNodeEdit',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:payment1:edit'],
    children: [
      {
        hidden: true,
        path: 'paymentNodeInfo',
        component: () => import('@/views/production/paymentManagement/paymentNode/paymentNodeInfo'),
        meta: {
          title: '付款节点信息',
          activeMenu: '/production/paymentManagement/paymentNodeIndex',
        },
        name: 'PaymentNodeInfo',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['produce:payment0:list'],
    children: [
      {
        hidden: true,
        path: 'paymentRequestCheck',
        component: () =>
          import('@/views/production/paymentManagement/paymentRequest/paymentRequestCheck'),
        meta: {
          title: '付款记录列表',
          activeMenu: '/production/paymentManagement/paymentRequestIndex',
        },
        name: 'PaymentRequestCheck',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['produce:payment0:add'],
    children: [
      {
        hidden: true,
        path: 'paymentRequestAdd',
        component: () =>
          import('@/views/production/paymentManagement/paymentRequest/paymentRequestAdd'),
        meta: {
          title: '添加付款记录',
          activeMenu: '/production/paymentManagement/paymentRequestIndex',
        },
        name: 'PaymentRequestAdd',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['produce:payment0:edit'],
    children: [
      {
        hidden: true,
        path: 'paymentRequestEdit',
        component: () =>
          import('@/views/production/paymentManagement/paymentRequest/paymentRequestEdit'),
        meta: {
          title: '编辑付款申请',
          activeMenu: '/production/paymentManagement/paymentRequestIndex',
        },
        name: 'PaymentRequestEdit',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['produce:payment0:query'],
    children: [
      {
        hidden: true,
        path: 'paymentRequestInfo',
        component: () =>
          import('@/views/production/paymentManagement/paymentRequest/paymentRequestInfo'),
        meta: {
          title: '付款申请信息',
          activeMenu: '/production/paymentManagement/paymentRequestIndex',
        },
        name: 'paymentRequestInfo',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['produce:invoice1:list'],
    children: [
      {
        hidden: true,
        path: 'receiptRecordCheck',
        component: () =>
          import('@/views/production/paymentManagement/receiptRecord/receiptRecordCheck'),
        meta: {
          title: '查看收票记录',
          activeMenu: '/production/paymentManagement/receiptRecordIndex',
        },
        name: 'ReceiptRecordCheck',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['produce:invoice1:add'],
    children: [
      {
        hidden: true,
        path: 'receiptRecordAdd',
        component: () =>
          import('@/views/production/paymentManagement/receiptRecord/receiptRecordAdd'),
        meta: {
          title: '添加收票记录',
          activeMenu: '/production/paymentManagement/receiptRecordIndex',
        },
        name: 'ReceiptRecordAdd',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['produce:invoice1:edit'],
    children: [
      {
        hidden: true,
        path: 'receiptRecordEdit',
        component: () =>
          import('@/views/production/paymentManagement/receiptRecord/receiptRecordEdit'),
        meta: {
          title: '编辑收票记录',
          activeMenu: '/production/paymentManagement/receiptRecordIndex',
        },
        name: 'ReceiptRecordEdit',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['produce:invoice1:info'],
    children: [
      {
        hidden: true,
        path: 'receiptRecordInfo',
        component: () =>
          import('@/views/production/paymentManagement/receiptRecord/receiptRecordInfo'),
        meta: {
          title: '收票记录信息',
          activeMenu: '/production/paymentManagement/receiptRecordIndex',
        },
        name: 'ReceiptRecordInfo',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['produce:client:list'],
    children: [
      {
        hidden: true,
        path: 'customerManagementCheck',
        component: () => import('@/views/production/customerManagement/customerManagementCheck'),
        meta: { title: '客户列表', activeMenu: '/production/customerManagementIndex' },
        name: 'CustomerManagementCheck',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['produce:client:add'],
    children: [
      {
        hidden: true,
        path: 'customerManagementAdd',
        component: () => import('@/views/production/customerManagement/customerManagementAdd'),
        meta: { title: '添加客户信息', activeMenu: '/production/customerManagementIndex' },
        name: 'CustomerManagementAdd',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['produce:client:edit'],
    children: [
      {
        hidden: true,
        path: 'customerManagementEdit',
        component: () => import('@/views/production/customerManagement/customerManagementEdit'),
        meta: { title: '编辑客户信息', activeMenu: '/production/customerManagementIndex' },
        name: 'CustomerManagementEdit',
      },
    ],
  },

  {
    path: '/production-d',
    component: Layout,
    hidden: true,
    permissions: ['produce:client:query'],
    children: [
      {
        hidden: true,
        path: 'customerManagementInfo',
        component: () => import('@/views/production/customerManagement/customerManagementInfo'),
        meta: { title: '客户信息详情', activeMenu: '/production/customerManagementIndex' },
        name: 'CustomerManagementInfo',
      },
    ],
  },

  //#endregion

  //#region  项目管理

  {
    path: '/project-d',
    component: Layout,
    hidden: true,
    permissions: ['project:project:list'],
    children: [
      {
        hidden: true,
        path: 'projectCheck',
        component: () => import('@/views/project/projectManagement/projectCheck'),
        meta: { title: '项目信息列表', activeMenu: '/project/projectManagementIndex' },
        name: 'ProjectCheck',
      },
    ],
  },

  // {
  //   path: '/project-d',
  //   component: Layout,
  //   hidden: true,
  //   permissions: ['project:project:query'],
  //   children: [
  //     {
  //       hidden: true,
  //       path: 'projectInfo',
  //       component: () => import('@/views/project/projectManagement/projectInfo'),
  //       meta: { title: '项目信息', activeMenu: '/project/projectManagementIndex' },
  //       name: 'ProjectInfo',
  //     },
  //   ],
  // },
  {
    path: '/project-d',
    component: Layout,
    hidden: true,
    permissions: ['project:project:add'],
    children: [
      {
        hidden: true,
        path: 'projectAdd',
        component: () => import('@/views/project/projectManagement/projectAdd'),
        meta: { title: '添加项目信息', activeMenu: '/project/projectManagementIndex' },
        name: 'ProjectAdd',
      },
    ],
  },

  // {
  //   path: '/project-d',
  //   component: Layout,
  //   hidden: true,
  //   permissions: ['project:project:edit'],
  //   children: [
  //     {
  //       hidden: true,
  //       path: 'projectEdit',
  //       component: () => import('@/views/project/projectManagement/projectEdit'),
  //       meta: { title: '编辑项目信息', activeMenu: '/project/projectManagementIndex' },
  //       name: 'ProjectEdit',
  //     },
  //   ],
  // },

  {
    path: '/project-d',
    component: Layout,
    hidden: true,
    permissions: ['project:project:listPerson'],
    children: [
      {
        hidden: true,
        path: 'projectPersonnelCheck',
        component: () => import('@/views/project/projectPersonnel/projectPersonnelCheck'),
        meta: { title: '项目人员列表', activeMenu: '/project/projectPersonnelIndex' },
        name: 'ProjectPersonnelCheck',
      },
    ],
  },

  {
    path: '/project-d',
    component: Layout,
    hidden: true,
    permissions: ['project:project:query'],
    children: [
      {
        hidden: true,
        path: 'projectPersonnelCheck',
        component: () => import('@/views/project/projectPersonnel/projectPersonnelInfo'),
        meta: { title: '项目人员信息', activeMenu: '/project/projectPersonnelIndex' },
        name: 'ProjectPersonnelInfo',
      },
    ],
  },
  {
    path: '/project-d',
    component: Layout,
    hidden: true,
    permissions: ['project:project:editPerson'],
    children: [
      {
        hidden: true,
        path: 'projectPersonnelAdd',
        component: () => import('@/views/project/projectPersonnel/projectPersonnelAdd'),
        meta: { title: '添加项目人员信息', activeMenu: '/project/projectPersonnelIndex' },
        name: 'ProjectPersonnelAdd',
      },
    ],
  },

  // {
  //   path: '/project-d',
  //   component: Layout,
  //   hidden: true,
  //   permissions: ['project:project:editPerson'],
  //   children: [
  //     {
  //       hidden: true,
  //       path: 'projectPersonnelEdit',
  //       component: () => import('@/views/project/projectPersonnel/projectPersonnelEdit'),
  //       meta: { title: '编辑项目人员', activeMenu: '/project/projectPersonnelIndex' },
  //       name: 'ProjectPersonnelEdit',
  //     },
  //   ],
  // },

  {
    path: '/project-d',
    component: Layout,
    hidden: true,
    permissions: ['project:project:listPlan'],
    children: [
      {
        hidden: true,
        path: 'projectPlanCheck',
        component: () => import('@/views/project/projectPlan/projectPlanCheck'),
        meta: { title: '项目计划列表', activeMenu: '/project/projectPlanIndex' },
        name: 'ProjectPlanCheck',
      },
    ],
  },

  // {
  //   path: '/project-d',
  //   component: Layout,
  //   hidden: true,
  //   permissions: ['project:project:editPlan'],
  //   children: [
  //     {
  //       hidden: true,
  //       path: 'projectPlanAdjustment',
  //       component: () => import('@/views/project/projectPlan/projectPlanAdjustment'),
  //       meta: { title: '调整项目计划', activeMenu: '/project/projectPlanIndex' },
  //       name: 'ProjectPlanAdjustment',
  //     },
  //   ],
  // },

  {
    path: '/project-d',
    component: Layout,
    hidden: true,
    permissions: ['project:progress:list'],
    children: [
      {
        hidden: true,
        path: 'projectProcessCheck',
        component: () => import('@/views/project/projectProcess/projectProcessCheck'),
        meta: { title: '项目进度列表', activeMenu: '/project/projectProcessIndex' },
        name: 'ProjectProcessCheck',
      },
    ],
  },

  {
    path: '/project-d',
    component: Layout,
    hidden: true,
    permissions: ['project:progress:edit'],
    children: [
      {
        hidden: true,
        path: 'projectProcessAdd',
        component: () => import('@/views/project/projectProcess/projectProcessAdd'),
        meta: { title: '添加项目进度信息', activeMenu: '/project/projectProcessIndex' },
        name: 'ProjectProcessAdd',
      },
    ],
  },

  // {
  //   path: '/project-d',
  //   component: Layout,
  //   hidden: true,
  //   permissions: ['project:progress:edit'],
  //   children: [
  //     {
  //       hidden: true,
  //       path: 'projectProcessEdit',
  //       component: () => import('@/views/project/projectProcess/projectProcessEdit'),
  //       meta: { title: '编辑项目进度', activeMenu: '/project/projectProcessIndex' },
  //       name: 'ProjectProcessEdit',
  //     },
  //   ],
  // },

  {
    path: '/project-d',
    component: Layout,
    hidden: true,
    permissions: ['project:data:place:list'],
    children: [
      {
        hidden: true,
        path: 'projectDataCheck',
        component: () => import('@/views/project/projectData/projectDataCheck'),
        meta: { title: '项目资料归档列表', activeMenu: '/project/projectDataIndex' },
        name: 'ProjectDataCheck',
      },
    ],
  },

  {
    path: '/project-d',
    component: Layout,
    hidden: true,
    permissions: ['project:data:place:query'],
    children: [
      {
        hidden: true,
        path: 'projectDataInfo',
        component: () => import('@/views/project/projectData/projectDataInfo'),
        meta: { title: '项目资料归档信息', activeMenu: '/project/projectDataIndex' },
        name: 'ProjectDataInfo',
      },
    ],
  },
  {
    path: '/project-d',
    component: Layout,
    hidden: true,
    permissions: ['project:data:place:add'],
    children: [
      {
        hidden: true,
        path: 'projectDataAdd',
        component: () => import('@/views/project/projectData/projectDataAdd'),
        meta: { title: '添加项目资料归档', activeMenu: '/project/projectDataIndex' },
        name: 'ProjectDataAdd',
      },
    ],
  },

  {
    path: '/project-d',
    component: Layout,
    hidden: true,
    permissions: ['project:data:place:edit'],
    children: [
      {
        hidden: true,
        path: 'projectDataEdit',
        component: () => import('@/views/project/projectData/projectDataEdit'),
        meta: { title: '编辑项目资料归档', activeMenu: '/project/projectDataIndex' },
        name: 'ProjectDataEdit',
      },
    ],
  },

  //#endregion

  //#region  资产采购管理

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:propertyBuy:list', 'contract:serviceBuy:list'],
    children: [
      {
        hidden: true,
        path: 'purchaseContractIndex',
        component: () =>
          import('@/views/purchase/purchaseManagement/purchaseContract/purchaseContractIndex'),
        meta: {
          title: '查看采购合同',
          activeMenu: '/purchase/purchaseManagement/purchaseContractIndex',
        },
        name: 'PurchaseContractIndex',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:propertyBuy:add'],
    children: [
      {
        hidden: true,
        path: 'fixedAssetsPCAdd',
        component: () =>
          import('@/views/purchase/purchaseManagement/purchaseContract/fixedAssetsPCAdd'),
        meta: {
          title: '添加固定资产采购合同',
          activeMenu: '/purchase/purchaseManagement/purchaseContractIndex',
        },
        name: 'FixedAssetsPCAdd',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:propertyBuy:edit'],
    children: [
      {
        hidden: true,
        path: 'fixedAssetsPCEdit',
        component: () =>
          import('@/views/purchase/purchaseManagement/purchaseContract/fixedAssetsPCEdit'),
        meta: {
          title: '编辑固定资产采购合同',
          activeMenu: '/purchase/purchaseManagement/purchaseContractIndex',
        },
        name: 'FixedAssetsPCEdit',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:propertyBuy:query'],
    children: [
      {
        hidden: true,
        path: 'fixedAssetsPCInfo',
        component: () =>
          import('@/views/purchase/purchaseManagement/purchaseContract/fixedAssetsPCInfo'),
        meta: {
          title: '固定资产采购合同信息',
          activeMenu: '/purchase/purchaseManagement/purchaseContractIndex',
        },
        name: 'FixedAssetsPCInfo',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:propertyBuy:add'],
    children: [
      {
        hidden: true,
        path: 'servicePCAdd',
        component: () =>
          import('@/views/purchase/purchaseManagement/purchaseContract/servicePCAdd'),
        meta: {
          title: '添加服务采购合同',
          activeMenu: '/purchase/purchaseManagement/purchaseContractIndex',
        },
        name: 'ServicePCAdd',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:propertyBuy:edit'],
    children: [
      {
        hidden: true,
        path: 'servicePCEdit',
        component: () =>
          import('@/views/purchase/purchaseManagement/purchaseContract/servicePCEdit'),
        meta: {
          title: '编辑服务采购合同',
          activeMenu: '/purchase/purchaseManagement/purchaseContractIndex',
        },
        name: 'ServicePCEdit',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:propertyBuy:query'],
    children: [
      {
        hidden: true,
        path: 'servicePCInfo',
        component: () =>
          import('@/views/purchase/purchaseManagement/purchaseContract/servicePCInfo'),
        meta: {
          title: '服务采购合同信息',
          activeMenu: '/purchase/purchaseManagement/purchaseContractIndex',
        },
        name: 'ServicePCInfo',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:supplier:list'],
    children: [
      {
        hidden: true,
        path: 'supplierCheck',
        component: () => import('@/views/purchase/purchaseManagement/supplier/supplierCheck'),
        meta: { title: '查看供应商', activeMenu: '/purchase/purchaseManagement/supplierIndex' },
        name: 'SupplierCheck',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:supplier:add'],
    children: [
      {
        hidden: true,
        path: 'supplierAdd',
        component: () => import('@/views/purchase/purchaseManagement/supplier/supplierAdd'),
        meta: { title: '添加供应商', activeMenu: '/purchase/purchaseManagement/supplierIndex' },
        name: 'SupplierAdd',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:supplier:edit'],
    children: [
      {
        hidden: true,
        path: 'supplierEdit',
        component: () => import('@/views/purchase/purchaseManagement/supplier/supplierEdit'),
        meta: { title: '编辑供应商', activeMenu: '/purchase/purchaseManagement/supplierIndex' },
        name: 'SupplierEdit',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:supplier:query'],
    children: [
      {
        hidden: true,
        path: 'supplierInfo',
        component: () => import('@/views/purchase/purchaseManagement/supplier/supplierInfo'),
        meta: { title: '供应商信息', activeMenu: '/purchase/purchaseManagement/supplierIndex' },
        name: 'SupplierInfo',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:stock0:in:list'],
    children: [
      {
        hidden: true,
        path: 'assetInCheck',
        component: () => import('@/views/purchase/assetManagement/assetIn/assetInCheck'),
        meta: { title: '查看固定资产入库', activeMenu: '/purchase/assetManagement/assetInIndex' },
        name: 'assetInCheck',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:stock1:in:list'],
    children: [
      {
        hidden: true,
        path: 'assetInCheck2',
        component: () => import('@/views/purchase/assetManagement2/assetIn/assetInCheck'),
        meta: { title: '查看消耗品入库', activeMenu: '/purchase/assetManagement2/assetInIndex' },
        name: 'assetInCheck2',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:stock0:in'],
    children: [
      {
        hidden: true,
        path: 'assetInAdd',
        component: () => import('@/views/purchase/assetManagement/assetIn/assetInAdd'),
        meta: { title: '添加固定资产入库', activeMenu: '/purchase/assetManagement/assetInIndex' },
        name: 'AssetInAdd',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:stock1:in'],
    children: [
      {
        hidden: true,
        path: 'assetInAdd2',
        component: () => import('@/views/purchase/assetManagement2/assetIn/assetInAdd'),
        meta: { title: '添加消耗品入库', activeMenu: '/purchase/assetManagement2/assetInIndex' },
        name: 'AssetInAdd2',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:stock0:in:edit'],
    children: [
      {
        hidden: true,
        path: 'assetInEdit',
        component: () => import('@/views/purchase/assetManagement/assetIn/assetInEdit'),
        meta: { title: '编辑固定资产入库', activeMenu: '/purchase/assetManagement/assetInIndex' },
        name: 'AssetInEdit',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:stock1:in:edit'],
    children: [
      {
        hidden: true,
        path: 'assetInEdit2',
        component: () => import('@/views/purchase/assetManagement2/assetIn/assetInEdit'),
        meta: { title: '编辑消耗品入库', activeMenu: '/purchase/assetManagement2/assetInIndex' },
        name: 'AssetInEdit2',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:stock0:in:info'],
    children: [
      {
        hidden: true,
        path: 'assetInInfo',
        component: () => import('@/views/purchase/assetManagement/assetIn/assetInInfo'),
        meta: { title: '固定资产入库信息', activeMenu: '/purchase/assetManagement/assetInIndex' },
        name: 'AssetInInfo',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:stock1:in:info'],
    children: [
      {
        hidden: true,
        path: 'assetInInfo2',
        component: () => import('@/views/purchase/assetManagement2/assetIn/assetInInfo'),
        meta: { title: '消耗品入库信息', activeMenu: '/purchase/assetManagement2/assetInIndex' },
        name: 'AssetInInfo2',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:stock0:out:list'],
    children: [
      {
        hidden: true,
        path: 'assetOutCheck',
        component: () => import('@/views/purchase/assetManagement/assetOut/assetOutCheck'),
        meta: { title: '查看资产报废', activeMenu: '/purchase/assetManagement/assetOutIndex' },
        name: 'assetOutCheck',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:stock0:out'],
    children: [
      {
        hidden: true,
        path: 'assetOutAdd',
        component: () => import('@/views/purchase/assetManagement/assetOut/assetOutAdd'),
        meta: { title: '添加资产报废', activeMenu: '/purchase/assetManagement/assetOutIndex' },
        name: 'AssetOutAdd',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:stock0:out:list'],
    children: [
      {
        hidden: true,
        path: 'assetOutEdit',
        component: () => import('@/views/purchase/assetManagement/assetOut/assetOutEdit'),
        meta: { title: '编辑资产报废', activeMenu: '/purchase/assetManagement/assetOutIndex' },
        name: 'AssetOutEdit',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:stock0:out:info'],
    children: [
      {
        hidden: true,
        path: 'assetOutInfo',
        component: () => import('@/views/purchase/assetManagement/assetOut/assetOutInfo'),
        meta: { title: '资产报废信息', activeMenu: '/purchase/assetManagement/assetOutIndex' },
        name: 'AssetOutInfo',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:stock0:use:list'],
    children: [
      {
        hidden: true,
        path: 'assetAcquisitionCheck',
        component: () =>
          import('@/views/purchase/assetManagement/assetAcquisition/assetAcquisitionCheck'),
        meta: {
          title: '查看固定资产领用',
          activeMenu: '/purchase/assetManagement/assetAcquisitionIndex',
        },
        name: 'AssetAcquisitionCheck',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:stock1:use:list'],
    children: [
      {
        hidden: true,
        path: 'assetAcquisitionCheck2',
        component: () =>
          import('@/views/purchase/assetManagement2/assetAcquisition/assetAcquisitionCheck'),
        meta: {
          title: '查看消耗品领用',
          activeMenu: '/purchase/assetManagement2/assetAcquisitionIndex',
        },
        name: 'AssetAcquisitionCheck2',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:stock0:use'],
    children: [
      {
        hidden: true,
        path: 'assetAcquisitionAdd',
        component: () =>
          import('@/views/purchase/assetManagement/assetAcquisition/assetAcquisitionAdd'),
        meta: {
          title: '添加固定资产领用',
          activeMenu: '/purchase/assetManagement/assetAcquisitionIndex',
        },
        name: 'AssetAcquisitionAdd',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:stock1:use'],
    children: [
      {
        hidden: true,
        path: 'assetAcquisitionAdd2',
        component: () =>
          import('@/views/purchase/assetManagement2/assetAcquisition/assetAcquisitionAdd'),
        meta: {
          title: '添加消耗品领用',
          activeMenu: '/purchase/assetManagement2/assetAcquisitionIndex',
        },
        name: 'AssetAcquisitionAdd2',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:stock0:use:edit'],
    children: [
      {
        hidden: true,
        path: 'assetAcquisitionEdit',
        component: () =>
          import('@/views/purchase/assetManagement/assetAcquisition/assetAcquisitionEdit'),
        meta: {
          title: '编辑固定资产领用',
          activeMenu: '/purchase/assetManagement/assetAcquisitionIndex',
        },
        name: 'AssetAcquisitionEdit',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:stock1:use:edit'],
    children: [
      {
        hidden: true,
        path: 'assetAcquisitionEdit2',
        component: () =>
          import('@/views/purchase/assetManagement2/assetAcquisition/assetAcquisitionEdit'),
        meta: {
          title: '编辑消耗品领用',
          activeMenu: '/purchase/assetManagement2/assetAcquisitionIndex',
        },
        name: 'AssetAcquisitionEdit2',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:stock0:use:info'],
    children: [
      {
        hidden: true,
        path: 'assetAcquisitionInfo',
        component: () =>
          import('@/views/purchase/assetManagement/assetAcquisition/assetAcquisitionInfo'),
        meta: {
          title: '固定资产领用详情',
          activeMenu: '/purchase/assetManagement/assetAcquisitionIndex',
        },
        name: 'AssetAcquisitionInfo',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:stock1:use:info'],
    children: [
      {
        hidden: true,
        path: 'assetAcquisitionInfo2',
        component: () =>
          import('@/views/purchase/assetManagement2/assetAcquisition/assetAcquisitionInfo'),
        meta: {
          title: '消耗品领用详情',
          activeMenu: '/purchase/assetManagement2/assetAcquisitionIndex',
        },
        name: 'AssetAcquisitionInfo2',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:stock0:pendingApproval', 'property:stock1:pendingApproval'],
    children: [
      {
        hidden: true,
        path: 'approvalHandleCheck',
        component: () =>
          import('@/views/purchase/assetManagement/approvalHandle/approvalHandleCheck'),
        meta: {
          title: '资产审批处理',
          activeMenu: '/purchase/assetManagement/approvalHandleIndex',
        },
        name: 'ApprovalHandleCheck',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:stock3:info'],
    children: [
      {
        hidden: true,
        path: 'outboundHandle',
        component: () => import('@/views/purchase/assetManagement/approvalHandle/outboundHandle'),
        meta: {
          title: '处理出库审批',
          activeMenu: '/purchase/assetManagement/approvalHandleIndex',
        },
        name: 'OutboundHandle',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:stock3:info'],
    children: [
      {
        hidden: true,
        path: 'receiveHandle',
        component: () => import('@/views/purchase/assetManagement/approvalHandle/receiveHandle'),
        meta: {
          title: '处理领用审批',
          activeMenu: '/purchase/assetManagement/approvalHandleIndex',
        },
        name: 'ReceiveHandle',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:stock3:info'],
    children: [
      {
        hidden: true,
        path: 'inboundHandle',
        component: () => import('@/views/purchase/assetManagement/approvalHandle/inboundHandle'),
        meta: {
          title: '处理入库审批',
          activeMenu: '/purchase/assetManagement/approvalHandleIndex',
        },
        name: 'InboundHandle',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:stock0:stock:info'],
    children: [
      {
        hidden: true,
        path: 'assetQueryInfo',
        component: () => import('@/views/purchase/assetManagement/assetQuery/assetQueryInfo'),
        meta: { title: '资产库存详情', activeMenu: '/purchase/assetManagement/assetQueryIndex' },
        name: 'AssetQueryInfo',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:material:add'],
    children: [
      {
        hidden: true,
        path: 'assetCodeAdd',
        component: () => import('@/views/purchase/assetCode/assetCodeAdd'),
        meta: { title: '添加资产编码', activeMenu: '/purchase/assetCodeIndex' },
        name: 'AssetCodeAdd',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:material:edit'],
    children: [
      {
        hidden: true,
        path: 'assetCodeEdit',
        component: () => import('@/views/purchase/assetCode/assetCodeEdit'),
        meta: { title: '编辑资产编码', activeMenu: '/purchase/assetCodeIndex' },
        name: 'AssetCodeEdit',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:store:add'],
    children: [
      {
        hidden: true,
        path: 'warehouseMgAdd',
        component: () => import('@/views/purchase/assetManagement/warehouseMg/warehouseMgAdd'),
        meta: { title: '添加仓库', activeMenu: '/purchase/assetManagement/warehouseMgIndex' },
        name: 'WarehouseMgAdd',
      },
    ],
  },

  {
    path: '/purchase-d',
    component: Layout,
    hidden: true,
    permissions: ['property:store:edit'],
    children: [
      {
        hidden: true,
        path: 'warehouseMgEdit',
        component: () => import('@/views/purchase/assetManagement/warehouseMg/warehouseMgEdit'),
        meta: { title: '编辑仓库', activeMenu: '/purchase/assetManagement/warehouseMgIndex' },
        name: 'WarehouseMgEdit',
      },
    ],
  },

  //#endregion

  //#region  车辆管理

  {
    path: '/car-d',
    component: Layout,
    hidden: true,
    permissions: ['car:applyCar:list'],
    children: [
      {
        hidden: true,
        path: 'carRequestCheck',
        component: () => import('@/views/car/carRequest/carRequestCheck'),
        meta: { title: '查看用车申请', activeMenu: '/car/carRequestIndex' },
        name: 'CarRequestCheck',
      },
    ],
  },

  {
    path: '/car-d',
    component: Layout,
    hidden: true,
    permissions: ['car:car:applyCar'],
    children: [
      {
        hidden: true,
        path: 'carRequestAdd',
        component: () => import('@/views/car/carRequest/carRequestAdd'),
        meta: { title: '添加用车申请', activeMenu: '/car/carRequestIndex' },
        name: 'CarRequestAdd',
      },
    ],
  },

  // {
  //   path: '/car-d',
  //   component: Layout,
  //   hidden: true,
  //   // permissions: ['certificate:cert:list'],按钮权限
  //   children: [
  //     {
  //       hidden: true,
  //       path: 'carRequestReback',
  //       component: () => import('@/views/car/carRequest/carRequestReback'),
  //       meta: { title: '用车归还', activeMenu: '/car/carRequestIndex' },
  //       name: 'CarRequestReback',
  //     },
  //   ],
  // },

  // {
  //   path: '/car-d',
  //   component: Layout,
  //   hidden: true,
  //   // permissions: ['certificate:cert:list'],按钮权限
  //   children: [
  //     {
  //       hidden: true,
  //       path: 'carRequestEdit',
  //       component: () => import('@/views/car/carRequest/carRequestEdit'),
  //       meta: { title: '编辑用车申请', activeMenu: '/car/carRequestIndex' },
  //       name: 'CarRequestEdit',
  //     },
  //   ],
  // },

  {
    path: '/car-d',
    component: Layout,
    hidden: true,
    permissions: ['car:applyCar:query'],
    children: [
      {
        hidden: true,
        path: 'carRequestInfo',
        component: () => import('@/views/car/carRequest/carRequestInfo'),
        meta: { title: '用车申请信息', activeMenu: '/car/carRequestIndex' },
        name: 'CarRequestInfo',
      },
    ],
  },

  {
    path: '/car-d',
    component: Layout,
    hidden: true,
    permissions: ['car:outbound:list'],
    children: [
      {
        hidden: true,
        path: 'carOutRequestCheck',
        component: () => import('@/views/car/carOutRequest/carOutRequestCheck'),
        meta: { title: '查看车辆出库申请', activeMenu: '/car/carOutRequestIndex' },
        name: 'CarOutRequestCheck',
      },
    ],
  },

  // {
  //   path: '/car-d',
  //   component: Layout,
  //   hidden: true,
  //   permissions: [''],
  //   children: [
  //     {
  //       hidden: true,
  //       path: 'carOutRequestAdd',
  //       component: () => import('@/views/car/carOutRequest/carOutRequestAdd'),
  //       meta: { title: '添加车辆出库申请', activeMenu: '/car/carOutRequestIndex' },
  //       name: 'CarOutRequestAdd',
  //     },
  //   ],
  // },

  // {
  //   path: '/car-d',
  //   component: Layout,
  //   hidden: true,
  //   // permissions: ['certificate:cert:list'],按钮权限
  //   children: [
  //     {
  //       hidden: true,
  //       path: 'carOutRequestEdit',
  //       component: () => import('@/views/car/carOutRequest/carOutRequestEdit'),
  //       meta: { title: '编辑车辆出库申请', activeMenu: '/car/carOutRequestIndex' },
  //       name: 'CarOutRequestEdit',
  //     },
  //   ],
  // },

  {
    path: '/car-d',
    component: Layout,
    hidden: true,
    permissions: ['car:outbound:query'],
    children: [
      {
        hidden: true,
        path: 'carOutRequestInfo',
        component: () => import('@/views/car/carOutRequest/carOutRequestInfo'),
        meta: { title: '车辆出库申请信息', activeMenu: '/car/carOutRequestIndex' },
        name: 'CarOutRequestInfo',
      },
    ],
  },

  {
    path: '/car-d',
    component: Layout,
    hidden: true,
    permissions: ['car:car:list'],
    children: [
      {
        hidden: true,
        path: 'carManagementCheck',
        component: () => import('@/views/car/carManagement/carManagementCheck'),
        meta: { title: '查看车辆', activeMenu: '/car/carManagementIndex' },
        name: 'CarManagementCheck',
      },
    ],
  },

  {
    path: '/car-d',
    component: Layout,
    hidden: true,
    permissions: ['car:car:add'],
    children: [
      {
        hidden: true,
        path: 'carManagementAdd',
        component: () => import('@/views/car/carManagement/carManagementAdd'),
        meta: { title: '添加车辆', activeMenu: '/car/carManagementIndex' },
        name: 'CarManagementAdd',
      },
    ],
  },

  {
    path: '/car-d',
    component: Layout,
    hidden: true,
    permissions: ['car:car:edit'],
    children: [
      {
        hidden: true,
        path: 'carManagementEdit',
        component: () => import('@/views/car/carManagement/carManagementEdit'),
        meta: { title: '编辑车辆', activeMenu: '/car/carManagementIndex' },
        name: 'CarManagementEdit',
      },
    ],
  },

  {
    path: '/car-d',
    component: Layout,
    hidden: true,
    permissions: ['car:car:query'],
    children: [
      {
        hidden: true,
        path: 'carManagementInfo',
        component: () => import('@/views/car/carManagement/carManagementInfo'),
        meta: { title: '车辆管理信息', activeMenu: '/car/carManagementIndex' },
        name: 'CarManagementInfo',
      },
    ],
  },

  {
    path: '/car-d',
    component: Layout,
    hidden: true,
    permissions: ['car:car:pendingApproval0', 'car:car:pendingApproval1'],
    children: [
      {
        hidden: true,
        path: 'carApprovalCheck',
        component: () => import('@/views/car/carApproval/carApprovalCheck'),
        meta: { title: '查看车辆审批', activeMenu: '/car/carApprovalIndex' },
        name: 'CarApprovalCheck',
      },
    ],
  },

  // {
  //   path: '/car-d',
  //   component: Layout,
  //   hidden: true,
  //   permissions: ['certificate:cert:list'],
  //   children: [
  //     {
  //       hidden: true,
  //       path: 'carReceiveHandle',
  //       component: () => import('@/views/car/carApproval/carReceiveHandle'),
  //       meta: { title: '车辆领用审批', activeMenu: '/car/carApprovalIndex' },
  //       name: 'CarReceiveHandle',
  //     },
  //   ],
  // },

  // {
  //   path: '/car-d',
  //   component: Layout,
  //   hidden: true,
  //   permissions: ['certificate:cert:list'],
  //   children: [
  //     {
  //       hidden: true,
  //       path: 'carReceiveInfo',
  //       component: () => import('@/views/car/carApproval/carReceiveInfo'),
  //       meta: { title: '车辆领用信息', activeMenu: '/car/carApprovalIndex' },
  //       name: 'CarReceiveInfo',
  //     },
  //   ],
  // },

  // {
  //   path: '/car-d',
  //   component: Layout,
  //   hidden: true,
  //   permissions: ['certificate:cert:list'],
  //   children: [
  //     {
  //       hidden: true,
  //       path: 'carOutboundHandle',
  //       component: () => import('@/views/car/carApproval/carOutboundHandle'),
  //       meta: { title: '车辆出库审批', activeMenu: '/car/carApprovalIndex' },
  //       name: 'CarOutboundHandle',
  //     },
  //   ],
  // },

  // {
  //   path: '/car-d',
  //   component: Layout,
  //   hidden: true,
  //   permissions: ['certificate:cert:list'],
  //   children: [
  //     {
  //       hidden: true,
  //       path: 'carOutboundInfo',
  //       component: () => import('@/views/car/carApproval/carOutboundInfo'),
  //       meta: { title: '车辆出库信息', activeMenu: '/car/carApprovalIndex' },
  //       name: 'CarOutboundInfo',
  //     },
  //   ],
  // },

  //#endregion

  //#region  人员管理

  {
    path: '/person-d',
    component: Layout,
    hidden: true,
    permissions: ['person:user:list'],
    children: [
      {
        path: 'personnelInfoCheck',
        component: () => import('@/views/person/personInfo/personnelInfoCheck'),
        name: 'PersonnelInfoCheck',
        meta: { title: '查看人员', activeMenu: '/person/personInfoIndex' },
      },
    ],
  },
  {
    path: '/person-d',
    component: Layout,
    hidden: true,
    permissions: ['person:user:add'],
    children: [
      {
        path: 'personnelInfoAdd',
        component: () => import('@/views/person/personInfo/personnelInfoAdd'),
        name: 'PersonnelInfoAdd',
        meta: { title: '添加人员信息', activeMenu: '/person/personInfoIndex' },
      },
    ],
  },

  // {
  //   path: '/person-d',
  //   component: Layout,
  //   hidden: true,
  //   permissions: ['person:user:edit'],
  //   children: [
  //     {
  //       path: 'personnelInfoEdit',
  //       component: () => import('@/views/person/personInfo/personnelInfoEdit'),
  //       name: 'PersonnelInfoAdd',
  //       meta: { title: '编辑人员信息', activeMenu: '/person/personInfoIndex' },
  //     },
  //   ],
  // },

  {
    path: '/person-d',
    component: Layout,
    hidden: true,
    permissions: ['person:user:query'],
    children: [
      {
        path: 'personnelInfo',
        component: () => import('@/views/person/personInfo/personnelInfo'),
        name: 'PersonnelInfo',
        meta: { title: '人员信息', activeMenu: '/person/personInfoIndex' },
      },
    ],
  },

  {
    path: '/person-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:labor:list'],
    children: [
      {
        hidden: true,
        path: 'laborContractIndex',
        component: () => import('@/views/person/personContract/laborContractIndex'),
        meta: { title: '查看劳动合同', activeMenu: '/person/personContractIndex' },
        name: 'LaborContractIndex',
      },
    ],
  },

  {
    path: '/person-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:labor:add'],
    children: [
      {
        hidden: true,
        path: 'laborContractAdd',
        component: () => import('@/views/person/personContract/laborContractAdd'),
        meta: { title: '添加劳动合同', activeMenu: '/person/personContractIndex' },
        name: 'LaborContractAdd',
      },
    ],
  },

  {
    path: '/person-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:labor:edit'],
    children: [
      {
        hidden: true,
        path: 'laborContractEdit',
        component: () => import('@/views/person/personContract/laborContractEdit'),
        meta: { title: '编辑劳动合同', activeMenu: '/person/personContractIndex' },
        name: 'LaborContractEdit',
      },
    ],
  },

  {
    path: '/person-d',
    component: Layout,
    hidden: true,
    permissions: ['contract:labor:query'],
    children: [
      {
        hidden: true,
        path: 'laborContractInfo',
        component: () => import('@/views/person/personContract/laborContractInfo'),
        meta: { title: '劳动合同信息', activeMenu: '/person/personContractIndex' },
        name: 'LaborContractInfo',
      },
    ],
  },

  {
    path: '/person-d',
    component: Layout,
    hidden: true,
    permissions: ['certificate:cert1:list'],
    children: [
      {
        path: 'certificatesCheck',
        component: () => import('@/views/person/personCertificate/certificatesCheck'),
        name: 'CertificatesCheck',
        meta: { title: '查看证书', activeMenu: '/person/personCertificateIndex' },
      },
    ],
  },
  {
    path: '/person-d',
    component: Layout,
    hidden: true,
    permissions: ['certificate:cert1:add'],
    children: [
      {
        path: 'certificatesAdd',
        component: () => import('@/views/person/personCertificate/certificatesAdd'),
        name: 'CertificatesAdd',
        meta: { title: '添加证书', activeMenu: '/person/personCertificateIndex' },
      },
    ],
  },
  {
    path: '/person-d',
    component: Layout,
    hidden: true,
    permissions: ['certificate:cert1:edit'],
    children: [
      {
        path: 'certificatesEdit',
        component: () => import('@/views/person/personCertificate/certificatesEdit'),
        name: 'CertificatesEdit',
        meta: { title: '编辑证书', activeMenu: '/person/personCertificateIndex' },
      },
    ],
  },
  {
    path: '/person-d',
    component: Layout,
    hidden: true,
    permissions: ['certificate:cert1:query'],
    children: [
      {
        path: 'certificatesInfo',
        component: () => import('@/views/person/personCertificate/certificatesInfo'),
        name: 'CertificatesInfo',
        meta: { title: '证书信息', activeMenu: '/person/personCertificateIndex' },
      },
    ],
  },

  {
    path: '/person-d',
    component: Layout,
    hidden: true,
    permissions: ['person:work:list'],
    children: [
      {
        hidden: true,
        path: 'personResumeCheck',
        component: () => import('@/views/person/personResume/personResumeCheck'),
        meta: { title: '查看履历信息', activeMenu: '/person/personResumeIndex' },
        name: 'PersonResumeCheck',
      },
    ],
  },

  {
    path: '/person-d',
    component: Layout,
    hidden: true,
    permissions: ['person:work:add'],
    children: [
      {
        hidden: true,
        path: 'personResumeAdd',
        component: () => import('@/views/person/personResume/personResumeAdd'),
        meta: { title: '添加履历信息', activeMenu: '/person/personResumeIndex' },
        name: 'PersonResumeAdd',
      },
    ],
  },

  {
    path: '/person-d',
    component: Layout,
    hidden: true,
    permissions: ['person:work:edit'],
    children: [
      {
        hidden: true,
        path: 'personResumeEdit',
        component: () => import('@/views/person/personResume/personResumeEdit'),
        meta: { title: '编辑履历信息', activeMenu: '/person/personResumeIndex' },
        name: 'PersonResumeEdit',
      },
    ],
  },

  {
    path: '/person-d',
    component: Layout,
    hidden: true,
    permissions: ['person:work:query'],
    children: [
      {
        hidden: true,
        path: 'personResumeInfo',
        component: () => import('@/views/person/personResume/personResumeInfo'),
        meta: { title: '人员履历信息', activeMenu: '/person/personResumeIndex' },
        name: 'PersonResumeInfo',
      },
    ],
  },

  {
    path: '/person-d',
    component: Layout,
    hidden: true,
    permissions: ['person:performance:list'],
    children: [
      {
        hidden: true,
        path: 'personAchievementCheck',
        component: () => import('@/views/person/personAchievement/personAchievementCheck'),
        meta: { title: '查看人员业绩', activeMenu: '/person/personAchievementIndex' },
        name: 'PersonAchievementCheck',
      },
    ],
  },

  {
    path: '/person-d',
    component: Layout,
    hidden: true,
    permissions: ['person:performance:add'],
    children: [
      {
        hidden: true,
        path: 'personAchievementAdd',
        component: () => import('@/views/person/personAchievement/personAchievementAdd'),
        meta: { title: '添加人员业绩', activeMenu: '/person/personAchievementIndex' },
        name: 'PersonAchievementAdd',
      },
    ],
  },

  {
    path: '/person-d',
    component: Layout,
    hidden: true,
    permissions: ['person:performance:edit'],
    children: [
      {
        hidden: true,
        path: 'personAchievementEdit',
        component: () => import('@/views/person/personAchievement/personAchievementEdit'),
        meta: { title: '编辑人员业绩', activeMenu: '/person/personAchievementIndex' },
        name: 'PersonAchievementEdit',
      },
    ],
  },

  {
    path: '/person-d',
    component: Layout,
    hidden: true,
    permissions: ['person:performance:list'],
    children: [
      {
        hidden: true,
        path: 'personAchievementInfo',
        component: () => import('@/views/person/personAchievement/personAchievementInfo'),
        meta: { title: '人员业绩信息', activeMenu: '/person/personAchievementIndex' },
        name: 'PersonAchievementInfo',
      },
    ],
  },

  {
    path: '/person-d',
    component: Layout,
    hidden: true,
    permissions: ['person:apply:listOut'],
    children: [
      {
        hidden: true,
        path: 'personOutCheck',
        component: () => import('@/views/person/personOut/personOutCheck'),
        meta: { title: '查看人员外出', activeMenu: '/person/personOutIndex' },
        name: 'PersonOutCheck',
      },
    ],
  },

  {
    path: '/person-d',
    component: Layout,
    hidden: true,
    permissions: ['person:apply:add0'],
    children: [
      {
        hidden: true,
        path: 'personOutAdd',
        component: () => import('@/views/person/personOut/personOutAdd'),
        meta: { title: '人员外出申请', activeMenu: '/person/personOutIndex' },
        name: 'PersonOutAdd',
      },
    ],
  },

  {
    path: '/person-d',
    component: Layout,
    hidden: true,
    permissions: ['person:apply:query0'],
    children: [
      {
        hidden: true,
        path: 'personOutInfo',
        component: () => import('@/views/person/personOut/personOutInfo'),
        meta: { title: '人员外出信息', activeMenu: '/person/personOutIndex' },
        name: 'PersonOutInfo',
      },
    ],
  },

  {
    path: '/person-d',
    component: Layout,
    hidden: true,
    permissions: ['person:apply:listAskForLeave'],
    children: [
      {
        hidden: true,
        path: 'personLeaveCheck',
        component: () => import('@/views/person/personLeave/personLeaveCheck'),
        meta: { title: '查看人员请假', activeMenu: '/person/personLeaveIndex' },
        name: 'PersonLeaveCheck',
      },
    ],
  },

  {
    path: '/person-d',
    component: Layout,
    hidden: true,
    permissions: ['person:apply:add1'],
    children: [
      {
        hidden: true,
        path: 'personLeaveAdd',
        component: () => import('@/views/person/personLeave/personLeaveAdd'),
        meta: { title: '人员请假申请', activeMenu: '/person/personLeaveIndex' },
        name: 'PersonLeaveAdd',
      },
    ],
  },

  {
    path: '/person-d',
    component: Layout,
    hidden: true,
    permissions: ['person:apply:query1'],
    children: [
      {
        hidden: true,
        path: 'personLeaveInfo',
        component: () => import('@/views/person/personLeave/personLeaveInfo'),
        meta: { title: '人员请假信息', activeMenu: '/person/personLeaveIndex' },
        name: 'PersonLeaveInfo',
      },
    ],
  },

  {
    path: '/person-d',
    component: Layout,
    hidden: true,
    permissions: ['person:apply:listApprove0', 'person:apply:listApprove1'],
    children: [
      {
        hidden: true,
        path: 'personApprovalCheck',
        component: () => import('@/views/person/personApproval/personApprovalCheck'),
        meta: { title: '人员审批', activeMenu: '/person/personApprovalIndex' },
        name: 'PersonApprovalCheck',
      },
    ],
  },

  // {
  //   path: '/person-d',
  //   component: Layout,
  //   hidden: true,
  //   permissions: ['certificate:cert:list'],
  //   children: [
  //     {
  //       hidden: true,
  //       path: 'personOutHandle',
  //       component: () => import('@/views/person/personApproval/personOutHandle'),
  //       meta: { title: '人员外出审批处理', activeMenu: '/person/personApprovalIndex' },
  //       name: 'PersonOutHandle',
  //     },
  //   ],
  // },

  // {
  //   path: '/person-d',
  //   component: Layout,
  //   hidden: true,
  //   permissions: ['certificate:cert:list'],
  //   children: [
  //     {
  //       hidden: true,
  //       path: 'personLeaveHandle',
  //       component: () => import('@/views/person/personApproval/personLeaveHandle'),
  //       meta: { title: '人员请假审批处理', activeMenu: '/person/personApprovalIndex' },
  //       name: 'PersonLeaveHandle',
  //     },
  //   ],
  // },

  //#endregion
];

// 防止连续点击多次路由报错
let routerPush = Router.prototype.push;
let routerReplace = Router.prototype.replace;
// push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((err) => err);
};
// replace
Router.prototype.replace = function push(location) {
  return routerReplace.call(this, location).catch((err) => err);
};

export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
});
