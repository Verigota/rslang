import HandbookController from '../controller/handbookController/handbookController';
import { WordDataT, WordsDataT } from '../types/types';
import Handbook from './handbook/handbook';
import Iview from './Iview';

export default class View implements Iview {
  private handbook: Handbook;

  constructor() {
    this.handbook = new Handbook();
  }

  renderHandbookView(
    wordsData: WordsDataT,
    wordData: WordDataT,
    handbookController: HandbookController,
  ) {
    this.handbook.renderHandbook(wordsData, wordData, handbookController);
  }
}
