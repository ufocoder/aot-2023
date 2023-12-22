type TicTacToeChip = '❌' | '⭕';
type TicTacToeEndState = '❌ Won' | '⭕ Won' | 'Draw';
type TicTacToeState = TicTacToeChip | TicTacToeEndState;
type TicTacToeEmptyCell = '  '
type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell;
type TicTacToeYPositions = 'top' | 'middle' | 'bottom';
type TicTacToeXPositions = 'left' | 'center' | 'right';
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`;
type TicTactToeBoard = TicTacToeCell[][];
type TicTacToeGame = {
  board: TicTactToeBoard;
  state: TicTacToeState;
};

type EmptyBoard = [
  ['  ', '  ', '  '], 
  ['  ', '  ', '  '], 
  ['  ', '  ', '  ']
];

export type NewGame = {
  board: EmptyBoard;
  state: '❌';
};

type WinningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

type XtoSIndex = {
    'left': '0',
    'center': '1',
    'right': '2'
};    

type YtoSIndex = {
    'top': '0',
    'middle': '1',
    'bottom': '2'
};

type XtoNIndex = {
    'left': 0,
    'center': 1,
    'right': 2,
};    

type YtoNIndex = {
    'top': 0,
    'middle': 1,
    'bottom': 2,
};

type NextRow<Row extends string[], X extends string, Value extends string> = {
    [Index in keyof Row]: Index extends X 
        ? Value : Row[Index];
};

type NextBoard<B extends TicTactToeBoard, Chip extends TicTacToeChip, P extends TicTacToePositions> 
    = P extends `${infer Y}-${infer X}` 
    ? Y extends TicTacToeYPositions
        ? X extends TicTacToeXPositions
            ? {
                [RowIndex in keyof B]: RowIndex extends YtoSIndex[Y]
                    ? NextRow<B[RowIndex], XtoSIndex[X], Chip>
                    : B[RowIndex]
            }
            : never
        : never
    : never;

type FlatBoard<Board extends TicTactToeBoard, Accumulator extends TicTacToeCell[] = []>
    = Board extends [infer Head extends TicTacToeCell[], ...infer Tail extends TicTactToeBoard]
    ? FlatBoard<Tail, [...Accumulator, ...Head]>
    : Accumulator

type BoardHasEmptyCells<Cells extends TicTacToeCell[]>
    = Cells extends [infer Cell extends TicTacToeCell, ...infer OtherCells extends TicTacToeCell[]]
    ? Cell extends TicTacToeChip
        ? BoardHasEmptyCells<OtherCells>
        : true
    : false;

type CheckCombination<Cells extends TicTacToeCell[], Chip extends TicTacToeChip, Combination extends number[]>
    = Combination extends [infer Index extends number, ...infer OtherCombination extends number[]]
    ? Cells[Index] extends Chip
            ? CheckCombination<Cells, Chip, OtherCombination>
            : false
    : true;

type CheckCombinations<Cells extends TicTacToeCell[], Chip extends TicTacToeChip, Combinations extends number[][]>
    = Combinations extends [infer Combination extends number[], ...infer OtherCombinations extends number[][]]
    ? CheckCombination<Cells, Chip, Combination> extends true
        ? true
        : CheckCombinations<Cells, Chip, OtherCombinations>
    : false;

type ToggleState<State extends TicTacToeChip>
    = State extends '❌' ? '⭕' : '❌';

type CalculateNextState<FlatBoard extends TicTacToeCell[], State extends TicTacToeChip>
    = CheckCombinations<FlatBoard, State, WinningCombinations> extends true
    ? `${State} Won`
    : BoardHasEmptyCells<FlatBoard> extends true
        ? ToggleState<State>
        : 'Draw'


type NextState<Board extends TicTactToeBoard, State extends TicTacToeChip>
    = CalculateNextState<FlatBoard<Board>, State>

type CanNextGame<Board extends TicTactToeBoard, P extends TicTacToePositions> 
    = P extends `${infer Y}-${infer X}` 
    ? Y extends TicTacToeYPositions
        ? X extends TicTacToeXPositions
            ? Board[YtoNIndex[Y]][XtoNIndex[X]] extends TicTacToeEmptyCell
                ? true 
                : false
            : false
        : false
    : false

type NextGame<Board extends TicTactToeBoard, State extends TicTacToeChip> = 
    { 
        board: Board,
        state: NextState<Board, State>
    }

export type TicTacToe<Game extends TicTacToeGame, Position extends TicTacToePositions>
    = Game['state'] extends TicTacToeChip
        ? CanNextGame<Game['board'], Position> extends true
            ? NextGame<
                NextBoard<Game['board'], Game['state'], Position>,
                Game['state']
            >
            : Game
        : Game