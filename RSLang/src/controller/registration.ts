import { Api, herokuApi } from '../api';
import { IUserInfo } from '../api/interfaces';
import IRegistrationController from './interfaces';

class RegistrationController implements IRegistrationController {
  api: Api;

  constructor() {
    this.api = herokuApi;
  }

  registerNewUser(newUser: IUserInfo) {
    this.api.createUser(newUser);
  }
}

export default RegistrationController;
