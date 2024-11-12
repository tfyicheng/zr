import request from '@/utils/request';

// 查询操作日志列表
export function list(query) {
  return request({
    url: '/system/operlog/list',
    method: 'get',
    params: query,
  });
}

// 删除操作日志
export function delOperlog(operId) {
  return request({
    url: '/system/operlog/' + operId,
    method: 'delete',
  });
}

// 清空操作日志
export function cleanOperlog() {
  return request({
    url: '/system/operlog/clean',
    method: 'delete',
  });
}

// 操作日志
export function getLogs(type) {
  return request({
    url: '/system/statistic/index/operLog/' + type,
    method: 'get',
  });
}

// 查看操作日志;
export function getLogInfo(id) {
  return request({
    url: '/system/statistic/index/operLogInfo/' + id,
    method: 'get',
  });
}

//保存路由访问记录
export function saveRoute(data) {
  return request({
    url: '/system/statistic/index/route/add',
    method: 'post',
    data: data,
  });
}

// 查询路由访问记录
export function getRoute(path) {
  return request({
    url: '/system/statistic/index/route/list/' + path,
    method: 'get',
  });
}
