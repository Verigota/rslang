import IhandbookController from '../../controller/handbookController/IhandbookController';
import {
  AggregatedWordsDataT, PageNameT, WordDataT, WordsDataT,
} from '../../types/types';

export default interface IHandbook {
  renderHandbook(
    wordsData: WordsDataT,
    wordData: WordDataT,
    handbookController: IhandbookController,
  ): void;
  handlePaginationButtons(handbookController: IhandbookController,
    firstPage: number,
    lastPage: number, pageName: PageNameT): void
  paginationButtonHandler(
    handbookController: IhandbookController,
    activeButton: HTMLButtonElement,
    inactiveButton: HTMLButtonElement,
    step: number,
    currPage: HTMLDivElement,
    firstOrLastPage: number,
    pageName: PageNameT,
  ): Promise<void>
  renderComplicatedWordsContent(
    count: { count: number } | undefined,
    paginatedResults: WordsDataT | AggregatedWordsDataT,
    handbookController: IhandbookController,
    activeWordCardIndex: number,
    complicatedWordsCardHandler:
    (levels: HTMLDivElement, handbookController: IhandbookController) => Promise<void>,
  ): void
}
