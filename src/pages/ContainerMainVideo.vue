<template>
  <div class="mainRight-up">
    <div>
      <h3>个性推荐</h3>
    </div>
    <Banner :img-url="bannerList" />
  </div>
  <div class="mainRight-down">
    <div>
      <h3>最新MV</h3>
    </div>
    <el-scrollbar height="85%">
      <div class="recommend-list">
        <div
          class="recommend-music"
          v-for="item in videoList"
          :key="item?.id"
          @click="goMV(item)"
        >
          <img :src="item?.cover" :alt="item.name" />
          <div>{{ item.name }} (by {{ item.artistName }})</div>
          <!-- <div>by {{ item.artistName }}</div> -->
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import Banner from '@/components/Banner.vue'
import { useRouter } from 'vue-router'
import { bannerApi } from '@/api/homeApi'
import { getNewVideoUrl } from '@/api/getDetailUrl'
import { onMounted, ref } from 'vue'
const bannerList = ref<Array<string>>([])
const router = useRouter()
const videoList = ref<Array<any>>()
onMounted(() => {
  getBannerUrl()
  getMVlist()
})
const getBannerUrl = async () => {
  const res = (await bannerApi()) as any
  // console.log(res)
  bannerList.value = res.banners
  console.log(bannerList.value)
}

const getMVlist = async () => {
  const res = await getNewVideoUrl(20)
  videoList.value = res.data
  // console.log(res.data)
}
const goMV = (row) => {
  router.push(
    `/ContainerMainVideo/mv/${row.name + '(' + row.artistName + ')'}/${row.id}`
  )
}
</script>
<style lang="scss" scoped></style>
