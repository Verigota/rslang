import { AxiosResponse } from 'axios';
import {
  WordDataT,
  WordsDataT,
  RsLangHandbookDataT,
  AggregatedWordDataT,
  AggregatedWordsDataT,
  AggregatedWordsResponseT,
  PageNameT,
  UserWordsT,
} from '../../types/types';

export default interface IhandbookController {
  getChunkOfWords(group: number, page: number): Promise<AxiosResponse<WordsDataT>>;

  getWordWithAssetsById(wordId: string): Promise<AxiosResponse<WordDataT>>;

  getAllUserAggregatedHardWords(page: number)
  :Promise<AxiosResponse<AggregatedWordsResponseT>>

  wordInfoAudioHandler(
    wordData: WordDataT | AggregatedWordDataT,
    audioElement: HTMLAudioElement,
    playCounter: { numOfPlays: number },
  ): void

  wordsPaginationButtonHandler(
    activeButton: HTMLButtonElement,
    inactiveButton: HTMLButtonElement,
    step: number,
    currPage: HTMLDivElement,
    pageLimit: number,
    pageName: PageNameT,
  ): Promise<AggregatedWordsDataT | WordsDataT>

  handbookButtonHandler(): Promise<{
    wordsData: WordsDataT;
    rsLangHandbookData: RsLangHandbookDataT;
  }>

  levelCardHandler(
    activeLevelCard: HTMLDivElement,
    levelCard: HTMLElement,
    contentIndex: number,
    page: number,
    currPage: number,
    activeWordCardIndex: number,
    wordsPaginationCurrPage: HTMLDivElement,
    wordsPaginationPrevButton: HTMLButtonElement,
    wordsPaginationNextButton: HTMLButtonElement,
  ): Promise<WordsDataT>

  complicatedWordsButtonHandler(
    wordId: string,
    difficulty: string,
    optional: Record<string, never>
  ): void

  learnedWordsButtonHandler(
    wordId: string,
    difficulty: string,
    optional: Record<string, never>,
  ): void

  complicatedWordsCardHandler():Promise<AxiosResponse<UserWordsT>>

  wordCardHandler(
    wordCard: HTMLDivElement,
    activeWordCard: HTMLDivElement,
    wordCardIndex: number,
    pageName: 'handbook' | 'complicatedWords',
  ): Promise<void>

  deleteUserWord(userId: string, wordId: string): Promise<void>

  removeCardButtonHandler(
    wordData: WordDataT | AggregatedWordDataT,
    complicatedWordsCardHandler:
    (levels: HTMLDivElement, handbookController: IhandbookController) => Promise<void>,
    numOfCards: number,
    levels: HTMLDivElement,
  ): Promise<void>

  getUserWords(): Promise<AxiosResponse<UserWordsT>>
}
