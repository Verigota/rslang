import Handbook from './handbook/handbook';
import Iview from './Iview';

export default class View implements Iview {
  private textbook: Handbook;

  constructor() {
    this.textbook = new Handbook();
  }

  renderView() {
    this.textbook.renderHandbook();
  }
}
