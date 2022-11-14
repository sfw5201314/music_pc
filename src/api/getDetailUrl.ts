import request from './request'

export const getMusicUrl = (id) => {
  return request.get(`/song/url?id=${id}`)
}
export const getMVUrl = (id) => {
  return request.get(`/mv/url?id=${id}`)
}
