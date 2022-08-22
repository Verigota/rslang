import Controller from '../../../controller/controller';
import { WordsDataT } from '../../../types/types';

export default interface IwordCards {
  renderWordCards(wordsData: WordsDataT, controller: Controller): void
}
