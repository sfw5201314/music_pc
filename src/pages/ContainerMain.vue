<template>
  <div class="container-main">
    <ConTainMainLeft />
    <div class="container-mainRight">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import ConTainMainLeft from '../components/ContainerMainLeft.vue'
</script>
<style lang="scss" scoped></style>
