import { ViewType } from './views/viewType';
import { mainView, handbookView, gamesChoiceView } from './views/views';

class AppView {
  private static appview: AppView | null = null;

  private content: HTMLElement | null = null;

  private constructor() {
    this.initView();
  }

  static getInstance(): AppView {
    if (this.appview === null) {
      this.appview = new AppView();
    }
    return this.appview;
  }

  public initView() {
    this.content = document.querySelector('.content') as HTMLElement;
    this.content.innerHTML = '';
    // console.log(this.content);
    // console.log('(this.content as HTMLElement).innerHTML');
    this.createView(mainView);
    const mainLink = document.querySelector('#main-page') as HTMLAnchorElement;
    mainLink.classList.add('selected');
    this.initActions();
  }

  public createView(content: ViewType) {
    (this.content as HTMLElement).innerHTML = content.sections.join('');
  }

  public initActions() {
    const mainLink = document.querySelector('#main-page') as HTMLAnchorElement;
    const handbookLink = document.querySelector('#handbook-page') as HTMLAnchorElement;
    const gamesChoiceLink = document.querySelector('#games-page') as HTMLAnchorElement;

    mainLink.addEventListener('click', () => {
      AppView.clearLinkClasses([mainLink, handbookLink, gamesChoiceLink]);
      this.createView(mainView);
      mainLink.classList.add('selected');
      AppView.resetContentLayoutClass(['main', 'handbook', 'gamechoice', 'audiogame'], 'main');
    });
    handbookLink.addEventListener('click', () => {
      AppView.clearLinkClasses([mainLink, handbookLink, gamesChoiceLink]);
      this.createView(handbookView);
      handbookLink.classList.add('selected');
      AppView.resetContentLayoutClass(['main', 'handbook', 'gamechoice', 'audiogame'], 'handbook');
    });
    gamesChoiceLink.addEventListener('click', () => {
      AppView.clearLinkClasses([mainLink, handbookLink, gamesChoiceLink]);
      this.createView(gamesChoiceView);
      gamesChoiceLink.classList.add('selected');
      AppView.resetContentLayoutClass(['main', 'handbook', 'gamechoice', 'audiogame'], 'gamechoice');
      AppView.setGamesButtonsActions();
    });
  }

  private static clearLinkClasses(links: HTMLAnchorElement[]) {
    links.forEach((el) => {
      el.classList.remove('selected');
    });
  }

  private static resetContentLayoutClass(classes: string[], setClass: string) {
    const content = document.querySelector('.content') as HTMLElement;
    classes.forEach((el) => {
      content.classList.remove(el);
    });
    content.classList.add(setClass);
  }

  private static setGamesButtonsActions() {
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
        console.log('starting audio game');
      } else {
        console.log('no level chosen');
      }
    });

    const sprintGameBtn = document.querySelector('#sprint-game') as HTMLAnchorElement;
    sprintGameBtn.addEventListener('click', () => {
      if (AppView.checkLevelsBtns()) {
        console.log('starting sprint game');
      } else {
        console.log('no level chosen');
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
