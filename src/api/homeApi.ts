import request from './request'

export const bannerApi = () => {
  return request.get('/banner?type=0')
}

export const recommendMusicApi = (limit: number) => {
  return request.get(`/personalized?limit=${limit}`)
}
