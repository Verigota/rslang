import { getHandbookComplicatedWordsDataFromLocalStorage, getHandbookDataFromLocalStorage } from '../../../controller/handbookController/handbookLocalStorageAPI';
import IhandbookController from '../../../controller/handbookController/IhandbookController';
import {
  AggregatedWordsDataT,
  ComplicatedWordsStorageDataT,
  PageNameT,
  RsLangHandbookDataT,
  WordDataT,
  WordsDataT,
} from '../../../types/types';
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

  renderWordCards(
    aggregatedWordsData: WordsDataT | AggregatedWordsDataT,
    handbookController: IhandbookController,
    pageName: PageNameT,
  ) {
    const words = <HTMLDivElement>document.querySelector(this.wordsSelector);
    words.innerHTML = '';
    aggregatedWordsData.forEach((data, wordCardIndex) => {
      const wordCard = <HTMLDivElement>getNewElement('div', 'handbook__word-card');
      wordCard.append(getNewElement('h5', 'handbook__card-title', data.word), getNewElement('h6', 'handbook__card-subtitle', data.wordTranslate));

      wordCard.addEventListener('click', async () => {
        const activeWordCard = <HTMLDivElement>document.querySelector('.active-word-card');
        handbookController.wordCardHandler(wordCard, activeWordCard, wordCardIndex, pageName);
        const aggregatedWordsDataId = '_id';
        const id = ('id' in data) ? data.id : data[aggregatedWordsDataId];
        this.wordCardInfo.renderWordCardInfo(
          <WordDataT>(await handbookController.getWordWithAssetsById(id)).data,
          handbookController,
          pageName,
        );
      });

      words.append(wordCard);
    });

    const wordCards = <NodeListOf<HTMLDivElement>>document.querySelectorAll('.handbook__word-card');

    const wordsData: RsLangHandbookDataT | ComplicatedWordsStorageDataT = (pageName === 'handbook') ? getHandbookDataFromLocalStorage() : getHandbookComplicatedWordsDataFromLocalStorage();

    wordCards[wordsData.activeWordCardIndex].classList.add('active-word-card');
  }
}
