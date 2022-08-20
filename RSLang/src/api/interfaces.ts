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

export interface ISingInResponse {
  message: string,
  token: string,
  refreshToken: string,
  userId: string,
  name: string,
}
export interface IRefreshTokenResponse {
  token: string,
  refreshToken: string,
}
export interface IUserSingIn {
  email: string,
  password: string,
}
export interface IApi {
  createUser: (userRegistration: IUserInfo) => Promise<AxiosResponse<IUserCreateResponse>>,
  singIn: (userInfo: IUserSingIn) => Promise<AxiosResponse<ISingInResponse>>,
  refreshTokens: (
    userId: string,
    refreshToken: string,
  ) => Promise<AxiosResponse<IRefreshTokenResponse>>,
}
