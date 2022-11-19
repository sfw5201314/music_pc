<template>
  <div class="search_box">
    <div class="search_header">
      <h1 class="keyFont">最近播放</h1>
      <div class="num_box">
        <span> 共{{ songDetailList?.length }}首</span>
        <div class="icon_box" @click="remove">
          <el-icon><Delete /></el-icon>
          <span>清空列表</span>
        </div>
      </div>
    </div>
    <div class="search_main">
      <el-scrollbar>
        <Table :table-data="songDetailList" />
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import Table from '@/components/Table.vue'
import { onMounted, ref } from 'vue'
import { musicStore } from '@/stores/music'
import { storeToRefs } from 'pinia'

const store = musicStore()
let { recentMusic } = storeToRefs(store)

const songDetailList = ref()
onMounted(() => {
  getDetail()
})

//获取歌曲详细
const getDetail = async () => {
  //使用new Set进行数组去重防止重复向列表中添加歌曲
  songDetailList.value = [...new Set(store.$state.recentMusic)]
}

//清空列表
const remove = () => {
  // console.log(recentMusic.value)
  recentMusic.value = []
  songDetailList.value = []
  // console.log('删除后', songDetailList.value)
}
</script>
<style scoped lang="less">
.search_box {
  height: 100%;
  .search_main {
    height: 75%;
    margin-right: 10px;
  }
}
.search_header {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-bottom: 10px;
  .num_box {
    max-width: 100%;
    border: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon_box {
      color: #e11642;
      margin-right: 35px;
      display: flex;
      align-items: center;
      font-size: 14px;
      cursor: pointer;
    }
  }
  div {
    font-size: 12px;
    padding: 1px;
    margin-right: 5px;
    color: rgb(110, 107, 107);
  }
}
</style>
