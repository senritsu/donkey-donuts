import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import { interpret } from 'xstate'
import { Customer, Donut } from '../types'
import { createCustomerMachine } from './customer.machine'
import { wait } from './helpers'

describe('customer', () => {
  const customer: Customer = {
    animal: 'bear',
    order: {
      base: 'donut_1',
      frosting: 'glazing_1',
      topping: 'sprinkles_1',
    },
  }

  const config = {
    services: {
      animateArrival: () => Promise.resolve(),
      animateOrder: () => Promise.resolve(),
      animateFeedback: () => Promise.resolve(),
      animateLeaving: () => Promise.resolve(),
    },
  }

  it('waits to be given a donut', async () => {
    const service = interpret(
      createCustomerMachine(customer).withConfig(config)
    ).start()

    await wait(0.1)

    expect(service.state.value).toBe('waiting')

    await wait(0.2)

    expect(service.state.value).toBe('waiting')

    service.stop()
  })

  it('records bad feedback for completely different donut', async () => {
    const service = interpret(
      createCustomerMachine(customer).withConfig(config)
    ).start()

    await wait(0.01)

    const donut: Donut = {
      base: 'donut_2',
      frosting: 'glazing_2',
      topping: 'sprinkles_2',
    }

    service.send({ type: 'GIVE_DONUT', value: donut })

    expect(service.state.context.satisfaction).toBe('bad')

    service.stop()
  })

  it('records bad feedback for mostly different donut', async () => {
    const service = interpret(
      createCustomerMachine(customer).withConfig(config)
    ).start()

    await wait(0.01)

    const donut: Donut = {
      base: 'donut_2',
      frosting: 'glazing_2',
      topping: 'sprinkles_1',
    }

    service.send({ type: 'GIVE_DONUT', value: donut })

    expect(service.state.context.satisfaction).toBe('bad')

    service.stop()
  })

  it('records "ok" feedback for halfway decent donut', async () => {
    const service = interpret(
      createCustomerMachine(customer).withConfig(config)
    ).start()

    await wait(0.01)

    const donut: Donut = {
      base: 'donut_1',
      frosting: 'glazing_1',
      topping: 'sprinkles_2',
    }

    service.send({ type: 'GIVE_DONUT', value: donut })

    expect(service.state.context.satisfaction).toBe('ok')

    service.stop()
  })

  it('records "perfect" feedback for exactly the requested donut', async () => {
    const service = interpret(
      createCustomerMachine(customer).withConfig(config)
    ).start()

    await wait(0.01)

    service.send({ type: 'GIVE_DONUT', value: customer.order })

    expect(service.state.context.satisfaction).toBe('perfect')

    service.stop()
  })

  it('finishes after donut has been given and all animations are done', async () => {
    const service = interpret(
      createCustomerMachine(customer).withConfig(config)
    ).start()

    await wait(0.01)

    service.send({ type: 'GIVE_DONUT', value: customer.order })

    await wait(0.01)

    expect(service.state.value).toBe('gone')

    service.stop()
  })
})
