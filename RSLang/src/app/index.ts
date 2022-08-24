import authModals from '../view/authorization/modal-elements';
import IApp from './interfaces';
import { AuthEventHandlers, IAuthEventHandlers } from '../view/authorization/event-handlers';
import { herokuApi } from '../api';
import authStorage from '../controller/auth-storage';
import AppView from '../view/appView';
import HandbookController from '../controller/handbookController/handbookController';
import IhandbookController from '../controller/handbookController/IhandbookController';

class App implements IApp {
  authEventHandlers: IAuthEventHandlers;

  authorizationController: IAuthManager;

  appView: AppView;

  private handbookController: IhandbookController;

  constructor() {
    this.authEventHandlers = new AuthEventHandlers();
    this.authorizationController = new AuthManager(herokuApi, authStorage);
    this.appView = AppView.getInstance();
    this.handbookController = new HandbookController();
  }

  public start() {
    const signInBtn = document.querySelector<HTMLElement>('.registration__regbtn');
    const logOutBtn = document.querySelector<HTMLElement>('#log-out-btn');
    const blackout = document.querySelector<HTMLElement>('.blackout');

    window.addEventListener('load', () => this.authorizationController.getNewToken());
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

    const handbookPage = <HTMLAnchorElement>document.querySelector('#handbook-page');
    handbookPage?.addEventListener('click', () => this.handbookLinkHandler());
  }

  async handbookLinkHandler() {
    const { wordsData, rsLangHandbookData } = await this.handbookController.handbookButtonHandler();
    this.appView.renderHandbookView(
      wordsData,
      wordsData[rsLangHandbookData.activeWordCardIndex],
      this.handbookController,
    );
  }
}
export default App;
