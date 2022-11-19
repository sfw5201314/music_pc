<template>
  <div class="mv_box">
    <h1>{{ mvName }}</h1>
    <video :src="mvUrl" controls autoplay ref="videoRef"></video>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getMVUrl } from '@/api/getDetailUrl'
defineProps({
  mvData: {
    type: Object,
    default: () => null
  }
})

const mvUrl = ref<string>()
const mvName = ref<string | string[]>()
const videoRef = ref()
onMounted(() => {
  getMvUrlData()
})
const route = useRoute()
const getMvUrlData = async () => {
  // console.log(route.params.id)
  mvName.value = route.params.name
  const res = await getMVUrl(route.params.id)
  // console.log(res)
  mvUrl.value = res.data.url
}
</script>
<style scoped lang="less">
.mv_box {
  width: 100%;
  height: 100%;
  padding-right: 10px;
  h1 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  video {
    width: 100%;
    height: 90%;
  }
}
</style>
