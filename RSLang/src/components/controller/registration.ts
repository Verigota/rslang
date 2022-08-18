import Api from '../api';
import { IUserInfo } from '../api/interfaces';
import clearForm from '../view/forms';

function collectNewUserInfo(): IUserInfo {
  const registrateForm = document.querySelector('#createUserForm');
  const userName = registrateForm?.querySelector<HTMLInputElement>('#createUserName');
  const userEmail = registrateForm?.querySelector<HTMLInputElement>('#createUserEmail');
  const userPassword = registrateForm?.querySelector<HTMLInputElement>('#createUserPassword');

  return {
    name: userName?.value || '',
    email: userEmail?.value || '',
    password: userPassword?.value || '',
  };
}

class RegistrationController {
  api: Api;

  constructor() {
    this.api = new Api();
  }

  registerNewUser(): void {
    const newUser = collectNewUserInfo();
    this.api.createUser(newUser);
    const form = document.querySelector<HTMLFormElement>('#createUserForm');
    if (form) clearForm(form);
  }
}

export default RegistrationController;
