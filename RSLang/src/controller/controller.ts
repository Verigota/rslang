import WordsAPI from '../APIs/wordsApi/wordsApi';

export default class Controller {
  private wordsAPI: WordsAPI;

  constructor() {
    this.wordsAPI = new WordsAPI();
  }

  async cardHandler(group: number, page: number) {
    const res = await this.wordsAPI.getChunkOfWords(group, page);
    return res;
  }
}
