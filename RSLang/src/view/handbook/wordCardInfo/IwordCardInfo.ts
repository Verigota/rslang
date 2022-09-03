import HandbookController from '../../../controller/handbookController/handbookController';
import { PageNameT, WordDataT } from '../../../types/types';

export default interface IwordCardInfo {
  renderWordCardInfo
  (wordData: WordDataT, handbookController: HandbookController, pageName: PageNameT): void;
}
