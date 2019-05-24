import request from '@/api/request'

// 获取列表
export function getUserList (data) {
  return request({
    url: '/api/user/list',
    method: 'post',
    data: {
      ...data
    }
  })
}
// 新增
export function createUser (data) {
  return request({
    url: '/api/user/save',
    method: 'post',
    data: {
      ...data
    }
  })
}
// 修改
export function updateUser (data) {
  return request({
    url: '/api/user/update',
    method: 'post',
    data: {
      ...data
    }
  })
}
