type Reverse<T extends string> = T extends `${infer Head}${infer Tail}` 
  ? `${Reverse<Tail>}${Head}`
  : ''
