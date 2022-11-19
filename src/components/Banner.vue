<template>
  <div class="banner">
    <el-carousel
      :interval="4000"
      type="card"
      v-if="imgUrl?.length !== 0"
      height="200px"
    >
      <el-carousel-item v-for="(item, index) in imgUrl" :key="index">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
import { stringLiteral } from '@babel/types'

defineProps({
  imgUrl: {
    type: Object,
    default: () => []
  }
})
</script>
<style scoped lang="less">
img {
  height: 100%;
  width: 100%;
}
</style>
