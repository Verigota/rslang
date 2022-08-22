import HandbookController from '../../../controller/handbookController/handbookController';
import { WordDataT } from '../../../types/types';

export default interface IwordCardInfo {
  renderWordCardInfo(wordData: WordDataT, handbookController: HandbookController): void;
}
