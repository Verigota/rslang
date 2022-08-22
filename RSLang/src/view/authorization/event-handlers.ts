import { herokuApi } from '../../api';
import { IUserInfo, IUserSingIn } from '../../api/interfaces';
import authStorage from '../../controller/auth-storage';
import AuthManager from '../../controller/authorization';
import { IAuthManager, IRegistrationController } from '../../controller/interfaces';
import RegistrationController from '../../controller/registration';
import { deleteContent } from '../draw-content';
import { clearForm, collectNewUserInfo } from './forms';
import { showHideBlackout } from './modal';

export interface IAuthEventHandlers {
  initSignIn: (event: Event, blackout: HTMLElement, modalsContainer: HTMLElement) => void;
  initRegistration: (event: Event, blackout: HTMLElement, modalsContainer: HTMLElement) => void;
}

export class AuthEventHandlers {
  registrationController: IRegistrationController;

  authorizationController: IAuthManager;

  constructor() {
    this.registrationController = new RegistrationController();
    this.authorizationController = new AuthManager(herokuApi, authStorage);
  }

  initSignIn(event: Event, blackout: HTMLElement, modalsContainer: HTMLElement) {
    event.preventDefault();
    const signInForm = document.querySelector<HTMLFormElement>('#sign-in-form');
    const user = collectNewUserInfo<IUserSingIn>(
      signInForm as HTMLFormElement,
      [],
    );
    this.authorizationController.authorizeUser(user);
    if (signInForm) clearForm(signInForm);
    if (blackout && modalsContainer) {
      deleteContent(modalsContainer);
      showHideBlackout(blackout);
    }
    setTimeout(() => this.authorizationController.getNewToken(), 4 * 60 * 60 * 1000);
  }

  initRegistration(event: Event, blackout: HTMLElement, modalsContainer: HTMLElement) {
    event.preventDefault();
    const registrateForm = document.querySelector<HTMLFormElement>('#create-user-form');
    const newUser = collectNewUserInfo<IUserInfo>(
      registrateForm as HTMLFormElement,
      ['confirmPassword'],
    );
    this.registrationController.registerNewUser(newUser);
    if (registrateForm) clearForm(registrateForm);
    if (blackout && modalsContainer) {
      deleteContent(modalsContainer);
      showHideBlackout(blackout);
    }
  }
}
