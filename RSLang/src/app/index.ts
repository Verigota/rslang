import authModals from '../view/authorization/modal-elements';
import IApp from './interfaces';
import { AuthEventHandlers, IAuthEventHandlers } from '../view/authorization/event-handlers';
import { IAuthManager } from '../controller/interfaces';
import AuthManager from '../controller/authorization';
import { herokuApi } from '../api';
import authStorage from '../controller/auth-storage';

class App implements IApp {
  authEventHandlers: IAuthEventHandlers;

  authorizationController: IAuthManager;

  constructor() {
    this.authEventHandlers = new AuthEventHandlers();
    this.authorizationController = new AuthManager(herokuApi, authStorage);
  }

  public start() {
    const signInBtns = document.querySelectorAll('.registration__regbtn');
    const blackout = document.querySelector<HTMLElement>('.blackout');
    window.addEventListener('load', () => this.authorizationController.getNewToken());
    if (blackout && authModals) signInBtns.forEach((btn) => btn?.addEventListener('click', () => this.authEventHandlers.renderAuthModal(blackout, authModals)));
  }
}
export default App;
