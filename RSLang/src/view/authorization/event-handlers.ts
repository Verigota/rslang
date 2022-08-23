import { herokuApi } from '../../api';
import { IUserInfo, IUserSingIn } from '../../api/interfaces';
import authStorage from '../../controller/auth-storage';
import AuthManager from '../../controller/authorization';
import { IAuthManager, IRegistrationController } from '../../controller/interfaces';
import RegistrationController from '../../controller/registration';
import { deleteContent, drawContent } from '../draw-content';
import { clearForm, collectNewUserInfo } from './forms';
import { showHideBlackout, showHideModal } from './modal';
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
      showHideModal([authModal.registrationModal, authModal.signInModal] as HTMLElement[]);
    });
    authModal.signInLink?.addEventListener('click', (e) => {
      e.preventDefault();
      showHideModal([authModal.registrationModal, authModal.signInModal] as HTMLElement[]);
    });
  }
}
