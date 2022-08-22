import Controller from '../../../controller/controller';
import { WordDataT } from '../../../types/types';
import { getNewElement, getNewImageElement, getMeaningOrExampleContainer } from '../templatesForElements/templateForCreatingNewElement';
import IwordCardInfo from './IwordCardInfo';

export default class WordCardInfo implements IwordCardInfo {
  private wordCardInfoSelector: '#handbook__word-card-info';

  private baseURL: 'https://rsschool-lang-app.herokuapp.com';

  constructor() {
    this.baseURL = 'https://rsschool-lang-app.herokuapp.com';
    this.wordCardInfoSelector = '#handbook__word-card-info';
  }

  renderWordCardInfo(wordData: WordDataT, controller: Controller): void {
    const [wordCardInfo, img, playAudioButton, audio, playCounter] = [
      <HTMLDivElement>document.querySelector(this.wordCardInfoSelector), getNewImageElement('word-card-info__img', `${this.baseURL}/${wordData.image}`, 'word-image'),
      getNewElement('button', 'word-card-info__play-audio-button', 'play'),
      new Audio(`${this.baseURL}/${wordData.audio}`),
      { numOfPlays: 0 },
    ];

    wordCardInfo.innerHTML = '';
    audio.addEventListener('ended', () => {
      controller.wordInfoAudioHandler(wordData, audio, playCounter);
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
  }
}
