import { WordDataT } from '../../../types/types';

export interface IStageInfo {
  engWord: string,
  rightTranslation: string,
  translation: string,
  sound: string,
}

export interface ISprintGame {
  currentStage: IStageInfo;
  getRandomWord: () => WordDataT;
  goToNextStage: () => void;
}
