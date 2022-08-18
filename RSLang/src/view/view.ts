import Textbook from './textbook/textbook';
import Iview from './Iview';

export default class View implements Iview {
  private textbook: Textbook;

  constructor() {
    this.textbook = new Textbook();
  }

  renderView() {
    this.textbook.renderTextBook();
  }
}
