import { herokuApi } from '../../api';
import { IApi } from '../../api/interfaces';

interface IGameStart {
  level: string;
  page: string;
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
