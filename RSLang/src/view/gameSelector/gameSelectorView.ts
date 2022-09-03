// import { AudioCallController } from '../../controller/games/AudioCall/audiocall';
import { IMainSectionViewRender } from '../common/IMainViewRender';
import GameAudioCallStartView from '../games/audiocall/audioCallStartView';
import GameSprintStartView from '../games/sprint/sprintStartView';
import PopupMessageView from '../popup/showmessage';
import { gamesChoiceView } from '../viewsContent/views';
import { setGamesButtonsActions } from './commonFunc';

const levels = {
  A1: 0,
  A2: 1,
  B1: 2,
  B2: 3,
  C1: 4,
  C2: 5,
};

export default class GameSelectorView implements IMainSectionViewRender {
  private content: HTMLElement;

  private selectedLevel: number | null;

  constructor() {
    this.content = document.querySelector('#main') as HTMLElement;
    this.selectedLevel = null;
  }

  render() {
    this.content.innerHTML = gamesChoiceView.sections.join('');
    setGamesButtonsActions();
    const sprintGameBtn = document.querySelector('#sprint-game') as HTMLAnchorElement;
    sprintGameBtn.addEventListener('click', () => {
      if (this.selectedLevel != null) {
        const gameSprint = new GameSprintStartView({ level: this.selectedLevel });
        gameSprint.render();
      } else {
        const popup = new PopupMessageView('Не выбран уровень сложности!', 'Выберите уровень сложности, чтобы продолжить!');
        popup.render();
      }
    });
    const audioGameBtn = document.querySelector('#audio-game') as HTMLAnchorElement;
    audioGameBtn.addEventListener('click', () => {
      if (this.selectedLevel != null) {
        const gameAudioCall = new GameAudioCallStartView({ level: this.selectedLevel });
        gameAudioCall.render();
      } else {
        const popup = new PopupMessageView('Не выбран уровень сложности!', 'Выберите уровень сложности, чтобы продолжить!');
        popup.render();
      }
    });
    const levelsContainer = document.querySelector('.choice__levels') as HTMLElement;
    levelsContainer?.addEventListener('click', (e) => {
      const level = e.target as HTMLElement;
      this.setSelectedLevel(level.id as keyof typeof levels);
    });
    return Promise.resolve();
  }

  setSelectedLevel(level: keyof typeof levels) {
    this.selectedLevel = levels[level];
  }
}
