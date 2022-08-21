import { IApi, IAuthInfo, IUserSingIn } from '../api/interfaces';
import authStorage from './auth-storage';
import { IAuthManager, IAuthStorage } from './interfaces';

class AuthManager implements IAuthManager {
  api: IApi;

  authStore: IAuthStorage;

  constructor(api: IApi, authStore: IAuthStorage) {
    this.api = api;
    this.authStore = authStore;
  }

  async authorizeUser(userInfo: IUserSingIn) {
    const resp = await this.api.signIn(userInfo);
    const info: IAuthInfo = {
      userId: resp.data.userId,
      name: resp.data.name,
      token: resp.data.token,
      refreshToken: resp.data.refreshToken,
    };
    this.authStore.set(info);
  }

  async getNewToken() {
    const user = authStorage.get();
    if (user) {
      const resp = await this.api.refreshTokens(user.userId, user.refreshToken);
      user.token = resp.data.token;
      user.refreshToken = resp.data.refreshToken;
      this.authStore.set(user);
    }
  }

  logOutUser() {
    this.authStore.remove();
  }
}
export default AuthManager;
