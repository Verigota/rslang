import { IMainSectionViewRender } from '../../common/IMainViewRender';
import { gameAudioCallStart } from '../../viewsContent/views';
import GameAudioCallPlayView from './audioCallPlayView';

function setGamesButtonsActions() {
  const gamePlayBtn = document.querySelector('.game__start-btn') as HTMLAnchorElement;
  gamePlayBtn.addEventListener('click', () => {
    const gamePlay = new GameAudioCallPlayView();
    gamePlay.render();
  });
}

export default class GameAudioCallStartView implements IMainSectionViewRender {
  private content: HTMLElement;

  constructor() {
    this.content = document.querySelector('#main') as HTMLElement;
  }

  render() {
    this.content.innerHTML = gameAudioCallStart.sections.join('');
    setGamesButtonsActions();
    return Promise.resolve();
  }
}
