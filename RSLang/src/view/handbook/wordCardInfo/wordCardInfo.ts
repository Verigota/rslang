import axios from 'axios';
import authStorage from '../../../controller/auth-storage';
import IhandbookController from '../../../controller/handbookController/IhandbookController';
import { AggregatedWordDataT, PageNameT, WordDataT } from '../../../types/types';
import { getNewElement, getNewImageElement, getMeaningOrExampleContainer } from '../templatesForElements/templateForCreatingNewElement';
import IwordCardInfo from './IwordCardInfo';

function toggleLearnedPageClasses(activeWordNewClass: string, activeWordOldClass: string) {
  const [
    activeWordCard,
    wordCards,
    currPage,
    handbookWords,
    handbookSprint,
    handbookAudioCall,
  ] = [
    <HTMLDivElement>document.querySelector('.active-word-card'),
    document.querySelectorAll('.handbook__word-card'),
    <HTMLDivElement>document.querySelector('.words-pagination__curr-page'),
    <HTMLDivElement>document.querySelector('.handbook__words'),
    <HTMLDivElement>document.querySelector('.handbook__sprint'),
    <HTMLDivElement>document.querySelector('.handbook__audio-call'),
  ];

  activeWordCard.classList.add(activeWordNewClass);
  activeWordCard.classList.remove(activeWordOldClass);

  const areWordsHard = Array.from(wordCards).every((card) => card.classList.contains('hard'));
  const areWordsLearned = Array.from(wordCards).every((card) => card.classList.contains('hard') || card.classList.contains('learned'));

  if (areWordsHard) {
    currPage.classList.remove('all-wrods-learned');
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
  }
}

export default class WordCardInfo implements IwordCardInfo {
  private wordCardInfoSelector: '#handbook__word-card-info';

  private baseURL: string | undefined;

  constructor() {
    this.baseURL = axios.defaults.baseURL;
    this.wordCardInfoSelector = '#handbook__word-card-info';
  }

  renderWordCardInfo(
    wordData: WordDataT | AggregatedWordDataT,
    handbookController: IhandbookController,
    pageName: PageNameT,
    complicatedWordsCardHandler?:
    (levels: HTMLDivElement, handbookController: IhandbookController) => Promise<void>,
  ): void {
    const [wordCardInfo, img, playAudioButton, audio, playCounter] = [
      <HTMLDivElement>document.querySelector(this.wordCardInfoSelector), getNewImageElement('word-card-info__img', `${this.baseURL}/${wordData.image}`, 'word-image'),
      getNewElement('button', 'word-card-info__play-audio-button', 'play'),
      new Audio(`${this.baseURL}/${wordData.audio}`),
      { numOfPlays: 0 },
    ];

    wordCardInfo.innerHTML = '';
    audio.addEventListener('ended', () => {
      handbookController.wordInfoAudioHandler(wordData, audio, playCounter);
    });

    playAudioButton.addEventListener('click', () => audio.play());

    wordCardInfo.append(
      img,
      audio,
      getNewElement('h4', 'word-card-info__title', wordData.word),
      getNewElement('h5', 'word-card-info__subtitle', wordData.wordTranslate),
      getNewElement('h5', 'word-card-info__transcription', wordData.transcription),
      playAudioButton,
      getMeaningOrExampleContainer(
        'word-card-info__meaning-container',
        'word-card-info__meaning-title',
        'Значение',
        'word-card-info__meaning-ru',
        wordData.textMeaning,
        'word-card-info__meaning-en',
        wordData.textMeaningTranslate,
      ),
      getMeaningOrExampleContainer(
        'word-card-info__example-container',
        'word-card-info__example-title',
        'Пример',
        'word-card-info__example-ru',
        wordData.textExample,
        'word-card-info__example-en',
        wordData.textExampleTranslate,
      ),
    );

    if (authStorage.get() && pageName === 'handbook') {
      this.renderCardButtonsAfterAuth(handbookController, <WordDataT>wordData);
    }

    if (authStorage.get() && pageName === 'complicatedWords' && complicatedWordsCardHandler) {
      this.renderRemoveButton(handbookController, wordData, complicatedWordsCardHandler);
    }
  }

  renderCardButtonsAfterAuth(handbookController: IhandbookController, wordData: WordDataT): void {
    const wordCardInfo = <HTMLDivElement>document.querySelector(this.wordCardInfoSelector);

    const complicatedWordsButton = getNewElement('button', 'word__card-info-complicated-words-button', 'В сложные слова');
    complicatedWordsButton.addEventListener('click', () => {
      handbookController.complicatedWordsButtonHandler(wordData.id, 'hard', {});
      toggleLearnedPageClasses('hard', 'learned');
    });

    const learnedWordsButton = getNewElement('button', 'word__card-info-complicated-words-button', 'В изученные слова');
    learnedWordsButton.addEventListener('click', () => {
      handbookController.learnedWordsButtonHandler(wordData.id, 'learned', {});
      toggleLearnedPageClasses('learned', 'hard');
    });

    wordCardInfo.append(complicatedWordsButton, learnedWordsButton);
  }

  renderRemoveButton(
    handbookController: IhandbookController,
    wordData: WordDataT | AggregatedWordDataT,
    complicatedWordsCardHandler:
    (levels: HTMLDivElement, handbookController: IhandbookController) => Promise<void>,
  ):void {
    const wordCardInfo = <HTMLDivElement>document.querySelector(this.wordCardInfoSelector);
    const removeButton = getNewElement('button', 'word__card-info-remove-button', 'Удалить из сложных слов');

    removeButton.addEventListener('click', async () => {
      const numOfCards = (<HTMLDivElement>document.querySelector('.handbook__word-cards')).children.length;
      const levels = <HTMLDivElement>document.querySelector('#handbook__levels');

      handbookController.removeCardButtonHandler(
        wordData,
        complicatedWordsCardHandler,
        numOfCards,
        levels,
      );
    });
    wordCardInfo.append(removeButton);
  }
}
