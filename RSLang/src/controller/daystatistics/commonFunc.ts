import { IUserStatistics } from './interfaces';

export default function getEmptyStatObj(): IUserStatistics {
  return {
    date: Date(),
    allGamesRight: 0,
    allGamesWrong: 0,
    allGamesRightPercent: 0,
    allNewWords: 0,
    wordList: [],
    games: {
      audiocall: {
        rightPercent: 0,
        bestSerie: 0,
        right: 0,
        wrong: 0,
        newWords: 0,
        wordList: [],
      },
      sprint: {
        rightPercent: 0,
        bestSerie: 0,
        right: 0,
        wrong: 0,
        newWords: 0,
        wordList: [],
      },
    },
  };
}
