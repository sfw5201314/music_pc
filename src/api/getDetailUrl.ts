import request from './request'

export const getMusicUrl = (id) => {
  return request.get(`/song/url?id=${id}`)
}
export const getMVUrl = (id) => {
  return request.get(`/mv/url?id=${id}`)
}

export const getSongDeatilList = (id, limit, offset) => {
  return request.get(
    `/playlist/track/all?id=${id}&limit=${limit}&offset=${offset}`
  )
}

export const SongListDetail = (id) => {
  return request.get(`/playlist/detail?id=${id}`)
}

export const getNewVideoUrl = (limit) => {
  return request.get(`/mv/first?limit=${limit}`)
}
