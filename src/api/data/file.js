import request from '@/utils/request';
import { tansParams } from '@/utils/guangwei';

//申请下载
export function fileApply(data) {
  return request({
    url: '/file/apply',
    method: 'post',
    data: data,
  });
}

//撤销申请下载
export function fileApplyCancel(id) {
  return request({
    url: '/file/apply/' + id,
    method: 'put',
  });
}

//审批申请下载;
export function fileApprovalApply(data) {
  return request({
    url: '/file/apply',
    method: 'put',
    data: data,
  });
}

//查询审批处理列表
export function fileApprovalList(query) {
  return request({
    url: '/file/apply',
    method: 'get',
    params: query,
  });
}

//查询我的申请列表
export function MyApprovalList(query) {
  return request({
    url: '/file/apply/my',
    method: 'get',
    params: query,
  });
}

//查询申请详情;
export function ApprovalInfo(id) {
  return request({
    url: '/file/apply/info/' + id,
    method: 'get',
  });
}

//查询待审批数量
export function ApprovalNumber() {
  return request({
    url: '/file/apply/pending',
    method: 'get',
  });
}

export function exportFile(uri, query) {
  let url =
    process.env.VUE_APP_BASE_API +
    uri +
    (query != null && query != undefined ? '?' + tansParams(query) : '');
  let newurl = url.charAt(url.length - 1) == '/' ? url.substr(0, url.length - 1) : url;
  //window.location.href = newurl;
  window.open(newurl);
}

//导出我的申请
export function applyExportMy(query) {
  exportFile('/file/apply/export/0', query);
}

//导出审批处理列表
export function applyExportList(query) {
  exportFile('/file/apply/export/1', query);
}

//下载公司证书
export function certDown(templateId, query) {
  exportFile('/file/down/0/' + templateId + '?watermark=' + query);
}

//下载人员证书
export function certDown2(templateId, query) {
  exportFile('/file/down/5/' + templateId + '?watermark=' + query);
}

//下载项目资料
export function dataDown(templateId, query) {
  exportFile('/file/down/1/' + templateId + '?watermark=' + query);
}

//下载投标
export function bidExport(templateId, query) {
  exportFile('/file/down/2/' + templateId + '?watermark=' + query);
}
//下载项目合同
export function contExport(templateId, query) {
  exportFile('/file/down/3/0/' + templateId + '?watermark=' + query);
}
//下载外委合同
export function ocontExport(templateId, query) {
  exportFile('/file/down/3/1/' + templateId + '?watermark=' + query);
}

//下载劳动合同
export function lcontExport(templateId, query) {
  exportFile('/file/down/3/4/' + templateId + '?watermark=' + query);
}
//下载资产采购合同
export function acontExport(templateId, query) {
  exportFile('/file/down/3/2/' + templateId + '?watermark=' + query);
}
//下载服务采购合同
export function scontExport(templateId, query) {
  exportFile('/file/down/3/3/' + templateId + '?watermark=' + query);
}

//下载合同范本
export function templateExport(templateId, query) {
  exportFile('/file/down/4/' + templateId + '?watermark=' + query);
}

//下载项目合同变更文件
export function cont5Export(templateId, query) {
  exportFile('/file/down/7/' + templateId + '?watermark=' + query);
}

//下载外委合同变更文件
export function cont6Export(templateId, query) {
  exportFile('/file/down/6/' + templateId + '?watermark=' + query);
}

//下载项目归档资料
export function cont8Export(templateId, query) {
  exportFile('/file/down/8/' + templateId + '?watermark=' + query);
}

//下载开票附件
export function cont9Export(templateId, query) {
  exportFile('/file/down/9/' + templateId + '?watermark=' + query);
}

//下载下载收票附件
export function cont10Export(templateId, query) {
  exportFile('/file/down/10/' + templateId + '?watermark=' + query);
}

//下载付款附件
export function cont11Export(templateId, query) {
  exportFile('/file/down/11/' + templateId + '?watermark=' + query);
}

//下载收款附件
export function cont12Export(templateId, query) {
  exportFile('/file/down/12/' + templateId + '?watermark=' + query);
}

//不需要权限下载文件
export function noAuthExport(businessType, businessId, fileId) {
  exportFile('/file/down/noAuth/' + businessType + '/' + businessId + '/' + fileId);
}

//下载备份文件
export function backUp(id) {
  exportFile('/system/db/down/' + id);
}
