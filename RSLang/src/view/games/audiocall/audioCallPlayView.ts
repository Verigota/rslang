import { IMainSectionViewRender } from '../../common/IMainViewRender';
import { gameAudioCallBody } from '../../viewsContent/views';

function setGamesButtonsActions() {
}

export default class GameAudioCallPlayView implements IMainSectionViewRender {
  private content: HTMLElement;

  constructor() {
    this.content = document.querySelector('#main') as HTMLElement;
  }

  render() {
    this.content.innerHTML = gameAudioCallBody.sections.join('');
    setGamesButtonsActions();
    return Promise.resolve();
  }
}
