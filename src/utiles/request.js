import axios from 'axios'
import store from '@/store'
const instance = axios.create({
  baseURL: store.state.baseurl,
  timeout: 30000
})
export default instance

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  if (store.state.user.token) {
    config.headers = {
      Authorization: store.state.user.token
    }
  }
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
