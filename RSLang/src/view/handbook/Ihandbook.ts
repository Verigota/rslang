import HandbookController from '../../controller/handbookController/handbookController';
import { WordDataT, WordsDataT } from '../../types/types';

export default interface IHandbook {
  renderHandbook(
    wordsData: WordsDataT,
    wordData: WordDataT,
    handbookController: HandbookController,
  ): void;
  handlePaginationButtons(handbookController: HandbookController): void
  paginationButtonHandler(
    handbookController: HandbookController,
    activeButton: HTMLButtonElement,
    inactiveButton: HTMLButtonElement,
    step: number,
    currPage: HTMLDivElement,
    firstOrLastPage: number,
  ): Promise<void>
}
