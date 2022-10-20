<template>
  <div class="container">
    <div class="main">
      <div class="header">
        <div class="header-left">
          <img src="./images/QQ截图20220521220541.png" alt="" />
        </div>
        <div class="header-right">
          <div class="search">
            <input type="text" placeholder="搜索歌曲,艺术家等...." />
            <label>搜索</label>
          </div>
        </div>
      </div>
      <ContainerMain />
      <MusicControl />
    </div>
  </div>
</template>
<script setup lang="ts">
import ContainerMain from "../pages/ContainerMain.vue";
import MusicControl from "./MusicControl.vue";
</script>
<style lang="less" scoped>
</style>