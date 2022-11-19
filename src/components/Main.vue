<template>
  <div class="container">
    <div class="main">
      <div class="header">
        <div class="header-left">
          <img src="" alt="" />
        </div>
        <div class="header-right">
          <div class="indicator_box">
            <label class="indicator_box_label" @click="router.back()"
              ><el-icon><ArrowLeftBold /></el-icon
            ></label>
            <label @click="router.forward()"
              ><el-icon><ArrowRightBold /></el-icon
            ></label>
          </div>
          <div class="search" @keyup.enter="search">
            <el-input
              v-model="searchObj.keywords"
              placeholder="搜索歌曲,艺术家等...."
              clearable
            />
            <label @click="search"
              ><el-icon color="#ffff" style="vertical-align: middle">
                <Search />
              </el-icon>
            </label>
          </div>
        </div>
      </div>
      <ContainerMain />
      <Drawer ref="DrawerRef" :history-list="historyMusicList" />
      <MusicControl :box-ref="DrawerRef" @music-arr="getHistoryMusicList" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, provide } from 'vue'
import { useRouter } from 'vue-router'
import ContainerMain from '../pages/ContainerMain.vue'
import MusicControl from './MusicControl.vue'
import { SearchDataType } from '@/type'
import { cloneDeep } from 'lodash'
import Drawer from '@/components/Drawer.vue'
let searchObj = ref<SearchDataType>({
  keywords: ''
})
let historyMusicList = ref<Array<any>>([])
const DrawerRef = ref()
// provide('searchList', searchList)
const router = useRouter()
// const getSearchList = async () => {
//   const res = await searchApi(searchObj.value)
//   searchList.value = cloneDeep(res)
//   Object.assign(searchList.value, searchObj.value)
//   console.log(searchList.value)
// }
const search = () => {
  // console.log(searchObj.value.keywords)
  if (searchObj.value.keywords === '') return
  // getSearchList()
  router.push({
    path: `/SearchList/${searchObj.value.keywords}`
  })
}

const getHistoryMusicList = (list) => {
  //使用new Set进行数组去重防止重复添加歌曲
  historyMusicList.value = [...new Set(list)]
  // console.log('传过来的', new Set(list), historyMusicList.value)
}
</script>
<style lang="less" scoped>
:deep(.el-input) {
  .el-input__wrapper {
    background-color: transparent !important;
    box-shadow: none !important;
  }
  width: 85%;
  height: 80%;
  margin: 5px 10px;
  outline: none;
}
</style>
