import request from '@/utils/request';
import { tansParams } from '@/utils/guangwei';
import { exportFile } from '@/api/data/file';
//#region   工作台门户统计相关接口

//待执行事务数量
export function pendingMatterNum() {
  return request({
    url: '/system/statistic/index/pendingMatterNum',
    method: 'get',
  });
}

//通知公告
export function notice() {
  return request({
    url: '/system/statistic/index/notice',
    method: 'get',
  });
}

//客户签订合同金额TOP5
export function contAmountTop() {
  return request({
    url: '/system/statistic/index/contAmountTop',
    method: 'get',
  });
}

//合同管理
export function contInfo() {
  return request({
    url: '/system/statistic/index/contInfo',
    method: 'get',
  });
}

//合同概况
export function contInfoEChart(query) {
  return request({
    url: '/system/statistic/index/contInfoEChart/' + query,
    method: 'get',
  });
}

//项目概况
export function prjInfoEChart() {
  return request({
    url: '/system/statistic/index/prjInfoEChart/2024',
    method: 'get',
  });
}

//我的申请
export function myApplyEChart() {
  return request({
    url: '/system/statistic/index/myApply',
    method: 'get',
  });
}

//审批处理
export function approveEChart() {
  return request({
    url: '/system/statistic/index/approve',
    method: 'get',
  });
}

//我的项目
export function myProjectEChart() {
  return request({
    //url: '/system/statistic/index/myProject',
    url: '/system/statistic/index/change0/myProjectStatistic',
    method: 'get',
  });
}

//合同统计
export function contStatistic(query) {
  return request({
    url: '/system/statistic/index/change0/contStatistic',
    method: 'get',
    params: query,
  });
}

//投标统计
export function bidStatistic(query) {
  return request({
    url: '/system/statistic/index/change0/bidStatistic',
    method: 'get',
    params: query,
  });
}

//收付款统计
export function paymentStatistic(query) {
  return request({
    url: '/system/statistic/index/change0/paymentStatistic',
    method: 'get',
    params: query,
  });
}

//待处理事项
export function handleNotice(query) {
  return request({
    url: '/system/statistic/index/change0/handleNotice',
    method: 'get',
    params: query,
  });
}

//标记待处理事项为不再提醒
export function handleNoticeStop(id) {
  return request({
    url: '/system/statistic/index/change0/handleNotice/' + id,
    method: 'put',
  });
}

//项目进展
export function projectStatistic() {
  return request({
    url: '/system/statistic/index/change0/projectStatistic',
    method: 'get',
  });
}

//审批处理
export function applyStatistic() {
  return request({
    url: '/system/statistic/index/change0/applyStatistic',
    method: 'get',
  });
}
//#endregion

//#region   证书管理门户统计相关接口

//证书信息
export function certInfo() {
  return request({
    url: '/certificate/statistic/certInfo',
    method: 'get',
  });
}

//证书有效期低于一年
export function certValidity() {
  return request({
    url: '/certificate/statistic/certValidity',
    method: 'get',
  });
}

//证书使用情况统计
export function certUseInfo(query) {
  return request({
    url: '/certificate/statistic/certUseInfo',
    method: 'get',
    params: query,
  });
}

//导出证书  导出公司证书
export function certExport(query) {
  //   return request({
  //     url: '/certificate/cert/export',
  //     method: 'get',
  //     params: query,
  //   });
  exportFile('/certificate/cert/export/0', query);
  // let url =
  //   process.env.VUE_APP_BASE_API +
  //   '/certificate/cert/export' +
  //   (query ? '?' + tansParams(query) : null);
  // let newurl = url.substr(0, url.length - 1);
  // window.location.href = newurl;
}

//导出个人证书
export function certExport1(query) {
  exportFile('/certificate/cert/export/1', query);
}

//证书统计
export function companyCertStatistic(query) {
  return request({
    url: '/certificate/statistic/change0/companyCertStatistic',
    method: 'get',
    params: query,
  });
}

//#endregion

//#region   合同管理门户统计相关接口

//合同信息
export function prjcertInfo() {
  return request({
    url: '/contract/statistic/info',
    method: 'get',
  });
}

//项目合同负责人统计TOP
export function prjContLeader(query) {
  return request({
    url: '/contract/statistic/prjContLeader',
    method: 'get',
    params: query,
  });
}

//项目合同统计
export function prjCont(query) {
  return request({
    url: '/contract/statistic/prjCont',
    method: 'get',
    params: query,
  });
}

//项目合同金额统计
export function prjContAmount(query) {
  return request({
    url: '/contract/statistic/prjContAmount',
    method: 'get',
    params: query,
  });
}

//项目合同收款金额比例统计
export function prjContPayment(query) {
  return request({
    url: '/contract/statistic/prjContPayment',
    method: 'get',
    params: query,
  });
}

//合同类型统计
export function contTypeStatistic(query) {
  return request({
    url: '/contract/statistic/contTypeStatistic',
    method: 'get',
    params: query,
  });
}
//#endregion

//#region   人员信息门户统计相关接口

//人员信息
export function info() {
  return request({
    url: '/person/statistic/info',
    method: 'get',
  });
}

//人员外出/请假统计
export function infoOut(query) {
  return request({
    url: '/person/statistic/info/out',
    method: 'get',
    params: query,
  });
}

//人员外出情况统计统计
export function infoOuto(query) {
  return request({
    url: '/person/statistic/info/out/0',
    method: 'get',
    params: query,
  });
}

//人员请假情况统计统计
export function infoOutt(query) {
  return request({
    url: '/person/statistic/info/out/1',
    method: 'get',
    params: query,
  });
}

//我的外出申请
export function infomyApplyo() {
  return request({
    url: '/person/statistic/info/myApply/0',
    method: 'get',
  });
}
//外出审批处理
export function infoApplyo() {
  return request({
    url: '/person/statistic/info/approve/0',
    method: 'get',
  });
}

//我的请假申请
export function infomyApplyt() {
  return request({
    url: '/person/statistic/info/myApply/1',
    method: 'get',
  });
}

//请假审批处理
export function infoApplyt() {
  return request({
    url: '/person/statistic/info/approve/1',
    method: 'get',
  });
}

//人员年龄统计
export function infoAge(query) {
  return request({
    url: '/person/statistic/info/age',
    method: 'get',
    params: query,
  });
}

//人员学历统计
export function infoEdu(query) {
  return request({
    url: '/person/statistic/info/edu',
    method: 'get',
    params: query,
  });
}

//人员性别统计
export function infoSex(query) {
  return request({
    url: '/person/statistic/info/sex',
    method: 'get',
    params: query,
  });
}

//人员总数统计
export function infoCount(query) {
  return request({
    url: '/person/statistic/info/count',
    method: 'get',
    params: query,
  });
}

//#endregion

//#region   人员管理门户统计相关接口

//人员管理 -人员信息
export function infomanager() {
  return request({
    url: '/person/statistic/manager',
    method: 'get',
  });
}

//人员数量统计
export function personuserNum(query) {
  return request({
    url: '/person/statistic/manager/userNum',
    method: 'get',
    params: query,
  });
}

//人员外出申请统计TOP
export function personOuto(query) {
  return request({
    url: '/person/statistic/manager/out/0',
    method: 'get',
    params: query,
  });
}

//人员请假申请统计TOP
export function personOutt(query) {
  return request({
    url: '/person/statistic/manager/out/1',
    method: 'get',
    params: query,
  });
}

//#endregion

//#region   车辆管理门户统计相关接口

//用车申请门户-用车信息
export function carUseInfo() {
  return request({
    url: '/car/statistic/use/info',
    method: 'get',
  });
}

//用车申请门户-部门人员用车TOP
export function personUseCarTop(query) {
  return request({
    url: '/car/statistic/use/personUseCarTop',
    method: 'get',
    params: query,
  });
}

//用车申请门户-用车时长统计
export function timeUseCarTop(query) {
  return request({
    url: '/car/statistic/use/timeUseCarTop',
    method: 'get',
    params: query,
  });
}

//用车申请门户-到达地点分布
export function distributionUseCar(query) {
  return request({
    url: '/car/statistic/use/distributionUseCar',
    method: 'get',
    params: query,
  });
}

//用车申请门户-我的申请
export function myUseCar() {
  return request({
    url: '/car/statistic/use/myUseCar',
    method: 'get',
  });
}

//用车出库门户-用车信息
export function myUseCarInfo() {
  return request({
    url: '/car/statistic/out/info',
    method: 'get',
  });
}

//用车申请门户-用车类型统计
export function useCarType(query) {
  return request({
    url: '/car/statistic/use/useCarType',
    method: 'get',
    params: query,
  });
}

//用车出库门户-出库申请人TOP
export function personOutCarTop(query) {
  return request({
    url: '/car/statistic/out/personOutCarTop',
    method: 'get',
    params: query,
  });
}

//用车出库门户-出库申请情况统计
export function situationOutCarTop(query) {
  return request({
    url: '/car/statistic/out/situationOutCarTop',
    method: 'get',
    params: query,
  });
}

//用车出库门户-我的申请
export function myOutCar() {
  return request({
    url: '/car/statistic/out/myOutCar',
    method: 'get',
  });
}

//车辆门户-车辆信息
export function myOutCarInfo() {
  return request({
    url: '/car/statistic/car/info',
    method: 'get',
  });
}

//车辆门户-用车车辆TOP
export function carTop(query) {
  return request({
    url: '/car/statistic/car/carTop',
    method: 'get',
    params: query,
  });
}

//车辆门户-车辆状况概况
export function carStatus(query) {
  return request({
    url: '/car/statistic/car/carStatus',
    method: 'get',
    params: query,
  });
}

//车辆门户-车辆行驶里程统计
export function carMileage() {
  return request({
    url: '/car/statistic/car/carMileage',
    method: 'get',
  });
}

//车辆门户-车辆品牌
export function carBrand() {
  return request({
    url: '/car/statistic/car/carBrand',
    method: 'get',
  });
}

//车辆审批门户-审批处理
export function carApprove() {
  return request({
    url: '/car/statistic/approve/info',
    method: 'get',
  });
}

//车辆审批门户-用车申请人TOP
export function useCarApprove(query) {
  return request({
    url: '/car/statistic/approve/useCarApprove',
    method: 'get',
    params: query,
  });
}

//车辆审批门户-出库申请人TOP
export function outCarApprove(query) {
  return request({
    url: '/car/statistic/approve/outCarApprove',
    method: 'get',
    params: query,
  });
}

//车辆审批门户-审批处理统计
export function carApproveSummary(query) {
  return request({
    url: '/car/statistic/approve/carApproveSummary',
    method: 'get',
    params: query,
  });
}

//车辆审批门户-用车申请
export function CarApproveo(query) {
  return request({
    url: '/car/statistic/approve/0',
    method: 'get',
    params: query,
  });
}

//车辆审批门户-出库申请
export function CarApprovet(query) {
  return request({
    url: '/car/statistic/approve/1',
    method: 'get',
    params: query,
  });
}

//#endregion

//#region   客户管理门户统计相关接口

//客户管理-客户信息
export function clientInfo() {
  return request({
    url: '/produce/client/statistic/info',
    method: 'get',
  });
}

//客户管理-客户合同状态统计
export function clientStatus() {
  return request({
    url: '/produce/client/statistic/status',
    method: 'get',
  });
}

//客户管理-客户签订合同数量统计
export function clientNum() {
  return request({
    url: '/produce/client/statistic/num',
    method: 'get',
  });
}

//客户管理-客户签订外委合同金额TOP
export function moneyo(query) {
  return request({
    url: '/produce/client/statistic/money/0',
    method: 'get',
    params: query,
  });
}

//客户管理-客户签订项目合同金额TOP
export function moneyt(query) {
  return request({
    url: '/produce/client/statistic/money/1',
    method: 'get',
    params: query,
  });
}

//客户管理-客户签订外委合同数量TOP
export function numo(query) {
  return request({
    url: '/produce/client/statistic/num/0',
    method: 'get',
    params: query,
  });
}

//客户管理-客户签订项目合同数量TOP
export function numt(query) {
  return request({
    url: '/produce/client/statistic/num/1',
    method: 'get',
    params: query,
  });
}

//#endregion

//#region   供应商门户统计相关接口

//供应商门户-供应商信息
export function supplierInfo() {
  return request({
    url: '/property/supplier/statistic/info',
    method: 'get',
  });
}

//供应商门户-采购合同金额
export function contMoney(query) {
  return request({
    url: '/property/supplier/statistic/contMoney',
    method: 'get',
    params: query,
  });
}

//供应商门户-资产采购合同金额TOP
export function contMoneyo(query) {
  return request({
    url: '/property/supplier/statistic/contMoney/0',
    method: 'get',
    params: query,
  });
}

//供应商门户-服务采购合同金额TOP
export function contMoneyt(query) {
  return request({
    url: '/property/supplier/statistic/contMoney/1',
    method: 'get',
    params: query,
  });
}

//#endregion

//#region   资产入库门户统计相关接口

//资产入库门户-入库信息
export function inInfo() {
  return request({
    url: '/property/stock/statistic/in/info',
    method: 'get',
  });
}

//资产入库门户-仓库资产数量统计
export function inStoreStock(query) {
  return request({
    url: '/property/stock/statistic/in/storeStock',
    method: 'get',
    params: query,
  });
}

//资产入库门户-仓库入库统计
export function inStoreStockNum(query) {
  return request({
    url: '/property/stock/statistic/in/storeStockNum',
    method: 'get',
    params: query,
  });
}

//#endregion

//#region   资产领用门户统计相关接口

//资产领用门户-资产领用信息
export function userInfo() {
  return request({
    url: '/property/stock/statistic/use/info',
    method: 'get',
  });
}

//资产领用门户-资产领用申请人次数TOP
export function userNum(query) {
  return request({
    url: '/property/stock/statistic/use/userNum',
    method: 'get',
    params: query,
  });
}

//资产领用门户-资产领用申请人资产数量TOP
export function userStockNum(query) {
  return request({
    url: '/property/stock/statistic/use/userStockNum',
    method: 'get',
    params: query,
  });
}

//资产领用门户-仓库领用统计
export function useStore(query) {
  return request({
    url: '/property/stock/statistic/use/useStore',
    method: 'get',
    params: query,
  });
}

//资产领用门户-领用资产次数统计TOP
export function useStoreo(query) {
  return request({
    url: '/property/stock/statistic/use/useStore/0',
    method: 'get',
    params: query,
  });
}

//资产领用门户-领用资产数量统计TOP
export function useStoret(query) {
  return request({
    url: '/property/stock/statistic/use/useStore/1',
    method: 'get',
    params: query,
  });
}

//资产领用门户-领用仓库统计
export function useStoreSum(query) {
  return request({
    url: '/property/stock/statistic/use/useStoreSum',
    method: 'get',
    params: query,
  });
}

//#endregion

//#region   资产报废门户统计相关接口

//资产报废门户-资产报废信息
export function outInfo() {
  return request({
    url: '/property/stock/statistic/out/info',
    method: 'get',
  });
}

//资产报废门户-资产报废申请人次数TOP
export function outNum(query) {
  return request({
    url: '/property/stock/statistic/out/userNum',
    method: 'get',
    params: query,
  });
}

//资产报废门户-资产报废申请人次数TOP
export function outStockNum(query) {
  return request({
    url: '/property/stock/statistic/out/userStockNum',
    method: 'get',
    params: query,
  });
}

//资产报废门户-仓库出库统计
export function outStore(query) {
  return request({
    url: '/property/stock/statistic/out/outStore',
    method: 'get',
    params: query,
  });
}

//资产报废门户-出库资产次数统计TOP
export function outStoreo(query) {
  return request({
    url: '/property/stock/statistic/out/outStore/0',
    method: 'get',
    params: query,
  });
}

//资产报废门户-出库资产数量统计TOP
export function outStoret(query) {
  return request({
    url: '/property/stock/statistic/out/outStore/1',
    method: 'get',
    params: query,
  });
}

//资产报废门户-出库仓库统计
export function outStoreSum(query) {
  return request({
    url: '/property/stock/statistic/out/outStoreSum',
    method: 'get',
    params: query,
  });
}

//#endregion

//#region   修改后的资产统计

//资产统计门户-类型统计
export function stockType(query) {
  return request({
    url: '/property/stock/statistic/change1/type',
    method: 'get',
    params: query,
  });
}

//资产统计门户-数量统计
export function stockNum(query) {
  return request({
    url: '/property/stock/statistic/change1/num',
    method: 'get',
    params: query,
  });
}

//资产统计门户-部门统计
export function stockDept(query) {
  return request({
    url: '/property/stock/statistic/change1/dept',
    method: 'get',
    params: query,
  });
}

//资产统计门户-信息统计
export function stockInfo(query) {
  return request({
    url: '/property/stock/statistic/change1/info',
    method: 'get',
    params: query,
  });
}

//#endregion

//#region   资产审批门户统计相关接口

//资产审批门户-资产审批信息
export function approveInfo() {
  return request({
    url: '/property/stock/statistic/approve/info',
    method: 'get',
  });
}

//资产审批门户-资产领用/出库统计
export function useOrOut(query) {
  return request({
    url: '/property/stock/statistic/approve/useOrOut',
    method: 'get',
    params: query,
  });
}

//资产审批门户-资产领用审批
export function useOrOuto() {
  return request({
    url: '/property/stock/statistic/approve/0',
    method: 'get',
  });
}

//资产审批门户-资产报废审批
export function useOrOutt() {
  return request({
    url: '/property/stock/statistic/approve/1',
    method: 'get',
  });
}

//#endregion

//#region   下载申请门户统计相关接口

//下载申请门户-下载申请信息
export function dainfo() {
  return request({
    url: '/file/apply/statistic/info',
    method: 'get',
  });
}

//下载申请门户-申请事由统计
export function dreason(query) {
  return request({
    url: '/file/apply/statistic/reason',
    method: 'get',
    params: query,
  });
}

//下载申请门户-资料下载类型统计
export function dtype(query) {
  return request({
    url: '/file/apply/statistic/type',
    method: 'get',
    params: query,
  });
}

//下载申请门户-我的申请列表
export function dmy() {
  return request({
    url: '/file/apply/statistic/my',
    method: 'get',
  });
}

//下载审批门户-审批信息
export function dinfo() {
  return request({
    url: '/file/approve/statistic/info',
    method: 'get',
  });
}

//下载审批门户-资料下载申请人统计
export function duserApply(query) {
  return request({
    url: '/file/approve/statistic/userApply',
    method: 'get',
    params: query,
  });
}

//下载审批门户-审批处理统计
export function dapproveinfo(query) {
  return request({
    url: '/file/approve/statistic',
    method: 'get',
    params: query,
  });
}

//下载审批门户-审批列表
export function dapproveList() {
  return request({
    url: '/file/approve/statistic/approveList',
    method: 'get',
  });
}

//#endregion

//#region   投标管理门户统计相关接口

//投标信息
export function bidInfo() {
  return request({
    url: '/produce/bid/statistic',
    method: 'get',
  });
}

//投标客户统计TOP
export function bidClientTop(query) {
  return request({
    url: '/produce/bid/statistic/client',
    method: 'get',
    params: query,
  });
}

//投标情况统计
export function bidsituation(query) {
  return request({
    url: '/produce/bid/statistic/situation',
    method: 'get',
    params: query,
  });
}

//投标人员统计TOP
export function bidperson(query) {
  return request({
    url: '/produce/bid/statistic/person',
    method: 'get',
    params: query,
  });
}

//投标类型统计
export function bidType(query) {
  return request({
    url: '/produce/bid/statistic/bidType',
    method: 'get',
    params: query,
  });
}

//投标业务分布
export function bidArea(query) {
  return request({
    url: '/produce/bid/statistic/bidArea',
    method: 'get',
    params: query,
  });
}

//#endregion

//#region   项目资料门户统计相关接口

//项目资料
export function projectDataInfo() {
  return request({
    url: '/project/projectData/statistic',
    method: 'get',
  });
}

//地区项目资料统计TOP
export function projectDataArea(query) {
  return request({
    url: '/project/projectData/statistic/area',
    method: 'get',
    params: query,
  });
}

//项目资料年份统计
export function projectDataYear() {
  return request({
    url: '/project/projectData/statistic/year',
    method: 'get',
  });
}

//各类型项目资料类型统计
export function projectDataType(query) {
  return request({
    url: '/project/projectData/statistic/type',
    method: 'get',
    params: query,
  });
}

//项目资料数量增长统计
export function projectDataAdd(query) {
  return request({
    url: '/project/projectData/statistic/newAdd',
    method: 'get',
    params: query,
  });
}

//地区项目资料分布统计
export function projectDataDistribution(query) {
  return request({
    url: '/project/projectData/statistic/area/distribution',
    method: 'get',
    params: query,
  });
}
//#endregion

//#region   项目合同门户统计相关接口

//合同信息
export function prjInfo() {
  return request({
    url: '/contract/statistic/prjCont/contInfo',
    method: 'get',
  });
}

//#endregion

//#region   外委合同门户统计相关接口

//外委合同-合同信息
export function outContInfo() {
  return request({
    url: '/contract/statistic/outCont/contInfo',
    method: 'get',
  });
}

//外委合同负责人统计TOP
export function outContLeader(query) {
  return request({
    url: '/contract/statistic/outCont/outContLeader',
    method: 'get',
    params: query,
  });
}

//外委合同统计
export function outContCont(query) {
  return request({
    url: '/contract/statistic/outCont/outCont',
    method: 'get',
    params: query,
  });
}

//外委合同金额统计
export function outContAmount(query) {
  return request({
    url: '/contract/statistic/outCont/outContAmount',
    method: 'get',
    params: query,
  });
}

//外委合同付款比例统计
export function outContPayment(query) {
  return request({
    url: '/contract/statistic/outCont/outContPayment',
    method: 'get',
    params: query,
  });
}
//#endregion

//#region   收款节点门户统计相关接口

//收款节点
export function paymentInfo() {
  return request({
    url: '/contract/statistic/payment/0',
    method: 'get',
  });
}

//可收款节点
export function canPayment() {
  return request({
    url: '/contract/statistic/payment/0/canPayment',
    method: 'get',
  });
}

//合同收款节点统计
export function paymentCont(query) {
  return request({
    url: '/contract/statistic/payment/0/payment',
    method: 'get',
    params: query,
  });
}

//#endregion

//#region   付款节点门户统计相关接口

//付款节点
export function paymentInfot() {
  return request({
    url: '/contract/statistic/payment/1',
    method: 'get',
  });
}

//可付款节点
export function canPaymentt() {
  return request({
    url: '/contract/statistic/payment/1/canPayment',
    method: 'get',
  });
}

//合同付款节点统计
export function paymentContt(query) {
  return request({
    url: '/contract/statistic/payment/1/payment',
    method: 'get',
    params: query,
  });
}

//#endregion

//#region   项目管理门户统计相关接口

//项目信息
export function projectstatisticInfo() {
  return request({
    url: '/project/statistic/project',
    method: 'get',
  });
}

//部门项目数概况
export function projectstaprojectNum(query) {
  return request({
    url: '/project/statistic/project/projectNum',
    method: 'get',
    params: query,
  });
}

//部门类型统计
export function projectType(query) {
  return request({
    url: '/project/statistic/project/projectType',
    method: 'get',
    params: query,
  });
}

//部门区域统计
export function projectArea(query) {
  return request({
    url: '/project/statistic/project/projectArea',
    method: 'get',
    params: query,
  });
}

//项目总体进度统计
export function projectProgress(query) {
  return request({
    url: '/project/statistic/project/progress',
    method: 'get',
    params: query,
  });
}
//#endregion

//#region   项目人员门户统计相关接口

//项目人员-项目信息
export function personInfo() {
  return request({
    url: '/project/statistic/person',
    method: 'get',
  });
}

//项目人员数量统计
export function personNum(query) {
  return request({
    url: '/project/statistic/person/num',
    method: 'get',
    params: query,
  });
}

//交接原因统计
export function handoverReason(query) {
  return request({
    url: '/project/statistic/person/handoverReason',
    method: 'get',
    params: query,
  });
}

//项目角色统计TOP
export function prjRole(query) {
  return request({
    url: '/project/statistic/person/prjRole',
    method: 'get',
    params: query,
  });
}

//#endregion

//#region   项目计划门户统计相关接口

//项目计划
export function projectInfo() {
  return request({
    url: '/project/plan/statistic',
    method: 'get',
  });
}

//项目计划概况统计
export function planNum() {
  return request({
    url: '/project/plan/statistic/plan',
    method: 'get',
  });
}

//项目负责人统计TOP
export function projectleader(query) {
  return request({
    url: '/project/plan/statistic/leader',
    method: 'get',
    params: query,
  });
}

//即将超期的项目计划
export function prjoverdue() {
  return request({
    url: '/project/plan/statistic/overdue',
    method: 'get',
  });
}

//#endregion

//#region   项目进度门户统计相关接口

//项目进度填报统计TOP
export function progressNum(query) {
  return request({
    url: '/project/progress/statistic/num',
    method: 'get',
    params: query,
  });
}

//部门项目进度统计
export function progressStatistic(query) {
  return request({
    url: '/project/progress/statistic/progress',
    method: 'get',
    params: query,
  });
}

//项目计划状态统计
export function progressStatus() {
  return request({
    url: '/project/progress/statistic/status',
    method: 'get',
  });
}

//#endregion

//#region   采购统计相关接口

//采购统计 -合同信息
export function contractBuy() {
  return request({
    url: '/contract/buy/statistic',
    method: 'get',
  });
}

//采购合同申请人TOP
export function contractApply(query) {
  return request({
    url: '/contract/buy/statistic/apply',
    method: 'get',
    params: query,
  });
}

//采购情况统计
export function contractContInfo(query) {
  return request({
    url: '/contract/buy/statistic/contInfo',
    method: 'get',
    params: query,
  });
}

//#endregion

//#region   开票门户统计相关接口

//开票记录人统计TOP
export function contractStatistic(query) {
  return request({
    url: '/contract/invoice/statistic/0/apply',
    method: 'get',
    params: query,
  });
}

//部门开票统计
export function contractInfo(query) {
  return request({
    url: '/contract/invoice/statistic/0/info',
    method: 'get',
    params: query,
  });
}

//票据类型统计
export function contractType(query) {
  return request({
    url: '/contract/invoice/statistic/0/type',
    method: 'get',
    params: query,
  });
}

//开票客户统计TOP
export function contractClient(query) {
  return request({
    url: '/contract/invoice/statistic/0/client',
    method: 'get',
    params: query,
  });
}

//#endregion

//#region  收票门户统计相关接口

//收票申请人统计TOP
export function contractStatistict(query) {
  return request({
    url: '/contract/invoice/statistic/1/apply',
    method: 'get',
    params: query,
  });
}

//部门收票统计
export function contractInfot(query) {
  return request({
    url: '/contract/invoice/statistic/1/info',
    method: 'get',
    params: query,
  });
}

//票据类型统计
export function contractTypet(query) {
  return request({
    url: '/contract/invoice/statistic/1/type',
    method: 'get',
    params: query,
  });
}

//收票收款方统计TOP
export function contractClientt(query) {
  return request({
    url: '/contract/invoice/statistic/1/client',
    method: 'get',
    params: query,
  });
}

//#endregion

//#region  付款记录统计相关接口

//收付款经办人统计TOP
export function paymentHandle(query) {
  return request({
    url: '/produce/payment/statistic/0/handle',
    method: 'get',
    params: query,
  });
}

//部门付款统计
export function paymentHandleinfo(query) {
  return request({
    url: '/produce/payment/statistic/0/info',
    method: 'get',
    params: query,
  });
}

//付款方式统计
export function contractpaymentType(query) {
  return request({
    url: '/produce/payment/statistic/0/type',
    method: 'get',
    params: query,
  });
}

//收款方统计
export function contractpaymentClient(query) {
  return request({
    url: '/produce/payment/statistic/0/client',
    method: 'get',
    params: query,
  });
}

//#endregion

//#region 收款记录统计相关接口

//收款款经办人统计TOP
export function paymentHandlet(query) {
  return request({
    url: '/produce/payment/statistic/1/handle',
    method: 'get',
    params: query,
  });
}

//部门收款统计
export function paymentHandleinfot(query) {
  return request({
    url: '/produce/payment/statistic/1/info',
    method: 'get',
    params: query,
  });
}

//收款方式统计
export function contractpaymentTypet(query) {
  return request({
    url: '/produce/payment/statistic/1/type',
    method: 'get',
    params: query,
  });
}

//付款客户统计
export function contractpaymentClientt(query) {
  return request({
    url: '/produce/payment/statistic/1/client',
    method: 'get',
    params: query,
  });
}

//#endregion

//#region 人员劳动合同门户统计相关接口

//人员劳动合同-合同信息
export function contlaborInfo() {
  return request({
    url: '/contract/labor/statistic/info',
    method: 'get',
  });
}

//人员年龄分布
export function contlaborage() {
  return request({
    url: '/contract/labor/statistic/age',
    method: 'get',
  });
}

//劳动合同数量
export function contlabornum(query) {
  return request({
    url: '/contract/labor/statistic/num',
    method: 'get',
    params: query,
  });
}

//#endregion

//#region 人员证书统计相关接口

//证书信息
export function certificateInfo() {
  return request({
    url: '/certificate/user/statistic/info',
    method: 'get',
  });
}

//证书使用情况统计
export function certificateUse(query) {
  return request({
    url: '/certificate/user/statistic/use',
    method: 'get',
    params: query,
  });
}

//证书统计
export function userCertStatistic(query) {
  return request({
    url: '/certificate/statistic/change0/userCertStatistic',
    method: 'get',
    params: query,
  });
}

//#endregion

//#region 人员履职门户统计相关接口

//履职信息
export function workInfo() {
  return request({
    url: '/person/statistic/work/info',
    method: 'get',
  });
}

//人员履职经历统计TOP
export function worklaborage(query) {
  return request({
    url: '/person/statistic/work/user',
    method: 'get',
    params: query,
  });
}

//履职经历数量统计
export function worknum(query) {
  return request({
    url: '/contract/labor/statistic/num',
    method: 'get',
    params: query,
  });
}

//#endregion

//#region 人员业绩门户统计相关接口

//人员业绩

export function performanceInfo() {
  return request({
    url: '/person/performance/statistic',
    method: 'get',
  });
}

//人员业绩统计TOP
export function performancetotal(query) {
  return request({
    url: '/person/performance/statistic/total',
    method: 'get',
    params: query,
  });
}

//业绩数量统计
export function performancenum(query) {
  return request({
    url: '/person/performance/statistic/num',
    method: 'get',
    params: query,
  });
}

//项目类型统计
export function performancetype(query) {
  return request({
    url: '/person/performance/statistic/type',
    method: 'get',
    params: query,
  });
}

//#endregion

//#region 人员外出门户统计相关接口

//外出信息
export function personoutInfo() {
  return request({
    url: '/person/statistic/out/info',
    method: 'get',
  });
}

//#endregion

//#region 人员请假门户统计相关接口

//请假信息
export function personleaveinfo() {
  return request({
    url: '/person/statistic/leave/info',
    method: 'get',
  });
}

//#endregion

//#region 人员审批处理统计相关接口

//审批信息
export function personapproveinfo() {
  return request({
    url: '/person/statistic/approve/info',
    method: 'get',
  });
}

//#endregion

//#region 项目归档资料统计相关接口

//地区项目资料统计TOP
export function prjDataPlaceArea(query) {
  return request({
    url: '/project/projectDataPlace/statistic/area',
    method: 'get',
    params: query,
  });
}

//项目资料年份统计
export function prjDataPlaceYear() {
  return request({
    url: '/project/projectDataPlace/statistic/year',
    method: 'get',
  });
}

//各类型项目资料类型统计
export function prjDataPlaceType(query) {
  return request({
    url: '/project/projectDataPlace/statistic/type',
    method: 'get',
    params: query,
  });
}

//项目资料数量增长统计
export function prjDataPlaceNewAdd(query) {
  return request({
    url: '/project/projectDataPlace/statistic/newAdd',
    method: 'get',
    params: query,
  });
}

//项目资料
export function projectDataPlaceInfo() {
  return request({
    url: '/project/projectDataPlace/statistic',
    method: 'get',
  });
}
//#endregion
