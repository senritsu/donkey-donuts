<script setup lang="ts">
import Chance from 'chance'
import { useMachine } from '@xstate/vue'
import { computed, toRef, watch, watchEffect } from 'vue'

import type { EmoteType, Donut } from '../types'
import { generateCustomer } from '../generate'
import { createCustomerMachine } from '../machines/customer.machine'

import AnimalAvatar from './AnimalAvatar.vue'
import { wait } from '../machines/helpers'

const props = defineProps<{
  donut?: Donut
}>()

const emit = defineEmits<{
  (e: 'ordered'): void
  (e: 'gone'): void
  (e: 'accepted', donut: Donut): void
}>()

const chance = new Chance()

const customer = generateCustomer()

const { state, send } = useMachine(createCustomerMachine(customer))

const emote = computed<EmoteType | undefined>(() => {
  if (state.value.matches('arriving'))
    return chance.pickone(['alert', 'exclamation', 'faceHappy'])
  if (state.value.matches('ordering')) return undefined
  if (state.value.matches('waiting')) return undefined
  if (state.value.matches('givingFeedback')) {
    switch (state.value.context.satisfaction) {
      case 'ok':
        return 'hearts'
      case 'perfect':
        return 'heart'
      default:
        return 'faceSad'
    }
  }
  if (state.value.matches('leaving')) return 'stars'

  return '_'
})

const start = async () => {
  await wait(2)
  send('ANIMATION_FINISHED')
  send('ANIMATION_FINISHED')
  emit('ordered')
}

watch(toRef(props, 'donut'), async (donut) => {
  if (!state.value.matches('waiting')) return

  if (donut) {
    send({ type: 'GIVE_DONUT', value: donut })
    // emit('received', donut)
  }
  await wait(1)
  send('ANIMATION_FINISHED')
  await wait(1)
  send('ANIMATION_FINISHED')
})

watchEffect(() => {
  if (state.value.matches('gone')) {
    emit('gone')
  }
})

start()
</script>

<template>
  <div
    class="interaction"
    :class="{
      arriving: state.matches('arriving'),
      feedback: state.matches('givingFeedback'),
      leaving: state.matches('leaving'),
    }"
  >
    <AnimalAvatar v-bind="{ customer, emote }"></AnimalAvatar>
  </div>
</template>

<style scoped>
.interaction.arriving {
  animation: 0.3s linear 1s wiggle infinite, 1s ease-out arrive;
}

.interaction.feedback {
  animation: 0.4s linear feedback infinite;
}

.interaction.leaving {
  animation: 1s ease-in leave;
}

@keyframes wiggle {
  0% {
    transform: rotate(-3deg);
  }
  50% {
    transform: rotate(3deg);
  }
  100% {
    transform: rotate(-3deg);
  }
}

@keyframes feedback {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes arrive {
  0% {
    transform: translateX(-60vw);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes leave {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(60vw);
  }
}
</style>
