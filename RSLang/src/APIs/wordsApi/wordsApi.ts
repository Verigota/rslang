import { AxiosResponse } from 'axios';
import { WordDataT, WordsDataT } from '../../types/types';
import APIRequestsTemplate from '../APIrequestsTemplate/APIrequestsTemplate';
import IwordsAPI from './IwordsApi';

export default class WordsAPI extends APIRequestsTemplate implements IwordsAPI {
  private wordsPath: '/words';

  constructor() {
    super();
    this.wordsPath = '/words';
  }

  async getChunkOfWords(group: number, page: number):
  Promise<AxiosResponse<WordsDataT>> {
    return super.getData(`${this.wordsPath}?group=${group}&page=${page}`);
  }

  async getWordWithAssetsById(wordId: string):
  Promise<AxiosResponse<WordDataT>> {
    return super.getData(`${this.wordsPath}/${wordId}`);
  }
}
