import { WordDataT } from '../../../types/types';

export interface IGameControllers {
  playBtn: HTMLAnchorElement | null;
  skipBtn: HTMLAnchorElement | null;
  answers: HTMLAnchorElement[] | [];
  texts: HTMLParagraphElement[] | [];
}

export interface IStageInfo {
  word: WordDataT,
  answers: string[],
}

export function initGameControllersObj(): IGameControllers {
  return {
    playBtn: null,
    skipBtn: null,
    answers: [],
    texts: [],
  };
}
