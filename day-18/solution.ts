export type Count<T extends any[], Letter extends any, Accumulator extends any[] = []> 
  = T extends [infer Head, ...infer Tail]
    ? Head extends Letter
      ? Count<Tail, Letter, [...Accumulator, true]>
      : Count<Tail, Letter, Accumulator>
    : Accumulator['length']
