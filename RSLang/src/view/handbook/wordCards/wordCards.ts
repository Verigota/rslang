import authStorage from '../../../controller/authorization/auth-storage';
import { getHandbookComplicatedWordsDataFromLocalStorage, getHandbookDataFromLocalStorage } from '../../../controller/handbookController/handbookLocalStorageAPI';
import IhandbookController from '../../../controller/handbookController/IhandbookController';
import {
  AggregatedWordDataT,
  AggregatedWordsDataT,
  ComplicatedWordsStorageDataT,
  PageNameT,
  RsLangHandbookDataT,
  UserWordsT,
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

function toggleLearnedPageClasses(wordCards: HTMLDivElement[]) {
  const [
    currPage,
    handbookWords,
    handbookSprint,
    handbookAudioCall,
  ] = [
  <HTMLDivElement>document.querySelector('.words-pagination__curr-page'),
  <HTMLDivElement>document.querySelector('.handbook__words'),
  <HTMLDivElement>document.querySelector('.handbook__sprint'),
  <HTMLDivElement>document.querySelector('.handbook__audio-call'),
  ];

  const areWordsHard = (wordCards).every((card) => card.classList.contains('hard'));

  const areWordsLearned = (wordCards).every((card) => card.classList.contains('hard') || card.classList.contains('learned'));

  if (areWordsHard) {
    handbookWords.classList.remove('page-learned');
    handbookSprint.classList.remove('disabled');
    handbookAudioCall.classList.remove('disabled');
    return;
  }

  if (areWordsLearned) {
    currPage.classList.add('all-words-learned');
    handbookWords.classList.add('page-learned');
    handbookSprint.classList.add('disabled');
    handbookAudioCall.classList.add('disabled');
  } else {
    currPage.classList.remove('all-words-learned');
    handbookWords.classList.remove('page-learned');
    handbookSprint.classList.remove('disabled');
    handbookAudioCall.classList.remove('disabled');
  }
}

export default class WordCards implements IwordCards {
  private wordsSelector: '#handbook__word-cards';

  private wordCardInfo: WordCardInfo;

  constructor() {
    this.wordsSelector = '#handbook__word-cards';
    this.wordCardInfo = new WordCardInfo();
  }

  async renderWordCards(
    wordsData: WordsDataT | AggregatedWordsDataT,
    handbookController: IhandbookController,
    pageName: PageNameT,
    complicatedWordsCardHandler?:
    (levels: HTMLDivElement, handbookController: IhandbookController) => Promise<void>,
  ) {
    const words = <HTMLDivElement>document.querySelector(this.wordsSelector);
    const userWords = (authStorage.get()) ? (await handbookController.getUserWords()).data : null;
    words.innerHTML = '';

    const wordCards = (await Promise.all(sortWordsData(wordsData)
      .map((data: WordDataT | AggregatedWordDataT, wordCardIndex: number) => this.createCard(
        data,
        words,
        userWords,
        handbookController,
        wordCardIndex,
        pageName,
        complicatedWordsCardHandler,
      ))));

    toggleLearnedPageClasses(wordCards);

    const wordsStorageData: RsLangHandbookDataT | ComplicatedWordsStorageDataT = (pageName === 'handbook') ? getHandbookDataFromLocalStorage() : getHandbookComplicatedWordsDataFromLocalStorage();

    (wordCards[wordsStorageData.activeWordCardIndex]).classList.add('active-word-card');
  }

  async createCard(
    data: WordDataT | AggregatedWordDataT,
    words: HTMLDivElement,
    userWords: UserWordsT | null,
    handbookController: IhandbookController,
    wordCardIndex: number,
    pageName: PageNameT,
    complicatedWordsCardHandler?:
    (levels: HTMLDivElement, handbookController: IhandbookController) => Promise<void>,
  ) {
    const wordCard = <HTMLDivElement>getNewElement('div', 'handbook__word-card');
    wordCard.append(getNewElement('h5', 'handbook__card-title', data.word), getNewElement('h6', 'handbook__card-subtitle', data.wordTranslate));

    words.append(wordCard);

    const aggregatedWordsDataId = '_id';
    const id = ('id' in data) ? data.id : data[aggregatedWordsDataId];

    if (userWords) {
      userWords.forEach((userWord) => {
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
    return wordCard;
  }
}
