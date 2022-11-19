<template>
  <div class="music-control">
    <div class="music-text">
      <div class="music-logo">
        <!-- 生产模式这样引入 -->
        <img
          :src="musicDetail?.al?.picUrl ? musicDetail?.al?.picUrl : musicImg"
          alt=""
        />
        <!-- <img
          :src="
            musicDetail?.al?.picUrl
              ? musicDetail?.al?.picUrl
              : '../assets/images/OpticalDisk.png'
          "
          alt=""
        /> -->
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
    <aplayer @music-detail="getDetail"></aplayer>
    <div class="icon_box">
      <el-icon @click="playList"><Operation /></el-icon>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import aplayer from '../components/Audio.vue'
import { musicStore } from '@/stores/music'
//生产模式这样引入
import musicImg from '@/assets/images/OpticalDisk.png'

const props = defineProps({
  boxRef: {
    type: Object,
    default: () => null
  }
})
const emits = defineEmits(['musicArr'])
const store = musicStore()
const musicDetail = ref()
const historyList = ref<Array<any>>([])
onMounted(() => {
  // musicDetail.value =
  //   store.$state.musicDetailArr[store.$state.musicDetailArr.length - 1]
  historyList.value = store.$state?.musicDetailArr
  emits('musicArr', historyList.value)
})
//监听store
watch(store, (newValue, oldValue) => {
  // console.log('watch 已触发', 'new', newValue.$state, 'old', oldValue.$state)
  musicDetail.value = newValue.$state?.musicDetailArr?.[0]
  console.log(musicDetail.value)
  historyList.value = newValue.$state?.musicDetailArr
  emits('musicArr', historyList.value)
})
const playList = () => {
  // console.log(props.boxRef)
  props.boxRef.openDrawer()
}

//接收audio传递过来的信息
const getDetail = (row) => {
  musicDetail.value = row
}
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
