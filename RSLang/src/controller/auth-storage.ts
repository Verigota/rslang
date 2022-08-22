import { IAuthInfo } from '../api/interfaces';
import { IAuthStorage } from './interfaces';

const STORAGE_KEY = 'user';

const authStorage: IAuthStorage = {
  set: (userInfo: IAuthInfo) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userInfo));
  },
  get: () => {
    const userInfo = localStorage.getItem(STORAGE_KEY);
    return userInfo ? JSON.parse(userInfo) : null;
  },
  remove: () => localStorage.removeItem(STORAGE_KEY),
};
export default authStorage;
