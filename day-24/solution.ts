type Alley = "  ";
type MazeItem = "🎄" | "🎅" | Alley;
type DELICIOUS_COOKIES = "🍪";
type MazeMatrix = MazeItem[][]
type WinMatrix = DELICIOUS_COOKIES[][];
type Directions = "up" | "down" | "left" | "right";

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

// from day-16 solution

type FindIndex<T extends any[], Accumulator extends any[] = []> 
  = T extends [infer Head, ...infer Tail]
    ? Head extends '🎅'
      ? Accumulator['length']
      : FindIndex<Tail, [...Accumulator, false]>
    : false

type MapRows<T extends any[], Accumulator extends any[] = []>
  = T extends [infer Head, ...infer Tail]
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

type IsWinPosition<P extends Position, Width extends number, Height extends number>
    = P[0] extends -1 
    ? true
    : P[1] extends -1 
        ? true 
        : P[0] extends Width
            ? true 
            : P[1] extends Height
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

type ChangeRow<T extends MazeItem[], Position extends number, Value extends MazeItem, A extends MazeItem[] = []> 
  = T['length'] extends A['length']
    ? A
    : A['length'] extends Position
      ? ChangeRow<T, Position, Value, [...A, Value]>
      : ChangeRow<T, Position, Value, [...A, T[A['length']]]>

type ChangeMaze<Maze extends MazeMatrix, P extends Position, Value extends MazeItem, Accumulator extends MazeMatrix = []> 
  = Maze['length'] extends Accumulator['length']
  ? Accumulator
  : Accumulator['length'] extends P[0]
    ? ChangeMaze<Maze, P, Value, [...Accumulator, ChangeRow<Maze[Accumulator['length']], P[1], Value>]>
    : ChangeMaze<Maze, P, Value, [...Accumulator, Maze[Accumulator['length']]]>

type ChangeSantaPosition<Maze extends MazeMatrix, PrevPosition extends Position, NextPosition extends Position> 
  = ChangeMaze<
      ChangeMaze<Maze, PrevPosition, Alley>,
      NextPosition, 
      "🎅"
    >

type MoveSantaPosition<Maze extends MazeMatrix, SantaPosition extends Position, NextPosition extends Position> 
  = IsWinPosition<NextPosition, Maze[0]['length'], Maze['length']> extends true
  ? CookiesMaiz<Maze>
  : CanMoveSanta<Maze, NextPosition> extends true
    ? ChangeSantaPosition<Maze, SantaPosition, NextPosition>
    : Maze

type MoveSanta<Maze extends MazeMatrix, SantaPosition extends Position, Direction extends Directions> 
  = MoveSantaPosition<Maze, SantaPosition, MovePosition<SantaPosition, Direction>>

export type Move<Maze extends MazeMatrix, Direction extends Directions>
  = MoveSanta<Maze, FindSantaPosition<Maze>, Direction>
