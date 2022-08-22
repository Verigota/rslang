import { AxiosResponse } from 'axios';
import { RsLangHandbookDataT, WordDataT, WordsDataT } from '../types/types';

export default interface Icontroller {
  getChunkOfWords(group: number, page: number): Promise<AxiosResponse<unknown, unknown>>;

  getWordWithAssetsById(wordId: string): Promise<AxiosResponse<unknown, unknown>>;

  wordInfoAudioHandler(
    wordData: WordDataT,
    audioElement: HTMLAudioElement,
    playCounter: { numOfPlays: number },
  ): void

  wordsPaginationButtonHandler(
    activeButton: HTMLButtonElement,
    inactiveButton: HTMLButtonElement,
    step: number,
    currPage: HTMLDivElement,
    pageLimit: number,
  ): Promise<WordsDataT>

  handbookButtonHandler(): Promise<{
    wordsData: WordsDataT;
    rsLangHandbookData: RsLangHandbookDataT;
  }>

  wordCardHandler(
    wordCard: HTMLDivElement,
    activeWordCard: HTMLDivElement,
    wordCardIndex: number,
  ): Promise<void>

  levelCardHandler(
    activeLevelCard: HTMLDivElement,
    levelCard: HTMLElement,
    contentIndex: number,
    page: number,
    currPage: number,
    activeWordCardIndex: number,
    wordsPaginationCurrPage: HTMLDivElement,
    wordsPaginationPrevButton: HTMLButtonElement,
  ): Promise<WordsDataT>
}
