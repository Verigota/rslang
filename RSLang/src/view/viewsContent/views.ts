import { ViewType } from './viewType';
import { sectionAbout, sectionScope, sectionTeam } from './main';
import { sectionGamesChoice } from './gameschoice';
import { sectionAudioGameStart, sectionAudioGameBody } from './audiogame';
import { sectionSprintGameStart, sectionSprintGameBody } from './sprintgame';
import { popupGameStatView } from './gamesstat';
import { popupMessage } from './popup';

export const mainView: ViewType = {
  sections: [sectionAbout, sectionScope, sectionTeam],
  name: 'main',
};

export const gamesChoiceView: ViewType = {
  sections: [sectionGamesChoice],
  name: 'gamechoice',
};

export const gameAudioCallStart: ViewType = {
  sections: [sectionAudioGameStart],
  name: 'audiogame-start',
};

export const gameAudioCallBody: ViewType = {
  sections: [sectionAudioGameBody],
  name: 'audiogame-body',
};

export const gameSprintStart: ViewType = {
  sections: [sectionSprintGameStart],
  name: 'sprintgame-start',
};

export const gameSprintBody: ViewType = {
  sections: [sectionSprintGameBody],
  name: 'sprintgame-body',
};

export const popupMsg: ViewType = {
  sections: [popupMessage],
  name: 'message',
};

export const popupGameStat: ViewType = {
  sections: [popupGameStatView],
  name: 'game-statistics',
};
