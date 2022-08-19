export default class LevelCards {
  private levelCardsContent: string[];

  constructor() {
    this.levelCardsContent = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  }

  renderLevelCards() {
    const levels = <HTMLDivElement>document.querySelector('#levels');
    this.levelCardsContent.forEach((content) => {
      const levelCard = document.createElement('div');
      const idAndClass = 'handbook__level-card';
      levelCard.id = idAndClass;
      levelCard.className = idAndClass;
      levelCard.textContent = content;
      levels.append(levelCard);
    });
  }
}
