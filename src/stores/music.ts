import { defineStore } from 'pinia'

export const musicStore = defineStore('musicurl', {
  state: () => {
    return {
      //歌曲基本信息
      musicDetailArr: [] as any,
      //歌曲url
      musicArrUrl: [] as any,
      //历史播放
      recentMusic: [] as any
    }
  },
  actions: {},
  persist: {
    enabled: true,
    strategies: [
      {
        //key的名称
        key: 'music_url',
        //更改默认存储，我更改为localStorage
        storage: localStorage,
        // 可以选择哪些进入local存储，这样就不用全部都进去存储了
        // 默认是全部进去存储
        paths: ['musicArrUrl', 'musicDetailArr', 'recentMusic']
      }
    ]
  }
})
