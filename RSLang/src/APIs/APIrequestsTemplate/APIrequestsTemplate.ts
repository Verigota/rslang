import axios, { AxiosInstance, AxiosResponse } from 'axios';
import IAPIRequestsTemplate from './IAPIrequestsTemplate';

export default class APIRequestsTemplate implements IAPIRequestsTemplate {
  private baseURL: 'https://rsschool-lang-app.herokuapp.com';

  private apiClient: AxiosInstance;

  constructor() {
    this.baseURL = 'https://rsschool-lang-app.herokuapp.com';
    this.setBaseUrlInAxios();
    this.apiClient = axios.create({
      baseURL: axios.defaults.baseURL,
    });
  }

  async getData<T, K>(url: string): Promise<AxiosResponse<T, K>> {
    const res = await this.apiClient.get(url);
    return res;
  }

  setBaseUrlInAxios() {
    if (!axios.defaults.baseURL) {
      axios.defaults.baseURL = this.baseURL;
    }
  }
}
