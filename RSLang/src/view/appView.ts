import { ViewType } from './views/viewType';
import {
  mainView, handbookView, gamesChoiceView, popupMsg, gameAudioStart, gameAudioBody,
} from './views/views';

import { AudioCallController } from '../controller/games/AudioCall/audiocall';
// import { createJSDocCallbackTag } from 'typescript';

class AppView {
  private static appview: AppView | null = null;

  private currentView: string;

  private content: HTMLElement | null = null;

  private body: HTMLBodyElement | null = null;

  private constructor() {
    this.initView();
    this.currentView = '';
  }

  static getInstance(): AppView {
    if (this.appview === null) {
      this.appview = new AppView();
    }
    return this.appview;
  }

  public initView() {
    this.content = document.querySelector('.content') as HTMLElement;
    this.body = document.querySelector('body') as HTMLBodyElement;
    this.content.innerHTML = '';
    this.createView(mainView);
    const mainLink = document.querySelector('#main-page') as HTMLAnchorElement;
    mainLink.classList.add('selected');
    this.initActions();
  }

  public createView(view: ViewType) {
    if (this.content !== null) {
      if (this.currentView !== '') {
        this.content.classList.remove(this.currentView);
      }
      this.content.innerHTML = view.sections.join('');
      this.content.classList.add(view.name);
    }
    this.currentView = view.name;
  }

  public showMessage(title: string, message: string) {
    let popup = document.querySelector('#message') as HTMLDivElement;
    if (popup === null) {
      popup = document.createElement('div');
      popup.classList.add('popup');
      popup.setAttribute('id', 'message');
      popup.innerHTML = popupMsg.sections.join('');
      popup.classList.add('open');
      (this.body as HTMLBodyElement).append(popup);
    } else {
      popup.classList.add('open');
    }
    const popupTitle = popup.querySelector('#popup-title') as HTMLHeadingElement;
    const popupMessage = popup.querySelector('.popup__message') as HTMLParagraphElement;
    popupTitle.innerText = title;
    popupMessage.innerText = message;

    const popupArea = popup.querySelector('.popup__area') as HTMLAnchorElement;
    const popupClose = popup.querySelector('.popup__close') as HTMLAnchorElement;
    const popupCloseBtn = popup.querySelector('.popup__close-btn') as HTMLButtonElement;
    const buttons = [popupArea, popupClose, popupCloseBtn];
    buttons.forEach((el) => {
      el.addEventListener('click', () => {
        popup.classList.remove('open');
      });
    });
  }

  public initActions() {
    const mainLink = document.querySelector('#main-page') as HTMLAnchorElement;
    const handbookLink = document.querySelector('#handbook-page') as HTMLAnchorElement;
    const gamesChoiceLink = document.querySelector('#games-page') as HTMLAnchorElement;

    mainLink.addEventListener('click', () => {
      AppView.clearLinkClasses([mainLink, handbookLink, gamesChoiceLink]);
      this.createView(mainView);
      mainLink.classList.add('selected');
    });
    handbookLink.addEventListener('click', () => {
      AppView.clearLinkClasses([mainLink, handbookLink, gamesChoiceLink]);
      this.createView(handbookView);
      handbookLink.classList.add('selected');
    });
    gamesChoiceLink.addEventListener('click', () => {
      AppView.clearLinkClasses([mainLink, handbookLink, gamesChoiceLink]);
      this.createView(gamesChoiceView);
      gamesChoiceLink.classList.add('selected');
      this.setGamesButtonsActions();
    });
  }

  private static clearLinkClasses(links: HTMLAnchorElement[]) {
    links.forEach((el) => {
      el.classList.remove('selected');
    });
  }

  private setGamesButtonsActions() {
    const levelBtns = document.querySelectorAll('.choice__level');
    levelBtns.forEach((el) => {
      el.addEventListener('click', () => {
        const isSelected = el.classList.contains('selected');
        levelBtns.forEach((elem) => {
          elem.classList.remove('selected');
        });
        if (!isSelected) {
          el.classList.add('selected');
        }
      });
    });
    const audioGameBtn = document.querySelector('#audio-game') as HTMLAnchorElement;
    audioGameBtn.addEventListener('click', () => {
      if (AppView.checkLevelsBtns()) {
        const gameController = new AudioCallController();
      } else {
        this.showMessage('Не выбран уровень сложности!', 'Выберите уровень сложности, чтобы продолжить!');
      }
    });

    const sprintGameBtn = document.querySelector('#sprint-game') as HTMLAnchorElement;
    sprintGameBtn.addEventListener('click', () => {
      if (AppView.checkLevelsBtns()) {
        console.log('starting sprint game');
      } else {
        this.showMessage('Не выбран уровень сложности!', 'Выберите уровень сложности, чтобы продолжить!');
      }
    });
  }

  private static checkLevelsBtns(): boolean {
    const levelBtns = document.querySelectorAll('.choice__level');
    if (Array.prototype.slice.call(levelBtns).some((el) => el.classList.contains('selected'))) {
      return true;
    }
    return false;
  }
}

export default AppView;
