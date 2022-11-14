import request from './request'
import { SearchDataType } from '@/type'

export const searchApi = (data: SearchDataType) => {
  return request.post(
    `/cloudsearch?keywords=${data.keywords}&offset=${data.offset}&type=${data.type}`
  )
}
