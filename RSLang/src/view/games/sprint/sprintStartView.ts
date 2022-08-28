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
    document.querySelector('.timer')?.classList.add('start');
  });
}

export default class GameSprintStartView implements IMainSectionViewRender {
  private content: HTMLElement;

  selectedLevel: number | null;

  constructor(selectedLevel: number) {
    this.content = document.querySelector('#main') as HTMLElement;
    this.selectedLevel = selectedLevel;
  }

  async render() {
    this.content.innerHTML = gameSprintStart.sections.join('');
    if (this.selectedLevel !== null) {
      const words = (await getGameWords({ level: this.selectedLevel })).data;
      setGamesButtonsActions(words);
    }
  }
}
