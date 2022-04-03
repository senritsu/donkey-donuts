import { assign, createMachine } from 'xstate'
import type { Customer, Donut, CustomerSatisfaction } from '../types'

export interface GiveDonutEvent {
  type: 'GIVE_DONUT'
  value: Donut
}

export interface AnimationFinishedEvent {
  type: 'ANIMATION_FINISHED'
}

export interface CustomerContext {
  customer: Customer
  givenDonut?: Donut
  satisfaction?: CustomerSatisfaction
}

export function determineSatisfaction(customer: Customer, donut: Donut) {
  const matches = [
    customer.order.base === donut?.base,
    customer.order.frosting === donut?.frosting,
    customer.order.topping === donut?.topping,
  ]

  console.log({ order: customer.order, donut, matches })

  const count = matches.filter((x) => x).length

  switch (count) {
    case 1:
    case 2:
      return 'ok'
    case 3:
      return 'perfect'
    default:
      return 'bad'
  }
}

export const createCustomerMachine = (customer: Customer) =>
  createMachine(
    {
      id: 'customer',
      initial: 'arriving',
      tsTypes: {} as import('./customer.machine.typegen').Typegen0,
      schema: {
        context: {} as CustomerContext,
        events: {} as GiveDonutEvent | AnimationFinishedEvent,
      },
      context: {
        customer,
      },
      states: {
        arriving: {
          on: { ANIMATION_FINISHED: 'ordering' },
        },
        ordering: {
          on: { ANIMATION_FINISHED: 'waiting' },
        },
        waiting: {
          on: {
            GIVE_DONUT: {
              actions: ['receiveDonut'],
              target: 'givingFeedback',
            },
          },
        },
        givingFeedback: {
          on: { ANIMATION_FINISHED: 'leaving' },
        },
        leaving: {
          on: { ANIMATION_FINISHED: 'gone' },
        },
        gone: {
          type: 'final',
        },
      },
    },
    {
      actions: {
        receiveDonut: assign<CustomerContext, GiveDonutEvent>(
          (context, event) => ({
            givenDonut: event.value,
            satisfaction: determineSatisfaction(context.customer, event.value),
          })
        ),
      },
    }
  )
