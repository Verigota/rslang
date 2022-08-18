import axios, { AxiosInstance } from 'axios';
import { IUserInfo } from './interfaces';

class Api {
  apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: 'https://rsschool-lang-app.herokuapp.com',
    });
  }

  public async createUser(userRegistration: IUserInfo) {
    await this.apiClient.post('/users', userRegistration);
  }
}

export default Api;
