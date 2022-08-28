import { IMainSectionViewRender } from '../../common/IMainViewRender';
import { popupGameStat } from '../../viewsContent/views';
import GameSprintPlayView from '../sprint/sprintPlayView';
import GameAudioCallPlayView from '../audiocall/audioCallPlayView';
import { WordsDataT } from '../../../types/types';
import { gameStatWord } from '../../viewsContent/gamesstat';
import GameSelectorView from '../../gameSelector/gameSelectorView';

import { wrongWords, rightWords } from './test';

type ReturnTo = 'AudioCall' | 'Sprint';
type AnswerType = 'right' | 'wrong';

const closePopup = (event: Event) => {
  event.preventDefault();
  const popup = document.querySelector('.popup') as HTMLDivElement;
  popup.classList.remove('open');
  setTimeout(() => {
    popup.remove();
  }, 500);
};

function setGamesButtonsActions(popup: HTMLDivElement, viewToReturn: ReturnTo) {
  const gameSelectionBtn = document.querySelector('.game-stat__game-select') as HTMLButtonElement;
  gameSelectionBtn.addEventListener('click', () => {
    const gameSelection = new GameSelectorView();
    gameSelection.render();
  });
  gameSelectionBtn.addEventListener('click', closePopup);
  const gameRestartBtn = document.querySelector('.game-stat__restart') as HTMLButtonElement;
  gameRestartBtn.addEventListener('click', closePopup);
  if (viewToReturn === 'AudioCall') {
    gameRestartBtn.addEventListener('click', () => {
      const gameRestart = new GameAudioCallPlayView();
      gameRestart.render();
    });
  } else {
    gameRestartBtn.addEventListener('click', () => {
      const gameRestart = new GameSprintPlayView();
      gameRestart.render();
    });
  }
}

function addWordItemsTo(wordsType: AnswerType, words: WordsDataT) {
  const container = (wordsType === 'right') ? document.querySelector('.game-stat__rights-words') as HTMLDivElement
    : document.querySelector('.game-stat__errors-words') as HTMLDivElement;
  words.forEach((el) => {
    const newElement = document.createElement('div');
    newElement.classList.add('game-stat__el');
    newElement.innerHTML = gameStatWord.replace('<p class="game-stat__el-word"></p>', `<p class="game-stat__el-word">${el.word}</p>`)
      .replace('<p class="game-stat__el-transl"></p>', `<p class="game-stat__el-transl">${el.wordTranslate}</p>`)
      .replace('<a href="#" class="game-stat__el-play">', `<a href="#" class="game-stat__el-play" data-audio="${el.audio}">`);
    container.appendChild(newElement);
    // todo add EventListener for playing audio
  });
}

export default class GameStatisticsView implements IMainSectionViewRender {
  private content: HTMLElement;

  private wrongWords: WordsDataT;

  private rightWords: WordsDataT;

  private viewToReturn: ReturnTo;

  constructor(
    viewToReturn: ReturnTo,
    wrongWordsList: WordsDataT | [],
    rightWordsList: WordsDataT | [],
  ) {
    this.content = document.querySelector('body') as HTMLElement;
    this.viewToReturn = viewToReturn;
    if (wrongWordsList.length !== 0) {
      this.wrongWords = [...wrongWordsList];
    } else {
      this.wrongWords = [...wrongWords];
    }
    if (rightWordsList.length !== 0) {
      this.rightWords = [...rightWordsList];
    } else {
      this.rightWords = [...rightWords];
    }
  }

  render() {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.setAttribute('id', 'game-stat');
    popup.innerHTML = popupGameStat.sections.join('');
    this.content.append(popup);
    setTimeout(() => {
      popup.classList.add('open');
    }, 100);
    addWordItemsTo('right', this.rightWords);
    addWordItemsTo('wrong', this.wrongWords);
    setGamesButtonsActions(popup, this.viewToReturn);
    const popupArea = popup.querySelector('.popup__area') as HTMLAnchorElement;
    const popupClose = popup.querySelector('.popup__close') as HTMLAnchorElement;
    const buttons = [popupClose, popupArea];

    buttons.forEach((el) => {
      el.addEventListener('click', closePopup);
    });
    return Promise.resolve();
  }
}
