import AudioCall from '../../../controller/games/audiocall/audiocall';
import wordsData from '../../../controller/games/audiocall/data/data';
import { IMainSectionViewRender } from '../../common/IMainViewRender';
import { gameAudioCallStart } from '../../viewsContent/views';

function setGamesButtonsActions() {
  const gamePlayBtn = document.querySelector('.game__start-btn') as HTMLAnchorElement;
  gamePlayBtn.addEventListener('click', () => {
    const audioCall = new AudioCall(wordsData);
    audioCall.start();
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
