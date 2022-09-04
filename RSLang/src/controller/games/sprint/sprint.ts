import _ from 'lodash';
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
    if (wordsCount < 5) {
      const word = this.gameWords[0];
      this.gameWords.shift();
      return word;
    }
    const elementId = Math.floor(Math.random() * wordsCount);
    return this.gameWords[elementId];
  }

  private createNewStage() {
    const word = this.getRandomWord();
    const engWord = word?.word;
    const rightTranslation = word?.wordTranslate;
    const translations = _.shuffle([rightTranslation,
      this.getRandomWord()?.wordTranslate,
      this.getRandomWord()?.wordTranslate]);
    const translation = translations[0] ? translations[0] : translations[1];
    const sound = word?.audio;
    return {
      engWord,
      rightTranslation,
      translation,
      sound,
      word,
    };
  }

  goToNextStage() {
    this.currentStage = this.createNewStage();
  }
}
