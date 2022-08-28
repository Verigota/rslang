import { AxiosResponse } from 'axios';
import { herokuApi } from '../../api';
import { WordsDataT } from '../../types/types';

interface IGameStart {
  level: number;
  page?: number;
}

export default function getGameWords(startOpt: IGameStart): Promise<AxiosResponse<WordsDataT>> {
  if (startOpt.page) {
    return herokuApi.getChunkOfWords(startOpt.level, startOpt.page);
  }
  const pageCounts = 30;
  const page = Math.floor(Math.random() * (pageCounts + 1));
  return herokuApi.getChunkOfWords(startOpt.level, page);
}
