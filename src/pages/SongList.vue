<template>
  <div class="container">
    Changes with dark/light mode.
    <button @click="toggleDark()">
      Enable {{ isDark ? 'Light' : 'Dark' }} Mode
    </button>
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
<style scoped lang="less">
.dark .container {
  background: slategrey;
  color: white;
  border-color: black;
}

.dark button {
  background: lightgrey;
  color: black;
}

.dark body {
  background: darkgrey;
}
</style>
