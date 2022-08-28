export interface IGameStat {
  right: number;
  wrong: number;
}

enum Difficulty {
  'hard', 'learnt',
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
