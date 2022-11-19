<template>
  <div>
    <el-table
      :data="tableData"
      @row-dblclick="rowClick"
      height="90%"
      style="width: 100%"
    >
      <el-table-column label="音乐标题" width="250">
        <template v-slot="scope">
          <label>{{ scope.row.name }}</label>
        </template>
      </el-table-column>
      <el-table-column label="歌手" width="250">
        <template v-slot="scope">
          <label @click="edit(scope.row.ar)">{{ scope.row.ar[0].name }}</label>
        </template>
      </el-table-column>
      <el-table-column v-if="isShow" prop="al.name" label="专辑" width="280">
      </el-table-column>
      <el-table-column prop="publishTime" label="时长" />
    </el-table>
    <div class="footer">
      <Pagination :total="total" @page-size="changePageSize" />
      <!-- <audio :src="musicUrl" controls autoplay></audio> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Pagination from '@/components/Pagination.vue'
import { musicStore } from '@/stores/music'
//引入这个使store中state数据具有响应式
import { storeToRefs } from 'pinia'
import { getMusicUrl } from '@/api/getDetailUrl'
defineProps({
  tableData: {
    type: Object,
    default: () => null
  },
  total: {
    type: Number,
    default: 0
  },
  isShow: {
    type: Boolean,
    default: true
  }
})
const emits = defineEmits(['changePage'])
const musicUrl = ref()
const store = musicStore()
let { musicArrUrl, musicDetailArr, recentMusic } = storeToRefs(store)
// onMounted(() => {
//   console.log(props.tableData)
// })
const edit = (row) => {
  // console.log(row)
}

//双击歌曲播放url播放
const rowClick = (row, column, event) => {
  //把歌曲信息加到pinia里面的数组去
  musicDetailArr.value.unshift(row)
  recentMusic.value.push(row)
  // console.log(row.id)
  getUrl(row.id)
}

//获取歌曲url
const getUrl = async (id) => {
  const res = await getMusicUrl(id)
  // console.log(res)
  musicUrl.value = res.data[0].url
  // console.log('url', musicUrl.value)
  //把URL添加到pinia的数组里面去
  musicArrUrl.value.unshift(musicUrl.value)
  // console.log(store.$state.musicArrUrl, audioUrl.value)
}

//分页操作
const changePageSize = (size) => {
  // console.log('🚀', size)
  emits('changePage', size)
}
</script>
<style scoped lang="less">
:deep(.el-table) {
  background-color: transparent !important;
  border: 0 !important;
}
:deep(.el-table th) {
  color: white; /* 字体颜色 */
  font-size: 16px;
  background-color: transparent !important; /* 背景透明 */
  border: 0;
  height: 30px;
  line-height: 30px;
  border: 0 !important;
}
:deep(.el-table tr, .el-table td) {
  color: white;
  font-size: 12px;
  background-color: transparent !important; /* 背景透明 */
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
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
