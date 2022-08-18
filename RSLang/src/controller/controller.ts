import WordsAPI from '../APIs/wordsApi/wordsApi';

export default class Controller {
  private wordsAPI: WordsAPI;

  constructor() {
    this.wordsAPI = new WordsAPI();
  }

  async test() {
    console.log(await this.wordsAPI.getChunkOfWords(0, 0));
  }
}
