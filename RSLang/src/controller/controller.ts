import WordsAPI from '../APIs/wordsApi/wordsApi';
import { WordDataT } from '../types/types';
import Icontroller from './Icontroller';

export default class Controller implements Icontroller {
  private wordsAPI: WordsAPI;

  private baseURL: 'https://rsschool-lang-app.herokuapp.com';

  constructor() {
    this.wordsAPI = new WordsAPI();
    this.baseURL = 'https://rsschool-lang-app.herokuapp.com';
  }

  async cardHandler(group: number, page: number) {
    const res = await this.wordsAPI.getChunkOfWords(group, page);
    return res;
  }

  wordInfoAudioHandler = (
    wordData: WordDataT,
    audioElement: HTMLAudioElement,
    playCounter: { numOfPlays: number },
  ) => {
    const [
      audioUrls, audioElementCopy, playCounterCopy,
    ] = [
      [wordData.audioMeaning, wordData.audioExample, wordData.audio],
      audioElement, playCounter,
    ];
    audioElementCopy.src = `${this.baseURL}/${audioUrls[playCounterCopy.numOfPlays]}`;
    playCounterCopy.numOfPlays += 1;
    if (playCounterCopy.numOfPlays === audioUrls.length) {
      playCounterCopy.numOfPlays = 0;
      return;
    }
    audioElementCopy.play();
  };
}
