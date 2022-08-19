import WordsAPI from '../APIs/wordsApi/wordsApi';
import Controller from '../controller/controller';
import { WordsDataT } from '../types/types';
import View from '../view/view';
import AppI from './appI';

enum AppValues {
  startGroup,
  startPage = startGroup,
}

export default class App implements AppI {
  private view: View;

  private controller: Controller;

  private wordsAPI: WordsAPI;

  constructor() {
    this.view = new View();
    this.controller = new Controller();
    this.wordsAPI = new WordsAPI();
  }

  async startApp() {
    const handbookButton = document.querySelector('button'); // must be changed to nav button
    handbookButton?.addEventListener('click', async () => {
      const wordsData = <WordsDataT> await
      (await this.wordsAPI.getChunkOfWords(AppValues.startGroup, AppValues.startPage)).data;

      this.view.renderHandbookView(wordsData);

      const levelCards = document.querySelectorAll('#handbook__level-card');
      levelCards.forEach((card, index) => card.addEventListener('click', async () => { console.log(await this.controller.cardHandler(index, AppValues.startPage)); }));

      const wordCards = document.querySelectorAll('.handbook__word-card');

      wordCards.forEach((wordCard) => wordCard.addEventListener('click', (e) => console.log(e.target)));
    });
  }
}
