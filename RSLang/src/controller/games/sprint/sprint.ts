import { WordsDataT } from '../../../types/types';
import { ISprintGame, IStageInfo } from './interfaces';

export function isRightTranslation(stageInfo: IStageInfo): boolean {
  return stageInfo.rightTranslation === stageInfo.translation;
}
export class SprintGame implements ISprintGame {
  gameWords: WordsDataT;

  constructor(words: WordsDataT) {
    this.gameWords = words;
  }

  getRandomWord() {
    const wordsCount = this.gameWords.length;
    const elementId = Math.floor(Math.random() * (wordsCount + 1));
    return this.gameWords[elementId];
  }

  createNewStage() {
    const word = this.getRandomWord();
    const engWord = word.word;
    const rightTranslation = word.wordTranslate;
    const translation = this.getRandomWord().wordTranslate;
    return {
      engWord,
      rightTranslation,
      translation,
    };
  }
}
