// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true
  eventsCausingActions: {
    receiveDonut: 'GIVE_DONUT'
  }
  internalEvents: {
    'done.invoke.animateArrival': {
      type: 'done.invoke.animateArrival'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'done.invoke.animateFeedback': {
      type: 'done.invoke.animateFeedback'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'xstate.init': { type: 'xstate.init' }
    'error.platform.animateArrival': {
      type: 'error.platform.animateArrival'
      data: unknown
    }
    'done.invoke.animateOrder': {
      type: 'done.invoke.animateOrder'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'error.platform.animateOrder': {
      type: 'error.platform.animateOrder'
      data: unknown
    }
    'error.platform.animateFeedback': {
      type: 'error.platform.animateFeedback'
      data: unknown
    }
    'done.invoke.animateLeaving': {
      type: 'done.invoke.animateLeaving'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'error.platform.animateLeaving': {
      type: 'error.platform.animateLeaving'
      data: unknown
    }
  }
  invokeSrcNameMap: {
    animateArrival: 'done.invoke.animateArrival'
    animateOrder: 'done.invoke.animateOrder'
    animateFeedback: 'done.invoke.animateFeedback'
    animateLeaving: 'done.invoke.animateLeaving'
  }
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingServices: {
    animateArrival: 'xstate.init'
    animateOrder: 'done.invoke.animateArrival'
    animateFeedback: 'GIVE_DONUT'
    animateLeaving: 'done.invoke.animateFeedback'
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates:
    | 'arriving'
    | 'ordering'
    | 'waiting'
    | 'givingFeedback'
    | 'leaving'
    | 'gone'
  tags: never
}
