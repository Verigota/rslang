import axios, { AxiosInstance, AxiosResponse } from 'axios';
import authStorage from '../controller/authorization/auth-storage';
import {
  IApi, IRefreshTokenResponse, ISingInResponse, IUserInfo, IUserSingIn,
} from './interfaces';

export class Api implements IApi {
  apiClient: AxiosInstance;

  constructor(baseUrl: string) {
    this.apiClient = axios.create({
      baseURL: baseUrl,
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
}
export const herokuApi = new Api('https://rsschool-lang-app.herokuapp.com');
