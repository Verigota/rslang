import { herokuApi } from '../../api';
import { IUserInfo, IUserSingIn } from '../../api/interfaces';
import authStorage from '../../controller/authorization/auth-storage';
import AuthManager from '../../controller/authorization/authorization';
import { IRegistrationController, IAuthManager } from '../../controller/authorization/interfaces';
import RegistrationController from '../../controller/authorization/registration';
import { deleteContent, drawContent } from '../draw-content';
import { clearForm, collectNewUserInfo } from './forms';
import { showHideBlackout, showHideElem } from './show-hide-elem';
import findModalElements from './page-elements';

export interface IAuthEventHandlers {
  initSignIn: (event: Event, blackout: HTMLElement, modalsContainer: HTMLElement) => void;
  initRegistration: (event: Event, blackout: HTMLElement, modalsContainer: HTMLElement) => void;
  renderAuthModal: (blackout: HTMLElement, authModals: HTMLElement) => void;
}

export class AuthEventHandlers {
  registrationController: IRegistrationController;

  authorizationController: IAuthManager;

  constructor() {
    this.registrationController = new RegistrationController();
    this.authorizationController = new AuthManager(herokuApi, authStorage);
  }

  async initSignIn(event: Event, blackout: HTMLElement, modalsContainer: HTMLElement) {
    event.preventDefault();
    const signInForm = document.querySelector<HTMLFormElement>('#sign-in-form');
    const user = collectNewUserInfo<IUserSingIn>(
      signInForm as HTMLFormElement,
      [],
    );
    if (signInForm) clearForm(signInForm);
    if (blackout && modalsContainer) {
      deleteContent(modalsContainer);
      showHideBlackout(blackout);
    }
    try {
      await this.authorizationController.authorizeUser(user);
    } catch { return; }
    const signInBtn = document.querySelector<HTMLElement>('.registration__regbtn');
    const logOutBtn = document.querySelector<HTMLElement>('#log-out-btn');
    if (signInBtn && logOutBtn) showHideElem([signInBtn, logOutBtn], 'btn_hidden');
    setTimeout(() => this.authorizationController.getNewToken(), 4 * 60 * 60 * 1000);
  }

  initRegistration(event: Event, blackout: HTMLElement, modalsContainer: HTMLElement) {
    event.preventDefault();
    const registrateForm = document.querySelector<HTMLFormElement>('#create-user-form');
    const excludedFields = ['confirmPassword'];
    const newUser = collectNewUserInfo<IUserInfo>(
      registrateForm as HTMLFormElement,
      excludedFields,
    );
    this.registrationController.registerNewUser(newUser);
    if (registrateForm) clearForm(registrateForm);
    if (blackout && modalsContainer) {
      deleteContent(modalsContainer);
      showHideBlackout(blackout);
    }
  }

  renderAuthModal(blackout: HTMLElement, authModals: HTMLElement) {
    drawContent(authModals);
    const authModal = findModalElements();
    if (blackout) showHideBlackout(blackout);

    blackout?.addEventListener('click', () => {
      if (authModal.modalsContainer) deleteContent(authModal.modalsContainer);
      showHideBlackout(blackout);
    }, { once: true });

    if (blackout) {
      authModal.signInBtn?.addEventListener('click', (e) => this.initSignIn(e, blackout, authModal.modalsContainer as HTMLElement));
      authModal.registerBtn?.addEventListener('click', (e) => this.initRegistration(e, blackout, authModal.modalsContainer as HTMLElement));
    }

    authModal.registerLink?.addEventListener('click', (e: Event) => {
      e.preventDefault();
      showHideElem([authModal.registrationModal, authModal.signInModal] as HTMLElement[], 'modal_hidden');
    });
    authModal.signInLink?.addEventListener('click', (e) => {
      e.preventDefault();
      showHideElem([authModal.registrationModal, authModal.signInModal] as HTMLElement[], 'modal_hidden');
    });
  }
}
