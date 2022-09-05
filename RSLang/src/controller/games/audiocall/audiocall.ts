import axios from 'axios';
import { WordDataT, WordsDataT } from '../../../types/types';
import { herokuApi } from '../../../api';
import { IApi } from '../../../api/interfaces';
import { IGameControllers, IStageInfo, initGameControllersObj } from './interfaces';
import GameAudioCallPlayView from '../../../view/games/audiocall/audioCallPlayView';
import GameStatisticsView from '../../../view/games/statistics/gameStatisticView';
import { IMainSectionViewRender } from '../../../view/common/IMainViewRender';
import GameAudioCallStartView from '../../../view/games/audiocall/audioCallStartView';
import { ICommonGame } from '../interfaces';
import DayStatistics from '../../daystatistics/daystatistics';

function getRandomAnswers(word: WordDataT, words: WordsDataT): string[] {
  const additionalAnswers = [
    ['реклама', 'знают', 'батарея', 'черный', 'чистый', 'город', 'страна', 'развивать', 'электрический', 'в конце концов', 'стакан', 'факт', 'история', 'природа', 'никогда', 'пластик', 'люди', 'проблема', 'улица', 'считать'],
    ['древний', 'академия', 'доска', 'век', 'концерт', 'округ', 'подсказка', 'толковый словарь', 'существовать', 'квартира', 'джентльмен', 'скрытый', 'может быть', 'офицер', 'фунт', 'обработать', 'оригинальный', 'публиковать', 'театр', 'богатство'],
    ['скамейка', 'ромашка', 'спор', 'пустой', 'ужастик', 'инцидент', 'туман', 'объект', 'сирота', 'беременный', 'сюжет', 'ярость', 'месть', 'позор', 'вздох', 'красться', 'запасной', 'стебель', 'ужин', 'тендер'],
    ['астрология', 'пара', 'отклоняться', 'дифференцировать', 'сорвать', 'уравнение', 'ошибочный', 'неистовый', 'непреднамеренное', 'импровизировать', 'моряк', 'широта', 'множество', 'неизменность', 'вращаются', 'неприятность', 'успокаивают', 'мель', 'техника'],
    ['аффект', 'автограф', 'шарик', 'заварить', 'очарование', 'судьба', 'оборудование', 'рог', 'раздраженный', 'лаг', 'кошмарный сон', 'питательный', 'белок', 'подпись', 'материал', 'подсознание', 'ван', 'предупредить', 'разрабатывать', 'увеличить'],
    ['аккумулируют', 'антенна', 'устройство', 'разрядка', 'лавина', 'нетронутый', 'согласованность', 'эпизод', 'смертный', 'горький', 'предзнаменование', 'пасмурная погода', 'следопыт', 'щебень', 'боком', 'рыдать', 'уединиться', 'трезвый', 'пятнышко', 'воспитание'],
  ];

  const answers = words
    .map((el) => el.wordTranslate)
    .filter((el) => el !== word.wordTranslate)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);
  if (answers.length < 4) {
    const addWords = additionalAnswers[word.group].sort(() => 0.5 - Math.random());
    for (let i = 0; i < addWords.length; i += 1) {
      if (!answers.includes(addWords[i])) {
        answers.push(addWords[i]);
      }
      if (answers.length === 4) {
        break;
      }
    }
  }
  return answers;
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

  private baseURL: string;

  private rightAnswerAudio: HTMLAudioElement;

  private wrongAnswerAudio: HTMLAudioElement;

  private dayStat: DayStatistics;

  constructor(
    words: WordsDataT | [],
    returnToView: IMainSectionViewRender,
  ) {
    this.api = herokuApi;
    this.words = [...words.sort(() => 0.5 - Math.random())];
    this.createStages();
    this.currentStage = 0;
    this.baseURL = axios.defaults.baseURL as string;
    this.wrongAnswers = [];
    this.rightAnswers = [];
    this.returnToView = returnToView;
    this.currentAudio = new Audio();
    this.rightAnswerAudio = new Audio('public/assets/audio/right.mp3');
    this.wrongAnswerAudio = new Audio('public/assets/audio/wrong.mp3');
    this.dayStat = new DayStatistics();
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
        case 'Space': this.currentAudio.play();
          break;
        case 'Enter': answer = document.querySelector('.game__skip-btn') as HTMLButtonElement;
          break;
        case 'NumpadEnter': answer = document.querySelector('.game__skip-btn') as HTMLButtonElement;
          break;
        case 'ArrowRight': answer = document.querySelector('.game__skip-btn') as HTMLButtonElement;
          break;
        default: break;
      }

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
        this.currentAudio.play();
      });
  }

  private checkAnswer(userChoice: string | null, answer: HTMLElement) {
    if (userChoice !== null) {
      answer?.classList.add('hide-help');
      if (userChoice === this.stages[this.currentStage].word.wordTranslate) {
        this.rightAnswerAudio.play();
        this.currSerie += 1;
        if (this.bestSerie < this.currSerie) {
          this.bestSerie = this.currSerie;
        }
        this.rightAnswers.push({ ...this.stages[this.currentStage].word });
        answer.classList.add('ok');
        this.dayStat.updateWord('audiocall', this.stages[this.currentStage].word, 'right');
      } else {
        const findStr = this.stages[this.currentStage].word.wordTranslate;
        const rightAnswerEl = this.gameCtrls?.answers.find((answ: HTMLElement) => answ.getAttribute('data-word') === findStr);
        if (rightAnswerEl) {
          rightAnswerEl.classList.add('ok');
          rightAnswerEl.classList.add('hide-help');
        }
        this.wrongAnswerAudio.play();
        this.currSerie = 0;
        this.wrongAnswers.push({ ...this.stages[this.currentStage].word });
        answer.classList.add('fault');
        this.dayStat.updateWord('audiocall', this.stages[this.currentStage].word, 'wrong');
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
    const game = document.querySelector('.game') as HTMLDivElement;
    game.focus();
    game.addEventListener('keydown', this.keyDownHandler);
  }

  public resetKeyboardEvents() {
    const game = document.querySelector('.game') as HTMLDivElement;
    game.removeEventListener('keydown', this.keyDownHandler);
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

    const playBtn = document.querySelector('.game__audio-btn');
    playBtn?.addEventListener('click', () => {
      this.currentAudio.play();
    });

    document.querySelector('.game__skip-btn')?.addEventListener('click', this.answerClick);
  }

  private resetMouseEvents() {
    (this.gameCtrls as IGameControllers).answers.forEach((el) => {
      el.removeEventListener('click', this.answerClick);
    });
  }

  private updateCurrentStage() {
    this.currentAudio = new Audio(`${this.baseURL}/${this.stages[this.currentStage].word.audio}`);
    this.currentAudio.play();
    // this.currentAudio.addEventListener('ended', this.playEventHandler);
    const answers: string[] = [...this.stages[this.currentStage].answers];
    answers.push(this.stages[this.currentStage].word.wordTranslate);
    answers.sort(() => 0.5 - Math.random());
    for (let i = 0; i < (this.gameCtrls as IGameControllers).texts.length; i += 1) {
      (this.gameCtrls as IGameControllers).texts[i].innerText = answers[i];
      ((this.gameCtrls as IGameControllers).answers[i] as HTMLAnchorElement).setAttribute('data-word', answers[i]);
      ((this.gameCtrls as IGameControllers).answers[i] as HTMLAnchorElement).classList.remove('ok');
      ((this.gameCtrls as IGameControllers).answers[i] as HTMLAnchorElement).classList.remove('fault');
      ((this.gameCtrls as IGameControllers).answers[i] as HTMLAnchorElement).classList.remove('hide-help');
    }

    setTimeout(() => {
      this.setMouseEvents();
      this.setKeyboardEvents();
    }, 100);
  }

  private createStages() {
    const stages: IStageInfo[] = [];
    this.words.forEach((word) => {
      stages.push({
        word: { ...word },
        answers: getRandomAnswers(word, this.words),
      });
    });
    this.stages = [...stages];
  }
}
