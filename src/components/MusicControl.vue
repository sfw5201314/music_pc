<template>
  <div class="music-control">
    <div class="music-text">
      <div class="music-logo">
        <img
          :src="
            musicDetail?.al?.picUrl
              ? musicDetail?.al?.picUrl
              : '/src/images/OpticalDisk.png'
          "
          alt=""
        />
      </div>
      <div class="music-name">
        <p style="font-size: 18px">
          {{ musicDetail?.name ? musicDetail?.name : 'Hello Word' }}
        </p>
        <p style="font-size: 14px; color: rgb(57, 144, 157)">
          {{
            musicDetail?.ar?.[0]?.name ? musicDetail?.ar?.[0]?.name : 'computer'
          }}
        </p>
      </div>
    </div>
    <aplayer></aplayer>
    <div class="icon_box">
      <el-icon @click="playList"><Operation /></el-icon>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import aplayer from '../components/Audio.vue'
import { musicStore } from '@/stores/music'

const props = defineProps({
  boxRef: {
    type: Object,
    default: () => null
  }
})
const emits = defineEmits(['musicArr'])
const store = musicStore()
const musicDetail = ref()
const historyList = ref()
onMounted(() => {
  musicDetail.value =
    store.$state.musicDetailArr[store.$state.musicDetailArr.length - 1]
  historyList.value = store.$state.musicDetailArr
  emits('musicArr', historyList.value)
})
watch(store, (newValue, oldValue) => {
  // console.log('watch 已触发', 'new', newValue.$state, 'old', oldValue.$state)
  musicDetail.value =
    newValue.$state.musicDetailArr[newValue.$state.musicDetailArr.length - 1]
  console.log(musicDetail.value)
  historyList.value = newValue.$state.musicDetailArr
  emits('musicArr', historyList.value)
})
const playList = () => {
  console.log(props.boxRef)
  props.boxRef.openDrawer()
}
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
:deep(.el-icon) {
  width: 50px !important;
  height: 50px !important;
  font-size: 24px !important;
}
.icon_box {
  width: 100%;
  cursor: pointer;
}
</style>
