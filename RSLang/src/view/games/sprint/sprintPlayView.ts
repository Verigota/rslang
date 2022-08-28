import { herokuApi } from '../../../api';
import { IApi } from '../../../api/interfaces';
import { ISprintGame } from '../../../controller/games/sprint/interfaces';
import { SprintGame, isRightTranslation } from '../../../controller/games/sprint/sprint';
import { WordsDataT } from '../../../types/types';
import { IMainSectionViewRender } from '../../common/IMainViewRender';
import { gameSprintBody } from '../../viewsContent/views';

export default class GameSprintPlayView implements IMainSectionViewRender {
  game: ISprintGame;

  api: IApi;

  private content: HTMLElement;

  constructor(words: WordsDataT) {
    this.game = new SprintGame(words);
    this.content = document.querySelector('#main') as HTMLElement;
    this.api = herokuApi;
  }

  renderStage() {
    const btns = this.content.querySelectorAll('.answer') as NodeListOf<HTMLButtonElement>;
    btns?.forEach((btn) => btn?.classList.remove('fault', 'ok'));
    const engWord = this.content.querySelector('#engWord') as HTMLElement;
    const translation = this.content.querySelector('#translation') as HTMLElement;
    engWord.innerHTML = this.game.currentStage.engWord;
    translation.innerHTML = this.game.currentStage.translation;
  }

  render() {
    this.content.innerHTML = gameSprintBody.sections.join('');
    this.addEventHandlers();
    this.renderStage();
    return Promise.resolve();
  }

  addEventHandlers() {
    const btns = this.content.querySelectorAll('.answer') as NodeListOf<HTMLButtonElement>;
    btns?.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.name === isRightTranslation(this.game.currentStage)) {
          btn?.classList.add('ok');
        } else {
          btn?.classList.add('fault');
        }
        this.game.goToNextStage();
        setTimeout(() => this.renderStage(), 500);
      });
    });
  }
}
