<template>
  <div class="search_box">
    <div class="search_header">
      <h1 class="keyFont">{{ searchData.keywords }}</h1>
      <span>{{ total }}个结果</span>
    </div>
    <div class="search_main">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="热门歌曲" :name="TABSTYE.HOTSONG">
          <Table
            :table-data="seacrList"
            :total="total"
            @change-page="changepage"
          />
        </el-tab-pane>
        <el-tab-pane label="歌单" :name="TABSTYE.SONGLIST"
          >Config
          <button @click="gomv">111</button>
        </el-tab-pane>
        <el-tab-pane label="MV" :name="TABSTYE.MV">
          <div class="recommend-list">
            <div class="recommend-music">
              <img
                src="http://p3.music.126.net/GpnLproqUUyc4xmYKpRFcQ==/109951166516282895.jpg"
                alt=""
              />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="专辑" :name="TABSTYE.ALBUM">Task</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, inject, nextTick, onUpdated } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import Table from '@/components/Table.vue'
import { useRoute, useRouter } from 'vue-router'
import { SearchDataType } from '@/type'
import { searchApi } from '@/api/search'
import { changeTime } from '@/utils/changeDay'
import dayjs from 'dayjs'
const router = useRouter()
const activeName = ref(1)
const TABSTYE = ref({
  HOTSONG: 1,
  SONGLIST: 1000,
  MV: 1004,
  ALBUM: 10
})
const route = useRoute()
const searchData = ref<SearchDataType>({
  keywords: '',
  offset: 1,
  type: 1
})

const songListData = ref()
const MVlist = ref()
const albumList = ref()
const seacrList = ref()
const total = ref()

onMounted(() => {
  console.log(route.params)
  Object.assign(searchData.value, route.params)
  getSearchList()
})
onUpdated(() => {
  Object.assign(searchData.value, route.params)
  getSearchList()
})
const getSearchList = async () => {
  const res = await searchApi(searchData.value)
  console.log(res)
  if (searchData.value.type === TABSTYE.value.HOTSONG) {
    seacrList.value = res.result.songs.map((item) => {
      return {
        id: item.id,
        name: item.name,
        al: item.al,
        ar: item.ar,
        publishTime: dayjs(item.dt).format('mm:ss')
      }
    })
    total.value = res.result.songCount
  } else if (searchData.value.type === TABSTYE.value.SONGLIST) {
    songListData.value = res.result
  } else if (searchData.value.type === TABSTYE.value.MV) {
    MVlist.value = res.result
  } else if (searchData.value.type === TABSTYE.value.ALBUM) {
    albumList.value = res.result
  }
  console.log('🚀', songListData.value)
  console.log('🚀🚀', MVlist.value)
  console.log('🚀🚀🚀', albumList.value)
}

const changepage = (size) => {
  searchData.value.offset = size
  getSearchList()
  console.log('🚀', seacrList.value)
}
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
  console.log(tab.paneName)
  searchData.value.type = tab.paneName
}

const gomv = () => {
  router.push('/ContainerMainVideo/mv')
}
</script>
<style scoped lang="less">
.search_box {
  height: 100%;
  .search_header {
    height: 10%;
    // background-color: aqua;
    margin: 10px 10px 10px 0;
    .keyFont {
      font-size: 30px;
    }
    span {
      color: #525b72;
      font-size: 14px;
    }
  }
  .search_main {
    height: 85%;
    margin-right: 10px;
  }
}
:deep(.el-tabs__nav-wrap::after) {
  background-color: transparent;
}
</style>
