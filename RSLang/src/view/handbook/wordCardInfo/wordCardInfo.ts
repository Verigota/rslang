import axios from 'axios';
import authStorage from '../../../controller/auth-storage';
import IhandbookController from '../../../controller/handbookController/IhandbookController';
import { AggregatedWordDataT, PageNameT, WordDataT } from '../../../types/types';
import { getNewElement, getNewImageElement, getMeaningOrExampleContainer } from '../templatesForElements/templateForCreatingNewElement';
import IwordCardInfo from './IwordCardInfo';

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
    complicatedWordsButton.addEventListener('click', () => handbookController.complicatedWordsButtonHandler(wordData.id, 'hard', {}));

    const learnedWordsButton = getNewElement('button', 'word__card-info-complicated-words-button', 'В изученные слова');
    learnedWordsButton.addEventListener('click', () => console.log('изучено'));

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
