import { ViewType } from '../../../view/views/viewType';
import { gameAudioStart, gameAudioBody } from '../../../view/views/views';
import AppView from '../../../view/appView';

export type DataType<PropType> = Array<PropType>;
export type WordList = DataType<IWord>;

interface IWord {
  word: string;
  translate: string;
  audio: string;
}

interface IGameControllers {
  playBtn: HTMLAnchorElement | null;
  answer1: HTMLAnchorElement | null;
  answer2: HTMLAnchorElement | null;
  answer3: HTMLAnchorElement | null;
  answer4: HTMLAnchorElement | null;
  answer5: HTMLAnchorElement | null;
  answer1Text: HTMLParagraphElement | null;
  answer2Text: HTMLParagraphElement | null;
  answer3Text: HTMLParagraphElement | null;
  answer4Text: HTMLParagraphElement | null;
  answer5Text: HTMLParagraphElement | null;
  skipBtn: HTMLAnchorElement | null;
}

export class AudioCallController {
  private content: HTMLElement | null;

  private appView: AppView;

  private gameCtrls: IGameControllers;

  private words: WordList;

  constructor() {
    this.content = document.querySelector('.content') as HTMLElement;
    this.appView = AppView.getInstance();
    this.appView.createView(gameAudioStart);
    this.addStartAction();
    this.gameCtrls = {
      playBtn: null,
      answer1: null,
      answer2: null,
      answer3: null,
      answer4: null,
      answer5: null,
      skipBtn: null,
      answer1Text: null,
      answer2Text: null,
      answer3Text: null,
      answer4Text: null,
      answer5Text: null,
    };
    this.words = [
      {
        word: 'man',
        translate: 'мужчина',
        audio: 'empty',
      },
      {
        word: 'woman',
        translate: 'женщина',
        audio: 'empty',
      },
      {
        word: 'child',
        translate: 'ребёнок',
        audio: 'empty',
      },
      {
        word: 'son',
        translate: 'сын',
        audio: 'empty',
      },
      {
        word: 'daughter',
        translate: 'дочь',
        audio: 'empty',
      },
    ];
  }

  private addStartAction() {
    const startBtn = document.querySelector('.audio-game__start-btn') as HTMLElement;
    startBtn.addEventListener('click', () => {
      this.appView.createView(gameAudioBody);
      this.getGameControllers();
    });
  }

  private getGameControllers() {
    this.gameCtrls.playBtn = document.querySelector('.audio-game__audio-btn') as HTMLAnchorElement;
    this.gameCtrls.answer1Text = document.querySelector('#answer1 .answer__text') as HTMLParagraphElement;
    this.gameCtrls.answer2Text = document.querySelector('#answer2 .answer__text') as HTMLParagraphElement;
    this.gameCtrls.answer3Text = document.querySelector('#answer3 .answer__text') as HTMLParagraphElement;
    this.gameCtrls.answer4Text = document.querySelector('#answer4 .answer__text') as HTMLParagraphElement;
    this.gameCtrls.answer5Text = document.querySelector('#answer5 .answer__text') as HTMLParagraphElement;
    this.gameCtrls.answer1 = document.querySelector('#answer1') as HTMLAnchorElement;
    this.gameCtrls.answer2 = document.querySelector('#answer2') as HTMLAnchorElement;
    this.gameCtrls.answer3 = document.querySelector('#answer3') as HTMLAnchorElement;
    this.gameCtrls.answer4 = document.querySelector('#answer4') as HTMLAnchorElement;
    this.gameCtrls.answer5 = document.querySelector('#answer5') as HTMLAnchorElement;
    this.gameCtrls.skipBtn = document.querySelector('.audio-game__skip-btn') as HTMLAnchorElement;
    this.updateGame();
  }

  private updateGame() {
    (this.gameCtrls.answer1Text as HTMLParagraphElement).innerText = this.words[0].translate;
    (this.gameCtrls.answer2Text as HTMLParagraphElement).innerText = this.words[1].translate;
    (this.gameCtrls.answer3Text as HTMLParagraphElement).innerText = this.words[2].translate;
    (this.gameCtrls.answer4Text as HTMLParagraphElement).innerText = this.words[3].translate;
    (this.gameCtrls.answer5Text as HTMLParagraphElement).innerText = this.words[4].translate;
  }
}
