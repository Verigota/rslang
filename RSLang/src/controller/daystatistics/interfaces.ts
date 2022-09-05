import { WordsDataT } from '../../types/types';

export type TAnswerType = 'right' | 'wrong';

export interface IGameStatistics {
  rightPercent: number;
  bestSerie: number;
  right: number;
  wrong: number;
  newWords: number;
  wordList: WordsDataT;
}

export interface IUserStatistics {
  date: string;
  allGamesRight: number;
  allGamesWrong: number;
  allGamesRightPercent: number;
  allNewWords: number;
  wordList: WordsDataT;
  games: {
    [key: string]: IGameStatistics;
  };
}
