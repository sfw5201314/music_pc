import request from './request'

//获取音乐播放url
export const getMusicUrl = (id) => {
  return request.get(`/song/url?id=${id}`)
}

//获取MV播放url
export const getMVUrl = (id) => {
  return request.get(`/mv/url?id=${id}`)
}

//获取歌单里面的歌曲
export const getSongDeatilList = (id, limit, offset) => {
  return request.get(
    `/playlist/track/all?id=${id}&limit=${limit}&offset=${offset}`
  )
}
//获取歌单信息
export const SongListDetail = (id) => {
  return request.get(`/playlist/detail?id=${id}`)
}

//获取最新MV
export const getNewVideoUrl = (limit) => {
  return request.get(`/mv/first?limit=${limit}`)
}
