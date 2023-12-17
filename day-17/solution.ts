type RockPaperScissors = '👊🏻' | '🖐🏾' | '✌🏽';

type WinnerMap = {
  '👊🏻': '✌🏽',
  '🖐🏾': '👊🏻',
  '✌🏽': '🖐🏾'
}

export type WhoWins<T extends RockPaperScissors, U extends RockPaperScissors> 
  = T extends U
    ? 'draw'
    : WinnerMap[T] extends U
      ? 'lose' 
      : 'win'
