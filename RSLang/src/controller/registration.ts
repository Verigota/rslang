import { herokuApi } from '../api';
import { IApi, IUserInfo } from '../api/interfaces';
import { IRegistrationController } from './interfaces';

class RegistrationController implements IRegistrationController {
  api: IApi;

  constructor() {
    this.api = herokuApi;
  }

  registerNewUser(newUser: IUserInfo) {
    this.api.createUser(newUser);
  }
}

export default RegistrationController;
