import axios from 'axios';
import { IMainSectionViewRender } from '../../common/IMainViewRender';
import { popupGameStat } from '../../viewsContent/views';
import { WordsDataT } from '../../../types/types';
import { gameStatWord } from '../../viewsContent/gamesstat';
import GameSelectorView from '../../gameSelector/gameSelectorView';
import { ICommonGame } from '../../../controller/games/interfaces';

type AnswerType = 'right' | 'wrong';

const closePopup = () => {
  const popup = document.querySelector('.popup') as HTMLDivElement;
  popup.classList.remove('open');
  setTimeout(() => {
    popup.remove();
  }, 500);
};

const baseURL = axios.defaults.baseURL as string;

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
    newElement.addEventListener('click', () => {
      const audio = new Audio(`${baseURL}/${el.audio}`);
      audio.play();
    });
  });
}

export default class GameStatisticsView implements IMainSectionViewRender {
  private content: HTMLElement;

  private wrongWords: WordsDataT;

  private rightWords: WordsDataT;

  private game: ICommonGame;

  private returnToView: IMainSectionViewRender;

  private bestSerie: number;

  constructor(
    bestSerie: number,
    wrongWords: WordsDataT | [],
    rightWords: WordsDataT | [],
    game: ICommonGame,
    returnToView: IMainSectionViewRender,
  ) {
    this.content = document.querySelector('body') as HTMLElement;
    this.wrongWords = [...wrongWords];
    this.rightWords = [...rightWords];
    this.game = game;
    this.returnToView = returnToView;
    this.bestSerie = bestSerie;
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
    const rightAnswersEl = document.querySelector('.game-stat__rights') as HTMLSpanElement;
    const rightsWordsEl = document.querySelector('.game-stat__rights-words') as HTMLDivElement;
    const rightsHeaderEl = document.querySelector('.header-rights') as HTMLDivElement;
    const errorAnswersEl = document.querySelector('.game-stat__errors') as HTMLSpanElement;
    const errorsWordsEl = document.querySelector('.game-stat__errors-words') as HTMLDivElement;
    const errorsHeaderEl = document.querySelector('.header-errors') as HTMLDivElement;
    const separatorEl = document.querySelector('.stat-separator') as HTMLSpanElement;

    if (this.rightWords.length > 0) {
      rightAnswersEl.innerText = this.rightWords.length.toString();
      addWordItemsTo('right', this.rightWords);
    } else {
      rightsHeaderEl.classList.add('hide');
      rightsWordsEl.classList.add('hide');
      separatorEl.classList.add('hide');
    }
    if (this.wrongWords.length > 0) {
      errorAnswersEl.innerText = this.wrongWords.length.toString();
      addWordItemsTo('wrong', this.wrongWords);
    } else {
      errorsHeaderEl.classList.add('hide');
      errorsWordsEl.classList.add('hide');
      separatorEl.classList.add('hide');
    }
    const gameSelectionBtn = popup.querySelector('.game-stat__game-select') as HTMLButtonElement;
    gameSelectionBtn.addEventListener('click', () => {
      const gameSelection = new GameSelectorView();
      gameSelection.render();
    });
    gameSelectionBtn.addEventListener('click', closePopup);

    const gameRestartBtn = popup.querySelector('.game-stat__restart') as HTMLButtonElement;
    gameRestartBtn.addEventListener('click', closePopup);

    gameRestartBtn.addEventListener('click', () => {
      this.game.restart();
    });

    const popupClose = popup.querySelector('.popup__close') as HTMLAnchorElement;
    popupClose.addEventListener('click', (event: Event) => {
      event.preventDefault();
      popup.classList.remove('open');
      this.returnToView.render();
      setTimeout(() => {
        popup.remove();
      }, 500);
    });

    const slider = popup.querySelector('.game-stat__slider') as HTMLDivElement;
    const sliderLeft = popup.querySelector('#game-stat-left');
    const sliderRight = popup.querySelector('#game-stat-right');

    (sliderLeft as HTMLAnchorElement).addEventListener('click', () => {
      slider.classList.remove('shift');
      sliderLeft?.classList.toggle('active-page');
      sliderRight?.classList.toggle('active-page');
    });

    (sliderRight as HTMLAnchorElement).addEventListener('click', () => {
      slider.classList.add('shift');
      sliderLeft?.classList.toggle('active-page');
      sliderRight?.classList.toggle('active-page');
    });

    const totalAnswers = this.wrongWords.length + this.rightWords.length;
    const percentEl = popup.querySelector('.game-stat__percent span') as HTMLSpanElement;
    if (totalAnswers) {
      const percent = (this.rightWords.length / totalAnswers) * 100;
      percentEl.innerText = percent.toString();
    } else {
      percentEl.innerText = '0';
    }

    const rusultEl = popup.querySelector('.game-stat__result-val') as HTMLSpanElement;
    rusultEl.innerText = (this.rightWords.length * 10).toString();

    const bestSerieEl = popup.querySelector('.game-stat__serie-val') as HTMLSpanElement;
    bestSerieEl.innerText = this.bestSerie.toString();
    return Promise.resolve();
  }
}
