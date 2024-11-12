import request from '@/utils/request';
import { exportFile } from '@/api/data/file';

//#region  仓库
// 查询仓库列表
export function storeList(query) {
  return request({
    url: '/property/store/list',
    method: 'get',
    params: query,
  });
}

//添加仓库信息
export function storeAdd(data) {
  return request({
    url: '/property/store/add',
    method: 'post',
    data: data,
  });
}

// 编辑仓库信息
export function storeEdit(data) {
  return request({
    url: '/property/store/edit',
    method: 'put',
    data: data,
  });
}

// 删除仓库信息
export function storeDelete(ids) {
  return request({
    url: '/property/store/del/' + ids,
    method: 'delete',
  });
}

// 查询可用库存资产列表
export function stockCanList(query) {
  return request({
    url: '/property/store/list/stock',
    method: 'get',
    params: query,
  });
}

//#endregion

//#region  资产编码

// 查询资产列表
export function materialList(query) {
  return request({
    url: '/property/material/list',
    method: 'get',
    params: query,
  });
}

//添加资产信息
export function materialAdd(data) {
  return request({
    url: '/property/material/add',
    method: 'post',
    data: data,
  });
}

// 编辑资产信息
export function materialEdit(data) {
  return request({
    url: '/property/material/edit',
    method: 'put',
    data: data,
  });
}

// 删除资产信息
export function materialDelete(ids) {
  return request({
    url: '/property/material/del?ids=' + ids,
    method: 'delete',
  });
}
//#endregion

//#region 供应商

// 查询供应商列表
export function supplierList(query) {
  return request({
    url: '/property/supplier/list',
    method: 'get',
    params: query,
  });
}

//添加供应商信息
export function supplierAdd(data) {
  return request({
    url: '/property/supplier/add',
    method: 'post',
    data: data,
  });
}

// 编辑供应商信息
export function supplierEdit(data) {
  return request({
    url: '/property/supplier/edit',
    method: 'put',
    data: data,
  });
}

// 删除供应商信息
export function supplierDelete(ids) {
  return request({
    url: '/property/supplier/del?ids=' + ids,
    method: 'delete',
  });
}

//查询供应商合同 :0资产采购合同1服务采购合同
export function supplierlistCont(query) {
  return request({
    url: '/property/supplier/listCont',
    method: 'get',
    params: query,
  });
}

//查询供应商联系人列表
export function supplierContacts(query) {
  return request({
    url: '/property/supplier/contacts/' + query,
    method: 'get',
  });
}

//查询供应商详情
export function supplierContactsInfo(query) {
  return request({
    url: '/property/supplier/info/' + query,
    method: 'get',
  });
}
//#endregion

//#region  资产入库

// 查询资产入库申请列表
export function stockInList(query) {
  return request({
    // url: '/property/stock/in/list',
    url: '/property/stock/change0/in/list',
    method: 'get',
    params: query,
  });
}

//资产入库申请
export function stockInAdd(data) {
  return request({
    //url: '/property/stock/in',
    url: '/property/stock/change0/in',
    method: 'post',
    data: data,
  });
}

// 编辑资产入库
export function stockInEdit(data) {
  return request({
    url: '/property/stock/in/edit',
    method: 'put',
    data: data,
  });
}

// 查询资产入库审批列表
export function stockInAList(query) {
  return request({
    url: '/property/stock/in/pendingApproval',
    method: 'get',
    params: query,
  });
}
//#endregion

//#region  资产报废

// 查询资产报废申请列表
export function stockOutList(query) {
  return request({
    //url: '/property/stock/out/list',
    url: '/property/stock/change0/out/list',
    method: 'get',
    params: query,
  });
}

//资产报废申请
export function stockOutAdd(data) {
  return request({
    // url: '/property/stock/out',
    url: '/property/stock/change0/out',
    method: 'post',
    data: data,
  });
}

// 编辑资产报废
export function stockOutEdit(data) {
  return request({
    url: '/property/stock/out/edit',
    method: 'put',
    data: data,
  });
}

// 查询资产报废审批列表
export function stockOutAList(query) {
  return request({
    url: '/property/stock/out/pendingApproval',
    method: 'get',
    params: query,
  });
}
//#endregion

//#region  资产领用

// 查询资产领用申请列表
export function stockUseList(query) {
  return request({
    //url: '/property/stock/use/list',
    url: '/property/stock/change0/use/list',
    method: 'get',
    params: query,
  });
}

//资产领用申请
export function stockUseAdd(data) {
  return request({
    //url: '/property/stock/use',
    url: '/property/stock/change0/use',
    method: 'post',
    data: data,
  });
}

// 编辑资产领用
export function stockUseEdit(data) {
  return request({
    url: '/property/stock/use/edit',
    method: 'put',
    data: data,
  });
}

// 查询资产领用审批列表
export function stockUseAList(query) {
  return request({
    url: '/property/stock/use/pendingApproval',
    method: 'get',
    params: query,
  });
}

//#endregion

//#region  资产审批/申请

// 查看申请详情  0入库1领用2出库3审批处理
export function stockInfo(type, query) {
  return request({
    //url: '/property/stock/info/' + type + '/' + query,
    url: '/property/stock/change0/info/' + type + '/' + query,
    method: 'get',
  });
}

// 撤销申请
export function stockApproveBack(data) {
  return request({
    url: '/property/stock/stockApproveBack',
    method: 'put',
    data: data,
  });
}

// 资产审批
export function stockApprove(data) {
  return request({
    url: '/property/stock/stockApprove',
    method: 'put',
    data: data,
  });
}

// 查询待处理审批总数
export function stockATotal() {
  return request({
    url: '/property/stock/pendingApproval/total',
    method: 'get',
  });
}
//#endregion

//#region  导出

//导出资产入库申请
export function assetInExportList(query) {
  exportFile('/property/stock/export0', query);
}

//导出资产领用申请
export function assetReqExportList(query) {
  exportFile('/property/stock/export1', query);
}

//导出资产报废申请
export function assetOutExportList(query) {
  exportFile('/property/stock/export2', query);
}

//导出资产库存
export function assetExportList(query) {
  exportFile('/property/store/export', query);
}

//导出固定资产
export function assetExportList1(query) {
  exportFile('/property/stock/change1/0/export', query);
}

//下载导出导入固定资产excel模板
export function importTemplate() {
  exportFile('/property/stock/change1/0/exportImportTemplate0');
}

//#endregion

//#region 固定资产入库

//固定资产入库
export function stockInC0Add(data) {
  return request({
    url: '/property/stock/change1/0/in',
    method: 'post',
    data: data,
  });
}

//编辑固定资产入库
export function stockInC0Edit(data) {
  return request({
    url: '/property/stock/change1/0/in',
    method: 'put',
    data: data,
  });
}

// 查询固定资产入库列表
export function stockInC0List(query) {
  return request({
    url: '/property/stock/change1/0/in',
    method: 'get',
    params: query,
  });
}

// 查询固定资产入库详情
export function stockInC0Info(query) {
  return request({
    url: '/property/stock/change1/0/in/' + query,
    method: 'get',
  });
}
//#endregion

//#region 消耗品入库

//消耗品入库
export function stockInC1Add(data) {
  return request({
    url: '/property/stock/change1/1/in',
    method: 'post',
    data: data,
  });
}

//编辑消耗品入库
export function stockInC1Edit(data) {
  return request({
    url: '/property/stock/change1/1/in',
    method: 'put',
    data: data,
  });
}

// 查询消耗品入库列表
export function stockInC1List(query) {
  return request({
    url: '/property/stock/change1/1/in',
    method: 'get',
    params: query,
  });
}

// 查询消耗品入库详情
export function stockInC1Info(query) {
  return request({
    url: '/property/stock/change1/1/in/' + query,
    method: 'get',
  });
}
//#endregion

//#region  固定资产领用

// 查询固定资产领用列表
export function stockUseC0List(query) {
  return request({
    url: '/property/stock/change1/0/use',
    method: 'get',
    params: query,
  });
}

//固定资产领用
export function stockUseC0Add(data) {
  return request({
    url: '/property/stock/change1/0/use',
    method: 'post',
    data: data,
  });
}

// 编辑固定资产领用
export function stockUseC0Edit(data) {
  return request({
    url: '/property/stock/change1/0/use',
    method: 'put',
    data: data,
  });
}

// 查询固定资产领用详情
export function stockUseC0Info(query) {
  return request({
    url: '/property/stock/change1/0/use/' + query,
    method: 'get',
  });
}

//#endregion

//#region  消耗品领用

// 查询消耗品领用列表
export function stockUseC1List(query) {
  return request({
    url: '/property/stock/change1/1/use',
    method: 'get',
    params: query,
  });
}

//消耗品领用
export function stockUseC1Add(data) {
  return request({
    url: '/property/stock/change1/1/use',
    method: 'post',
    data: data,
  });
}

// 编辑消耗品领用
export function stockUseC1Edit(data) {
  return request({
    url: '/property/stock/change1/1/use',
    method: 'put',
    data: data,
  });
}

//查询消耗品领用详情
export function stockUseC1Info(query) {
  return request({
    url: '/property/stock/change1/1/use/' + query,
    method: 'get',
  });
}

//#endregion

//#region  报废资产

// 选择资产的列表数据  0库存1已领用
export function stockC0List(query) {
  return request({
    url: '/property/stock/change1/check/stock',
    method: 'get',
    params: query,
  });
}

//固定资产报废
export function stockOutC0(data) {
  return request({
    url: '/property/stock/change1/0/out',
    method: 'post',
    data: data,
  });
}

// 编辑固定资产报废
export function stockOutC0Edit(data) {
  return request({
    url: '/property/stock/change1/0/out',
    method: 'put',
    data: data,
  });
}

//查询固定资产报废列表
export function stockOutC0List(query) {
  return request({
    url: '/property/stock/change1/0/out',
    method: 'get',
    params: query,
  });
}

//查询固定资产报废详情
export function stockOutC0Info(query) {
  return request({
    url: '/property/stock/change1/0/out/' + query,
    method: 'get',
  });
}

//#endregion

//#region 固定资产库存

// 查询固定资产库存列表
export function allStockList(query) {
  return request({
    url: '/property/stock/change1/0/stock',
    method: 'get',
    params: query,
  });
}

//查询固定资产库存详情
export function allStockInfo(query) {
  return request({
    url: '/property/stock/change1/0/stock/' + query,
    method: 'get',
  });
}
//#endregion

//#region 消耗品库存

// 查询消耗品库存列表
export function allStockList1(query) {
  return request({
    url: '/property/stock/change1/1/stock',
    method: 'get',
    params: query,
  });
}

//#endregion

//#region
//#endregion
