type RockPaperScissors = '👊🏻' | '🖐🏾' | '✌🏽';

type WinnerMap = {
  '👊🏻': '✌🏽',
  '🖐🏾': '👊🏻',
  '✌🏽': '🖐🏾'
}

type WhoWins<T extends RockPaperScissors, U extends RockPaperScissors> 
  = T extends U
    ? 'draw'
    : WinnerMap[T] extends U
      ? 'win' 
      : 'lose'
