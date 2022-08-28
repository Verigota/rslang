import GameAudioCallStartView from '../games/audiocall/audioCallStartView';
import { popupMsg } from '../viewsContent/views';

export function showMessage(title: string, message: string) {
  let popup = document.querySelector('#message') as HTMLDivElement;
  const body = document.querySelector('body') as HTMLElement;
  if (popup === null) {
    popup = document.createElement('div');
    popup.classList.add('popup');
    popup.setAttribute('id', 'message');
    popup.innerHTML = popupMsg.sections.join('');
    popup.classList.add('open');
    body.append(popup);
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

function checkLevelsBtns(): boolean {
  const levelBtns = document.querySelectorAll('.choice__level');
  return (Array.prototype.slice.call(levelBtns).some((el) => el.classList.contains('selected')));
}

export function setGamesButtonsActions() {
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
    if (checkLevelsBtns()) {
      const gameAudioCall = new GameAudioCallStartView();
      gameAudioCall.render();
    } else {
      showMessage('Не выбран уровень сложности!', 'Выберите уровень сложности, чтобы продолжить!');
    }
  });
}
