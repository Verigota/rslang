import HandbookController from './handbookController/handbookController';
import Icontroller from './Icontroller';

export default class Controller implements Icontroller {
  private handbookController: HandbookController;

  constructor() {
    this.handbookController = new HandbookController();
  }

  getHandbookController() {
    return this.handbookController;
  }
}
