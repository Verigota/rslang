import axios, { AxiosInstance, AxiosResponse } from 'axios';
import authStorage from '../controller/auth-storage';
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
    difficulty: string,
    optional: Record<string, never>,
  ) {
    const wordsIds = ((await this.getUserWords()).data.map((userData) => userData.wordId));
    if (wordsIds.includes(wordId)) {
      await this.updateUserWord(wordId, difficulty, optional);
    } else {
      await this.apiClient.post(`users/${(<IAuthInfo>authStorage.get()).userId}/words/${wordId}`, { difficulty, optional });
    }
  }

  public async getUserWord(wordId: string) {
    await this.apiClient.get(`/users/${(<IAuthInfo>authStorage.get()).userId}/words/${wordId}`);
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
    optional: Record<string, never>,
  ): Promise<void> {
    await this.apiClient.put(`/users/${(<IAuthInfo>authStorage.get()).userId}/words/${wordId}`, { difficulty, optional });
  }
}
export const herokuApi = new Api('https://rsschool-lang-app.herokuapp.com');
