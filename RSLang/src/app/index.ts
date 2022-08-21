import { herokuApi } from '../api';
import { IUserInfo, IUserSingIn } from '../api/interfaces';
import authStorage from '../controller/auth-storage';
import AuthManager from '../controller/authorization';
import { IAuthManager, IRegistrationController } from '../controller/interfaces';
import RegistrationController from '../controller/registration';
import { deleteContent, drawContent } from '../view/draw-content';
import { clearForm, collectNewUserInfo } from '../view/forms';
import { showHideBlackout, showHideModal } from '../view/modal';
import authModals from '../view/page-elements/authorization';
import IApp from './interfaces';

class App implements IApp {
  registrationController: IRegistrationController;

  authorizationController: IAuthManager;

  constructor() {
    this.registrationController = new RegistrationController();
    this.authorizationController = new AuthManager(herokuApi, authStorage);
  }

  public start() {
    const signInBtns = document.querySelectorAll('.registration__regbtn');
    const blackout = document.querySelector<HTMLElement>('.blackout');
    signInBtns.forEach((btn) => btn?.addEventListener('click', () => {
      drawContent(authModals);

      const modalsContainer = document.querySelector<HTMLElement>('#auth-modals');
      const signInBtn = document.querySelector<HTMLElement>('#sign-in-btn');
      const registerBtn = document.querySelector<HTMLElement>('#register-user-btn');
      const registrationModal = document.querySelector<HTMLElement>('#registration-modal');
      const signInModal = document.querySelector<HTMLElement>('#sign-in-modal');
      const registerLink = document.querySelector<HTMLElement>('#register-link');
      const signInLink = document.querySelector<HTMLElement>('#sign-in-link');

      if (blackout) showHideBlackout(blackout);

      if (modalsContainer) {
        blackout?.addEventListener('click', () => {
          deleteContent(modalsContainer);
          showHideBlackout(blackout);
        }, { once: true });
      }

      signInBtn?.addEventListener('click', (e) => {
        e.preventDefault();
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
      });

      registerBtn?.addEventListener('click', (e) => {
        e.preventDefault();
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
      });
      if (registrationModal && signInModal) {
        registerLink?.addEventListener('click', (e) => {
          e.preventDefault();
          showHideModal([registrationModal, signInModal]);
        });
        signInLink?.addEventListener('click', (e) => {
          e.preventDefault();
          showHideModal([registrationModal, signInModal]);
        });
      }
    }));
  }
}
export default App;
