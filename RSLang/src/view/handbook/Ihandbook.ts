import Controller from '../../controller/controller';
import { WordDataT, WordsDataT } from '../../types/types';

export default interface IHandbook {
  renderHandbook(wordsData: WordsDataT, wordData: WordDataT, controller: Controller): void;
  handlePaginationButtons(controller: Controller): void
  paginationButtonHandler(
    controller: Controller,
    activeButton: HTMLButtonElement,
    inactiveButton: HTMLButtonElement,
    step: number,
    currPage: HTMLDivElement,
    firstOrLastPage: number,
  ): Promise<void>
}
