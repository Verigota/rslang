import { WordsDataT, WordDataT } from '../../../types/types';

class SprintGame {
  gameWords: WordsDataT;

  word: WordDataT;

  engWord: WordDataT['word'];

  rightTranslation: WordDataT['wordTranslate'];

  translation: WordDataT['wordTranslate'];

  constuctor(words: WordsDataT) {
    this.gameWords = words;
    this.word = this.getRandomWord();
    this.engWord = this.word.word;
    this.rightTranslation = this.word.wordTranslate;
    this.translation = this.getRandomWord().wordTranslate;
  }

  getRandomWord() {
    const wordsCount = this.gameWords.length;
    const elementId = Math.floor(Math.random() * (wordsCount + 1));
    return this.gameWords[elementId];
  }

  isRightAnswer():boolean {
    return this.rightTranslation === this.translation;
  }
}
export default SprintGame;
