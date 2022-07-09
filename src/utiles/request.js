import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Dialog } from 'vant'
const instance = axios.create({
  baseURL: store.state.baseurl,
  timeout: 30000
})
export default instance

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  if (store.state.user.token) {
    config.headers.Authorization = store.state.user.token
  }
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  if (response.data.status === 400) {
    Dialog.confirm({
      message: '此页面需要登录才能访问，请先登录'
    }).then(() => router.push('/login')).catch(() => router.go(-1))
  } else if (response.data.status === 401) {
    store.commit('setUser', '')
    Dialog.confirm({
      message: '您的登录已过期，请重新登录'
    }).then(() => router.push('/login'))
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
