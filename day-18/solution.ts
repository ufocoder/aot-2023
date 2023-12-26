export type Count<T extends string[], Letter extends string, Accumulator extends string[] = []> 
  = T extends [infer Head extends string, ...infer Tail extends string[]]
    ? Head extends Letter
      ? Count<Tail, Letter, [...Accumulator, Head]>
      : Count<Tail, Letter, Accumulator>
    : Accumulator['length']
