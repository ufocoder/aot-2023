type Rock = '👊🏻';
type Paper = '🖐🏾';
type Scissors = '✌🏽';
type RockPaperScissors = Rock | Paper | Scissors;

type WhoWins<T extends RockPaperScissors, U extends RockPaperScissors> 
  = T extends U
    ? 'draw'
    : T extends Rock 
      ? U extends Paper
        ? 'win'
        : 'lose'
      : T extends Paper
        ? U extends Scissors
          ? 'win'
          : 'lose'
        : U extends Rock
            ? 'win'
            : 'lose'
