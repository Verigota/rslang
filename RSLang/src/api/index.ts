import axios, { AxiosInstance, AxiosResponse } from 'axios';
import authStorage from '../controller/authorization/auth-storage';
import { IGameStart } from '../controller/games/audiocall/interfaces';
import { Difficulty, IAggregatedWord, IOptional } from '../controller/games/interfaces';
import {
  AggregatedWordsResponseT, UserWordsT, WordDataT, WordsDataT,
} from '../types/types';
import {
  IApi, IAuthInfo, IRefreshTokenResponse, ISingInResponse, IUserInfo, IUserSingIn,
} from './interfaces';

export class Api implements IApi {
  apiClient: AxiosInstance;

  private baseURL: string;

  constructor(baseUrl: string) {
    this.baseURL = baseUrl;
    this.setBaseUrlInAxios();
    this.apiClient = axios.create({
      baseURL: this.baseURL,
    });
    this.apiClient.interceptors.request.use((config) => {
      const token = authStorage.get()?.token;
      if (config?.headers && token && !config.headers.Authorization) {
        const { headers } = config;
        headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  setBaseUrlInAxios() {
    if (!axios.defaults.baseURL) {
      axios.defaults.baseURL = this.baseURL;
    }
  }

  public async createUser(userRegistration: IUserInfo) {
    const resp = await this.apiClient.post('/users', userRegistration);
    return resp;
  }

  public async signIn(userInfo: IUserSingIn): Promise<AxiosResponse<ISingInResponse>> {
    const resp = await this.apiClient.post('/signin', userInfo);
    return resp;
  }

  public async refreshTokens(
    userId: string,
    refreshToken: string,
  ): Promise<AxiosResponse<IRefreshTokenResponse>> {
    const resp = await this.apiClient.get(
      `/users/${userId}/tokens`,
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    );
    return resp;
  }

  public async getChunkOfWords(group: number, page: number):
  Promise<AxiosResponse<WordsDataT>> {
    const res = await this.apiClient.get('/words', {
      params: { group, page },
    });
    return res;
  }

  public async getWordWithAssetsById(wordId: string):
  Promise<AxiosResponse<WordDataT>> {
    const res = await this.apiClient.get(`/words/${wordId}`);
    return res;
  }

  public async getUserWords(): Promise<AxiosResponse<UserWordsT>> {
    const res = await this.apiClient.get(`/users/${(<IAuthInfo>authStorage.get()).userId}/words`);
    return res;
  }

  public async updateOrCreateUserWord(
    wordId: string,
    difficulty?: string,
    optional?: IOptional,
  ) {
    const defaultDifficulty = Difficulty[2];
    const date = new Date().toString();
    const defaultOptional = {
      serieRight: 0,
      serieWrong: 0,
      addTime: date,
      games: {
        sprint: {
          right: 0,
          wrong: 0,
        },
        audio: {
          right: 0,
          wrong: 0,
        },
      },
    };

    const userWordsData = (await this.getUserWords()).data;
    const wordsIds = (userWordsData.map((userData) => userData.wordId));

    if (wordsIds.includes(wordId)) {
      const userWordData = (await this.getUserWord(wordId)).data;
      const newDifficulty = difficulty || userWordData.difficulty || defaultDifficulty;
      const newOptional = optional || userWordData.optional || defaultOptional;
      await this.updateUserWord(wordId, newDifficulty, newOptional);
    } else {
      const newDifficulty = difficulty || defaultDifficulty;
      const newOptional = optional || defaultOptional;
      await this.apiClient.post(`users/${(<IAuthInfo>authStorage.get()).userId}/words/${wordId}`, { difficulty: newDifficulty, optional: newOptional });
    }
  }

  public async getUserWord(wordId: string) {
    const res = await this.apiClient.get(`/users/${(<IAuthInfo>authStorage.get()).userId}/words/${wordId}`);
    return res;
  }

  public async getAllUserAggregatedHardWords(
    page: number,
  ): Promise<AxiosResponse<AggregatedWordsResponseT>> {
    const res = await this.apiClient.get(`/users/${(<IAuthInfo>authStorage.get()).userId}/aggregatedWords`, {
      params: {
        page,
        wordsPerPage: 20,
        filter: '{"$or":[{"userWord.difficulty":"hard"}]}',
      },
    });
    return res;
  }

  public async updateUserWord(
    wordId: string,
    difficulty: string,
    optional: IOptional,
  ): Promise<void> {
    await this.apiClient.put(`/users/${(<IAuthInfo>authStorage.get()).userId}/words/${wordId}`, { difficulty, optional });
  }

  public async getNotLearntUserWords(userId: string, startOpts: IGameStart) {
    return this.apiClient.get(`/users/${userId}/aggregatedWords?group=${startOpts.level}&page=${startOpts.page}&wordsPerPage=30&filter=%7B%22userWord.difficulty%22%3A%7B%22%24ne%22%3A%22learnt%22%7D%7D`);
  }

  getAudio(filePath: string) {
    return this.apiClient.get(filePath);
  }

  public async getWordStatistic(wordId: string):Promise<IAggregatedWord | null> {
    const wordsIds = ((await this.getUserWords()).data.map((userData) => userData.wordId));
    if (wordsIds.includes(wordId)) {
      const res = <IAggregatedWord>(await this.getUserWord(wordId)).data;
      return res;
    }
    return null;
  }
}
export const herokuApi = new Api('https://rsschool-lang-app.herokuapp.com');
