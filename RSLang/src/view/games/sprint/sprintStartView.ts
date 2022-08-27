import { IMainSectionViewRender } from '../../common/IMainViewRender';
import { gameSprintStart } from '../../viewsContent/views';
import GameSprintPlayView from './sprintPlayView';

function setGamesButtonsActions() {
  const gamePlayBtn = document.querySelector('.game__start-btn') as HTMLAnchorElement;
  gamePlayBtn.addEventListener('click', () => {
    const gamePlay = new GameSprintPlayView();
    gamePlay.render();
  });
}

export default class GameSprintStartView implements IMainSectionViewRender {
  private content: HTMLElement;

  constructor() {
    this.content = document.querySelector('#main') as HTMLElement;
  }

  render() {
    this.content.innerHTML = gameSprintStart.sections.join('');
    setGamesButtonsActions();
    return Promise.resolve();
  }
}
