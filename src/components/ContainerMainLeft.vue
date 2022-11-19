<template>
  <div class="container-mainLeft">
    <ul>
      <h3>浏览</h3>
      <li @click="goFindMusic">
        <a href="javascript:;">发现音乐</a>
      </li>
      <li @click="goVideo">
        <a href="javascript:;">视频</a>
      </li>
      <li @click="goPlayed"><a href="javascript:;">最近播放</a></li>
      <!-- todo:后续加 -->
      <!-- <li><a href="javascript:;">我喜欢的音乐</a></li>
      <li><a href="javascript:;">我的收藏</a></li>
      <li><a href="javascript:;">发现</a></li>
      <li @click="goSongList"><a href="javascript:;">歌单</a></li> -->
    </ul>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const goFindMusic = () => {
  router.push('/ContainerMainFind')
}
const goVideo = () => {
  router.push('/ContainerMainVideo')
}
const goSongList = () => {
  router.push('/SongList')
}

const goPlayed = () => {
  router.push('/ContainerMainRecently')
}
</script>
<style lang="scss" scoped></style>
