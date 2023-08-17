<script setup lang="ts">
console.log('running SWR setup...')
const { data: time } = useAsyncData(async () => new Date().toLocaleString('ja'))
</script>

<template>
  <div class="wrapper">
    <h1>Hello SWR!!</h1>
    <p>time: {{ time }}</p>
  </div>
</template>
