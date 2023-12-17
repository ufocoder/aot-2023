export type DecipherNaughtyList<T extends string> 
  = T extends `${infer Head}/${infer Tail}`
    ? Head | DecipherNaughtyList<Tail>
    : T;