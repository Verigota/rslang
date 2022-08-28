import { popupMsg } from '../viewsContent/views';
import { IMainSectionViewRender } from '../common/IMainViewRender';

export default class PopupMessageView implements IMainSectionViewRender {
  private content: HTMLElement;

  private title: string;

  private message: string;

  constructor(title: string, message: string) {
    this.content = document.querySelector('body') as HTMLElement;
    this.title = title;
    this.message = message;
  }

  render() {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.setAttribute('id', 'message');
    popup.innerHTML = popupMsg.sections.join('');
    this.content.append(popup);
    setTimeout(() => {
      popup.classList.add('open');
    }, 100);

    const popupTitle = popup.querySelector('#popup-title') as HTMLHeadingElement;
    const popupMessage = popup.querySelector('.popup__message') as HTMLParagraphElement;
    popupTitle.innerText = this.title;
    popupMessage.innerText = this.message;

    const popupArea = popup.querySelector('.popup__area') as HTMLAnchorElement;
    const popupClose = popup.querySelector('.popup__close') as HTMLAnchorElement;
    const popupCloseBtn = popup.querySelector('.popup__close-btn') as HTMLButtonElement;
    const buttons = [popupArea, popupClose, popupCloseBtn];
    buttons.forEach((el) => {
      el.addEventListener('click', () => {
        popup.classList.remove('open');
        popup.addEventListener('transitionend', () => {
          popup.remove();
        });
      });
    });
    return Promise.resolve();
  }
}
