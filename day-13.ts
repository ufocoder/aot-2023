type List<N extends number, T extends any[] = []> 
  = T['length'] extends N 
    ? T 
    : List<N, [...T, any]>

type Increment<N extends number> 
  = [...List<N>, any]['length'] extends infer Length
    ? Length extends number
      ? Length
      : never
    : never;

type DayCounter<From extends number, To extends number>
  = To extends From 
    ? To 
    : From | DayCounter<Increment<From>, To>
