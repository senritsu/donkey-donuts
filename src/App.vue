<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { onBeforeUnmount, ref } from 'vue'
import Donut from './components/Donut.vue'
import AnimalAvatar from './components/AnimalAvatar.vue'

import type { Customer } from './types'

import { generateDonut, generateCustomer } from './generate'

const customers = [
  generateCustomer(),
  generateCustomer(),
  generateCustomer(),
] as Customer[]

const seed = ref(Math.random())

const interval = setInterval(() => {
  seed.value = Math.random()
}, 2500)

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<template>
  <div class="animals">
    <AnimalAvatar
      v-for="(customer, i) in customers"
      :key="i"
      v-bind="{
        customer,
        isOrdering: true,
        emote: Math.random() < 0.5 ? 'heart' : undefined,
      }"
    ></AnimalAvatar>
  </div>
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

.donuts {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  font-size: 10em;
}

.animals {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
