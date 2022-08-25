import Controller from '../controller/controller';
import View from '../view/view';
import AppI from './appI';

export default class App implements AppI {
  private view: View;

  private controller: Controller;

  constructor() {
    this.controller = new Controller();
    this.view = new View();
  }

  startApp() {
    const handbookButton = document.querySelector('#handbook__button'); // must be changed to nav button
    handbookButton?.addEventListener('click', () => this.handbookButtonHandler());
  }

  async handbookButtonHandler() {
    const handbookController = this.controller.getHandbookController();
    const { wordsData, rsLangHandbookData } = await handbookController.handbookButtonHandler();
    this.view.renderHandbookView(
      wordsData,
      wordsData[rsLangHandbookData.activeWordCardIndex],
      handbookController,
    );
  }
}