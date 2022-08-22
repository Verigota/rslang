import Controller from '../controller/controller';
import View from '../view/view';
import AppI from './appI';

export default class App implements AppI {
  private view: View;

  private controller: Controller;

  constructor() {
    this.view = new View();
    this.controller = new Controller();
  }

  async startApp() {
    const handbookButton = document.querySelector('button'); // must be changed to nav button
    handbookButton?.addEventListener('click', async () => {
      await this.handbookButtonHandler();
    });
  }

  async handbookButtonHandler() {
    const { wordsData, rsLangHandbookData } = await this.controller.handbookButtonHandler();
    this.view.renderHandbookView(
      wordsData,
      wordsData[rsLangHandbookData.activeWordCardIndex],
      this.controller,
    );
  }
}
