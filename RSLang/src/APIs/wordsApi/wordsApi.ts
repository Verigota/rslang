import { AxiosResponse } from 'axios';
import APIRequestsTemplate from '../APIrequestsTemplate/APIrequestsTemplate';
import IwordsAPI from './IwordsApi';

export default class WordsAPI extends APIRequestsTemplate implements IwordsAPI {
  private wordsPath: '/words';

  constructor() {
    super();
    this.wordsPath = '/words';
  }

  async getChunkOfWords<T, K>(group: number, page: number):
  Promise<AxiosResponse<T, K>> {
    return super.getData(`${this.wordsPath}?group=${group}&page=${page}`);
  }

  async getWordWithAssetsById<T, K>(wordId: number):
  Promise<AxiosResponse<T, K>> {
    return super.getData(`${this.wordsPath}/${wordId}`);
  }
}
