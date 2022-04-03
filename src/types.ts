export type Base = 'donut_1' | 'donut_2' | 'donut_3'

export type Frosting =
  | 'glazing_1'
  | 'glazing_2'
  | 'glazing_3'
  | 'glazing_4'
  | 'glazing_5'
  | 'glazing_6'
  | 'glazing_zigzag_1'
  | 'glazing_zigzag_2'
  | 'glazing_zigzag_3'
  | 'glazing_zigzag_4'

export type Topping =
  | 'none'
  | 'sprinkles_1'
  | 'sprinkles_2'
  | 'sprinkles_3'
  | 'sprinkles_4'
  | 'sprinkles_5'
  | 'stripes_1'
  | 'stripes_2'
  | 'stripes_3'
  | 'stripes_4'

export interface Donut {
  base: Base
  frosting: Frosting
  topping: Topping
}

export interface Order {
  donuts: Donut[]
}

export type Animal =
  | 'bear'
  | 'buffalo'
  | 'chick'
  | 'chicken'
  | 'cow'
  | 'crocodile'
  | 'dog'
  | 'duck'
  | 'elephant'
  | 'frog'
  | 'giraffe'
  | 'goat'
  | 'gorilla'
  | 'hippo'
  | 'horse'
  | 'monkey'
  | 'moose'
  | 'narwhal'
  | 'owl'
  | 'panda'
  | 'parrot'
  | 'penguin'
  | 'pig'
  | 'rabbit'
  | 'rhino'
  | 'sloth'
  | 'snake'
  | 'walrus'
  | 'whale'
  | 'zebra'

export interface Customer {
  animal: Animal
  order: Donut
  // patience: number
}

export type EmoteType = '_' | 'heart' | 'hearts' | 'faceSad'

export type CustomerSatisfaction = 'perfect' | 'ok' | 'bad'
