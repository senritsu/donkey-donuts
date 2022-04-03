<script setup lang="ts">
import type { Customer, EmoteType } from '../types'
import Donut from './Donut.vue'
import Emote from './Emote.vue'

defineProps<{
  customer: Customer
  emote?: EmoteType
  isOrdering: boolean
}>()
</script>

<template>
  <div class="animal">
    <Emote class="emote" v-if="emote" v-bind="{ emote }" />
    <Emote class="emote" v-else>
      <Donut class="order" :donut="customer.order"></Donut>
    </Emote>
    <div class="avatar">
      <img :src="`/animals/${customer.animal}.png`" alt="" />
    </div>
  </div>
</template>

<style scoped>
.animal {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar {
  width: 8em;
  height: 8em;
  margin: 1em;
  margin-top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.animal > .avatar > img {
  max-width: 100%;
  max-height: 100%;
}
.emote {
  font-size: 2em;
}
.donut {
  font-size: 1.5em;
}
</style>
