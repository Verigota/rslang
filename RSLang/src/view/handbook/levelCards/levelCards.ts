import Controller from '../../../controller/controller';
import { RsLangHandbookDataT } from '../../../types/types';
import { getNewElement } from '../templatesForElements/templateForCreatingNewElement';
import WordCardInfo from '../wordCardInfo/wordCardInfo';
import WordCards from '../wordCards/wordCards';
import IlevelCards from './IlevelCards';

export default class LevelCards implements IlevelCards {
  private levelsSelector: '#handbook__levels';

  private levelCardsContent: string[];

  private defaultPage: number;

  private defaultCurrPage: number;

  private defaultActiveWordCardIndex;

  constructor() {
    this.levelsSelector = '#handbook__levels';
    this.levelCardsContent = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    this.defaultPage = 0;
    this.defaultCurrPage = 1;
    this.defaultActiveWordCardIndex = 0;
  }

  renderLevelCards(controller: Controller, wordCards: WordCards, wordCardInfo: WordCardInfo) {
    const levels = <HTMLDivElement>document.querySelector(this.levelsSelector);
    const RsLangHandbookData: RsLangHandbookDataT = JSON.parse(<string>localStorage.getItem('rsLangHandbookData'));

    const activeLevelCard = <HTMLDivElement>document.querySelector('.active-level-card');

    this.levelCardsContent.forEach((content, contentIndex) => {
      const levelCard = getNewElement('div', 'handbook__level-card', content);

      if (contentIndex === RsLangHandbookData.group) {
        levelCard.classList.add('active-level-card');
      }

      levelCard.addEventListener('click', async () => {
        await this.levelCardHandler(
          activeLevelCard,
          levelCard,
          controller,
          contentIndex,
          wordCards,
          wordCardInfo,
        );
      });
      levels.append(levelCard);
    });
  }

  async levelCardHandler(
    activeLevelCard: HTMLDivElement,
    levelCard: HTMLElement,
    controller: Controller,
    contentIndex: number,
    wordCards: WordCards,
    wordCardInfo: WordCardInfo,
  ) {
    const [
      wordsPaginationPrevButton,
      wordsPaginationCurrPage,
    ] = [
        <HTMLButtonElement>document.querySelector('.words-pagination__prev-button'), <HTMLDivElement>document.querySelector('.words-pagination__curr-page'),
    ];

    const wordsData = await controller.levelCardHandler(
      activeLevelCard,
      levelCard,
      contentIndex,
      this.defaultPage,
      this.defaultCurrPage,
      this.defaultActiveWordCardIndex,
      wordsPaginationCurrPage,
      wordsPaginationPrevButton,
    );

    wordCards.renderWordCards(wordsData, controller);
    wordCardInfo.renderWordCardInfo(wordsData[this.defaultActiveWordCardIndex], controller);
  }
}
