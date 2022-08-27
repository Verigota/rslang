import { herokuApi } from '../../../api';
import { IApi } from '../../../api/interfaces';
import { WordsDataT } from '../../../types/types';
import { ISprintGame, IStageInfo } from './interfaces';

export function isRightTranslation(currentStage: IStageInfo): string {
  return currentStage.rightTranslation === currentStage.translation ? 'right' : 'wrong';
}
export class SprintGame implements ISprintGame {
  gameWords: WordsDataT;

  currentStage: IStageInfo;

  api: IApi;

  constructor(words: WordsDataT) {
    this.gameWords = words;
    this.currentStage = this.createNewStage();
    this.api = herokuApi;
  }

  getRandomWord() {
    const wordsCount = this.gameWords.length;
    const elementId = Math.floor(Math.random() * (wordsCount + 1));
    return this.gameWords[elementId];
  }

  private createNewStage() {
    const word = this.getRandomWord();
    const engWord = word.word;
    const rightTranslation = word.wordTranslate;
    const translation = this.getRandomWord().wordTranslate;
    const sound = word.audio;
    return {
      engWord,
      rightTranslation,
      translation,
      sound,
    };
  }

  goToNextStage() {
    this.currentStage = this.createNewStage();
  }
}
