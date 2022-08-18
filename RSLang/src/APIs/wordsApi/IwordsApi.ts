import { AxiosResponse } from 'axios';

export default interface IwordsAPI {
  getChunkOfWords<T, K>(group: number, page: number):
  Promise<AxiosResponse<T, K>>
  getWordWithAssetsById<T, K>(wordId: number):
  Promise<AxiosResponse<T, K>>
}
