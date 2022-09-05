import { IGameStart } from './audiocall/interfaces';

export interface IGameStat {
  right: number;
  wrong: number;
}

export enum Difficulty {
  hard = 'hard',
  learned = 'learned',
  process = 'process',
}

export interface IAggregatedWord {
  id: string;
  difficulty: Difficulty;
  optional: IOptional
}

export interface ICommonGame {
  start: (startOpts?: IGameStart) => void;
  restart: (startOpts?: IGameStart) => void;
}

export interface IOptional {
  serieRight: number;
  serieWrong: number;
  addTime: string;
  games: {
    sprint: IGameStat;
    audiocall: IGameStat;
  }
}
