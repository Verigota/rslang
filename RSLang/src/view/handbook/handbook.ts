import HandbookController from '../../controller/handbookController/handbookController';
import { getHandbookDataFromLocalStorage } from '../../controller/handbookController/handbookLocalStorageAPI';
import { RsLangHandbookDataT, WordDataT, WordsDataT } from '../../types/types';
import IHandbook from './Ihandbook';
import LevelCards from './levelCards/levelCards';
import WordCardInfo from './wordCardInfo/wordCardInfo';
import WordCards from './wordCards/wordCards';

function getPaginationElementsAndDataForThem():
[HTMLButtonElement, HTMLDivElement, HTMLButtonElement, RsLangHandbookDataT, number] {
  return [
    <HTMLButtonElement>document.querySelector('.words-pagination__prev-button'),
    <HTMLDivElement>document.querySelector('.words-pagination__curr-page'),
    <HTMLButtonElement>document.querySelector('.words-pagination__next-button'),
    getHandbookDataFromLocalStorage('rsLangHandbookData'),
    1,
  ];
}

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

export default class Handbook implements IHandbook {
  private levelCards: LevelCards;

  private wordCards: WordCards;

  private wordCardInfo: WordCardInfo;

  constructor() {
    this.levelCards = new LevelCards();
    this.wordCards = new WordCards();
    this.wordCardInfo = new WordCardInfo();
  }

  renderHandbook(
    wordsData: WordsDataT,
    wordData: WordDataT,
    handbookController: HandbookController,
  ): void {
    const handbook = `
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
      <div id="handbook__games" class="handbook__games">
        <h4>Игры</h4>
        <div id="handbook__audio-call" class="handbook__audio-call">
          <h5>Аудиовызов</h5>
        </div>
        <div id="handbook__sprint" class="handbook__sprint">
          <h5>Спринт</h5>
        </div>
      </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', handbook);
    this.levelCards.renderLevelCards(handbookController, this.wordCards, this.wordCardInfo);
    this.wordCards.renderWordCards(wordsData, handbookController);
    this.wordCardInfo.renderWordCardInfo(wordData, handbookController);
    this.handlePaginationButtons(handbookController);

    const games = [document.querySelector('#handbook__audio-call'), document.querySelector('#handbook__sprint')];
    games.forEach((game) => game?.addEventListener('click', () => '')); // links for future games
  }

  handlePaginationButtons(handbookController: HandbookController) {
    const [
      wordsPaginationPrevButton,
      wordsPaginationCurrPage,
      wordsPaginationNextButton,
      rsLangHandbookData,
      step,
    ] = getPaginationElementsAndDataForThem();

    wordsPaginationCurrPage.textContent = `${rsLangHandbookData.currPage}`;

    const [firstPage, lastPage] = [1, 30];

    disablePaginationButton(wordsPaginationPrevButton, rsLangHandbookData.currPage, firstPage);
    disablePaginationButton(wordsPaginationNextButton, rsLangHandbookData.currPage, lastPage);

    wordsPaginationPrevButton.addEventListener('click', () => {
      this.paginationButtonHandler(
        handbookController,
        wordsPaginationPrevButton,
        wordsPaginationNextButton,
        -step,
        wordsPaginationCurrPage,
        firstPage,
      );
    });

    wordsPaginationNextButton.addEventListener('click', () => {
      this.paginationButtonHandler(
        handbookController,
        wordsPaginationNextButton,
        wordsPaginationPrevButton,
        step,
        wordsPaginationCurrPage,
        lastPage,
      );
    });
  }

  async paginationButtonHandler(
    handbookController: HandbookController,
    activeButton: HTMLButtonElement,
    inactiveButton: HTMLButtonElement,
    step: number,
    currPage: HTMLDivElement,
    firstOrLastPage: number,
  ) {
    const [wordsData, firstCardIndex] = [await
    handbookController.wordsPaginationButtonHandler(
      activeButton,
      inactiveButton,
      +step,
      currPage,
      firstOrLastPage,
    ), 0];

    this.wordCards.renderWordCards(wordsData, handbookController);
    this.wordCardInfo.renderWordCardInfo(
      wordsData[firstCardIndex],
      handbookController,
    );
  }
}
