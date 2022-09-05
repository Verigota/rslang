import axios, { AxiosResponse } from 'axios';
import { herokuApi } from '../../api';
import { IApi } from '../../api/interfaces';
import {
  WordDataT,
  WordsDataT,
  RsLangHandbookDataT,
  AggregatedWordDataT,
  AggregatedWordsDataT,
  AggregatedWordsResponseT,
  PageNameT,
  ComplicatedWordsStorageDataT,
  UserWordsT,
} from '../../types/types';
import { Difficulty, IAggregatedWord } from '../games/interfaces';
import { DIFF_BETWEEN_ARR_INDEX_AND_PAGE_NUM, FIRST_CARD_INDEX } from './handbookControllerConstants';
import {
  getHandbookComplicatedWordsDataFromLocalStorage,
  getHandbookDataFromLocalStorage,
  setHandbookComplicatedWordsToLocalStorage,
  setHandbookDataToLocalStorage,
  updateHandbookComplicatedWordsStorage,
  updateHandbookWordsStorage,
} from './handbookLocalStorageAPI';
import IhandbookController from './IhandbookController';

export default class HandbookController implements IhandbookController {
  private herokuApi: IApi;

  private baseURL: string | undefined;

  private diffBetweenArrIndexAndPageNum: number;

  private firstCardIndex: number;

  constructor() {
    this.herokuApi = herokuApi;
    this.baseURL = axios.defaults.baseURL;
    this.diffBetweenArrIndexAndPageNum = DIFF_BETWEEN_ARR_INDEX_AND_PAGE_NUM;
    this.firstCardIndex = FIRST_CARD_INDEX;
  }

  async getChunkOfWords(group: number, page: number): Promise<AxiosResponse<WordsDataT>> {
    const res = await this.herokuApi.getChunkOfWords(group, page);
    return res;
  }

  async getWordWithAssetsById(wordId: string): Promise<AxiosResponse<WordDataT>> {
    const res = await this.herokuApi.getWordWithAssetsById(wordId);
    return res;
  }

  async getAllUserAggregatedHardWords(page: number)
    : Promise<AxiosResponse<AggregatedWordsResponseT>> {
    const res = this.herokuApi.getAllUserAggregatedHardWords(page);
    return res;
  }

  async complicatedWordsCardHandler() {
    const res = await this.herokuApi.getUserWords();
    return res;
  }

  wordInfoAudioHandler = (
    wordData: WordDataT | AggregatedWordDataT,
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

  async handbookButtonHandler():
  Promise<{
    wordsData: WordsDataT;
    rsLangHandbookData: RsLangHandbookDataT;
  }> {
    if (!getHandbookDataFromLocalStorage()) {
      setHandbookDataToLocalStorage(0, 0, 1, 0);
    }

    const rsLangHandbookData:
    RsLangHandbookDataT = getHandbookDataFromLocalStorage();

    const { group, page } = rsLangHandbookData;

    const wordsData = <WordsDataT>
      (await this.getChunkOfWords(
        group,
        page,
      )).data;

    return { wordsData, rsLangHandbookData };
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

  complicatedWordsButtonHandler(
    wordId: string,
    difficulty: Difficulty,
  ): void {
    this.herokuApi.updateOrCreateUserWord(wordId, difficulty);
    setHandbookComplicatedWordsToLocalStorage(0, 1, 0);
  }

  learnedWordsButtonHandler(
    wordId: string,
    difficulty: Difficulty,
  ): void {
    this.herokuApi.updateOrCreateUserWord(wordId, difficulty);
  }

  async wordCardHandler(
    wordCard: HTMLDivElement,
    activeWordCard: HTMLDivElement,
    wordCardIndex: number,
    pageName: PageNameT,
  ): Promise<void> {
    activeWordCard.classList.remove('active-word-card');
    wordCard.classList.add('active-word-card');

    if (pageName === 'complicatedWords') {
      updateHandbookComplicatedWordsStorage(this.diffBetweenArrIndexAndPageNum, wordCardIndex);
    } else {
      updateHandbookWordsStorage(this.diffBetweenArrIndexAndPageNum, wordCardIndex);
    }
  }

  async wordsPaginationButtonHandler(
    activeButton: HTMLButtonElement,
    inactiveButton: HTMLButtonElement,
    step: number,
    currPage: HTMLDivElement,
    pageLimit: number,
    pageName: PageNameT,
  ): Promise<AggregatedWordsDataT | WordsDataT> {
    const isHandbook = pageName === 'handbook';

    const storageWordsData:
    RsLangHandbookDataT | ComplicatedWordsStorageDataT = (isHandbook)
      ? getHandbookDataFromLocalStorage() : getHandbookComplicatedWordsDataFromLocalStorage();

    const [
      inactiveButtonCopy,
      activeButtonCopy,
      currPageCopy,
    ] = [
      inactiveButton,
      activeButton,
      currPage,
    ];

    inactiveButtonCopy.disabled = false;
    storageWordsData.currPage += step;
    storageWordsData.page += step;

    if (storageWordsData.currPage === pageLimit) {
      activeButtonCopy.disabled = true;
    }

    if (isHandbook) {
      setHandbookDataToLocalStorage(
        (<RsLangHandbookDataT>storageWordsData).group,
        storageWordsData.currPage - this.diffBetweenArrIndexAndPageNum,
        storageWordsData.currPage,
        this.firstCardIndex,
      );
    } else {
      setHandbookComplicatedWordsToLocalStorage(
        storageWordsData.currPage - this.diffBetweenArrIndexAndPageNum,
        storageWordsData.currPage,
        this.firstCardIndex,
      );
    }

    const wordsData: WordsDataT | AggregatedWordsDataT = (isHandbook)
      ? (await this.getChunkOfWords(
        (<RsLangHandbookDataT>storageWordsData).group,
        (storageWordsData).page,
      )).data : (
        await this.getAllUserAggregatedHardWords(storageWordsData.page)).data[0].paginatedResults;

    currPageCopy.textContent = `${storageWordsData.currPage}`;

    return wordsData;
  }

  async removeCardButtonHandler(
    wordData: WordDataT | AggregatedWordDataT,
    complicatedWordsCardHandler:
    (levels: HTMLDivElement, handbookController: IhandbookController) => Promise<void>,
    numOfCards: number,
    levels: HTMLDivElement,
  ): Promise<void> {
    const aggregatedWordsId = '_id';
    const id = ('id' in wordData) ? wordData.id : wordData[aggregatedWordsId];
    await this.herokuApi.updateOrCreateUserWord(id, Difficulty.process);

    const storageWordsData = getHandbookComplicatedWordsDataFromLocalStorage();

    setHandbookComplicatedWordsToLocalStorage(
      (numOfCards === 1 && storageWordsData.page > 0)
        ? storageWordsData.page - 1 : storageWordsData.page,
      (numOfCards === 1 && storageWordsData.currPage > 1)
        ? storageWordsData.currPage - 1 : storageWordsData.currPage,
      0,
    );
    complicatedWordsCardHandler(levels, this);
  }

  async getUserWords(): Promise<AxiosResponse<UserWordsT>> {
    const res = await this.herokuApi.getUserWords();
    return res;
  }

  async getWordStatistic(wordId: string):Promise<IAggregatedWord | null> {
    const res = this.herokuApi.getWordStatistic(wordId);
    return res;
  }
}
