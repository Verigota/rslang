import axios from 'axios';
import WordsAPI from '../../APIs/wordsApi/wordsApi';
import { WordDataT, WordsDataT, RsLangHandbookDataT } from '../../types/types';
import IhandbookController from './IhandbookController';

export default class HandbookController implements IhandbookController {
  private wordsAPI: WordsAPI;

  private baseURL: string | undefined;

  private diffBetweenArrIndexAndPageNum: number;

  private firstCardIndex: number;

  private localStorageKey: 'rsLangHandbookData';

  constructor() {
    this.wordsAPI = new WordsAPI();
    this.baseURL = axios.defaults.baseURL;
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
  ): Promise<WordsDataT> {
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

  async handbookButtonHandler():
  Promise<{
    wordsData: WordsDataT;
    rsLangHandbookData: RsLangHandbookDataT;
  }> {
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
  ): Promise<void> {
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
    console.log(activeLevelCard);
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
