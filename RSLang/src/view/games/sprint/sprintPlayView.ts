import { IMainSectionViewRender } from '../../common/IMainViewRender';
import { gameSprintBody } from '../../viewsContent/views';

function setGamesButtonsActions() {
}

export default class GameSprintPlayView implements IMainSectionViewRender {
  private content: HTMLElement;

  constructor() {
    this.content = document.querySelector('#main') as HTMLElement;
  }

  render() {
    this.content.innerHTML = gameSprintBody.sections.join('');
    setGamesButtonsActions();
    return Promise.resolve();
  }
}
