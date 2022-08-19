import IHandbook from './Ihandbook';
import LevelCards from './levelCard/levelCard';

export default class Handbook implements IHandbook {
  private handbook: string;

  private levelCards: LevelCards;

  constructor() {
    this.handbook = `
    <div id="handbook" class="handbook">
      <h4>Учебник</h4>
      <div id="levels" class="handbook__levels">
        <h6>Уровни сложности</h6>
      </div>
    </div>`;
    this.levelCards = new LevelCards();
  }

  renderHandbook() {
    document.body.insertAdjacentHTML('afterbegin', this.handbook);
    this.levelCards.renderLevelCards();
  }
}
