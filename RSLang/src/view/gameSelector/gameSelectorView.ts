// import { AudioCallController } from '../../controller/games/AudioCall/audiocall';
import { IMainSectionViewRender } from '../common/IMainViewRender';
import GameAudioCallStartView from '../games/audiocall/audioCallStartView';
import GameSprintStartView from '../games/sprint/sprintStartView';
import PopupMessageView from '../popup/showmessage';
import { gamesChoiceView } from '../viewsContent/views';

function checkLevelsBtns(): boolean {
  const levelBtns = document.querySelectorAll('.choice__level');
  return (Array.prototype.slice.call(levelBtns).some((el) => el.classList.contains('selected')));
}

function setGamesButtonsActions() {
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
      (new PopupMessageView('Не выбран уровень сложности!', 'Выберите уровень сложности, чтобы продолжить!')).render();
    }
  });

  const sprintGameBtn = document.querySelector('#sprint-game') as HTMLAnchorElement;
  sprintGameBtn.addEventListener('click', () => {
    if (checkLevelsBtns()) {
      const gameSprint = new GameSprintStartView();
      gameSprint.render();
    } else {
      (new PopupMessageView('Не выбран уровень сложности!', 'Выберите уровень сложности, чтобы продолжить!')).render();
    }
  });
}

export default class GameSelectorView implements IMainSectionViewRender {
  private content: HTMLElement;

  constructor() {
    this.content = document.querySelector('#main') as HTMLElement;
  }

  render() {
    this.content.innerHTML = gamesChoiceView.sections.join('');
    setGamesButtonsActions();
    return Promise.resolve();
  }
}
