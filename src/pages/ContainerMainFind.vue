<template>
  <div class="mainRight-up">
    <div>
      <h3>个性推荐</h3>
    </div>
    <Banner :img-url="bannerList" />
  </div>
  <div class="mainRight-down">
    <div>
      <h3>推荐歌单</h3>
    </div>
    <el-scrollbar height="85%">
      <div class="recommend-list">
        <div
          class="recommend-music"
          v-for="item in rcmdMusicList"
          :key="item?.id"
          @click="goSongListDetail(item)"
        >
          <img :src="item?.picUrl" :alt="item.name" />
          <div>{{ item.name }}</div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import Banner from '@/components/Banner.vue'
import { bannerApi, recommendMusicApi } from '@/api/homeApi'
import { onMounted, ref } from 'vue'
import { BannerDataType } from '@/type'
import { useRouter } from 'vue-router'
const bannerList = ref<Array<string>>([])
const rcmdMusicList = ref<Array<any>>([])
const router = useRouter()
onMounted(() => {
  getBannerUrl()
  getRecommendMusic()
})
const getBannerUrl = async () => {
  const res = (await bannerApi()) as any
  // console.log(res)
  bannerList.value = res.banners
  // console.log(bannerList.value)
}

const getRecommendMusic = async () => {
  const res = (await recommendMusicApi(8)) as any
  // console.log('rMusic', res)
  rcmdMusicList.value = res.result
  // console.log('da', rcmdMusicList.value)
}
const goSongListDetail = (row) => {
  router.push(`/SongList/SongListDetail/${row.id}`)
}
</script>
<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>
