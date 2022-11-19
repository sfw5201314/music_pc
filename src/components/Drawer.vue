<template>
  <div ref="el">
    <div class="history" v-if="table">
      <div class="list_header">
        <div>
          <h1>播放列表</h1>
          共 {{ historyList?.length }} 首歌曲
        </div>
        <div class="icon_box" @click="remove">
          <el-icon><Delete /></el-icon>
          <span>清空</span>
        </div>
      </div>
      <el-scrollbar height="90%">
        <div>
          <Table :is-show="false" :table-data="historyList" />
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUpdated, ref, watch } from 'vue'
import Table from '@/components/Table.vue'
import { musicStore } from '@/stores/music'
import { storeToRefs } from 'pinia'
import { onClickOutside } from '@vueuse/core'

const store = musicStore()
let { musicArrUrl, musicDetailArr } = storeToRefs(store)

const props = defineProps({
  historyList: {
    type: Object,
    default: () => null
  }
})
const musicListHistory = ref<Object>()
const table = ref<boolean>(false)
onMounted(() => {
  musicListHistory.value = props?.historyList
})

onUpdated(() => {
  musicListHistory.value = props?.historyList
})
const openDrawer = () => {
  table.value = !table.value
}
const remove = () => {
  //使用api批量更新
  store.$patch(() => {
    musicArrUrl.value = []
    musicDetailArr.value = []
  })
}
const el = ref()
const close = () => {
  if (table.value) {
    table.value = false
  }
}
onClickOutside(el, close)

defineExpose({
  openDrawer
})
</script>
<style scoped lang="less">
.history {
  position: absolute;
  right: 0;
  bottom: 73px;
  width: 600px;
  height: 75vh;
  padding: 10px 10px;
  background-color: white;
  z-index: 5;
}

:deep(.el-table) {
  background-color: transparent !important;
  border: 0 !important;
}
:deep(.el-table th) {
  color: rgb(86, 81, 81); /* 字体颜色 */
  font-size: 16px;
  background-color: white !important; /* 背景透明 */
  border: 0;
  height: 30px;
  line-height: 30px;
  border: 0 !important;
}
:deep(.el-table tr, .el-table td) {
  color: #34d399;
  font-size: 12px;
  background-color: white !important; /* 背景透明 */
  border: 0;
  height: 30px;
  line-height: 30px;
}
:deep(.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf) {
  border: 0 !important;
}

:deep(.el-table__inner-wrapper::before) {
  height: 0 !important;
}
:deep(.el-table--enable-row-hover
    .el-table__body
    tr:hover
    > td.el-table__cell) {
  background-color: rgba(225, 225, 255, 0.3) !important;
}

.list_header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .icon_box {
    color: #94a3b8;
    margin-right: 35px;
    display: flex;
    align-items: center;
    span {
      font-size: 14px;
    }
  }
}
.icon_box:hover {
  color: red;
  cursor: pointer;
}
</style>
