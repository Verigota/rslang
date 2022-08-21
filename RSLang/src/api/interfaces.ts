import { AxiosResponse } from 'axios';

export type Indexed = { [index: string]: string };

export interface IUserInfo extends Indexed {
  name: string,
  email: string,
  password: string,
}

export interface IUserCreateResponse {
  id: string,
  name: string,
  email: string,
}
export interface IApi {
  createUser: (userRegistration: IUserInfo) => Promise<AxiosResponse<IUserCreateResponse>>,
}
