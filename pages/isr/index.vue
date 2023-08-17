<script setup lang="ts">
console.log('running ISR setup...')
const { data: time } = useAsyncData(async () => new Date().toLocaleString('ja'))
</script>

<template>
  <div class="wrapper">
    <h1>Hello ISR!!</h1>
    <p>time: {{ time }}</p>
  </div>
</template>
