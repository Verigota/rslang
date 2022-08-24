import { herokuApi } from '../../api';
import { IApi } from '../../api/interfaces';

interface IGameStart {
  level: string;
  page: string;
}

class GameController {
  api: IApi;

  constructor(startOpt: IGameStart) {
    this.api = herokuApi;
    if (startOpt.page) {
      // выбираем страницу
    } else {
      // выбираем случайную страницу
    }
  }
}
