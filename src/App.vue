<script setup lang="ts">
import { ref } from 'vue'
import CustomerInteraction from './components/CustomerInteraction.vue'
import DonutComponent from './components/Donut.vue'
import type { Donut } from './types'

import { generateDonut } from './generate'

const seed = ref(Math.random())
let donuts = ref<Donut[]>([])
const selectedDonut = ref<Donut>()

const nextCustomer = () => {
  seed.value = Math.random()
  selectedDonut.value = undefined
  donuts.value = Array.from({ length: 12 }).map(generateDonut)
}

nextCustomer()
</script>

<template>
  <CustomerInteraction
    :key="seed"
    @ordered="selectedDonut = undefined"
    @gone="nextCustomer"
    :donut="selectedDonut"
  ></CustomerInteraction>
  <div :key="seed" class="donuts">
    <DonutComponent
      v-for="donut in donuts"
      v-bind="{ donut }"
      @click.native="selectedDonut = donut"
    ></DonutComponent>
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
