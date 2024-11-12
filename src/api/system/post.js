import request from '@/utils/request'

// 查询岗位列表
export function listPost(query) {
  return request({
    url: '/system/post/list',
    method: 'get',
    params: query
  })
}

// 查询岗位详细
export function getPost(postId) {
  return request({
    url: '/system/post/' + postId,
    method: 'get'
  })
}

// 新增岗位
export function addPost(data) {
  return request({
    url: '/system/post',
    method: 'post',
    data: data
  })
}

// 修改岗位
export function updatePost(data) {
  return request({
    url: '/system/post',
    method: 'put',
    data: data
  })
}

// 删除岗位
export function delPost(postId) {
  return request({
    url: '/system/post/' + postId,
    method: 'delete'
  })
}

// 查询授权角色
export function getAuthRole(postId) {
  return request({
    url: '/system/post/authRole/' + postId,
    method: 'get'
  })
}

// 保存授权角色
export function updateAuthRole(data) {
  return request({
    url: '/system/post/authRole',
    method: 'put',
    params: data
  })
}
// 查询角色已授权用户列表
export function allocatedUserList(query) {
  return request({
    url: '/system/post/authUser/allocatedList',
    method: 'get',
    params: query
  })
}
// 查询角色未授权用户列表
export function unallocatedUserList(query) {
  return request({
    url: '/system/post/authUser/unallocatedList',
    method: 'get',
    params: query
  })
}

// 取消用户授权角色
export function authUserCancel(data) {
  return request({
    url: '/system/post/authUser/cancel',
    method: 'put',
    data: data
  })
}


// 批量取消用户授权角色
export function authUserCancelAll(data) {
  return request({
    url: '/system/post/authUser/cancelAll',
    method: 'put',
    params: data
  })
}

// 授权用户选择
export function authUserSelectAll(data) {
  return request({
    url: '/system/post/authUser/selectAll',
    method: 'put',
    params: data
  })
}
