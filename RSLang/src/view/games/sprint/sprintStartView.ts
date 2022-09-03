import { IGameStart } from '../../../controller/games/audiocall/interfaces';
import getGameWords from '../../../controller/games/GameController';
import { WordsDataT } from '../../../types/types';
import { IMainSectionViewRender } from '../../common/IMainViewRender';
import { gameSprintStart } from '../../viewsContent/views';
import GameSprintPlayView from './sprintPlayView';

function setGamesButtonsActions(words: WordsDataT) {
  const gamePlayBtn = document.querySelector('.game__start-btn') as HTMLAnchorElement;
  gamePlayBtn.addEventListener('click', () => {
    const gamePlay = new GameSprintPlayView(words);
    gamePlay.render();
  });
}

export default class GameSprintStartView implements IMainSectionViewRender {
  private content: HTMLElement;

  selectedLevel: number | null;

  page?: number | null;

  constructor(startOpts: IGameStart) {
    this.content = document.querySelector('#main') as HTMLElement;
    this.selectedLevel = startOpts?.level;
    this.page = startOpts.page || null;
  }

  async render() {
    this.content.innerHTML = gameSprintStart.sections.join('');
    if (this.selectedLevel !== null) {
      const words = this.page !== null
        ? await getGameWords({ level: this.selectedLevel, page: this.page })
        : await getGameWords({ level: this.selectedLevel });
      setGamesButtonsActions(words);
    }
  }
}
