import AudioCall from '../../../controller/games/audiocall/audiocall';
import { IGameStart } from '../../../controller/games/audiocall/interfaces';
import getGameWords from '../../../controller/games/GameController';
import { IMainSectionViewRender } from '../../common/IMainViewRender';
import GameSelectorView from '../../gameSelector/gameSelectorView';
import { gameAudioCallStart } from '../../viewsContent/views';

export default class GameAudioCallStartView implements IMainSectionViewRender {
  private content: HTMLElement;

  selectedLevel: number | null;

  page?: number | null;

  returnView: IMainSectionViewRender;

  constructor(startOpts: IGameStart, startView: IMainSectionViewRender) {
    this.content = document.querySelector('#main') as HTMLElement;
    this.selectedLevel = startOpts?.level;
    this.page = startOpts.page || null;
    this.returnView = startView;
  }

  render() {
    this.content.innerHTML = gameAudioCallStart.sections.join('');
    this.setGamesButtonsActions();
    return Promise.resolve();
  }

  private setGamesButtonsActions() {
    const gamePlayBtn = document.querySelector('.game__start-btn') as HTMLAnchorElement;
    gamePlayBtn.addEventListener('click', async () => {
      if (this.selectedLevel !== null) {
        const words = this.page !== null
          ? await getGameWords({ level: this.selectedLevel, page: this.page })
          : await getGameWords({ level: this.selectedLevel });
        const audioCall = new AudioCall(words, this.returnView);
        audioCall.start();
      }
    });
  }
}
