import { AxiosResponse } from 'axios';
import { herokuApi } from '../../api';
import { WordsDataT } from '../../types/types';
import authStorage from '../authorization/auth-storage';
import { IGameStart } from './audiocall/interfaces';

export default function getGameWords(startOpt: IGameStart): Promise<AxiosResponse<WordsDataT>> {
  if (startOpt.page) {
    const user = authStorage.get();
    if (user) {
      return herokuApi.getNotLearntUserWords(user.userId, startOpt);
    }
    return herokuApi.getChunkOfWords(startOpt.level, startOpt.page);
  }
  const pageCounts = 30;
  const page = Math.floor(Math.random() * (pageCounts + 1));
  return herokuApi.getChunkOfWords(startOpt.level, page);
}
