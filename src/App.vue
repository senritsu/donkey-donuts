<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { onBeforeUnmount, ref } from 'vue'
import Donut from './components/Donut.vue'

import generateDonut from './generate-donut'

const seed = ref(Math.random())

const interval = setInterval(() => {
  seed.value = Math.random()
}, 2500)

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div :key="seed" class="donuts">
    <Donut v-for="i in 15" :donut="generateDonut()"></Donut>
  </div>
</template>

<style>
body {
  background-color: rgb(29, 28, 28);
  margin: 0;
}

html,
body,
#app {
  width: 100vw;
  height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #487980;
}

#app img {
  margin: 4em;
}

.donuts {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  font-size: 10em;
}
</style>
