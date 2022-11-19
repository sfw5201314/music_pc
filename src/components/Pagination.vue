<template>
  <div>
    <el-pagination
      layout="prev, pager, next"
      :hide-on-single-page="true"
      :total="total"
      :page-size="30"
      @current-change="changePage"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  total: {
    type: Number,
    default: 0
  }
})
const emits = defineEmits(['pageSize'])
const changePage = (size) => {
  // console.log(size)
  emits('pageSize', size)
}
</script>
<style scoped lang="less">
:deep(.el-pagination .btn-next, .el-pagination .btn-prev) {
  background-color: transparent !important;
}
:deep(.el-pager li) {
  background-color: transparent !important;
}
:deep(.el-pagination button:disabled) {
  background-color: transparent !important;
}
:deep(.el-pagination .btn-prev) {
  background-color: transparent !important;
}
</style>
