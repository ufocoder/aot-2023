type FindIndex<T extends any[], Accumulator extends any[] = []> 
  = T extends [infer Head, ...infer Tail]
    ? Head extends '🎅🏼'
      ? Accumulator['length']
      : FindIndex<Tail, [...Accumulator, false]>
    : false

type MapRows<T extends any[], Accumulator extends any[] = []>
  = T extends [infer Head, ...infer Tail]
    ? Head extends any[]
      ? MapRows<Tail, [...Accumulator, FindIndex<Head>]>
      : MapRows<Tail, [...Accumulator, false]>
    : Accumulator;

type FindRow<T extends any[], Accumulator extends any[] = []>
  = T extends [infer Head, ...infer Tail]
    ? Head extends number
      ? [Accumulator['length'], Head]
      : FindRow<Tail, [...Accumulator, any]>
    : never

type FindSanta<T extends any[]> = FindRow<MapRows<T>>
