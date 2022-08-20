import Controller from '../controller/controller';
import { WordDataT, WordsDataT } from '../types/types';
import Handbook from './handbook/handbook';
import WordCardInfo from './handbook/wordCardInfo/wordCardInfo';
import Iview from './Iview';

export default class View implements Iview {
  private handbook: Handbook;

  private wordCardInfo: WordCardInfo;

  constructor() {
    this.handbook = new Handbook();
    this.wordCardInfo = new WordCardInfo();
  }

  renderHandbookView(wordsData: WordsDataT) {
    this.handbook.renderHandbook(wordsData);
  }

  renderHandbookInformationCardView(wordData: WordDataT, controller: Controller) {
    this.wordCardInfo.renderWordCardInfo(wordData, controller);
  }
}
