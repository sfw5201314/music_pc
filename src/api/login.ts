//引入封装好的axios
import request from './request'
import { LoginData } from '@/type'
//登陆
export const loginApi = (params: LoginData) => {
  return request.post('/login-api/login', params)
}

export const getUserInfo = (id) => {
  return request.get(`/user-api/userinfo?id=${id}`)
}

export const getIP = (id) => {
  return request.get(`http://pv.sohu.com/cityjson?ie=${id}`)
}
