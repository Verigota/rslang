import HandbookController from '../../../controller/handbookController/handbookController';
import { getHandbookDataFromLocalStorage } from '../../../controller/handbookController/handbookLocalStorageAPI';
import { RsLangHandbookDataT, WordDataT, WordsDataT } from '../../../types/types';
import { getNewElement } from '../templatesForElements/templateForCreatingNewElement';
import WordCardInfo from '../wordCardInfo/wordCardInfo';
import IwordCards from './IwordCards';

export default class WordCards implements IwordCards {
  private wordsSelector: '#handbook__word-cards';

  private wordCardInfo: WordCardInfo;

  constructor() {
    this.wordsSelector = '#handbook__word-cards';
    this.wordCardInfo = new WordCardInfo();
  }

  renderWordCards(wordsData: WordsDataT, handbookController: HandbookController) {
    const words = <HTMLDivElement>document.querySelector(this.wordsSelector);
    words.innerHTML = '';
    wordsData.forEach((data) => {
      const wordCard = <HTMLDivElement>getNewElement('div', 'handbook__word-card');
      wordCard.append(getNewElement('h5', 'handbook__card-title', data.word), getNewElement('h6', 'handbook__card-subtitle', data.wordTranslate));
      wordCard.setAttribute('data-word-card-id', data.id);
      words.append(wordCard);
    });

    const wordCards = <NodeListOf<HTMLDivElement>>document.querySelectorAll('.handbook__word-card');

    const newRsLangHandbookData: RsLangHandbookDataT = getHandbookDataFromLocalStorage('rsLangHandbookData');

    wordCards[newRsLangHandbookData.activeWordCardIndex].classList.add('active-word-card');

    wordCards.forEach((wordCard, wordCardIndex) => wordCard.addEventListener('click', async () => {
      const activeWordCard = <HTMLDivElement>document.querySelector('.active-word-card');
      handbookController.wordCardHandler(wordCard, activeWordCard, wordCardIndex);
      const id = <string>wordCard.dataset.wordCardId;
      this.wordCardInfo.renderWordCardInfo(
        <WordDataT>(await handbookController.getWordWithAssetsById(id)).data,
        handbookController,
      );
    }));
  }
}
