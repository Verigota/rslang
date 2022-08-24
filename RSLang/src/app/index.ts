import authModals from '../view/authorization/modal-elements';
import IApp from './interfaces';
import { AuthEventHandlers, IAuthEventHandlers } from '../view/authorization/event-handlers';
import { herokuApi } from '../api';
import authStorage from '../controller/authorization/auth-storage';
import { IAuthManager } from '../controller/authorization/interfaces';
import AuthManager from '../controller/authorization/authorization';
import { showHideElem } from '../view/authorization/show-hide-elem';

class App implements IApp {
  authEventHandlers: IAuthEventHandlers;

  authorizationController: IAuthManager;

  constructor() {
    this.authEventHandlers = new AuthEventHandlers();
    this.authorizationController = new AuthManager(herokuApi, authStorage);
  }

  public start() {
    const signInBtn = document.querySelector<HTMLElement>('.registration__regbtn');
    const logOutBtn = document.querySelector<HTMLElement>('#log-out-btn');
    const blackout = document.querySelector<HTMLElement>('.blackout');

    window.addEventListener('load', () => this.authorizationController.getNewToken());
    window.addEventListener('storage', () => {
      if (!localStorage.getItem('user') && signInBtn && logOutBtn && mainView) {
        this.appView.createView(mainView);
        showHideElem([signInBtn, logOutBtn], 'btn_hidden');
      }
    });
    if (blackout && authModals) signInBtn?.addEventListener('click', () => this.authEventHandlers.renderAuthModal(blackout, authModals));
    if (signInBtn) {
      logOutBtn?.addEventListener('click', () => {
        this.authorizationController.logOutUser();
        showHideElem([signInBtn, logOutBtn], 'btn_hidden');
      });
    }
  }
}
export default App;
