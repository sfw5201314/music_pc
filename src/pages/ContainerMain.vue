<template>
  <div class="container-main">
    <ConTainMainLeft />
    <div class="container-mainRight">
      <router-view></router-view>
      <!-- <ContainerMainRight /> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import ContainerMainRight from "./ContainerMainRight.vue";
import ConTainMainLeft from "../components/ContainerMainLeft.vue";
</script>
<style lang="scss" scoped>
</style>