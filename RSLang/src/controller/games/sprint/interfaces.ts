import { WordDataT } from '../../../types/types';

export interface IStageInfo {
  engWord: string,
  rightTranslation: string,
  translation: string,
}

export interface ISprintGame {
  getRandomWord: () => WordDataT;
  createNewStage: () => IStageInfo;
}
