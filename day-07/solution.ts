export type AppendKey<T> = T extends string ? `good_${T}`: T;

export type AppendGood<T> = {
  [P in keyof T as AppendKey<P>]: T[P]
}
