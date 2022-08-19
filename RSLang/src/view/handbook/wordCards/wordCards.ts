import { WordsDataT } from '../../../types/types';
import getNewElement from '../templatesForElements/templateForCreatingNewElement';

export default class WordCards {
  private wordsSelector: '#handbook__word-cards';

  constructor() {
    this.wordsSelector = '#handbook__word-cards';
  }

  renderWordCards(wordsData: WordsDataT) {
    const words = <HTMLDivElement>document.querySelector(this.wordsSelector);
    wordsData.forEach((data) => {
      const wordCard = <HTMLDivElement>getNewElement('div', 'handbook__word-card');
      wordCard.append(getNewElement('h5', 'handbook__card-title', data.word), getNewElement('h6', 'handbook__card-subtitle', data.wordTranslate));
      wordCard.setAttribute('data-word-card-id', data.id);
      words.append(wordCard);
    });
  }
}
