import {
  IApi, IUserInfo, IAuthInfo, IUserSingIn,
} from '../../api/interfaces';

export interface IRegistrationController {
  api: IApi;
  registerNewUser: (newUser: IUserInfo) => void
}
export interface IAuthStorage {
  set: (userInfo: IAuthInfo) => void;
  get: () => IAuthInfo | undefined;
  remove: () => void;
}

export interface IAuthManager {
  authorizeUser: (userInfo: IUserSingIn) => void;
  getNewToken: () => void;
  logOutUser: () => void;
}
