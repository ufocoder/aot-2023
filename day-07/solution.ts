type GoodKey<T> = T extends string ? `good_${T}`: T;

export type AppendGood<T> = {
  [P in keyof T as GoodKey<P>]: T[P]
}
