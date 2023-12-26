type Connect4Empty = '  '
type Connect4Chips = '🔴' | '🟡';
type Connect4Cell = Connect4Chips | Connect4Empty;
type Connect4State = '🔴' | '🟡' | '🔴 Won' | '🟡 Won' | 'Draw';
type Connect4Board = Connect4Cell[][];
type Connect4Game = {
    board: Connect4Board,
    state: Connect4State,
}

type EmptyBoard = [
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
];

export type NewGame = {
  board: EmptyBoard;
  state: "🟡";
};


type NextGame<
  NextBoard extends Connect4Board, 
  NextState extends Connect4State
> = {
  board: NextBoard, 
  state: NextState
}

// prepare board 

type FindRow<
  Board extends Connect4Board, 
  Column extends number, 
  Accumulator extends 0[] = []
>
  = Board extends [...infer TopRows extends Connect4Board, infer BottomRow extends Connect4Cell[]]
  ? BottomRow[Column] extends "  "
    ? Accumulator["length"]
    : FindRow<TopRows, Column, [0, ...Accumulator]>
  : never;

type ChangeRow<
  Board extends Connect4Board, 
  Row extends number, 
  Column extends number, 
  Value extends Connect4Chips, 
  Accumulator extends Connect4Board = []
>
  = Board extends [...infer TopRows extends Connect4Board, infer BottomRow extends Connect4Cell[]]
  ? Accumulator["length"] extends Row
    ? [...TopRows, ChangeColumn<BottomRow, Column, Value>, ...Accumulator]
    : ChangeRow<TopRows, Row, Column, Value, [BottomRow, ...Accumulator]>
  : Board;
  
type ChangeColumn<
  Board extends any[], 
  Index extends number, 
  Value extends Connect4Chips, 
  Accumulator extends Connect4Cell[] = []
> 
  = Board extends [infer Head extends Connect4Cell, ...infer Columns extends Connect4Cell[]]
  ? Accumulator["length"] extends Index
    ? [...Accumulator, Value, ...Columns]
    : ChangeColumn<Columns, Index, Value, [...Accumulator, Head]>
  : Board;

// rows

type CheckRows<T extends Connect4Board, Value extends Connect4Chips>
  = T extends [infer First extends any[], ...infer Rest extends Connect4Board]
  ? CheckRow<First, Value> extends true
    ? true
    : CheckRows<Rest, Value>
  : false;

type CheckRow<Row extends Connect4Cell[], Value extends Connect4Chips>
  = Row extends [
    infer Column1 extends Connect4Cell, 
    infer Column2 extends Connect4Cell, 
    infer Column3 extends Connect4Cell, 
    infer Column4 extends Connect4Cell, 
    ...infer OtherColumns extends Connect4Cell[]
  ]
  ? [Column1, Column2, Column3, Column4] extends [Value, Value, Value, Value]
    ? true
    : CheckRow<[Column2, Column3, Column4, ...OtherColumns], Value>
  : false;

// cols 

type CheckColums<
  Board extends Connect4Board,
  Value extends Connect4Chips,
  Column extends number
> = Board extends [
  infer Row1 extends Connect4Cell[],
  infer Row2 extends Connect4Cell[],
  infer Row3 extends Connect4Cell[],
  infer Row4 extends Connect4Cell[],
  ...infer Rows extends any[][]
]
  ? [Row1[Column], Row2[Column], Row3[Column], Row4[Column]] extends [Value, Value, Value, Value]
    ? true
    : CheckColums<[Row2, Row3, Row4, ...Rows], Value, Column>
  : false;

// diagonal ispired by https://github.com/erhant/aot-2023/blob/main/src/23.ts

type CheckDiagonalUp<
  Board extends Connect4Board,
  Value extends Connect4Chips
> = Board extends [
  infer Row1 extends Connect4Cell[],
  infer Row2 extends Connect4Cell[],
  infer Row3 extends Connect4Cell[],
  infer Row4 extends Connect4Cell[],
  ...infer Rows extends Connect4Board
]
  ? Row2 extends [any, ...infer Row2Columns extends Connect4Cell[]]
    ? Row3 extends [any, any, ...infer Row3Columns extends Connect4Cell[]]
      ? Row4 extends [any, any, any, ...infer Row4Columns extends Connect4Cell[]]
        ? CheckQuad<Row1, Row2Columns, Row3Columns, Row4Columns, Value> extends true
          ? true
          : CheckDiagonalUp<[Row2, Row3, Row4, ...Rows], Value>
        : false
      : false
    : false
  : false;


type CheckDiagonalDown<
  Board extends Connect4Board,
  Value extends Connect4Chips
> = Board extends [
    infer Row1 extends Connect4Cell[],
    infer Row2 extends Connect4Cell[],
    infer Row3 extends Connect4Cell[],
    infer Row4 extends Connect4Cell[],
    ...infer Rows extends Connect4Board
]
  ? Row3 extends [any, ...infer Row3Columns extends Connect4Cell[]]
    ? Row2 extends [any, any, ...infer Row2Columns extends Connect4Cell[]]
      ? Row1 extends [any, any, any, ...infer Row1Columns extends Connect4Cell[]]
        ? CheckQuad<Row1Columns, Row2Columns, Row3Columns, Row4, Value> extends true
          ? true
          : CheckDiagonalDown<[Row2, Row3, Row4, ...Rows], Value>
        : false
      : false
    : false
  : false;

type CheckQuad<
  Row1 extends Connect4Cell[],
  Row2 extends Connect4Cell[],
  Row3 extends Connect4Cell[],
  Row4 extends Connect4Cell[],
  Value extends Connect4Cell,
  Accumulator extends 0[] = [],
  Index extends number = Accumulator["length"]
> = Row1["length"] extends Index
  ? false
  : [Row1[Index], Row2[Index], Row3[Index], Row4[Index]] extends [Value, Value, Value, Value]
  ? true
  : CheckQuad<Row1, Row2, Row3, Row4, Value, [...Accumulator, 0]>;

// draw

type RowHasEmptyCell<Row extends Connect4Cell[]> = 
  Row extends [infer Cell, ...infer Cells extends Connect4Cell[]]
  ? Cell extends Connect4Empty
    ? true
    : RowHasEmptyCell<Cells>
  : false

type CheckDraw<T extends Connect4Cell[][]> = 
  T extends [infer Row extends Connect4Cell[], ...infer OtherRows extends Connect4Board]
	? RowHasEmptyCell<Row> extends true
		? false
		: CheckDraw<OtherRows>
	: true;

type ToogleChip<State extends Connect4Chips> 
  = State extends '🔴' ? '🟡' : '🔴'  

type CheckGame<
  Board extends Connect4Board,
  State extends Connect4Chips,
  Column extends number,
  Row extends number = FindRow<Board, Column>,
  NextBoard extends Connect4Board = ChangeRow<Board, Row, Column, State>,
>
  = CheckRows<NextBoard, State> extends true
  ? NextGame<NextBoard, `${State} Won`>
  : CheckDraw<NextBoard> extends true 
    ? NextGame<NextBoard, 'Draw'>
    : CheckDiagonalDown<NextBoard, State> extends true
      ? NextGame<NextBoard, `${State} Won`>
      : CheckDiagonalUp<NextBoard, State> extends true
        ? NextGame<NextBoard, `${State} Won`>
        : NextGame<NextBoard, ToogleChip<State>>

export type Connect4<
  Game extends Connect4Game,
	Column extends number,
>
  = Game['state'] extends '🔴' | '🟡'
  ? CheckGame<Game['board'], Game['state'], Column>
  : Game
  