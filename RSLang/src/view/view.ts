import { WordsDataT } from '../types/types';
import Handbook from './handbook/handbook';
import Iview from './Iview';

export default class View implements Iview {
  private textbook: Handbook;

  constructor() {
    this.textbook = new Handbook();
  }

  renderHandbookView(wordData: WordsDataT) {
    this.textbook.renderHandbook(wordData);
  }
}
