<template>
  <div class="music-control">
    <div class="music-text">
      <div class="music-logo">
        <img src="/images/QQ图片20220522000154.jpg" alt="" />
      </div>
      <div class="music-name">
        <p style="font-size: 18px">将进酒</p>
        <p style="font-size: 14px; color: rgb(57, 144, 157)">李白</p>
      </div>
    </div>
    <aplayer></aplayer>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import aplayer from '../components/Audio.vue'
const videoUpload = ref({
  progress: false,
  progressPercent: 0,
  successPercent: 0,
  music: {
    title: '',
    author: '',
    url: '',
    lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
  }
})
</script>
<style lang="scss" scoped>
</style>