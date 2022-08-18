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

  startApp() {
    this.view.renderView();
    this.controller.test();
  }
}
