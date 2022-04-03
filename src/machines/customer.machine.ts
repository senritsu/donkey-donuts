import { assign, createMachine } from 'xstate'
import type { Customer, Donut, CustomerSatisfaction } from '../types'

interface GiveDonutEvent {
  type: 'GIVE_DONUT'
  value: Donut
}

interface CustomerContext {
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
        events: {} as GiveDonutEvent,
        services: {} as {
          generateCustomer: { data: Customer }
          animateArrival: { data: void }
          animateOrder: { data: void }
          animateFeedback: { data: void }
          animateLeaving: { data: void }
        },
      },
      context: {
        customer,
      },
      states: {
        arriving: {
          invoke: {
            id: 'animateArrival',
            src: 'animateArrival',
            onDone: 'ordering',
          },
        },
        ordering: {
          invoke: {
            id: 'animateOrder',
            src: 'animateOrder',
            onDone: 'waiting',
          },
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
          invoke: {
            id: 'animateFeedback',
            src: 'animateFeedback',
            onDone: 'leaving',
          },
        },
        leaving: {
          invoke: {
            id: 'animateLeaving',
            src: 'animateLeaving',
            onDone: 'gone',
          },
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
      services: {
        animateArrival: () => Promise.resolve(),
        animateOrder: () => Promise.resolve(),
        animateFeedback: () => Promise.resolve(),
        animateLeaving: () => Promise.resolve(),
      },
    }
  )
