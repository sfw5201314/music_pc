//1.引入axios
import axios, {
  Axios,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosInstance
} from 'axios'

declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
  }
}
//2.创建axios对象
const requests = axios.create({
  //设置请求url头
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000 //设置请求超时时间
})
//3.添加请求拦截器 前端给后端的东西 还没有传送到后端
requests.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = { Authorization: token, ...config.headers } as any
      return config
    }
    //在请求前做些什么 这里可以做判断是否有token 设置请求头
    return config
  },
  (error) => {
    //请求错误做些什么
    return Promise.reject(error)
  }
)
//4.添加响应拦截器 后端给前端的东西
requests.interceptors.response.use(
  (response) => {
    //2XX状态码会触发该函数
    //响应成功对响应数据做些什么
    if (response.data.status == 200) {
      if (response.data.message) {
        ElMessage({
          showClose: true,
          message: response.data.message,
          type: 'success'
        })
      }
      return response.data
    } else if (response.data.status !== 200 && response.data.message) {
      ElMessage({
        showClose: true,
        message: response.data.message,
        type: 'error'
      })
      return response.data
    }
    return response.data
  },
  (error) => {
    //响应失败做些什么
    return Promise.reject(error)
  }
)
export default requests
