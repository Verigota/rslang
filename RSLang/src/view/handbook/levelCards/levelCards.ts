import { getHandbookDataFromLocalStorage } from '../../../controller/handbookController/handbookLocalStorageAPI';
import IhandbookController from '../../../controller/handbookController/IhandbookController';
import PageName from '../../../enums/enums';
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

  renderLevelCards(
    handbookController: IhandbookController,
    wordCards: WordCards,
    wordCardInfo: WordCardInfo,
  ): void {
    const levels = <HTMLDivElement>document.querySelector(this.levelsSelector);
    levels.innerHTML = '';
    const RsLangHandbookData: RsLangHandbookDataT = getHandbookDataFromLocalStorage();

    this.levelCardsContent.forEach((content, contentIndex) => {
      const levelCard = getNewElement('div', 'handbook__level-card', content);

      if (contentIndex === RsLangHandbookData.group) {
        levelCard.classList.add('active-level-card');
        const words = <HTMLDivElement>document.querySelector('#handbook__words');
        words.className = `handbook__words ${this.levelCardsContent[contentIndex]}`;
      }

      levelCard.addEventListener('click', () => {
        const activeLevelCard = <HTMLDivElement>document.querySelector('.active-level-card');
        const words = <HTMLDivElement>document.querySelector('#handbook__words');
        words.className = `handbook__words ${this.levelCardsContent[contentIndex]}`;

        this.levelCardHandler(
          activeLevelCard,
          levelCard,
          handbookController,
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
    handbookController: IhandbookController,
    contentIndex: number,
    wordCards: WordCards,
    wordCardInfo: WordCardInfo,
  ): Promise<void> {
    const [
      wordsPaginationPrevButton,
      wordsPaginationCurrPage,
      wordsPaginationNextButton,
    ] = [
        <HTMLButtonElement>document.querySelector('.words-pagination__prev-button'), <HTMLDivElement>document.querySelector('.words-pagination__curr-page'),
        <HTMLButtonElement>document.querySelector('.words-pagination__next-button'),
    ];

    const wordsData = await handbookController.levelCardHandler(
      activeLevelCard,
      levelCard,
      contentIndex,
      this.defaultPage,
      this.defaultCurrPage,
      this.defaultActiveWordCardIndex,
      wordsPaginationCurrPage,
      wordsPaginationPrevButton,
      wordsPaginationNextButton,
    );

    wordCards.renderWordCards(wordsData, handbookController, PageName.handbook);
    wordCardInfo.renderWordCardInfo(
      wordsData[this.defaultActiveWordCardIndex],
      handbookController,
      PageName.handbook,
    );
  }
}
