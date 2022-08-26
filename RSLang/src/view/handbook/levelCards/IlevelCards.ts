import HandbookController from '../../../controller/handbookController/handbookController';
import WordCardInfo from '../wordCardInfo/wordCardInfo';
import WordCards from '../wordCards/wordCards';

export default interface IlevelCards {
  renderLevelCards(
    handbookController: HandbookController,
    wordCards: WordCards, wordCardInfo: WordCardInfo): void;
  levelCardHandler(
    activeLevelCard: HTMLDivElement,
    levelCard: HTMLElement,
    handbookController: HandbookController,
    contentIndex: number,
    wordCards: WordCards,
    wordCardInfo: WordCardInfo,
  ): Promise<void>
}
