import axios from 'axios'
import md5 from 'js-md5'
import qs from 'qs'
import {
  Message
} from 'vant'

import baseURL from './index'

var requesting = []
const limitTime = 10000

export const service = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  responseType: 'json',
  // withCredentials: true, // 是否允许带cookie
  headers: {
    // 'content-type': 'application/json;charset=utf-8' // 会触发option请求
    'content-type': 'application/x-www-form-urlencoded' // 不会触发option请求
  }
})

// POST请求拦截 (对请求参数序列化)
service.interceptors.request.use(
  config => {
    if (config.method === 'post' || config.method === 'get') {
      config.data = qs.stringify(config.data)
    }

    // 阻止用户快速点击，多次请求
    const requestingId = md5.hex(JSON.stringify(config.data.apiCode + config.data.params))

    if (config.method === 'post') {
      const nowTime = new Date().getTime()
      requesting = requesting.filter(item => {
        return item.startTime + limitTime > nowTime
      })
      const sessionUrl = requesting.filter(item => {
        return item.requestingId === requestingId
      })
      if (sessionUrl.length > 0) {
        return config
      }
      const item = {
        requestingId: requestingId,
        startTime: nowTime
      }
      requesting.push(item)
    }
    return config
  },
  error => {
    Message({
      showClose: true,
      message: error,
      type: 'error'
    })
    return Promise.reject(error)
  }
)
// 返回数据的判断校验
service.interceptors.response.use(
  response => {
    // 返回错误标志
    return response.data
  },
  error => {
    if (error.response) {
      return Promise.reject(error)
    } else {
      return Promise.reject(error)
    }
  }
)

export default service
