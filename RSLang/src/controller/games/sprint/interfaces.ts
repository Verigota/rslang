import { WordDataT } from '../../../types/types';

export interface IStageInfo {
  engWord: string,
  rightTranslation: string,
  translation: string,
  sound: string,
  word: WordDataT,
}

export interface ISprintGame {
  currentStage: IStageInfo;
  getRandomWord: () => WordDataT;
  goToNextStage: () => void;
}
