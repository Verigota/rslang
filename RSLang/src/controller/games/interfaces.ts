import { IGameStart } from './audiocall/interfaces';

export interface IGameStat {
  right: number;
  wrong: number;
}

enum Difficulty {
  'hard', 'learned', 'process',
}

export interface IAggregatedWord {
  id: string;
  difficulty: Difficulty;
  optional: {
    addTime: string;
    games: {
      sprint: IGameStat;
      audio: IGameStat;
    }
  }
}

export interface ICommonGame {
  start: (startOpts?: IGameStart) => void;
  restart: (startOpts?: IGameStart) => void;
}
