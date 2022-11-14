import request from './request'

export const getMusicUrl = (id) => {
  return request.get(`/song/url?id=${id}`)
}
