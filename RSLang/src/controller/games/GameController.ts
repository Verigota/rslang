import { herokuApi } from '../../api';
import { IApi } from '../../api/interfaces';
import { WordDataT, WordsDataT } from '../../types/types';

interface IGameStart {
  level: string;
  page: string;
  words: WordsDataT | [];
}

export default class GameController {
  api: IApi;
  // words:

  constructor(startOpt: IGameStart) {
    this.api = herokuApi;
    if (startOpt.page) {
      // this.words = данные со страницы
    } else {
      // this.words = выбираем случайную страницу
    }
  }
}
