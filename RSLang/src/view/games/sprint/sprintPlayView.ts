import axios from 'axios';
import { herokuApi } from '../../../api';
import { IApi } from '../../../api/interfaces';
import DayStatistics from '../../../controller/daystatistics/daystatistics';
import { ICommonGame } from '../../../controller/games/interfaces';
import { ISprintGame } from '../../../controller/games/sprint/interfaces';
import { SprintGame, isRightTranslation } from '../../../controller/games/sprint/sprint';
import { WordsDataT } from '../../../types/types';
import { IMainSectionViewRender } from '../../common/IMainViewRender';
import { gameSprintBody } from '../../viewsContent/views';
import GameStatisticsView from '../statistics/gameStatisticView';

const config = { childList: true };
export default class GameSprintPlayView implements ICommonGame, IMainSectionViewRender {
  game: ISprintGame;

  api: IApi;

  private content: HTMLElement;

  private rightAnswerAudio: HTMLAudioElement;

  private wrongAnswerAudio: HTMLAudioElement;

  private currentAudio: HTMLAudioElement;

  private bestSerie = 0;

  private currSerie = 0;

  private wrongAnswers: WordsDataT;

  private rightAnswers: WordsDataT;

  private dayStat: DayStatistics;

  private words: WordsDataT;

  private returnView: IMainSectionViewRender;

  constructor(words: WordsDataT, returnView: IMainSectionViewRender) {
    this.game = new SprintGame(words);
    this.content = document.querySelector('#main') as HTMLElement;
    this.api = herokuApi;
    this.currentAudio = new Audio();
    this.rightAnswerAudio = new Audio('public/assets/audio/right.mp3');
    this.wrongAnswerAudio = new Audio('public/assets/audio/wrong.mp3');
    this.wrongAnswers = [];
    this.rightAnswers = [];
    this.dayStat = new DayStatistics();
    this.words = words;
    this.returnView = returnView;
    this.keyDownHandler = this.keyDownHandler.bind(this);
  }

  renderStage() {
    const btns = this.content.querySelectorAll('.answer') as NodeListOf<HTMLButtonElement>;
    btns?.forEach((btn) => btn?.classList.remove('fault', 'ok'));
    const engWord = this.content.querySelector('#engWord') as HTMLElement;
    this.currentAudio = new Audio(`${axios.defaults.baseURL}/${this.game.currentStage.sound}`);
    this.currentAudio.play();
    const translation = this.content.querySelector('#translation') as HTMLElement;
    engWord.innerHTML = this.game.currentStage.engWord;
    translation.innerHTML = this.game.currentStage.translation;
  }

  render() {
    this.content.innerHTML = gameSprintBody.sections.join('');
    this.addEventHandlers();
    const timerId = setTimeout(() => {
      const stat = new GameStatisticsView(
        this.bestSerie,
        this.wrongAnswers,
        this.rightAnswers,
        new GameSprintPlayView(this.words, this.returnView),
        this.returnView,
      );
      stat.render();
    }, 30000);
    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        if (mutation.type === 'childList') {
          clearTimeout(timerId);
          document.removeEventListener('keydown', this.keyDownHandler);
        }
      });
    });
    observer.observe(this.content, config);
    this.renderStage();
    document.querySelector('.timer')?.classList.add('start');
    return Promise.resolve();
  }

  start() {
    this.render();
  }

  restart() {
    this.render();
  }

  addEventHandlers() {
    const btns = this.content.querySelectorAll('.answer') as NodeListOf<HTMLButtonElement>;
    btns?.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.name === isRightTranslation(this.game.currentStage)) {
          btn?.classList.add('ok');
          this.rightAnswerAudio.play();
          this.currSerie += 1;
          if (this.bestSerie < this.currSerie) {
            this.bestSerie = this.currSerie;
          }
          this.rightAnswers.push({ ...this.game.currentStage.word });
          this.dayStat.updateWord('sprint', this.game.currentStage.word, 'right');
        } else {
          btn?.classList.add('fault');
          this.wrongAnswerAudio.play();
          this.currSerie = 0;
          this.wrongAnswers.push({ ...this.game.currentStage.word });
          this.dayStat.updateWord('sprint', this.game.currentStage.word, 'wrong');
        }
        this.game.goToNextStage();
        setTimeout(() => this.renderStage(), 600);
      });
    });

    document.addEventListener('keydown', this.keyDownHandler);
  }

  keyDownHandler(e: KeyboardEvent) {
    if (e.code === 'ArrowRight') {
      e.stopPropagation();
      if (isRightTranslation(this.game.currentStage) === 'wrong') {
        this.content.querySelector('#answer2')?.classList.add('ok');
        this.rightAnswerAudio.play();
        this.currSerie += 1;
        if (this.bestSerie < this.currSerie) {
          this.bestSerie = this.currSerie;
        }
        this.rightAnswers.push({ ...this.game.currentStage.word });
        this.dayStat.updateWord('sprint', this.game.currentStage.word, 'right');
      } else {
        this.content.querySelector('#answer2')?.classList.add('fault');
        this.wrongAnswerAudio.play();
        this.currSerie = 0;
        this.wrongAnswers.push({ ...this.game.currentStage.word });
        this.dayStat.updateWord('sprint', this.game.currentStage.word, 'wrong');
      }
      this.game.goToNextStage();
      setTimeout(() => this.renderStage(), 600);
    }
    if (e.code === 'ArrowLeft') {
      e.stopPropagation();
      if (isRightTranslation(this.game.currentStage) === 'right') {
        this.content.querySelector('#answer1')?.classList.add('ok');
        this.rightAnswerAudio.play();
        this.currSerie += 1;
        if (this.bestSerie < this.currSerie) {
          this.bestSerie = this.currSerie;
        }
        this.rightAnswers.push({ ...this.game.currentStage.word });
        this.dayStat.updateWord('sprint', this.game.currentStage.word, 'right');
      } else {
        this.content.querySelector('#answer1')?.classList.add('fault');
        this.wrongAnswerAudio.play();
        this.currSerie = 0;
        this.wrongAnswers.push({ ...this.game.currentStage.word });
        this.dayStat.updateWord('sprint', this.game.currentStage.word, 'wrong');
      }
      this.game.goToNextStage();
      setTimeout(() => this.renderStage(), 600);
    }
  }
}
