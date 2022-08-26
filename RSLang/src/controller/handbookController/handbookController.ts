import axios, { AxiosResponse } from 'axios';
import { herokuApi } from '../../api';
import { IApi } from '../../api/interfaces';
import { WordDataT, WordsDataT, RsLangHandbookDataT } from '../../types/types';
import { DIFF_BETWEEN_ARR_INDEX_AND_PAGE_NUM, FIRST_CARD_INDEX, LOCAL_STORAGE_KEY } from './handbookControllerConstants';
import { getHandbookDataFromLocalStorage, setHandbookDataToLocalStorage } from './handbookLocalStorageAPI';
import IhandbookController from './IhandbookController';

export default class HandbookController implements IhandbookController {
  private herokuApi: IApi;

  private baseURL: string | undefined;

  private diffBetweenArrIndexAndPageNum: number;

  private firstCardIndex: number;

  private localStorageKey: 'rsLangHandbookData';

  constructor() {
    this.herokuApi = herokuApi;
    this.baseURL = axios.defaults.baseURL;
    this.diffBetweenArrIndexAndPageNum = DIFF_BETWEEN_ARR_INDEX_AND_PAGE_NUM;
    this.firstCardIndex = FIRST_CARD_INDEX;
    this.localStorageKey = LOCAL_STORAGE_KEY;
  }

  async getChunkOfWords(group: number, page: number): Promise<AxiosResponse<WordsDataT>> {
    const res = await this.herokuApi.getChunkOfWords(group, page);
    return res;
  }

  async getWordWithAssetsById(wordId: string): Promise<AxiosResponse<WordDataT>> {
    const res = await this.herokuApi.getWordWithAssetsById(wordId);
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
    const [
      rsLangHandbookData,
      inactiveButtonCopy,
      activeButtonCopy,
      currPageCopy,
    ] = [
      getHandbookDataFromLocalStorage(this.localStorageKey),
      inactiveButton,
      activeButton,
      currPage,
    ];

    inactiveButtonCopy.disabled = false;

    rsLangHandbookData.currPage += step;
    rsLangHandbookData.page += step;

    setHandbookDataToLocalStorage(
      this.localStorageKey,
      rsLangHandbookData.group,
      rsLangHandbookData.currPage - this.diffBetweenArrIndexAndPageNum,
      rsLangHandbookData.currPage,
      this.firstCardIndex,
    );

    const wordsData = <WordsDataT>(await this.getChunkOfWords(
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
    if (!getHandbookDataFromLocalStorage(this.localStorageKey)) {
      setHandbookDataToLocalStorage(this.localStorageKey, 0, 0, 1, 0);
    }

    const rsLangHandbookData:
    RsLangHandbookDataT = getHandbookDataFromLocalStorage(this.localStorageKey);

    const wordsData = <WordsDataT>
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

    const rsLangHandbookData:
    RsLangHandbookDataT = getHandbookDataFromLocalStorage(this.localStorageKey);

    setHandbookDataToLocalStorage(
      this.localStorageKey,
      rsLangHandbookData.group,
      rsLangHandbookData.currPage - this.diffBetweenArrIndexAndPageNum,
      rsLangHandbookData.currPage,
      wordCardIndex,
    );
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
    wordsPaginationNextButton: HTMLButtonElement,
  ) {
    activeLevelCard.classList.remove('active-level-card');
    levelCard.classList.add('active-level-card');

    const [wordsData,
      wordsPaginationCurrPageCopy,
      wordsPaginationPrevButtonCopy,
      wordsPaginationNextButtonCopy,
    ] = [<WordsDataT>
    (await this.getChunkOfWords(contentIndex, page)).data,
    wordsPaginationCurrPage, wordsPaginationPrevButton, wordsPaginationNextButton];

    setHandbookDataToLocalStorage(
      this.localStorageKey,
      contentIndex,
      page,
      currPage,
      activeWordCardIndex,
    );

    wordsPaginationCurrPageCopy.textContent = '1';
    wordsPaginationPrevButtonCopy.disabled = true;
    wordsPaginationNextButtonCopy.disabled = false;

    return wordsData;
  }
}
