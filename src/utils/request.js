// 基于 axios 封装的请求模块
import ajax from 'axios'
import { Notify } from 'vant'
// import router from '@/router/index'
import { removeToken, getToken, setToken } from './token'
import { getNewTokenAPI } from '@/api'
import router from '@/router'
// import store from '@/store'
// 新建一个新的axios实例
const axios = ajax.create({
  baseURL: 'http://geek.itheima.net' // 基地址
})
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么, 如果vuex里有token携带在请求头中
  if (getToken()?.length > 0 && config.headers.Authorization === undefined) {
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  console.log(config)
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) { // 当状态码为2xx/3xx开头的进这里
  // 对响应数据做点什么
  return response
}, async function (error) { // 响应状态码4xx/5xx进这里
  // 对响应错误做点什么
  console.dir(error)
  if (error.response.status === 401) { // 身份过期
    // token续签方式1:  去登录页重新登录, token无用, 清掉-确保路由守卫if进不去
    // store.commit('setToken', '')
    Notify({ type: 'warning', message: '身份已过期' })
    removeToken()// 清除token  ，才能让路由守卫判断失效
    // router.replace('/login')
    const res = await getNewTokenAPI()
    setToken(res.data.data.token)
    error.config.headers.Authorization = `Bearer ${res.data.data.token}`
    // console.log(res)
    return axios(error.config)
  } else if (error.response.status === 500 && error.config.url === '/v1_0/authorizations' && error.config.method === 'put') {
    // 将本地token清除
    localStorage.clear()
    Notify({ type: 'warning', message: '身份已过期' })
    // 跳转
    router.replace('/login')
  }
  return Promise.reject(error)
})

// 导出自定义函数, 参数对象解构赋值
export default ({ url, method = 'GET', params, data, headers }) => {
  return axios({
    url: url,
    method: method,
    params: params,
    data: data,
    headers: headers
  })

// 以后换库, 只需要改这里, 逻辑页面不用动, 保证代码的复用性和独立性(高内聚低耦合)
//   return $.ajax({
//     url: url,
//     type: method,
//     data: data,
//     header: headers
//   })
}
