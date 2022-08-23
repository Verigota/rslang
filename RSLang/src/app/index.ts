import { IUserInfo } from '../api/interfaces';
import RegistrationController from '../controller/registration';
import { clearForm, collectNewUserInfo } from '../view/forms';
import showHideModal from '../view/modal';
import IApp from './interfaces';

class App implements IApp {
  registrationController: RegistrationController;

  constructor() {
    this.registrationController = new RegistrationController();
  }

  public start() {
    const registerBtn = document.querySelector('#register-user-btn');
    const registrationModal = document.querySelector<HTMLElement>('#registration-modal');
    const registerBtns = document.querySelectorAll('.registration__regbtn');
    const blackout = document.querySelector<HTMLElement>('.blackout');

    blackout?.addEventListener('click', () => showHideModal(registrationModal as HTMLElement, blackout));
    registerBtns.forEach((btn) => btn?.addEventListener('click', () => showHideModal(registrationModal as HTMLElement, blackout as HTMLElement)));
    registerBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      const registrateForm = document.querySelector<HTMLFormElement>('#create-user-form');
      const newUser = collectNewUserInfo<IUserInfo>(
        registrateForm as HTMLFormElement,
        ['confirmPassword'],
      );
      this.registrationController.registerNewUser(newUser);
      if (registrateForm) clearForm(registrateForm);
    });
  }
}
export default App;
