type Letters = '🛹' | '🚲' | '🛴' | '🏄'

type NextLetter = {
    '🏄': '🛹', 
    '🛹': '🚲', 
    '🚲': '🛴', 
    '🛴': '🏄'
}

type List<Size extends number, Letter extends Letters, Accumulator extends any[] = []> 
    = Accumulator['length'] extends Size
    ? Accumulator 
    : List<Size, Letter, [...Accumulator, Letter]>

type _Rebuild<T extends number[], Letter extends Letters = '🏄', Accumulator extends any[] = []> 
    = T extends [infer Head extends number, ...infer Tail extends number[]]
        ? _Rebuild<Tail, NextLetter[Letter], [...Accumulator, ...List<Head, NextLetter[Letter]>]>
        : Accumulator

export type Rebuild<T extends number[]> = _Rebuild<T>