import Controller from '../../../controller/controller';
import WordCardInfo from '../wordCardInfo/wordCardInfo';
import WordCards from '../wordCards/wordCards';

export default interface IlevelCards {
  renderLevelCards(controller: Controller, wordCards: WordCards, wordCardInfo: WordCardInfo): void;
}
