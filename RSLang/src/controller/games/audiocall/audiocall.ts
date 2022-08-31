import { WordsDataT } from '../../../types/types';
import { herokuApi } from '../../../api';
import { IApi } from '../../../api/interfaces';
import { IGameControllers, IStageInfo, initGameControllersObj } from './interfaces';
import GameAudioCallPlayView from '../../../view/games/audiocall/audioCallPlayView';
import GameStatisticsView from '../../../view/games/statistics/gameStatisticView';
import { IMainSectionViewRender } from '../../../view/common/IMainViewRender';
import GameAudioCallStartView from '../../../view/games/audiocall/audioCallStartView';
import { ICommonGame } from '../interfaces';

function getRandomAnswers(wordTranslate: string, words: WordsDataT): string[] {
  return words
    .map((el) => el.wordTranslate)
    .filter((el) => el !== wordTranslate)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);
}

function getGameControllers(): IGameControllers {
  const ctrls: IGameControllers = initGameControllersObj();
  ctrls.playBtn = document.querySelector('.game__audio-btn') as HTMLAnchorElement;
  ctrls.skipBtn = document.querySelector('.game__skip-btn') as HTMLAnchorElement;

  for (let i = 1; i <= 5; i += 1) {
    const textEl: HTMLParagraphElement = document.querySelector(`#answer${i} .answer__text`) as HTMLParagraphElement;
    (ctrls.texts as HTMLParagraphElement[]).push(textEl);
    const linkEl: HTMLParagraphElement = document.querySelector(`#answer${i}`) as HTMLParagraphElement;
    (ctrls.answers as HTMLParagraphElement[]).push(linkEl);
  }
  return ctrls;
}

export default class AudioCall implements ICommonGame {
  private words: WordsDataT;

  private wrongAnswers: WordsDataT;

  private rightAnswers: WordsDataT;

  private stages: IStageInfo[] = [];

  private currentStage: number;

  private gameCtrls: IGameControllers | null = null;

  private api: IApi;

  private view: GameAudioCallPlayView | null = null;

  private returnToView: IMainSectionViewRender;

  private bestSerie = 0;

  private currSerie = 0;

  private answerClick: (event: Event) => void;

  private keyDownHandler: (event: KeyboardEvent) => void;

  private currentAudio: HTMLAudioElement;

  constructor(
    words: WordsDataT | [],
    returnToView: IMainSectionViewRender,
  ) {
    this.api = herokuApi;
    this.words = [...words.sort(() => 0.5 - Math.random())];
    this.createStages();

    this.currentStage = 0;

    this.wrongAnswers = [];
    this.rightAnswers = [];

    this.returnToView = returnToView;

    this.currentAudio = new Audio();

    this.answerClick = (event: Event) => {
      event.stopPropagation();
      this.resetMouseEvents();
      let element: HTMLElement | null = null;
      if (event.target instanceof HTMLParagraphElement) {
        element = (event.target as HTMLElement).parentElement as HTMLAnchorElement;
      } else {
        element = event.target as HTMLAnchorElement;
      }
      const userChoice = element.getAttribute('data-word');
      this.checkAnswer(userChoice, element);
      this.resetKeyboardEvents();
    };

    this.keyDownHandler = (event: KeyboardEvent) => {
      event.stopPropagation();
      let answer: HTMLElement | null = null;
      switch (event.code) {
        case 'Digit1': answer = (this.gameCtrls as IGameControllers).answers[0] as HTMLAnchorElement;
          break;
        case 'Numpad1': answer = (this.gameCtrls as IGameControllers).answers[0] as HTMLAnchorElement;
          break;
        case 'Digit2': answer = (this.gameCtrls as IGameControllers).answers[1] as HTMLAnchorElement;
          break;
        case 'Numpad2': answer = (this.gameCtrls as IGameControllers).answers[1] as HTMLAnchorElement;
          break;
        case 'Digit3': answer = (this.gameCtrls as IGameControllers).answers[2] as HTMLAnchorElement;
          break;
        case 'Numpad3': answer = (this.gameCtrls as IGameControllers).answers[2] as HTMLAnchorElement;
          break;
        case 'Digit4': answer = (this.gameCtrls as IGameControllers).answers[3] as HTMLAnchorElement;
          break;
        case 'Numpad4': answer = (this.gameCtrls as IGameControllers).answers[3] as HTMLAnchorElement;
          break;
        case 'Digit5': answer = (this.gameCtrls as IGameControllers).answers[4] as HTMLAnchorElement;
          break;
        case 'Numpad5': answer = (this.gameCtrls as IGameControllers).answers[4] as HTMLAnchorElement;
          break;
        case 'Space': console.log('play sound');
          break;
        case 'Enter': answer = document.querySelector('.game__skip-btn') as HTMLButtonElement;
          break;
        case 'NumpadEnter': answer = document.querySelector('.game__skip-btn') as HTMLButtonElement;
          break;
        case 'ArrowRight': answer = document.querySelector('.game__skip-btn') as HTMLButtonElement;
          break;
        default: break;
      }
      // Number(str.replace('Digit', '').replace('Numpad',''))
      if (answer != null) {
        event.preventDefault();
        answer.classList.add('active');
        setTimeout(() => {
          if (answer != null) {
            answer.classList.remove('active');
          }
        }, 200);
        const userChoice = answer.getAttribute('data-word');
        this.checkAnswer(userChoice, answer);
        this.resetKeyboardEvents();
      }
    };
  }

  public start() {
    this.view = new GameAudioCallPlayView();
    this.view.render()
      .then(() => {
        this.gameCtrls = getGameControllers();
      })
      .then(() => {
        this.updateCurrentStage();
      });
    if (this.returnToView instanceof GameAudioCallStartView) {
      this.returnToView = this.view;
    }
  }

  private checkAnswer(userChoice: string | null, answer: HTMLElement) {
    if (userChoice !== null) {
      if (userChoice === this.stages[this.currentStage].word.wordTranslate) {
        this.currSerie += 1;
        if (this.bestSerie < this.currSerie) {
          this.bestSerie = this.currSerie;
        }
        this.rightAnswers.push({ ...this.stages[this.currentStage].word });
        answer.classList.add('ok');
      } else {
        this.currSerie = 0;
        this.wrongAnswers.push({ ...this.stages[this.currentStage].word });
        answer.classList.add('fault');
      }
      setTimeout(() => {
        this.currentStage += 1;
        if (this.currentStage < this.stages.length) {
          this.updateCurrentStage();
        } else {
          const stat = new GameStatisticsView(
            this.bestSerie,
            this.wrongAnswers,
            this.rightAnswers,
            this,
            this.returnToView,
          );
          stat.render();
        }
      }, 500);
    }
  }

  public setKeyboardEvents() {
    document.addEventListener('keydown', this.keyDownHandler);
  }

  public resetKeyboardEvents() {
    document.removeEventListener('keydown', this.keyDownHandler);
  }

  public restart() {
    this.bestSerie = 0;
    this.currSerie = 0;
    this.createStages();
    this.currentStage = 0;
    this.wrongAnswers = [];
    this.rightAnswers = [];
    this.start();
  }

  private setMouseEvents() {
    (this.gameCtrls as IGameControllers).answers.forEach((el) => {
      el.addEventListener('click', this.answerClick);
    });
  }

  private resetMouseEvents() {
    (this.gameCtrls as IGameControllers).answers.forEach((el) => {
      el.removeEventListener('click', this.answerClick);
    });
  }

  private updateCurrentStage() {
    //this.currentAudio.src = '';
    const testEl = document.querySelector('.game__test-field') as HTMLDivElement;
    (testEl as HTMLDivElement).innerText = this.stages[this.currentStage].word.word;
    const answers: string[] = [...this.stages[this.currentStage].answers];
    answers.push(this.stages[this.currentStage].word.wordTranslate);
    answers.sort(() => 0.5 - Math.random());
    for (let i = 0; i < (this.gameCtrls as IGameControllers).texts.length; i += 1) {
      (this.gameCtrls as IGameControllers).texts[i].innerText = answers[i];
      ((this.gameCtrls as IGameControllers).answers[i] as HTMLAnchorElement).setAttribute('data-word', answers[i]);
      ((this.gameCtrls as IGameControllers).answers[i] as HTMLAnchorElement).classList.remove('ok');
      ((this.gameCtrls as IGameControllers).answers[i] as HTMLAnchorElement).classList.remove('fault');
    }
    this.setMouseEvents();
    this.setKeyboardEvents();
  }

  private createStages() {
    const stages: IStageInfo[] = [];
    this.words.forEach((word) => {
      stages.push({
        word: { ...word },
        answers: getRandomAnswers(word.wordTranslate, this.words),
      });
    });
    this.stages = [...stages];
  }
}
