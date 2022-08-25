import { ViewType } from './viewType';
import { sectionAbout, sectionScope, sectionTeam } from './main';
import sectionGamesChoice from './gameschoice';
import { sectionAudioGameStart, sectionAudioGameBody } from './audiogame';
import popupMessage from './popup';

export const mainView: ViewType = {
  sections: [sectionAbout, sectionScope, sectionTeam],
  name: 'main',
};

export const gamesChoiceView: ViewType = {
  sections: [sectionGamesChoice],
  name: 'gamechoice',
};

export const gameAudioStart: ViewType = {
  sections: [sectionAudioGameStart],
  name: 'audiogame-start',
};

export const gameAudioBody: ViewType = {
  sections: [sectionAudioGameBody],
  name: 'audiogame-body',
};

export const popupMsg: ViewType = {
  sections: [popupMessage],
  name: 'message',
};
