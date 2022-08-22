import Controller from '../../controller/controller';
import { WordDataT, WordsDataT } from '../../types/types';

export default interface IHandbook {
  renderHandbook(wordsData: WordsDataT, wordData: WordDataT, controller: Controller): void;
}
