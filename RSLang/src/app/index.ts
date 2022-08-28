import authModals from '../view/authorization/modal-elements';
import IApp from './interfaces';
import { AuthEventHandlers, IAuthEventHandlers } from '../view/authorization/event-handlers';
import { herokuApi } from '../api';
import MainView from '../view/main/mainView';
import HandbookController from '../controller/handbookController/handbookController';
import IhandbookController from '../controller/handbookController/IhandbookController';
import { IAuthManager } from '../controller/authorization/interfaces';
import AuthManager from '../controller/authorization/authorization';
import authStorage from '../controller/authorization/auth-storage';
import { HandbookView, HandbookViewData, IMainSectionViewRender } from '../view/common/IMainViewRender';
import GameSelectorView from '../view/gameSelector/gameSelectorView';

function setActiveMenuItem(id: string) {
  const navigation = document.querySelector('.header__list');
  const links = navigation?.querySelectorAll('.menu__item-link') as NodeListOf<Element>;
  links.forEach((el) => {
    el.classList.remove('selected');
    if (el.id === id) {
      el.classList.add('selected');
    }
  });
}
class App implements IApp {
  authEventHandlers: IAuthEventHandlers;

  authorizationController: IAuthManager;

  appView: IMainSectionViewRender = new MainView();

  private handbookController: IhandbookController;

  constructor() {
    this.authEventHandlers = new AuthEventHandlers();
    this.authorizationController = new AuthManager(herokuApi, authStorage);
    this.handbookController = new HandbookController();
  }

  public start() {
    const signInBtn = document.querySelector<HTMLElement>('#singin-btn');
    const logOutBtn = document.querySelector<HTMLElement>('#log-out-btn');
    const blackout = document.querySelector<HTMLElement>('.blackout');

    window.addEventListener('load', async () => {
      await this.authorizationController.getNewToken();
      const body = document.querySelector('body');
      const mainLink = document.querySelector('#main-page') as HTMLAnchorElement;
      body?.classList.remove('body_hidden');
      mainLink.classList.add('selected');
      this.appView = new MainView();
      this.appView.render();
      if (localStorage.getItem('user')) {
        signInBtn?.classList.add('btn_hidden');
        logOutBtn?.classList.remove('btn_hidden');
      }
    });

    window.addEventListener('storage', () => {
      if (!localStorage.getItem('user')) {
        this.appView.render();
        signInBtn?.classList.remove('btn_hidden');
        logOutBtn?.classList.add('btn_hidden');
      }
    });
    if (blackout && authModals) signInBtn?.addEventListener('click', () => this.authEventHandlers.renderAuthModal(blackout, authModals));
    if (signInBtn) {
      logOutBtn?.addEventListener('click', () => {
        this.authorizationController.logOutUser();
        signInBtn?.classList.remove('btn_hidden');
        logOutBtn?.classList.add('btn_hidden');
        this.appView.render();
      });
    }

    const main = <HTMLAnchorElement>document.querySelector('#main-page');
    main?.addEventListener('click', (e) => {
      const elem = e.target as HTMLAnchorElement;
      setActiveMenuItem(elem.id);
      this.mainLinkHandler();
    });

    const handbookPage = <HTMLAnchorElement>document.querySelector('#handbook-page');
    handbookPage?.addEventListener('click', (e) => {
      const elem = e.target as HTMLAnchorElement;
      setActiveMenuItem(elem.id);
      this.handbookLinkHandler();
    });

    const gameSelector = <HTMLAnchorElement>document.querySelector('#games-page');
    gameSelector?.addEventListener('click', (e) => {
      const elem = e.target as HTMLAnchorElement;
      setActiveMenuItem(elem.id);
      this.gameSelectorLinkHandler();
    });
  }

  async handbookLinkHandler() {
    const controller = this.handbookController;
    this.appView = new HandbookView(async (): Promise<HandbookViewData> => {
      const { wordsData, rsLangHandbookData } = await controller.handbookButtonHandler();
      return {
        wordsData,
        handbookController: controller,
        wordData: wordsData[rsLangHandbookData.activeWordCardIndex],
      };
    });
    this.appView.render();
  }

  gameSelectorLinkHandler() {
    this.appView = new GameSelectorView();
    this.appView.render();
  }

  mainLinkHandler() {
    this.appView = new MainView();
    this.appView.render();
  }
}
export default App;
