import HandbookController from '../../../controller/handbookController/handbookController';
import { WordsDataT } from '../../../types/types';

export default interface IwordCards {
  renderWordCards(wordsData: WordsDataT, handbookController: HandbookController): void
}
