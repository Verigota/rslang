import { WordsDataT } from '../../../types/types';
import { herokuApi } from '../../../api';
import { IApi } from '../../../api/interfaces';
import { IGameControllers, IStageInfo, initGameControllersObj } from './interfaces';
import wordsData from './data/data';
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

  constructor(words: WordsDataT | [], returnToView: IMainSectionViewRender) {
    this.api = herokuApi;
    if (words.length > 0) {
      this.words = [...words.sort(() => 0.5 - Math.random())];
    } else {
      this.words = [...wordsData]; // подключение к серверу и получение списка слов
    }
    this.createStages();

    this.currentStage = 0;

    this.wrongAnswers = [];
    this.rightAnswers = [];

    this.returnToView = returnToView;
  }

  public start() {
    this.view = new GameAudioCallPlayView();
    this.view.render()
      .then(() => {
        this.gameCtrls = getGameControllers();
      })
      .then(() => {
        this.setEvents();
      })
      .then(() => {
        this.updateCurrentStage();
      });
    if (this.returnToView instanceof GameAudioCallStartView) {
      this.returnToView = this.view;
    }
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

  private setEvents() {
    (this.gameCtrls as IGameControllers).answers.forEach((el) => {
      el.addEventListener('click', () => {
        const userChoice = el.getAttribute('data-word');
        if (userChoice === this.stages[this.currentStage].word.wordTranslate) {
          this.currSerie += 1;
          this.rightAnswers.push({ ...this.stages[this.currentStage].word });
          el.classList.add('ok');
        } else {
          if (this.bestSerie < this.currSerie) {
            this.bestSerie = this.currSerie;
          }
          this.currSerie = 0;
          this.wrongAnswers.push({ ...this.stages[this.currentStage].word });
          el.classList.add('fault');
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
        }, 1000);
      });
    });
  }

  private updateCurrentStage() {
    const answers: string[] = [...this.stages[this.currentStage].answers];
    answers.push(this.stages[this.currentStage].word.wordTranslate);
    answers.sort(() => 0.5 - Math.random());
    for (let i = 0; i < (this.gameCtrls as IGameControllers).texts.length; i += 1) {
      (this.gameCtrls as IGameControllers).texts[i].innerText = answers[i];
      ((this.gameCtrls as IGameControllers).answers[i] as HTMLAnchorElement).setAttribute('data-word', answers[i]);
      ((this.gameCtrls as IGameControllers).answers[i] as HTMLAnchorElement).classList.remove('ok');
      ((this.gameCtrls as IGameControllers).answers[i] as HTMLAnchorElement).classList.remove('fault');
    }
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
