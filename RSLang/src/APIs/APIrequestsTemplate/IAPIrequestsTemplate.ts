import { AxiosResponse } from 'axios';
import { WordDataT, WordsDataT } from '../../types/types';

export default interface IAPIRequestsTemplate {
  getData(url: string): Promise<AxiosResponse<WordsDataT | WordDataT>>;
  setBaseUrlInAxios(): void;
}
