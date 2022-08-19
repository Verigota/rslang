import { WordsDataT } from '../../types/types';
import IHandbook from './Ihandbook';
import LevelCards from './levelCard/levelCards';
import WordCards from './wordCards/wordCards';

export default class Handbook implements IHandbook {
  private handbook: string;

  private levelCards: LevelCards;

  private wordCards: WordCards;

  constructor() {
    this.handbook = `
    <div id="handbook" class="handbook">
      <h4>Учебник</h4>
      <div id="handbook__levels" class="handbook__levels">
        <h6>Уровни сложности</h6>
      </div>
      <div id="handbook__words" class="handbook__words">
        <h4>Слова</h4>
        <div id="handbook__word-cards" class="handbook__word-cards"></div>
      </div>
    </div>`;
    this.levelCards = new LevelCards();
    this.wordCards = new WordCards();
  }

  renderHandbook(wordsData: WordsDataT) {
    document.body.insertAdjacentHTML('beforeend', this.handbook);
    this.levelCards.renderLevelCards();
    this.wordCards.renderWordCards(wordsData);
  }
}
