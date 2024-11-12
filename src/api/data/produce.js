import request from '@/utils/request';
import { exportFile } from '@/api/data/file';

//#region   投标
// 查询投标列表
export function bidList(query) {
  return request({
    url: '/produce/bid',
    method: 'get',
    params: query,
  });
}

// 查询投标详情
export function bidInfo(query) {
  return request({
    url: '/produce/bid/' + query,
    method: 'get',
  });
}

//添加投标信息
export function bidAdd(data) {
  return request({
    url: '/produce/bid',
    method: 'post',
    data: data,
  });
}

// 编辑投标信息
export function bidEdit(data) {
  return request({
    url: '/produce/bid',
    method: 'put',
    data: data,
  });
}

// 编辑投标过程
export function bidProcessEdit(data) {
  return request({
    url: '/produce/bid/process',
    method: 'put',
    data: data,
  });
}

// 删除投标信息  投标ID,多个,分割
export function bidDelete(ids) {
  return request({
    url: '/produce/bid?ids=' + ids,
    method: 'delete',
  });
}
//#endregion

//#region   开票

// 查询开票列表
export function invoiceList(query) {
  return request({
    //url: '/produce/invoice/0',
    url: '/produce/invoice/change0/0/list',
    method: 'get',
    params: query,
  });
}

// 查询开票详情
export function invoiceInfo(id) {
  return request({
    //url: '/produce/invoice/0/' + id,
    url: '/produce/invoice/change0/0/' + id,
    method: 'get',
  });
}

// 查询开票总金额
export function invoiceAmount(query) {
  return request({
    url: '/produce/invoice/totalAmount/0',
    method: 'post',
    data: query,
  });
}

//添加开票信息
export function invoiceAdd(data) {
  return request({
    // url: '/produce/invoice/0',
    url: '/produce/invoice/change0/0',
    method: 'post',
    data: data,
  });
}

// 编辑开票信息
export function invoiceEdit(data) {
  return request({
    // url: '/produce/invoice/0',
    url: '/produce/invoice/change0/0',
    method: 'put',
    data: data,
  });
}

// 删除开票信息  ID,多个,分割
export function invoiceDelete(ids) {
  return request({
    url: '/produce/invoice/0?ids=' + ids,
    method: 'delete',
  });
}
//#endregion

//#region   收票

// 查询收票列表
export function ticketCList(query) {
  return request({
    // url: '/produce/invoice/1',
    url: '/produce/invoice/change0/1/list',
    method: 'get',
    params: query,
  });
}

// 查询收票详情
export function ticketCInfo(id) {
  return request({
    // url: '/produce/invoice/1/' + id,
    url: '/produce/invoice/change0/1/' + id,
    method: 'get',
  });
}

// 查询收票总金额
export function ticketCAmount(query) {
  return request({
    url: '/produce/invoice/totalAmount/1',
    method: 'post',
    data: query,
  });
}

//添加收票信息
export function ticketCAdd(data) {
  return request({
    // url: '/produce/invoice/1',
    url: '/produce/invoice/change0/1',
    method: 'post',
    data: data,
  });
}

// 编辑收票信息
export function ticketCEdit(data) {
  return request({
    //url: '/produce/invoice/1',
    url: '/produce/invoice/change0/1',
    method: 'put',
    data: data,
  });
}

// 删除收票信息  ID,多个,分割
export function ticketCDelete(ids) {
  return request({
    url: '/produce/invoice/1?ids=' + ids,
    method: 'delete',
  });
}
//#endregion

//#region   付款

// 查询付款列表
export function payList(query) {
  return request({
    //url: '/produce/payment/0/list',
    url: '/produce/payment/change0/0/list',
    method: 'get',
    params: query,
  });
}

// 查询付款详情
export function payInfo(id) {
  return request({
    //url: '/produce/payment/0/' + id,
    url: '/produce/payment/change0/0/' + id,
    method: 'get',
  });
}

// 查询累计付款总金额  合同ID
export function payAmount(query) {
  return request({
    //url: '/produce/payment/totalAmount/0',
    url: '/produce/payment/change0/totalAmount/1/' + query,
    method: 'get',
    //data: query,
  });
}

//添加付款信息
export function payAdd(data) {
  return request({
    // url: '/produce/payment/0',
    url: '/produce/payment/change0/0',
    method: 'post',
    data: data,
  });
}

// 编辑付款信息
export function payEdit(data) {
  return request({
    // url: '/produce/payment/0',
    url: '/produce/payment/change0/0',
    method: 'put',
    data: data,
  });
}

// 删除付款信息  ID,多个,分割
export function payDelete(ids) {
  return request({
    //url: '/produce/payment/0?ids=' + ids,
    url: '/produce/payment/change0/0/' + ids,
    method: 'delete',
  });
}

//#endregion

//#region   收款

// 查询收款列表
export function receiptsList(query) {
  return request({
    // url: '/produce/payment/1/list',
    url: '/produce/payment/change0/1/list',
    method: 'get',
    params: query,
  });
}

// 查询收款详情
export function receiptsInfo(id) {
  return request({
    //url: '/produce/payment/1/' + id,
    url: '/produce/payment/change0/1/' + id,
    method: 'get',
  });
}

// 查询累计收款总金额
export function receiptsAmount(query) {
  return request({
    //url: '/produce/payment/totalAmount/1',
    url: '/produce/payment/change0/totalAmount/0/' + query,
    method: 'get',
    //data: query,
  });
}

//添加收款信息
export function receiptsAdd(data) {
  return request({
    //url: '/produce/payment/1',
    url: '/produce/payment/change0/1',
    method: 'post',
    data: data,
  });
}

// 编辑收款信息
export function receiptsEdit(data) {
  return request({
    //url: '/produce/payment/1',
    url: '/produce/payment/change0/1',
    method: 'put',
    data: data,
  });
}

// 删除收款信息  ID,多个,分割
export function receiptsDelete(ids) {
  return request({
    //url: '/produce/payment/1?ids=' + ids,
    url: '/produce/payment/change0/1/' + ids,
    method: 'delete',
  });
}

//导出投标列表
export function bidExportList(query) {
  exportFile('/produce/bid/export', query);
}
//#endregion

//#region  导入导出

//下载导入开票基本信息的模板
export function importTemplate0() {
  exportFile('/produce/invoice/change0/invoiceImportTemplate0');
}

//下载导入收票基本信息的模板
export function importTemplate1() {
  exportFile('/produce/invoice/change0/invoiceImportTemplate1');
}

//下载导入收款基本信息的模板
export function importTemplate2() {
  exportFile('/produce/payment/change0/paymentImportTemplate1');
}

//下载导入付款基本信息的模板
export function importTemplate3() {
  exportFile('/produce/payment/change0/paymentImportTemplate0');
}
//#endregion
