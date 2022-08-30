import authStorage from '../../controller/auth-storage';
import { COMPLICATED_WORDS_PAGE_KEY } from '../../controller/handbookController/handbookControllerConstants';
import { getHandbookComplicatedWordsDataFromLocalStorage, getHandbookDataFromLocalStorage, setHandbookComplicatedWordsToLocalStorage } from '../../controller/handbookController/handbookLocalStorageAPI';
import IhandbookController from '../../controller/handbookController/IhandbookController';
import {
  AggregatedWordsDataT,
  PageNameT,
  RsLangHandbookDataT,
  WordDataT,
  WordsDataT,
} from '../../types/types';
import IHandbook from './Ihandbook';
import LevelCards from './levelCards/levelCards';
import { getNewElement } from './templatesForElements/templateForCreatingNewElement';
import WordCardInfo from './wordCardInfo/wordCardInfo';
import WordCards from './wordCards/wordCards';

function getPaginationElementsAndStep():
[HTMLButtonElement, HTMLDivElement, HTMLButtonElement, number] {
  return [
    <HTMLButtonElement>document.querySelector('.words-pagination__prev-button'),
    <HTMLDivElement>document.querySelector('.words-pagination__curr-page'),
    <HTMLButtonElement>document.querySelector('.words-pagination__next-button'),
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

function renderPaginationControls() {
  const pagintaion = <HTMLDivElement>document.querySelector('#handbook__words-pagination');
  pagintaion.innerHTML = '';
  pagintaion.append(
    getNewElement('button', 'words-pagination__prev-button', 'Prev'),
    getNewElement('div', 'words-pagination__curr-page'),
    getNewElement('button', 'words-pagination__next-button', 'Next'),
  );
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
    handbookController: IhandbookController,
  ): void {
    const handbook = `
    <section id="handbook" class="handbook">
      <h4 id="handbook__title">Учебник</h4>
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
    const main = <HTMLElement>document.querySelector('#main');
    const pageName = 'handbook';
    main.innerHTML = '';
    main.insertAdjacentHTML('beforeend', handbook);

    if (authStorage.get()) {
      this.renderComplicatedWordsCard(handbookController);
    }

    if (localStorage.getItem(COMPLICATED_WORDS_PAGE_KEY)) {
      this.complicatedWordsCardHandler(
        <HTMLDivElement>document.querySelector('#handbook__levels'),
        handbookController,
      );
      const complicatedCard = <HTMLDivElement>
      document.querySelector('.handbook__complicated-words-card');
      complicatedCard.classList.add('active-handbook-page');
    } else {
      this.levelCards.renderLevelCards(handbookController, this.wordCards, this.wordCardInfo);
      this.wordCards.renderWordCards(wordsData, handbookController, pageName);
      this.wordCardInfo.renderWordCardInfo(wordData, handbookController, pageName);
      this.handlePaginationButtons(handbookController, 1, 30, pageName);
      const title = <HTMLElement>
      document.querySelector('#handbook__title');
      title.classList.add('active-handbook-page');
    }

    this.handbookTitleHandler(handbookController);

    const games = [document.querySelector('#handbook__audio-call'), document.querySelector('#handbook__sprint')];
    games.forEach((game) => game?.addEventListener('click', () => '')); // links for future games
  }

  handbookTitleHandler(
    handbookController: IhandbookController,
  ) {
    const title = <HTMLElement>document.querySelector('#handbook__title');
    title.addEventListener('click', async () => {
      const complicatedCard = <HTMLDivElement>
      document.querySelector('.handbook__complicated-words-card');
      complicatedCard.classList.remove('active-handbook-page');
      title.classList.add('active-handbook-page');

      localStorage.removeItem(COMPLICATED_WORDS_PAGE_KEY);
      const pageName = 'handbook';
      const rsLangHandbookData: RsLangHandbookDataT = getHandbookDataFromLocalStorage();
      const wordsData = <WordsDataT>(await
      handbookController.getChunkOfWords(rsLangHandbookData.group, rsLangHandbookData.page)).data;

      this.levelCards.renderLevelCards(handbookController, this.wordCards, this.wordCardInfo);
      this.wordCards.renderWordCards(wordsData, handbookController, pageName);
      this.wordCardInfo.renderWordCardInfo(
        wordsData[rsLangHandbookData.activeWordCardIndex],
        handbookController,
        pageName,
      );
      this.handlePaginationButtons(handbookController, 1, 30, 'handbook');
    });
  }

  handlePaginationButtons(
    handbookController: IhandbookController,
    firstPage: number,
    lastPage: number,
    pageName: PageNameT,
  ) {
    renderPaginationControls();

    const wordsData = (pageName === 'handbook')
      ? getHandbookDataFromLocalStorage()
      : getHandbookComplicatedWordsDataFromLocalStorage();

    const [
      wordsPaginationPrevButton,
      wordsPaginationCurrPage,
      wordsPaginationNextButton,
      step,
    ] = getPaginationElementsAndStep();

    wordsPaginationCurrPage.textContent = `${wordsData.currPage}`;

    disablePaginationButton(wordsPaginationPrevButton, wordsData.currPage, firstPage);
    disablePaginationButton(wordsPaginationNextButton, wordsData.currPage, lastPage);

    wordsPaginationPrevButton.addEventListener('click', () => {
      this.paginationButtonHandler(
        handbookController,
        wordsPaginationPrevButton,
        wordsPaginationNextButton,
        -step,
        wordsPaginationCurrPage,
        firstPage,
        pageName,
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
        pageName,
      );
    });
  }

  async paginationButtonHandler(
    handbookController: IhandbookController,
    activeButton: HTMLButtonElement,
    inactiveButton: HTMLButtonElement,
    step: number,
    currPage: HTMLDivElement,
    firstOrLastPage: number,
    pageName: PageNameT,
  ) {
    const [wordsData, firstCardIndex] = [<WordsDataT | AggregatedWordsDataT> await
    handbookController.wordsPaginationButtonHandler(
      activeButton,
      inactiveButton,
      +step,
      currPage,
      firstOrLastPage,
      pageName,
    ), 0];

    this.wordCards.renderWordCards(wordsData, handbookController, pageName, (pageName === 'complicatedWords') ? this.complicatedWordsCardHandler.bind(this) : undefined);
    this.wordCardInfo.renderWordCardInfo(
      wordsData[firstCardIndex],
      handbookController,
      pageName,
      (pageName === 'complicatedWords') ? this.complicatedWordsCardHandler.bind(this) : undefined,
    );
  }

  async renderComplicatedWordsCard(handbookController: IhandbookController) {
    const levels = <HTMLDivElement>document.querySelector('#handbook__levels');
    const complicatedWords = getNewElement('div', 'handbook__complicated-words-card', 'Сложные слова');

    complicatedWords.addEventListener('click', () => {
      this.complicatedWordsCardHandler(levels, handbookController);
      complicatedWords.classList.add('active-handbook-page');
    });

    levels.before(complicatedWords);
  }

  async complicatedWordsCardHandler(
    levels: HTMLDivElement,
    handbookController: IhandbookController,
  ) {
    const title = <HTMLElement>
    document.querySelector('#handbook__title');
    title.classList.remove('active-handbook-page');

    localStorage.setItem(COMPLICATED_WORDS_PAGE_KEY, JSON.stringify(true));

    const levelsCopy = levels;

    if (!getHandbookComplicatedWordsDataFromLocalStorage()) {
      setHandbookComplicatedWordsToLocalStorage(0, 1, 0);
    }

    const wordsData = getHandbookComplicatedWordsDataFromLocalStorage();

    const aggregatedWordsData = (
      await handbookController.getAllUserAggregatedHardWords(wordsData.page)).data[0];
    const { paginatedResults, totalCount } = aggregatedWordsData;

    levelsCopy.innerHTML = '';

    this.renderComplicatedWordsContent(
      totalCount[0],
      paginatedResults,
      handbookController,
      wordsData.activeWordCardIndex,
      this.complicatedWordsCardHandler.bind(this),
    );

    const numOfCardsPerPage = 20;
    const lastPage = (totalCount[0]) ? Math.ceil(totalCount[0].count / numOfCardsPerPage) : 1;

    this.handlePaginationButtons(handbookController, 1, lastPage, 'complicatedWords');
  }

  renderComplicatedWordsContent(
    count: { count: number } | undefined,
    paginatedResults: WordsDataT | AggregatedWordsDataT,
    handbookController: IhandbookController,
    activeWordCardIndex: number,
    complicatedWordsCardHandler:
    (levels: HTMLDivElement, handbookController: IhandbookController) => Promise<void>,
  ): void {
    if (count) {
      this.wordCards.renderWordCards(paginatedResults, handbookController, 'complicatedWords', complicatedWordsCardHandler);
      this.wordCardInfo.renderWordCardInfo(
        paginatedResults[activeWordCardIndex],
        handbookController,
        'complicatedWords',
        complicatedWordsCardHandler,
      );
    } else {
      const [wordCards, cardInfo] = [
        <HTMLDivElement>document.querySelector('#handbook__word-cards'),
        <HTMLDivElement>document.querySelector('#handbook__word-card-info'),
      ];
      wordCards.innerHTML = 'Для вас нет сложных слов';
      cardInfo.innerHTML = '';
    }
  }
}
