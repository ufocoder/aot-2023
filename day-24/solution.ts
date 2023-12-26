type Alley = "  ";
type MazeItem = "🎄" | "🎅" | Alley;
type DELICIOUS_COOKIES = "🍪";
type MazeMatrix = MazeItem[][]
type WinMatrix = DELICIOUS_COOKIES[][];
type Directions = "up" | "down" | "left" | "right";

// from day-16 solution

type FindIndex<T extends any[], Accumulator extends any[] = []> 
  = T extends [infer Head, ...infer Tail]
    ? Head extends '🎅'
      ? Accumulator['length']
      : FindIndex<Tail, [...Accumulator, false]>
    : false

type MapRows<T extends any[], Accumulator extends any[] = []>
  = T extends [infer Head, ...infer Tail extends any[]]
    ? Head extends any[]
      ? MapRows<Tail, [...Accumulator, FindIndex<Head>]>
      : MapRows<Tail, [...Accumulator, false]>
    : Accumulator;

type FindRow<T extends any[], Accumulator extends any[] = []>
  = T extends [infer Head, ...infer Tail]
    ? Head extends number
      ? [Accumulator['length'], Head]
      : FindRow<Tail, [...Accumulator, any]>
    : never

type FindSantaPosition<T extends any[][]> = FindRow<MapRows<T>>

// from day-13 solution

type List<N extends number, T extends any[] = []> 
  = T['length'] extends N 
    ? T 
    : List<N, [...T, T['length']]>

type Increment<N extends number> 
  = [...List<N>, any]['length'] extends infer Length
    ? Length extends number
      ? Length
      : never
    : never;

type Decrement<N extends number>
    = N extends 0 
    ? -1 
    : [...List<N>] extends [...infer T, any] 
        ? T['length'] :
        never;

// 

type Position = [number, number]

type MovePosition<P extends Position, D extends Directions>
    = D extends "up"
    ? [Decrement<P[0]>, P[1]]
    : D extends "down"
        ? [Increment<P[0]>, P[1]]
        : D extends "right"
            ? [P[0], Increment<P[1]>]
            : [P[0], Decrement<P[1]>]

type IsWinPosition<P extends Position, Len extends number>
    = P[0] extends -1 
    ? true
    : P[1] extends -1 
        ? true 
        : P[0] extends Len
            ? true 
            : P[1] extends Len
                ? true 
                : false

type CanMoveSanta<M extends MazeMatrix, P extends Position>
    = M[P[0]][P[1]] extends Alley
    ? true
    : false

type CookiesMaiz<M extends MazeMatrix> = {
    [X in keyof M]: {
        [Y in keyof M]: "🍪"
    };
};

type MazeWidth<Maze extends MazeMatrix>
    = Maze[0] extends MazeItem[]
    ? Maze[0]['length']
    : 0

type ModifyList<T extends any[], Position extends number, Value extends any, A extends any[] = []> 
  = T['length'] extends A['length']
    ? A
    : A['length'] extends Position
        ? ModifyList<T, Position, Value, [...A, Value]>
        : ModifyList<T, Position, Value, [...A, T[A['length']]]>

type ChangeCell<M extends any[][], Numbers extends number[], P extends Position, Value extends MazeItem> = {
    [Y in keyof M]: 
        Y extends keyof Numbers
        ? Numbers[Y] extends P[0] 
            ? ModifyList<M[Y], P[1], Value>
            : M[Y]
        : M[Y]
};

type ChangeSantaPosition<Maze extends MazeMatrix, Numbers extends number[], PrevPosition extends Position, NextPosition extends Position> 
    = ChangeCell<
        ChangeCell<Maze, Numbers, PrevPosition, Alley>,
        Numbers,
        NextPosition, 
        "🎅"
    >
    
type MoveSantaPosition<Maze extends MazeMatrix, SantaPosition extends Position, NextPosition extends Position> 
    = IsWinPosition<NextPosition, MazeWidth<Maze>> extends true
    ? CookiesMaiz<Maze>
    : CanMoveSanta<Maze, NextPosition> extends true
        ? ChangeSantaPosition<Maze, List<MazeWidth<Maze>>, SantaPosition, NextPosition>
        : Maze

type MoveSanta<Maze extends MazeMatrix, SantaPosition extends Position, Direction extends Directions> 
    = MoveSantaPosition<Maze, SantaPosition, MovePosition<SantaPosition, Direction>>

export type Move<Maze extends MazeMatrix, Direction extends Directions>
    = MoveSanta<Maze, FindSantaPosition<Maze>, Direction>
