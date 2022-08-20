import Controller from '../../../controller/controller';
import { WordDataT } from '../../../types/types';

export default interface IwordCardInfo {
  renderWordCardInfo(wordData: WordDataT, controller: Controller): void;
}
