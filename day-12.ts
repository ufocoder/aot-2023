type FindSanta<T extends any[], Accumulator extends any[] = []> 
  = T extends [infer Head, ...infer Tail]
    ? Head extends '🎅🏼'
      ? Accumulator['length']
      : FindSanta<Tail, [...Accumulator, Head]>
    : never
