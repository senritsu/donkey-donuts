import { describe, it, expect } from 'vitest'
import { interpret } from 'xstate'
import { Customer, Donut } from '../types'
import { createCustomerMachine } from './customer.machine'

describe.concurrent('customer', () => {
  const customer: Customer = {
    animal: 'bear',
    order: {
      base: 'donut_1',
      frosting: 'glazing_1',
      topping: 'sprinkles_1',
    },
  }

  const setup = () => {
    const service = interpret(createCustomerMachine(customer)).start()

    service.send('ANIMATION_FINISHED')
    service.send('ANIMATION_FINISHED')

    return service
  }

  it('waits to be given a donut', async () => {
    const service = setup()

    expect(service.state.value).toBe('waiting')

    service.send('ANIMATION_FINISHED')
    service.send('ANIMATION_FINISHED')

    expect(service.state.value).toBe('waiting')

    service.stop()
  })

  it('records bad feedback for completely different donut', async () => {
    const service = setup()

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
    const service = setup()

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
    const service = setup()

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
    const service = setup()

    service.send({ type: 'GIVE_DONUT', value: customer.order })

    expect(service.state.context.satisfaction).toBe('perfect')

    service.stop()
  })

  it('finishes after donut has been given and all animations are done', async () => {
    const service = setup()

    service.send({ type: 'GIVE_DONUT', value: customer.order })

    service.send('ANIMATION_FINISHED')
    service.send('ANIMATION_FINISHED')

    expect(service.state.value).toBe('gone')

    service.stop()
  })
})
