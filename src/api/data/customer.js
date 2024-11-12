import request from '@/utils/request';

// 查询客户列表
export function custList(query) {
  return request({
    url: '/produce/client/change0/list',
    method: 'get',
    params: query,
  });
}

// 查询客户资料信息  查询客户详情
export function custInfo(query) {
  return request({
    //url: '/produce/client/' + query,
    url: '/produce/client/change0/' + query,
    method: 'get',
  });
}

// 查询客户浏览记录
export function custBrowse(query) {
  return request({
    url: '/produce/client/browse/' + query,
    method: 'get',
  });
}

// 查询客户项目列表
export function custPrjList(query) {
  return request({
    url: '/produce/client/list/cont',
    method: 'get',
    params: query,
  });
}

//添加客户
export function custAdd(data) {
  return request({
    //url: '/produce/client/add',
    url: '/produce/client/change0/add',
    method: 'post',
    data: data,
  });
}

// 更新客户
export function custUpdate(data) {
  return request({
    //url: '/produce/client/edit',
    url: '/produce/client/change0/edit',
    method: 'put',
    data: data,
  });
}

// 删除客户
export function custDelete(ids) {
  return request({
    //url: '/produce/client?ids=' + ids,
    url: '/produce/client/change0?ids=' + ids,
    method: 'delete',
  });
}

//查询客户联系人
export function custClientList(query) {
  return request({
    url: '/produce/client/change0/list/contacts?clientId=' + query,
    method: 'get',
    //params: query,
  });
}

//查询客户合同信息
export function custContList(query) {
  return request({
    url: '/produce/client/change0/list/cont',
    method: 'get',
    params: query,
  });
}
