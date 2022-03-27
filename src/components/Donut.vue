<script setup lang="ts">
import { Donut } from '../types'

defineProps<{
  donut: Donut
}>()
</script>

<template>
  <div class="donut">
    <img class="base" :src="`/donuts/${donut.base}.png`" alt="" />
    <img class="frosting" :src="`/donuts/${donut.frosting}.png`" alt="" />
    <img
      v-if="donut.topping !== 'none'"
      class="topping"
      :src="`/donuts/${donut.topping}.png`"
      alt=""
    />
  </div>
</template>

<style scoped>
.donut {
  display: grid;
  grid-template-rows: 1em;
  grid-template-columns: 1em;
  place-items: center;
}

.donut img {
  grid-area: 1 / 1 / 2 / 2;
}

.base {
  width: 1em;
  height: 1em;
}

.frosting {
  width: 0.85em;
  height: 0.85em;
}

.topping {
  width: 0.85em;
  height: 0.85em;
}
</style>
