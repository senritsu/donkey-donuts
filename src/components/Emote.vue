<script setup lang="ts">
import type { EmoteType } from '../types'

withDefaults(
  defineProps<{
    emote?: EmoteType
  }>(),
  {
    emote: '_',
  }
)
</script>

<template>
  <div class="emote">
    <div class="grid">
      <img :src="`/emotes/emote_${emote}.png`" alt="" />
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.emote > .grid {
  display: grid;
  grid-template: 3em / 3em;
  margin: 0.5em;
  place-items: center;
}

.emote > .grid > * {
  grid-area: 1 / 1 / 2 / 2;
}

.emote > .grid > img {
  width: 70%;
  align-self: end;
}
</style>
