import { Api, herokuApi } from '../api';
import { IUserSingIn } from '../api/interfaces';

export class AuthManager {
  api: Api;

  constructor() {
    this.api = herokuApi;
  }

  async authorizeUser(userInfo: IUserSingIn) {
    const resp = await this.api.signIn(userInfo);
    const info = {
      userId: resp.data.userId,
      userName: resp.data.name,
      userToken: resp.data.token,
      userRefreshToken: resp.data.refreshToken,
    };
    localStorage.setItem('user', JSON.stringify(info));
  }

  async getNewToken() {
    const data = localStorage.getItem('user');
    const user = JSON.parse(data as string);
    const resp = await this.api.refreshTokens(user.userId, user.refreshToken);
    user.token = resp.data.token;
    user.refreshToken = resp.data.refreshToken;
    localStorage.setItem('user', JSON.stringify(user));
  }
}

export function logOutUser():void {
  localStorage.removeItem('user');
}
