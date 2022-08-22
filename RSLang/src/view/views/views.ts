import { ViewType } from './viewType';
import {
  sectionAbout, sectionScope, sectionTeam, sectionRegistration,
} from './main';
import {
  sectionGames, sectionPaginationTop, sectionDictionary, sectionPaginationBottom,
} from './handbook';
import sectionGamesChoice from './gameschoice';
import { sectionAudioGameStart } from './audiogame';

export const mainView: ViewType = {
  sections: [sectionAbout, sectionScope, sectionTeam, sectionRegistration],
};

export const handbookView: ViewType = {
  sections: [sectionGames, sectionPaginationTop, sectionDictionary, sectionPaginationBottom],
};

export const gamesChoiceView: ViewType = {
  sections: [sectionGamesChoice],
};

export const gameAudioStart: ViewType = {
  sections: [sectionAudioGameStart],
};
