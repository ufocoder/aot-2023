type FilterStartingWith<T> = T extends `naughty_${string}` ? never : T

type RemoveNaughtyChildren<T> = {
  [P in keyof T as FilterStartingWith<P>]: T[P]
}
