import { herokuApi } from '../../../api';
import authStorage from '../../../controller/auth-storage';
import { getHandbookComplicatedWordsDataFromLocalStorage, getHandbookDataFromLocalStorage } from '../../../controller/handbookController/handbookLocalStorageAPI';
import IhandbookController from '../../../controller/handbookController/IhandbookController';
import {
  AggregatedWordDataT,
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

function sortWordsData(wordsData: WordsDataT | AggregatedWordsDataT) {
  return wordsData.sort((curr, next) => {
    if (curr.group === next.group) {
      return curr.page - next.page;
    }
    return curr.group - next.page;
  });
}

export default class WordCards implements IwordCards {
  private wordsSelector: '#handbook__word-cards';

  private wordCardInfo: WordCardInfo;

  constructor() {
    this.wordsSelector = '#handbook__word-cards';
    this.wordCardInfo = new WordCardInfo();
  }

  renderWordCards(
    wordsData: WordsDataT | AggregatedWordsDataT,
    handbookController: IhandbookController,
    pageName: PageNameT,
    complicatedWordsCardHandler?:
    (levels: HTMLDivElement, handbookController: IhandbookController) => Promise<void>,
  ) {
    const words = <HTMLDivElement>document.querySelector(this.wordsSelector);
    words.innerHTML = '';
    sortWordsData(wordsData)
      .forEach(async (data: WordDataT | AggregatedWordDataT, wordCardIndex: number) => {
        const wordCard = <HTMLDivElement>getNewElement('div', 'handbook__word-card');
        wordCard.append(getNewElement('h5', 'handbook__card-title', data.word), getNewElement('h6', 'handbook__card-subtitle', data.wordTranslate));

        words.append(wordCard);

        const aggregatedWordsDataId = '_id';
        const id = ('id' in data) ? data.id : data[aggregatedWordsDataId];

        if (authStorage.get()) {
          (await handbookController.getUserWords()).data.forEach((userWord) => {
            if (userWord.wordId === id) {
              wordCard.classList.add(userWord.difficulty);
            }
          });
        }

        wordCard.addEventListener('click', async () => {
          const activeWordCard = <HTMLDivElement>document.querySelector('.active-word-card');
          handbookController.wordCardHandler(wordCard, activeWordCard, wordCardIndex, pageName);

          this.wordCardInfo.renderWordCardInfo(
          <WordDataT>(await handbookController.getWordWithAssetsById(id)).data,
          handbookController,
          pageName,
          complicatedWordsCardHandler,
          );
        });
      });

    const wordCards = <NodeListOf<HTMLDivElement>>document.querySelectorAll('.handbook__word-card');

    const wordsStorageData: RsLangHandbookDataT | ComplicatedWordsStorageDataT = (pageName === 'handbook') ? getHandbookDataFromLocalStorage() : getHandbookComplicatedWordsDataFromLocalStorage();

    wordCards[wordsStorageData.activeWordCardIndex].classList.add('active-word-card');
  }
}
