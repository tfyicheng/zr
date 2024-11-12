import request from '@/utils/request';

//#region   安全生产专题相关接口

// 管理界面查看专题列表
export function safeList(query) {
  return request({
    url: '/produce/safety/list',
    method: 'get',
    params: query,
  });
}

// 工作台首页查看专题列表
export function safeQuery(query) {
  return request({
    url: '/produce/safety/query',
    method: 'get',
    params: query,
  });
}

// 管理端查看专题详情
export function safeInfo(query) {
  return request({
    url: '/produce/safety/info/' + query,
    method: 'get',
  });
}

// 工作台首页查看专题详情
export function safeSee(query) {
  return request({
    url: '/produce/safety/see/' + query,
    method: 'get',
  });
}

//添加安全生产专题
export function safeAdd(data) {
  return request({
    url: '/produce/safety',
    method: 'post',
    data: data,
  });
}

// 编辑安全生产专题
export function safeEdit(data) {
  return request({
    url: '/produce/safety',
    method: 'put',
    data: data,
  });
}

// 删除安全生产专题  投标ID,多个,分割
export function safeDelete(ids) {
  return request({
    url: '/produce/safety?ids=' + ids,
    method: 'delete',
  });
}
//#endregion

//#region     数据库备份相关接口

// 管理界面查看专题列表
export function dbList(query) {
  return request({
    url: '/system/db/list',
    method: 'get',
    params: query,
  });
}

// 删除安全生产专题
export function dbDelete(id) {
  return request({
    url: '/system/db/' + id,
    method: 'delete',
  });
}
//#endregion
