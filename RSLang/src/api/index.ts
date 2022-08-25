import axios, { AxiosInstance, AxiosResponse } from 'axios';
import authStorage from '../controller/authorization/auth-storage';
import { WordDataT, WordsDataT } from '../types/types';
import {
  IApi, IRefreshTokenResponse, ISingInResponse, IUserInfo, IUserSingIn,
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
    return this.apiClient.get(`/words?group=${group}&page=${page}`);
  }

  public async getWordWithAssetsById(wordId: string):
  Promise<AxiosResponse<WordDataT>> {
    return this.apiClient.get(`/words/${wordId}`);
  }
}
export const herokuApi = new Api('https://rsschool-lang-app.herokuapp.com');