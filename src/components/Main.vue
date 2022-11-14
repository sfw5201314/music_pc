<template>
  <div class="container">
    <div class="main">
      <div class="header">
        <div class="header-left">
          <img src="./images/QQ截图20220521220541.png" alt="" />
        </div>
        <div class="header-right">
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
      <MusicControl />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, provide } from 'vue'
import { useRouter } from 'vue-router'
import ContainerMain from '../pages/ContainerMain.vue'
import MusicControl from './MusicControl.vue'
import { searchApi } from '@/api/search'
import { SearchDataType } from '@/type'
import { cloneDeep } from 'lodash'
let searchObj = ref<SearchDataType>({
  keywords: ''
})
let searchList = ref()
provide('searchList', searchList)
const router = useRouter()
const getSearchList = async () => {
  const res = await searchApi(searchObj.value)
  searchList.value = cloneDeep(res)
  Object.assign(searchList.value, searchObj.value)
  console.log(searchList.value)
}
const search = () => {
  console.log(searchObj.value.keywords)
  if (searchObj.value.keywords === '') return
  // getSearchList()
  router.push({
    path: `/SearchList/${searchObj.value.keywords}`
  })
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
