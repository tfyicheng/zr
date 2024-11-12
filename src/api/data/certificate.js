import request from '@/utils/request';

// 查询公司证书列表
export function certList0(query) {
  return request({
    url: '/certificate/cert/list/0',
    method: 'get',
    params: query,
  });
}

// 查询人员证书列表
export function certList1(query) {
  return request({
    url: '/certificate/cert/list/1',
    method: 'get',
    params: query,
  });
}

// 首页分析查询证书列表
export function certList(query) {
  return request({
    url: '/certificate/cert/list/0',
    method: 'get',
    params: query,
  });
}

// 查询证书年份列表
export function certListYears() {
  return request({
    url: '/certificate/cert/years',
    method: 'get',
  });
}

// 查询个人证书列表
export function certPersonInfo(query) {
  return request({
    url: '/certificate/cert/selfCert/' + query,
    method: 'get',
  });
}

// 查询公司证书基本信息
export function certInfo0(query) {
  return request({
    url: '/certificate/cert/0/' + query,
    method: 'get',
  });
}

// 查询人员证书基本信息
export function certInfo1(query) {
  return request({
    url: '/certificate/cert/1/' + query,
    method: 'get',
  });
}

//添加公司证书
export function certAdd0(data) {
  return request({
    url: '/certificate/cert/0',
    method: 'post',
    data: data,
  });
}

//添加人员证书
export function certAdd1(data) {
  return request({
    url: '/certificate/cert/1',
    method: 'post',
    data: data,
  });
}

//编辑公司证书
export function certUpdate0(data) {
  return request({
    url: '/certificate/cert/0',
    method: 'put',
    data: data,
  });
}

//编辑人员证书
export function certUpdate1(data) {
  return request({
    url: '/certificate/cert/1',
    method: 'put',
    data: data,
  });
}

//删除公司证书
export function certDel0(id) {
  return request({
    url: '/certificate/cert/0/' + id,
    method: 'delete',
  });
}

//删除人员证书
export function certDel1(id) {
  return request({
    url: '/certificate/cert/1/' + id,
    method: 'delete',
  });
}
