import request from '@/utils/request';
import { exportFile } from '@/api/data/file';

//#region 劳动合同
// 查询个人劳动合同列表
export function selfLaborList(query) {
  return request({
    url: '/contract/laborCont/selfLabor/' + query,
    method: 'get',
  });
}

// 查询劳动合同列表
export function laborContList(query) {
  return request({
    url: '/contract/laborCont/list',
    method: 'get',
    params: query,
  });
}

// 查询劳动合同信息
export function laborContInfo(query) {
  return request({
    url: '/contract/laborCont/' + query,
    method: 'get',
  });
}

//添加劳动合同
export function laborContAdd(data) {
  return request({
    url: '/contract/laborCont',
    method: 'post',
    data: data,
  });
}

// 更新劳动合同
export function laborContUpdate(data) {
  return request({
    url: '/contract/laborCont',
    method: 'put',
    data: data,
  });
}

// 删除劳动合同
export function laborContDelete(ids) {
  return request({
    url: '/contract/laborCont?ids=' + ids,
    method: 'delete',
  });
}

//#endregion

//#region 资产采购合同
//查询资产采购合同列表  查询固定资产采购合同列表
export function purchaseContList(query) {
  return request({
    url: '/contract/buyCont/property/change0',
    method: 'get',
    params: query,
  });
}

//查询资产采购合同信息  查询固定资产采购合同详情
export function purchaseContInfo(id) {
  return request({
    //url: '/contract/buyCont/property/' + id,
    url: '/contract/buyCont/property/change0/' + id,
    method: 'get',
  });
}

//更新资产采购合同 编辑固定资产采购合同
export function purchaseContUpdate(data) {
  return request({
    //url: '/contract/buyCont/property',
    url: '/contract/buyCont/property/change0',
    method: 'put',
    data: data,
  });
}

//添加资产采购合同  添加固定资产采购合同
export function purchaseContAdd(data) {
  return request({
    // url: '/contract/buyCont/property',
    url: '/contract/buyCont/property/change0',
    method: 'post',
    data: data,
  });
}

//删除资产采购合同
export function purchaseContDelete(ids) {
  return request({
    url: '/contract/buyCont/property?ids=' + ids,
    method: 'delete',
  });
}

//终止资产采购合同列表  id数组
export function purchaseContTermination(ids) {
  return request({
    url: '/contract/buyCont/property/termination?ids=' + ids,
    method: 'put',
  });
}

//查询资产采购合同下清单列表
export function purchaseContTrades(id) {
  return request({
    url: '/contract/buyCont/property/trades/' + id,
    method: 'get',
  });
}
//#endregion

//#region  服务采购合同
//查询服务采购合同列表  查询服务采购合同列表
export function serviceContList(query) {
  return request({
    url: '/contract/buyCont/service/change0',
    method: 'get',
    params: query,
  });
}

//查询服务采购合同信息  查询服务采购合同详情
export function serviceContInfo(query) {
  return request({
    //url: '/contract/buyCont/service/' + query,
    url: '/contract/buyCont/service/change0/' + query,
    method: 'get',
  });
}

//更新服务采购合同  编辑服务采购合同
export function serviceContUpdate(data) {
  return request({
    //url: '/contract/buyCont/service',
    url: '/contract/buyCont/service/change0',
    method: 'put',
    data: data,
  });
}

//添加服务采购合同  添加服务采购合同
export function serviceContAdd(data) {
  return request({
    url: '/contract/buyCont/service/change0',
    method: 'post',
    data: data,
  });
}

//删除服务采购合同
export function serviceContDelete(ids) {
  return request({
    url: '/contract/buyCont/service?ids=' + ids,
    method: 'delete',
  });
}

//终止服务采购合同  id数组
export function serviceContTermination(ids) {
  return request({
    url: '/contract/buyCont/service/termination?ids=' + ids,
    method: 'put',
  });
}
//#endregion

//#region  外委合同
//查询外委合同列表
export function outContList(query) {
  return request({
    url: '/contract/outsourcing/change0',
    method: 'get',
    params: query,
  });
}

//查询外委合同详情
export function outContInfo(query) {
  return request({
    url: '/contract/outsourcing/change0/' + query,
    method: 'get',
  });
}

//变更外委合同
export function outContUpdate(data) {
  return request({
    url: '/contract/outsourcing/change0',
    method: 'put',
    data: data,
  });
}

//添加外委合同
export function outContAdd(data) {
  return request({
    url: 'contract/outsourcing/change0',
    method: 'post',
    data: data,
  });
}

//删除外委合同
export function outContDelete(data) {
  return request({
    url: '/contract/outsourcing?ids=' + data,
    method: 'delete',
  });
}

//中止外委合同
export function outContTermination(data) {
  return request({
    url: '/contract/outsourcing/change0/termination',
    method: 'put',
    data: data,
  });
}

//查询外委合同下付款节点
export function outContNodeList(id) {
  return request({
    url: '/contract/paymentNode/change0/1/' + id,
    method: 'get',
  });
}

//编辑外委合同下付款节点
export function outContNodeEdit(data) {
  return request({
    url: '/contract/paymentNode/change0/1',
    method: 'put',
    data: data,
  });
}

//查询外委合同下付款记录
export function outContPayRecord(id) {
  return request({
    url: '/contract/payment/change0/0/' + id,
    method: 'get',
  });
}

//查询外委合同下收票信息
export function outContInvoiceList(id) {
  return request({
    url: '/contract/invoice/0/' + id,
    method: 'get',
  });
}

//查询外委合同操作记录
export function outsourcingOperation(id) {
  return request({
    url: '/contract/outsourcing/change0/operation/' + id,
    method: 'get',
  });
}

//#endregion

//#region  项目合同

//查询项目合同列表
export function projectContList(query) {
  return request({
    url: '/contract/projectCont/change0',
    method: 'get',
    params: query,
  });
}

//查询项目合同信息
export function projectContInfo(query) {
  return request({
    url: '/contract/projectCont/change0/' + query,
    method: 'get',
  });
}

//变更项目合同
export function projectContUpdate(data) {
  return request({
    url: '/contract/projectCont/change0',
    method: 'put',
    data: data,
  });
}

//添加项目合同
export function projectContAdd(data) {
  return request({
    url: '/contract/projectCont/change0',
    method: 'post',
    data: data,
  });
}

//删除项目合同
export function projectContDelete(data) {
  return request({
    url: '/contract/projectCont?ids=' + data,
    method: 'delete',
  });
}

//中止项目合同
export function projectContTermination(data) {
  return request({
    url: '/contract/projectCont/change0/termination',
    method: 'put',
    data: data,
  });
}

//查询项目合同下收款节点
export function paymentNodeList(id) {
  return request({
    url: '/contract/paymentNode/change0/0/' + id,
    method: 'get',
  });
}

//编辑项目合同下收款节点
export function paymentNodeEdit(data) {
  return request({
    url: '/contract/paymentNode/change0/0',
    method: 'put',
    data: data,
  });
}

//查询项目合同下收款记录
export function paymentList(id) {
  return request({
    url: '/contract/payment/change0/1/' + id,
    method: 'get',
  });
}

//查询项目合同下开票信息
export function invoiceList(id) {
  return request({
    url: '/contract/invoice/1/' + id,
    method: 'get',
  });
}

//查询项目合同操作记录
export function projectContOperation(id) {
  return request({
    url: '/contract/projectCont/change0/operation/' + id,
    method: 'get',
  });
}

//查询项目合同人员和计划
export function personAndPlan(id) {
  return request({
    url: '/contract/plan/change0/0/personAndPlan/' + id,
    method: 'get',
    params: query,
  });
}
//#endregion

//#region  任务单  收付款节点

//查询项目合同任务单详情
export function planInfo(id) {
  return request({
    url: '/contract/plan/change0/0/' + id,
    method: 'get',
  });
}

//编辑项目合同任务单
export function planEdit(data) {
  return request({
    url: '/contract/plan/change0/0',
    method: 'put',
    data: data,
  });
}

//查询外委合同任务单详情
export function planInfot(id) {
  return request({
    url: '/contract/plan/change0/1/' + id,
    method: 'get',
  });
}

//编辑外委合同任务单
export function planEditt(data) {
  return request({
    url: '/contract/plan/change0/1',
    method: 'put',
    data: data,
  });
}

//查询收款节点列表
export function incomeNodeList(query) {
  return request({
    url: '/contract/paymentNode/change0/0',
    method: 'get',
    params: query,
  });
}

//查询付款节点列表
export function payNodeList(query) {
  return request({
    url: '/contract/paymentNode/change0/1',
    method: 'get',
    params: query,
  });
}
//#endregion

//#region  导出 导入
//导出项目合同列表
export function projContExportList(query) {
  exportFile('/contract/projectCont/exportList', query);
}

//导出外委合同列表
export function outContExportList(query) {
  exportFile('/contract/outsourcing/exportList', query);
}

//导出劳动合同列表
export function labContExportList(query) {
  exportFile('/contract/laborCont/export', query);
}
//导出服务采购合同列表
export function serContExportList(query) {
  exportFile('/contract/buyCont/service/exportList', query);
}
//导出资产采购合同列表
export function buyContExportList(query) {
  exportFile('/contract/buyCont/property/exportList', query);
}

//下载导入项目合同的模板
export function contImportTemplateDown() {
  exportFile('/contract/projectCont/change0/contImportTemplate');
}

//下载导入外委合同的模板
export function ocontImportTemplateDown() {
  exportFile('/contract/outsourcing/change0/contImportTemplate');
}

//#endregion

//#region 合同范本相关接口

// 查询合同范本列表
export function templateList(query) {
  return request({
    url: '/contract/template',
    method: 'get',
    params: query,
  });
}

//添加合同范本
export function templateAdd(data) {
  return request({
    url: '/contract/template',
    method: 'post',
    data: data,
  });
}

// 编辑合同范本
export function templateEdit(data) {
  return request({
    url: '/contract/template',
    method: 'put',
    data: data,
  });
}

// 删除合同范本
export function templateDelete(id) {
  return request({
    url: '/contract/template/' + id,
    method: 'delete',
  });
}

//#endregion

//#region

//#endregion
