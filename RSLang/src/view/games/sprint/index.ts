import { herokuApi } from '../../../api';
import { IApi } from '../../../api/interfaces';
import { ISprintGame } from '../../../controller/games/sprint/interfaces';
import { isRightTranslation, SprintGame } from '../../../controller/games/sprint/sprint';
import { WordsDataT } from '../../../types/types';
import { IMainSectionViewRender } from '../../common/IMainViewRender';

class SprintView implements IMainSectionViewRender {
  game: ISprintGame;

  api: IApi;

  private content: HTMLElement;

  constructor(words: WordsDataT) {
    this.game = new SprintGame(words);
    this.content = document.querySelector('#main') as HTMLElement;
    this.api = herokuApi;
  }

  renderStage() {
    const engWord = this.content.querySelector('#engWord') as HTMLElement;
    const translation = this.content.querySelector('#translation') as HTMLElement;
    engWord.innerHTML = this.game.currentStage.engWord;
    translation.innerHTML = this.game.currentStage.translation;
  }

  render() {
    this.content.innerHTML = gamesChoiceView.sections.join('');
    this.content.classList.add(gamesChoiceView.name);
    this.renderStage();
    return Promise.resolve();
  }

  addEventHandlers() {
    const btns = this.content.querySelector('#buttons');

    btns?.addEventListener('click', (e) => {
      const btn = e.target as HTMLButtonElement;
      if (btn.name === isRightTranslation(this.game.currentStage)) {
        //you are right
      } else {
        //you are right
      }
    });
  }

}
export default SprintView;
