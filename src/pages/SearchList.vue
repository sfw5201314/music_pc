<template>
  <div class="search_box">
    <div class="search_header">
      <span>搜索内容</span>
    </div>
    <div class="search_main">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="热门歌曲" name="first">User</el-tab-pane>
        <el-tab-pane label="歌单" name="second">Config</el-tab-pane>
        <el-tab-pane label="MV" name="third">Role</el-tab-pane>
        <el-tab-pane label="专辑" name="fourth">Task</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'

const activeName = ref('first')
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>
<style scoped lang="less">
.search_box {
  height: 100%;
  .search_header {
    height: 20%;
    background-color: aqua;
    margin: 10px 10px 10px 0;
  }
  .search_main {
    height: 75%;
    // background-color: bisque;
    margin-right: 10px;
  }
}
// :deep(.el-tabs__item) {
//   color: white !important;
// }
:deep(.el-tabs__nav-wrap::after) {
  background-color: transparent;
}
</style>
