import { deleteContent, drawContent } from '../view/draw-content';
import { showHideBlackout, showHideModal } from '../view/authorization/modal';
import authModals from '../view/authorization/modal-elements';
import IApp from './interfaces';
import { AuthEventHandlers, IAuthEventHandlers } from '../view/authorization/event-handlers';
import findModalElements from '../view/authorization/page-elements';

class App implements IApp {
  authEventHandlers: IAuthEventHandlers;

  constructor() {
    this.authEventHandlers = new AuthEventHandlers();
  }

  public start() {
    const signInBtns = document.querySelectorAll('.registration__regbtn');
    const blackout = document.querySelector<HTMLElement>('.blackout');
    signInBtns.forEach((btn) => btn?.addEventListener('click', () => {
      drawContent(authModals);
      const authModal = findModalElements();
      if (blackout) showHideBlackout(blackout);

      blackout?.addEventListener('click', () => {
        if (authModal.modalsContainer) deleteContent(authModal.modalsContainer);
        showHideBlackout(blackout);
      }, { once: true });

      if (blackout) {
        authModal.signInBtn?.addEventListener('click', (e) => this.authEventHandlers.initSignIn(e, blackout, authModal.modalsContainer as HTMLElement));
        authModal.registerBtn?.addEventListener('click', (e) => this.authEventHandlers.initRegistration(e, blackout, authModal.modalsContainer as HTMLElement));
      }

      authModal.registerLink?.addEventListener('click', (e: Event) => {
        e.preventDefault();
        showHideModal([authModal.registrationModal, authModal.signInModal] as HTMLElement[]);
      });
      authModal.signInLink?.addEventListener('click', (e) => {
        e.preventDefault();
        showHideModal([authModal.registrationModal, authModal.signInModal] as HTMLElement[]);
      });
    }));
  }
}
export default App;
