import axios, { AxiosInstance } from 'axios';
import { IApi, IUserInfo, IUserSingIn } from './interfaces';

export class Api implements IApi {
  apiClient: AxiosInstance;

  constructor(baseUrl: string) {
    this.apiClient = axios.create({
      baseURL: baseUrl,
    });
  }

  public async createUser(userRegistration: IUserInfo) {
    const resp = await this.apiClient.post('/users', userRegistration);
    return resp;
  }

  public async singIn(userInfo: IUserSingIn) {
    const resp = await this.apiClient.post('/singin', userInfo);
    return resp;
  }

  public async refreshTokens(userId: string, refreshToken: string) {
    const resp = await this.apiClient.post(`/users/${userId}/tokens`, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    return resp;
  }
}
export const herokuApi = new Api('https://rsschool-lang-app.herokuapp.com');
