import Controller from '../../controller/controller';
import { RsLangHandbookDataT, WordDataT, WordsDataT } from '../../types/types';
import IHandbook from './Ihandbook';
import LevelCards from './levelCards/levelCards';
import WordCardInfo from './wordCardInfo/wordCardInfo';
import WordCards from './wordCards/wordCards';

export default class Handbook implements IHandbook {
  private handbook: string;

  private levelCards: LevelCards;

  private wordCards: WordCards;

  private wordCardInfo: WordCardInfo;

  private firstPage: number;

  private lastPage: number;

  constructor() {
    this.handbook = `
    <section id="handbook" class="handbook">
      <h4>Учебник</h4>
      <div id="handbook__levels" class="handbook__levels">
        <h6>Уровни сложности</h6>
      </div>
      <div id="handbook__words" class="handbook__words">
        <h4 class="handbook__words-title">Слова</h4>
        <div id="handbook__word-cards" class="handbook__word-cards">
        </div>
        <div id="handbook__word-card-info" class="handbook__word-card-info word-card-info">
        </div>
        <div id="handbook__words-pagination" class="handbook__words-pagination words-pagination">
          <button class="words-pagination__prev-button">Prev</button>
          <div class="words-pagination__curr-page"></div>
          <button class="words-pagination__next-button">Next</button>
        </div>
      </div>
    </div>`;
    this.levelCards = new LevelCards();
    this.wordCards = new WordCards();
    this.wordCardInfo = new WordCardInfo();
    this.firstPage = 1;
    this.lastPage = 30;
  }

  renderHandbook(wordsData: WordsDataT, wordData: WordDataT, controller: Controller): void {
    document.body.insertAdjacentHTML('beforeend', this.handbook);
    this.levelCards.renderLevelCards();
    this.wordCards.renderWordCards(wordsData, controller);
    this.wordCardInfo.renderWordCardInfo(wordData, controller);
    this.handlePaginationButtons(controller);
  }

  handlePaginationButtons(controller: Controller) {
    const [
      wordsPaginationPrevButton,
      wordsPaginationCurrPage,
      wordsPaginationNextButton,
      rsLangHandbookData,
      step,
    ] = [
        <HTMLButtonElement>document.querySelector('.words-pagination__prev-button'), <HTMLDivElement>document.querySelector('.words-pagination__curr-page'), <HTMLButtonElement>document.querySelector('.words-pagination__next-button'), <RsLangHandbookDataT>JSON.parse(<string>localStorage.getItem('rsLangHandbookData')), 1,
    ];

    wordsPaginationCurrPage.textContent = `${rsLangHandbookData.currPage}`;

    function disablePaginationButton(
      button: HTMLButtonElement,
      currPage: number,
      firstOrLastPage: number,
    ) {
      if (currPage === firstOrLastPage) {
        const buttonCopy = button;
        buttonCopy.disabled = true;
      }
    }

    disablePaginationButton(wordsPaginationPrevButton, rsLangHandbookData.currPage, this.firstPage);
    disablePaginationButton(wordsPaginationNextButton, rsLangHandbookData.currPage, this.lastPage);

    wordsPaginationPrevButton.addEventListener('click', async () => {
      await this.paginationButtonHandler(
        controller,
        wordsPaginationPrevButton,
        wordsPaginationNextButton,
        -step,
        wordsPaginationCurrPage,
        this.firstPage,
      );
    });

    wordsPaginationNextButton.addEventListener('click', async () => {
      await this.paginationButtonHandler(
        controller,
        wordsPaginationNextButton,
        wordsPaginationPrevButton,
        step,
        wordsPaginationCurrPage,
        this.lastPage,
      );
    });
  }

  async paginationButtonHandler(
    controller: Controller,
    activeButton: HTMLButtonElement,
    inactiveButton: HTMLButtonElement,
    step: number,
    currPage: HTMLDivElement,
    firstOrLastPage: number,
  ) {
    const [wordsData, firstCardIndex] = [await
    controller.wordsPaginationButtonHandler(
      activeButton,
      inactiveButton,
      +step,
      currPage,
      firstOrLastPage,
    ), 0];

    this.wordCards.renderWordCards(wordsData, controller);
    this.wordCardInfo.renderWordCardInfo(
      wordsData[firstCardIndex],
      controller,
    );
  }
}
