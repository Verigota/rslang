import IhandbookController from '../../../controller/handbookController/IhandbookController';
import { AggregatedWordsDataT, PageNameT, WordsDataT } from '../../../types/types';

export default interface IwordCards {
  renderWordCards(aggregatedWordsData: WordsDataT | AggregatedWordsDataT,
    handbookController: IhandbookController,
    pageName: PageNameT,): void
}
