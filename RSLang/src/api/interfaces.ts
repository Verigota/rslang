import { AxiosResponse } from 'axios';
import { Difficulty, IAggregatedWord, IOptional } from '../controller/games/interfaces';
import {
  AggregatedWordsResponseT, UserWordsT, WordDataT, WordsDataT,
} from '../types/types';

export type Indexed = { [index: string]: string };

export interface IUserInfo extends Indexed {
  name: string,
  email: string,
  password: string,
}

export interface IUserCreateResponse {
  id: string,
  name: string,
  email: string,
}

export interface IUserAggregatedWord {
  difficulty: Difficulty;
  optional: IOptional
}

export interface ISingInResponse {
  message: string,
  token: string,
  refreshToken: string,
  userId: string,
  name: string,
}

export type IAuthInfo = Pick<ISingInResponse, 'token' | 'refreshToken' | 'userId' | 'name' >;
export interface IRefreshTokenResponse {
  token: string,
  refreshToken: string,
}
export interface IUserSingIn extends Indexed {
  email: string,
  password: string,
}
type LearntWordsDataT = Omit<WordDataT, 'id'> & { _id: string };
export type LearntWordsPesp = [
  { paginatedResults : LearntWordsDataT[], totalCount : [{ count : number }] },
];
export interface IApi {
  setBaseUrlInAxios(): void;
  createUser: (userRegistration: IUserInfo) => Promise<AxiosResponse<IUserCreateResponse>>,
  signIn: (userInfo: IUserSingIn) => Promise<AxiosResponse<ISingInResponse>>,
  refreshTokens: (
    userId: string,
    refreshToken: string,
  ) => Promise<AxiosResponse<IRefreshTokenResponse>>,
  getChunkOfWords(group: number, page: number):
  Promise<AxiosResponse<WordsDataT>>
  getWordWithAssetsById(wordId: string):
  Promise<AxiosResponse<WordDataT>>
  getAudio:(filePath: string) => void,
  getUserWords(): Promise<AxiosResponse<UserWordsT>>
  updateOrCreateUserWord(
    wordId: string,
    difficulty?: Difficulty,
    optional?: IOptional,
  ): Promise<void>
  getAllUserAggregatedHardWords(page: number): Promise<AxiosResponse<AggregatedWordsResponseT>>
  updateUserWord(
    wordId: string,
    difficulty: Difficulty,
    optional: IOptional,
  ): Promise<void>
  getWordStatistic(wordId: string): Promise<IAggregatedWord | null>;
}
