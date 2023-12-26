/** because "dashing" implies speed */
type Dasher = '💨';

/** representing dancing or grace */
type Dancer = '💃';

/** a deer, prancing */
type Prancer = '🦌';

/** a star for the dazzling, slightly mischievous Vixen */
type Vixen = '🌟';

/** for the celestial body that shares its name */
type Comet = '☄️';

/** symbolizing love, as Cupid is the god of love */
type Cupid = '❤️';

/** representing thunder, as "Donner" means thunder in German */
type Donner = '🌩️';

/** meaning lightning in German, hence the lightning bolt */
type Blitzen = '⚡';

/** for his famous red nose */
type Rudolph = '🔴';

type Reindeer = Dasher | Dancer | Prancer | Vixen | Comet | Cupid | Donner | Blitzen | Rudolph;

type Sudoku = Reindeer[][][]

type ValidateRow<T extends Reindeer[]>
    = T extends [infer Column extends Reindeer, ...infer Columns extends Reindeer[]]
    ? Column extends Columns[number] 
      ? false
      : ValidateRow<Columns>
    : true;

type ValidateRows<T extends Reindeer[][]>
    = T extends [infer Row extends Reindeer[], ...infer Rows extends Reindeer[][]]
    ? ValidateRow<Row> extends false
        ? false
        : ValidateRows<Rows>
    : true

type FlatRow<T extends Reindeer[][], Accumulator extends Reindeer[] = []> 
    = T extends [infer Column extends Reindeer[], ...infer Columns extends Reindeer[][]]
    ? FlatRow<Columns, [...Accumulator, ...Column]>
    : Accumulator

type FlatSudoku<T extends Reindeer[][][], Accumulator extends Reindeer[][] = []> 
    = T extends [infer Columns extends Reindeer[][], ...infer OtherColumns extends Reindeer[][][]]
    ? FlatSudoku<OtherColumns, [...Accumulator, FlatRow<Columns>]>
    : Accumulator

type TransposeMatrix<M extends Reindeer[][]> = {
  [X in keyof M]: {
    [Y in keyof M]: X extends keyof M[Y] ? M[Y][X] : never;
  };
};

type ValidateColumns<T extends Reindeer[][]>
    = ValidateRows<TransposeMatrix<T>>

type ValidateSubregions<T extends Sudoku> = T extends [
    [
      infer H1 extends Reindeer[],
      infer H2 extends Reindeer[],
      infer H3 extends Reindeer[],
    ],
    [
      infer H4 extends Reindeer[],
      infer H5 extends Reindeer[],
      infer H6 extends Reindeer[],
    ],
    [
      infer H7 extends Reindeer[],
      infer H8 extends Reindeer[],
      infer H9 extends Reindeer[],
    ],
    /// second group
    [
      infer H10 extends Reindeer[],
      infer H11 extends Reindeer[],
      infer H12 extends Reindeer[],
    ],
    [
      infer H13 extends Reindeer[],
      infer H14 extends Reindeer[],
      infer H15 extends Reindeer[],
    ],
    [
      infer H16 extends Reindeer[],
      infer H17 extends Reindeer[],
      infer H18 extends Reindeer[],
    ],
    /// third group
    [
      infer H19 extends Reindeer[],
      infer H20 extends Reindeer[],
      infer H21 extends Reindeer[],
    ],
    [
      infer H22 extends Reindeer[],
      infer H23 extends Reindeer[],
      infer H24 extends Reindeer[],
    ],
    [
      infer H25 extends Reindeer[],
      infer H26 extends Reindeer[],
      infer H27 extends Reindeer[],
    ],
  ]
  ? ValidateRow<[...H1, ...H4, ...H7]> extends true
    ? ValidateRow<[...H2, ...H5, ...H8]> extends true
        ? ValidateRow<[...H3, ...H6, ...H9]> extends true
        ? ValidateRow<[...H10, ...H13, ...H16]> extends true
            ? ValidateRow<[...H11, ...H14, ...H17]> extends true
            ? ValidateRow<[...H12, ...H15, ...H18]> extends true
                ? ValidateRow<[...H19, ...H22, ...H25]> extends true
                ? ValidateRow<[...H20, ...H23, ...H26]> extends true
                    ? ValidateRow<[...H21, ...H24, ...H27]> extends true
                    ? true
                    : false
                    : false
                : false
                : false
            : false
            : false
        : false
        : false
    : false
  : never

export type Validate<T extends Sudoku> = 
  ValidateRows<FlatSudoku<T>> extends true
  ? true
  : ValidateColumns<FlatSudoku<T>> extends true
    ? true
    : ValidateSubregions<T>
