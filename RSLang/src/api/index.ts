import axios, { AxiosInstance } from 'axios';
import { IApi, IUserInfo } from './interfaces';

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
}
export const herokuApi = new Api('https://rsschool-lang-app.herokuapp.com');
