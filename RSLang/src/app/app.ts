import Controller from '../controller/controller';
import View from '../view/view';
import AppI from './appI';

enum AppValues {
  startPage,
}
export default class App implements AppI {
  private view: View;

  private controller: Controller;

  constructor() {
    this.view = new View();
    this.controller = new Controller();
  }

  startApp() {
    this.view.renderView();

    const levelCards = document.querySelectorAll('#handbook__level-card');
    levelCards.forEach((card, index) => card.addEventListener('click', async () => { console.log(await this.controller.cardHandler(index, AppValues.startPage)); }));
  }
}
