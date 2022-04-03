import Chance from 'chance'

import type { Donut, Customer } from './types'

const chance = new Chance()

export function generateDonut(): Donut {
  return {
    base: chance.pickone(['donut_1', 'donut_2', 'donut_3']),
    frosting: chance.pickone([
      'glazing_1',
      'glazing_2',
      'glazing_3',
      'glazing_4',
      'glazing_5',
      'glazing_6',
      'glazing_zigzag_1',
      'glazing_zigzag_2',
      'glazing_zigzag_3',
      'glazing_zigzag_4',
    ]),
    topping: chance.pickone([
      'none',
      'sprinkles_1',
      'sprinkles_2',
      'sprinkles_3',
      'sprinkles_4',
      'sprinkles_5',
      'stripes_1',
      'stripes_2',
      'stripes_3',
      'stripes_4',
    ]),
  }
}

export function generateCustomer(): Customer {
  return {
    animal: chance.pickone([
      'bear',
      'buffalo',
      'chick',
      'chicken',
      'cow',
      'crocodile',
      'dog',
      'duck',
      'elephant',
      'frog',
      'giraffe',
      'goat',
      'gorilla',
      'hippo',
      'horse',
      'monkey',
      'moose',
      'narwhal',
      'owl',
      'panda',
      'parrot',
      'penguin',
      'pig',
      'rabbit',
      'rhino',
      'sloth',
      'snake',
      'walrus',
      'whale',
      'zebra',
    ]),
    order: generateDonut(),
  }
}
