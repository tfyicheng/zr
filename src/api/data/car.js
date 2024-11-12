import request from '@/utils/request';
import { exportFile } from '@/api/data/file';

//#region     车辆列表

// 查询车辆列表
export function carList(query) {
  return request({
    url: '/car/list',
    method: 'get',
    params: query,
  });
}

// 查询车辆详细信息
export function carInfo(query) {
  return request({
    url: '/car/info/' + query,
    method: 'get',
  });
}

// 查询可用车辆列表  车牌号查询指定信
export function carOneList(plateNumber) {
  return request({
    url: '/car/listPlateNumber/' + plateNumber,
    method: 'get',
  });
}

//添加车辆信息
export function carAdd(data) {
  return request({
    url: '/car/add',
    method: 'post',
    data: data,
  });
}

// 更新车辆信息
export function carUpdate(data) {
  return request({
    url: '/car/edit',
    method: 'put',
    data: data,
  });
}

// 删除车辆信息
export function carDelete(id) {
  return request({
    url: '/car/del/' + id,
    method: 'delete',
  });
}

//#endregion

//#region     车辆出库

// 查询车辆出库列表
export function carOutList(query) {
  return request({
    // url: '/car/outbound/list',
    url: '/car/outbound/change0/list',
    method: 'get',
    params: query,
  });
}

// 查询车辆出库详情
export function carOutInfo(query) {
  return request({
    //url: '/car/outbound/info/' + query,
    url: '/car/outbound/change0/info/' + query,
    method: 'get',
  });
}

//添加车辆出库申请
export function carOutAdd(data) {
  return request({
    url: '/car/outbound/change0',
    method: 'post',
    data: data,
  });
}

//撤销车辆出库申请
export function carOutCancel(data) {
  return request({
    url: '/car/outboundApproveBack',
    method: 'put',
    data: data,
  });
}

//车辆出库审批
export function carOutApprove(data) {
  return request({
    url: '/car/outboundApprove',
    method: 'put',
    data: data,
  });
}
//#endregion

//#region     用车申请

// 查询用车申请列表
export function carApplyList(query) {
  return request({
    // url: '/car/applyCar/list',
    url: '/car/applyCar/change0/list',
    method: 'get',
    params: query,
  });
}

// 查询用车申请详情
export function carApplyInfo(query) {
  return request({
    // url: '/car/applyCar/info/' + query,
    url: '/car/applyCar/change0/info/' + query,
    method: 'get',
  });
}

//添加用车申请   车辆用车
export function carApplyAdd(data) {
  return request({
    url: '/car/applyCar/change0',
    method: 'post',
    data: data,
  });
}

//撤销用车申请
export function carApplyCancel(data) {
  return request({
    url: '/car/carApplyApproveBack',
    method: 'put',
    data: data,
  });
}

//用车审批
export function carApplyApprove(data) {
  return request({
    url: '/car/carApplyApprove',
    method: 'put',
    data: data,
  });
}

//用车归还
export function carReturn(data) {
  return request({
    //url: '/car/carApplyApproveReturn',
    url: '/car/applyCar/change0/return',
    method: 'post',
    data: data,
  });
}

//用车领用
export function carUse(data) {
  return request({
    url: '/car/carApplyApproveUse',
    method: 'put',
    data: data,
  });
}

// 查询领用审批处理列表
export function carApplyListInfoo(query) {
  return request({
    url: '/car/pendingApproval/0',
    method: 'get',
    params: query,
  });
}

// 查询出库审批处理列表
export function carApplyListInfot(query) {
  return request({
    url: '/car/pendingApproval/1',
    method: 'get',
    params: query,
  });
}

// 查询待审批总数
export function carApplyTotal() {
  return request({
    url: '/car/pendingApproval/total',
    method: 'get',
  });
}

//#endregion

//#region     导出列表

//导出用车申请列表
export function carAppExportList(query) {
  exportFile('/car/applyCar/export', query);
}

//导出车辆出库申请列表
export function carOutExportList(query) {
  exportFile('/car/outbound/export', query);
}

//导出车辆列表
export function carExportList(query) {
  exportFile('/car/list/export', query);
}
//#endregion

//#region

//#endregion
