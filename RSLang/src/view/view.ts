import Controller from '../controller/controller';
import { WordDataT, WordsDataT } from '../types/types';
import Handbook from './handbook/handbook';
import Iview from './Iview';

export default class View implements Iview {
  private handbook: Handbook;

  constructor() {
    this.handbook = new Handbook();
  }

  renderHandbookView(wordsData: WordsDataT, wordData: WordDataT, controller: Controller) {
    this.handbook.renderHandbook(wordsData, wordData, controller);
  }
}
