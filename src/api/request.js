// 引入 axios
import axios from 'axios'

const requests = axios.create({
  // 配置基础路径
  baseURL: 'http://localhost:7777',
  timeout: 3000,
})

// 配置拦截器
requests.interceptors.request.use((config) => {
  if (config.config.auth) {
    // 请求带token
    config.headers.Authorization = window.sessionStorage.getItem('token')
  }
  return config
})

// 对应拦截器
requests.interceptors.response.use(
  (res) => {
    // 请求成功的回调函数
    if (res.data.code == '1001' || res.data.code == '1002') {
      return Promise.reject(res.data.message)
    }
    return Promise.resolve(res.data)
  },
  () => {
    // 请求失败的回调函数
    return Promise.reject('服务器异常')
  }
)
// 对外暴露
export default requests
