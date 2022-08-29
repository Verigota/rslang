import axios, { AxiosInstance, AxiosResponse } from 'axios';
import authStorage from '../controller/auth-storage';
import { AggregatedWordsResponseT, WordDataT, WordsDataT } from '../types/types';
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
    const res = await this.apiClient.get(`/words?group=${group}&page=${page}`);
    return res;
  }

  public async getWordWithAssetsById(wordId: string):
  Promise<AxiosResponse<WordDataT>> {
    const res = await this.apiClient.get(`/words/${wordId}`);
    return res;
  }

  public async getUserWords(): Promise<AxiosResponse<WordsDataT>> {
    const res = await this.apiClient.get(`/users/${(<IAuthInfo>authStorage.get()).userId}/words`);
    return res;
  }

  public async createUserWord(
    wordId: string,
    difficulty: string,
    optional: Record<string, never>,
  ) {
    try {
      await this.getUserWord(wordId);
    } catch (e: unknown) {
      await this.apiClient.post(`users/${(<IAuthInfo>authStorage.get()).userId}/words/${wordId}`, { difficulty, optional });
    }
  }

  public async getUserWord(wordId: string) {
    await this.apiClient.get(`/users/${(<IAuthInfo>authStorage.get()).userId}/words/${wordId}`);
  }

  public async getAllUserAggregatedHardWords(
    page: number,
  ): Promise<AxiosResponse<AggregatedWordsResponseT>> {
    const res = await this.apiClient.get(`/users/${(<IAuthInfo>authStorage.get()).userId}/aggregatedWords?page=${page}&wordsPerPage=20&filter={"$or":[{"userWord.difficulty":"hard"}]}`);
    return res;
  }

  public async deleteUserWord(userId: string, wordId: string): Promise<void> {
    await this.apiClient.delete(`/users/${userId}/words/${wordId}`);
  }
}
export const herokuApi = new Api('https://rsschool-lang-app.herokuapp.com');
