type Box<Toy extends string, N extends number, T extends string[] = []>
  = T['length'] extends N
    ? T
    : Box<Toy, N, [...T, Toy]>

export type BoxToys<Toy extends string, N> =
    N extends number ? Box<Toy, N> : never;
