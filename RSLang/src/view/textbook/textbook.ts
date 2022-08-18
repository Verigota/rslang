import ITextbook from './Itextbook';

export default class Textbook implements ITextbook {
  renderTextBook() {
    console.log(this);
  }
}
