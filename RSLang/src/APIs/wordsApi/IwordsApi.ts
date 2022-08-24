import { AxiosResponse } from 'axios';
import { WordDataT, WordsDataT } from '../../types/types';

export default interface IwordsAPI {
  getChunkOfWords(group: number, page: number):
  Promise<AxiosResponse<WordsDataT>>
  getWordWithAssetsById(wordId: string):
  Promise<AxiosResponse<WordDataT>>
}
