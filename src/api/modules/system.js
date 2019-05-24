import request from '@/api/request'
// 使用示例：直接在对应页面中引入该方法
// import { getSystemInfo } from '@/api/modules/system'

// 获取信息
export function getSystemInfo (data) {
  return request({
    url: '/api/system/info',
    method: 'post',
    data: {
      ...data
    }
  })
}
// 修改信息
export function updateSystemInfo (data) {
  return request({
    url: '/api/system/update',
    method: 'post',
    data: {
      ...data
    }
  })
}
