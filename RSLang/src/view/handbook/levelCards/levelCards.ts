import { getNewElement } from '../templatesForElements/templateForCreatingNewElement';
import IlevelCards from './IlevelCards';

export default class LevelCards implements IlevelCards {
  private levelsSelector: '#handbook__levels';

  private levelCardsContent: string[];

  constructor() {
    this.levelsSelector = '#handbook__levels';
    this.levelCardsContent = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  }

  renderLevelCards() {
    const levels = <HTMLDivElement>document.querySelector(this.levelsSelector);
    this.levelCardsContent.forEach((content) => {
      levels.append(getNewElement('div', 'handbook__level-card', content));
    });
  }
}
