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

export type IAuthInfo = Pick<ISingInResponse, 'token' | 'refreshToken' | 'userId' | 'name' >;
export interface IRefreshTokenResponse {
  token: string,
  refreshToken: string,
}
export interface IUserSingIn extends Indexed {
  email: string,
  password: string,
}
export interface IApi {
  createUser: (userRegistration: IUserInfo) => Promise<AxiosResponse<IUserCreateResponse>>,
  signIn: (userInfo: IUserSingIn) => Promise<AxiosResponse<ISingInResponse>>,
  refreshTokens: (
    userId: string,
    refreshToken: string,
  ) => Promise<AxiosResponse<IRefreshTokenResponse>>,
}
