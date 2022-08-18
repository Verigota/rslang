import { AxiosResponse } from 'axios';

export default interface IAPIRequestsTemplate {
  getData<T, K>(url: string): Promise<AxiosResponse<T, K>>;
}
