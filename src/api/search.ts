import request from './request'
import { SearchDataType } from '@/type'

export const searchApi = (params: SearchDataType) => {
  return request.post('/cloudsearch', params)
}
