import request from '@/utils/request';
import { exportFile } from '@/api/data/file';

//#region   人员
// 查询人员列表
export function personList(query) {
  return request({
    url: '/person/user/list',
    method: 'get',
    params: query,
  });
}

// 查询人员列表(无权限区分)
export function personList2(query) {
  return request({
    url: '/person/user/list1',
    method: 'get',
    params: query,
  });
}

//查询人员基本信息(含教育经历和身份证附件)
export function personInfo(id) {
  return request({
    url: '/person/user/' + id,
    method: 'get',
  });
}

//查询人员档案
export function personDossier(id) {
  return request({
    url: '/person/dossier/' + id,
    method: 'get',
  });
}

//生成人员档案
export function getDossier(id, data) {
  return request({
    url: '/person/dossier/' + id + '?param=' + data,
    method: 'put',
    // params: data,
  });
}

//添加人员
export function personAdd(data) {
  return request({
    url: '/person/user',
    method: 'post',
    data: data,
  });
}

//更新人员
export function personUpdate(data) {
  return request({
    url: '/person/user',
    method: 'put',
    data: data,
  });
}

//删除人员
export function personDelete(ids) {
  return request({
    url: '/person/user/' + ids,
    method: 'delete',
  });
}

//拿到登录账号
export function getLoginName(name) {
  return request({
    url: '/person/user/getLoginName/' + name,
    method: 'get',
  });
}
//#endregion

//#region   工作

//工作经历列表
export function workList(query) {
  return request({
    url: '/person/work/list',
    method: 'get',
    params: query,
  });
}

//添加工作经历
export function workAdd(data) {
  return request({
    url: '/person/work',
    method: 'post',
    data: data,
  });
}

//更新工作经历
export function workUpdate(data) {
  return request({
    url: '/person/work',
    method: 'put',
    data: data,
  });
}

//删除工作经历
export function workDelete(ids) {
  return request({
    url: '/person/work?ids=' + ids,
    method: 'delete',
  });
}

//查询个人工作经历列表
export function workListByUserId(id) {
  return request({
    url: '/person/work/selfWork/' + id,
    method: 'get',
  });
}

//查询工作经历详情
export function workInfo(id) {
  return request({
    url: '/person/work/' + id,
    method: 'get',
  });
}
//#endregion

//#region   业绩

//查询人员业绩列表
export function performancelist(query) {
  return request({
    url: '/person/performance',
    method: 'get',
    params: query,
  });
}

//添加人员业绩
export function performanceAdd(data) {
  return request({
    url: '/person/performance',
    method: 'post',
    data: data,
  });
}

//更新人员业绩
export function performanceUpdate(data) {
  return request({
    url: '/person/performance',
    method: 'put',
    data: data,
  });
}

//删除人员业绩
export function performanceDelete(ids) {
  return request({
    url: '/person/performance/' + ids,
    method: 'delete',
  });
}

//查询个人业绩列表
export function performanceByUserId(id) {
  return request({
    url: '/person/performance/' + id,
    method: 'get',
  });
}

//查询人员业绩详情
export function performanceInfo(id) {
  return request({
    url: '/person/performance/info/' + id,
    method: 'get',
  });
}
//#endregion

//#region   外出/请假

//人员外出申请  //applyType 申请类型:0外出1请假
export function personOuto(data) {
  return request({
    url: '/person/apply/add/0',
    method: 'post',
    data: data,
  });
}

//人员请假申请  //applyType 申请类型:0外出1请假
export function personOutt(data) {
  return request({
    url: '/person/apply/add/1',
    method: 'post',
    data: data,
  });
}

//撤销人员请假申请
export function personOutRevokeo(data) {
  return request({
    url: '/person/apply/revoke/0',
    method: 'put',
    data: data,
  });
}

//撤销人员外出申请
export function personOutRevoket(data) {
  return request({
    url: '/person/apply/revoke/1',
    method: 'put',
    data: data,
  });
}

//人员外出/请假申请审批
export function personOutApprove(data) {
  return request({
    url: '/person/apply/approve',
    method: 'put',
    data: data,
  });
}

//外出申请列表
export function listOut(query) {
  return request({
    url: '/person/apply/listOut',
    method: 'get',
    params: query,
  });
}

//请假申请列表
export function listAskForLeave(query) {
  return request({
    url: '/person/apply/listAskForLeave',
    method: 'get',
    params: query,
  });
}

//外出审批列表
export function listApproveo(query) {
  return request({
    url: '/person/apply/listApprove/0',
    method: 'get',
    params: query,
  });
}

//请假审批列表
export function listApprovet(query) {
  return request({
    url: '/person/apply/listApprove/1',
    method: 'get',
    params: query,
  });
}

//待审批数量
export function pendingApproval() {
  return request({
    url: '/person/apply/pendingApproval',
    method: 'get',
  });
}

//查询外出申请详情
export function approveInfoo(id) {
  return request({
    url: '/person/apply/info/0/' + id,
    method: 'get',
  });
}

//查询请假申请详情
export function approveInfot(id) {
  return request({
    url: '/person/apply/info/1/' + id,
    method: 'get',
  });
}

//查询用户部门信息
export function userDeptInfo(id) {
  return request({
    url: '/person/user/userDept/' + id,
    method: 'get',
  });
}
//#endregion

//#region   导出导入

//导出用户个人档案
export function userExportList(templateId, query) {
  exportFile('/person/dossier/export/' + templateId + '?watermark=' + query);
}

//导出人员业绩
export function performanceExportList(query) {
  exportFile('/person/performance/export', query);
}

//导出人员外出申请列表
export function userOutExportList(query) {
  exportFile('/person/apply/list/export0', query);
}

//导出人员请假申请列表
export function userLeaveExportList(query) {
  exportFile('/person/apply/list/export1', query);
}

//下载导入人员基本信息的模板
export function userImportTemplate() {
  exportFile('/person/user/userImportTemplate');
}

//#endregion
