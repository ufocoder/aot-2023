type List<Size extends number, Letter extends any, Accumulator extends any[] = []> 
    = Accumulator['length'] extends Size
    ? Accumulator 
    : List<Size, Letter, [...Accumulator, Letter]>

type Increment<N extends number>
  = [...List<N, any>, any]['length'] extends infer Length
    ? Length extends number
        ? Length
        : never
    : never;

type Letter = '🛹' | '🚲' | '🛴' | '🏄'
type LetterNextMap = {
    '🏄': '🛹', 
    '🛹': '🚲', 
    '🚲': '🛴', 
    '🛴': '🏄'
}

type SelectLetter<T extends number, L extends Letter = '🛹', C extends number = 0> 
    = T extends C 
    ? L
    : LetterNextMap[L] extends Letter
        ? SelectLetter<T, LetterNextMap[L], Increment<C>>
        : never

type Build<T extends number, C extends number> = List<T, SelectLetter<C>>

export type Rebuild<T extends number[], Counter extends number = 0, Accumulator extends any[] = []> 
    = T extends [infer Head extends number, ...infer Tail extends number[]]
        ? Rebuild<Tail, Increment<Counter>, [...Accumulator, ...Build<Head, Counter>]>
        : Accumulator