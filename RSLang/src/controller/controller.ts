import WordsAPI from '../APIs/wordsApi/wordsApi';
import { RsLangHandbookDataT, WordDataT, WordsDataT } from '../types/types';
import Icontroller from './Icontroller';

export default class Controller implements Icontroller {
  private wordsAPI: WordsAPI;

  private baseURL: 'https://rsschool-lang-app.herokuapp.com';

  private diffBetweenArrIndexAndPageNum: number;

  private firstCardIndex: number;

  private localStorageKey: 'rsLangHandbookData';

  constructor() {
    this.wordsAPI = new WordsAPI();
    this.baseURL = 'https://rsschool-lang-app.herokuapp.com';
    this.diffBetweenArrIndexAndPageNum = 1;
    this.firstCardIndex = 0;
    this.localStorageKey = 'rsLangHandbookData';
  }

  async getChunkOfWords(group: number, page: number) {
    const res = await this.wordsAPI.getChunkOfWords(group, page);
    return res;
  }

  async getWordWithAssetsById(wordId: string) {
    const res = await this.wordsAPI.getWordWithAssetsById(wordId);
    return res;
  }

  wordInfoAudioHandler = (
    wordData: WordDataT,
    audioElement: HTMLAudioElement,
    playCounter: { numOfPlays: number },
  ) => {
    const [
      audioUrls, audioElementCopy, playCounterCopy,
    ] = [
      [wordData.audioMeaning, wordData.audioExample, wordData.audio],
      audioElement, playCounter,
    ];
    audioElementCopy.src = `${this.baseURL}/${audioUrls[playCounterCopy.numOfPlays]}`;
    playCounterCopy.numOfPlays += 1;
    if (playCounterCopy.numOfPlays === audioUrls.length) {
      playCounterCopy.numOfPlays = 0;
      return;
    }
    audioElementCopy.play();
  };

  async wordsPaginationButtonHandler(
    activeButton: HTMLButtonElement,
    inactiveButton: HTMLButtonElement,
    step: number,
    currPage: HTMLDivElement,
    pageLimit: number,
  ) {
    const [rsLangHandbookData,
      inactiveButtonCopy,
      activeButtonCopy,
      currPageCopy,
    ] = [<RsLangHandbookDataT>JSON.parse(
      <string>localStorage.getItem(this.localStorageKey),
    ), inactiveButton, activeButton, currPage];

    inactiveButtonCopy.disabled = false;

    rsLangHandbookData.currPage += step;
    rsLangHandbookData.page += step;

    localStorage.setItem(this.localStorageKey, JSON.stringify({
      group: rsLangHandbookData.group,
      page: rsLangHandbookData.currPage - this.diffBetweenArrIndexAndPageNum,
      currPage: rsLangHandbookData.currPage,
      activeWordCardIndex: this.firstCardIndex,
    }));

    const wordsData = <WordsDataT> await
    (await this.getChunkOfWords(
      rsLangHandbookData.group,
      rsLangHandbookData.page,
    )).data;

    currPageCopy.textContent = `${rsLangHandbookData.currPage}`;

    if (rsLangHandbookData.currPage === pageLimit) {
      activeButtonCopy.disabled = true;
    }

    return wordsData;
  }

  async handbookButtonHandler() {
    if (!localStorage.getItem('rsLangHandbookData')) {
      localStorage.setItem('rsLangHandbookData', JSON.stringify({
        group: 0,
        page: 0,
        currPage: 1,
        activeWordCardIndex: 0,
      }));
    }

    const rsLangHandbookData: RsLangHandbookDataT = JSON.parse(<string>localStorage.getItem('rsLangHandbookData'));

    const wordsData = <WordsDataT> await
    (await this.getChunkOfWords(
      rsLangHandbookData.group,
      rsLangHandbookData.page,
    )).data;

    return { wordsData, rsLangHandbookData };
  }

  async wordCardHandler(
    wordCard: HTMLDivElement,
    activeWordCard: HTMLDivElement,
    wordCardIndex: number,
  ) {
    activeWordCard.classList.remove('active-word-card');
    wordCard.classList.add('active-word-card');

    const rsLangHandbookData: RsLangHandbookDataT = JSON.parse(<string>localStorage.getItem('rsLangHandbookData'));

    localStorage.setItem('rsLangHandbookData', JSON.stringify({
      group: rsLangHandbookData.group,
      page: rsLangHandbookData.currPage - this.diffBetweenArrIndexAndPageNum,
      currPage: rsLangHandbookData.currPage,
      activeWordCardIndex: wordCardIndex,
    }));
  }

  async levelCardHandler(
    activeLevelCard: HTMLDivElement,
    levelCard: HTMLElement,
    contentIndex: number,
    page: number,
    currPage: number,
    activeWordCardIndex: number,
    wordsPaginationCurrPage: HTMLDivElement,
    wordsPaginationPrevButton: HTMLButtonElement,
  ) {
    activeLevelCard.classList.remove('active-level-card');
    levelCard.classList.add('active-level-card');

    const [wordsData, wordsPaginationCurrPageCopy, wordsPaginationPrevButtonCopy] = [<WordsDataT>
    await (await this.getChunkOfWords(contentIndex, page)).data,
    wordsPaginationCurrPage, wordsPaginationPrevButton];

    localStorage.setItem('rsLangHandbookData', JSON.stringify({
      group: contentIndex,
      page,
      currPage,
      activeWordCardIndex,
    }));

    wordsPaginationCurrPageCopy.textContent = `${1}`;
    wordsPaginationPrevButtonCopy.disabled = true;

    return wordsData;
  }
}
