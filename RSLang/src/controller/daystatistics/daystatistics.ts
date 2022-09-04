import { IAuthInfo } from '../../api/interfaces';
import { WordDataT } from '../../types/types';
import getEmptyStatObj from './commonFunc';
import { IGameStatistics, IUserStatistics, TAnswerType } from './interfaces';

type TGameName = 'audiocall' | 'sprint';

export default class DayStatistics {
  private user: IAuthInfo;

  private currentStat: IUserStatistics;

  private currentSerieLength = 0;

  constructor() {
    const userInfo = localStorage.getItem('user');
    if (userInfo === null) {
      this.user = {
        token: '',
        refreshToken: '',
        userId: 'unauthorized',
        name: 'unauthorized',
      };
    } else {
      this.user = JSON.parse(userInfo);
    }
    this.currentStat = this.getCurrentUserStatistics();
    // console.log('this.currentStat', this.currentStat);
  }

  public getCurrentUserStatistics(): IUserStatistics {
    const keyValue = localStorage.getItem(`stat-${this.user.userId}`) as string;
    // console.log('getCurrentUserStatistics', keyValue);
    if (keyValue !== null) {
      const userStat: IUserStatistics = JSON.parse(keyValue);
      const currentDate = new Date();
      const statDate = new Date(userStat.date);
      if (currentDate.getDate() === statDate.getDate()
        && currentDate.getMonth() === statDate.getMonth()
        && currentDate.getFullYear() === statDate.getFullYear()) {
        return userStat;
      }
      this.currentStat = getEmptyStatObj();
      this.setCurrentUserStatistics();
      return this.currentStat;
    }
    this.currentStat = getEmptyStatObj();
    this.setCurrentUserStatistics();
    return this.currentStat;
  }

  public setCurrentUserStatistics(): void {
    // console.log('setCurrentUserStatistics', this.currentStat);
    if (this.currentStat !== null) {
      localStorage.setItem(`stat-${this.user.userId}`, JSON.stringify(this.currentStat));
    }
  }

  public updateGameStat(gameName: TGameName, gameStat: IGameStatistics) {
    const gameSavedStat: IGameStatistics = {
      ...this.currentStat?.games[gameName] as IGameStatistics,
    };
    if (Object.prototype.hasOwnProperty.call(gameSavedStat, 'wrong')) {
      gameSavedStat.wrong += gameStat.wrong;
    } else {
      gameSavedStat.wrong = gameStat.wrong;
    }
    if (Object.prototype.hasOwnProperty.call(gameSavedStat, 'right')) {
      gameSavedStat.right += gameStat.right;
    } else {
      gameSavedStat.right = gameStat.right;
    }
    if (Object.prototype.hasOwnProperty.call(gameSavedStat, 'bestSerie')) {
      if (gameSavedStat.bestSerie < gameStat.bestSerie) {
        gameSavedStat.bestSerie = gameStat.bestSerie;
      }
    } else {
      gameSavedStat.bestSerie = gameStat.bestSerie;
    }

    gameSavedStat.rightPercent = gameSavedStat.right
      / (gameSavedStat.right + gameSavedStat.wrong);

    gameStat.wordList.forEach((word) => {
      if (!gameSavedStat.wordList.find((el) => el.id === word.id)) {
        gameSavedStat.wordList.push(word);
      }
    });

    gameSavedStat.newWords = gameStat.wordList.length;
    this.updateUserStat();
  }

  public updateWord(gameName: TGameName, word: WordDataT, answer: TAnswerType) {
    if (answer === 'right') {
      this.currentStat.games[gameName].right += 1;
      this.currentSerieLength += 1;
      if (this.currentSerieLength > this.currentStat.games[gameName].bestSerie) {
        this.currentStat.games[gameName].bestSerie = this.currentSerieLength;
      }
    } else {
      this.currentSerieLength = 0;
      this.currentStat.games[gameName].wrong += 1;
    }
    this.currentStat.games[gameName].rightPercent = Math.trunc((
      this.currentStat.games[gameName].right
      / (this.currentStat.games[gameName].right
        + this.currentStat.games[gameName].wrong)) * 100);

    if (!this.currentStat.games[gameName].wordList.find((el) => el.id === word.id)) {
      this.currentStat.games[gameName].wordList.push(word);
      this.currentStat.games[gameName].newWords = this.currentStat.games[gameName].wordList.length;
    }
    // console.log('updateWord', word);
    this.updateUserStat();
  }

  public getGameStat(gameName: TGameName): IGameStatistics {
    return this.currentStat?.games[gameName] as IGameStatistics;
  }

  private updateUserStat() {
    if (!Number.isNaN(this.currentStat?.games.sprint.right)
        && !Number.isNaN(this.currentStat?.games.audiocall.right)) {
      this.currentStat.allGamesRight = this.currentStat.games.audiocall.right
          + this.currentStat.games.sprint.right;
    }
    if (!Number.isNaN(this.currentStat?.games.sprint.wrong)
        && !Number.isNaN(this.currentStat?.games.audiocall.wrong)) {
      this.currentStat.allGamesWrong = this.currentStat.games.audiocall.wrong
          + this.currentStat.games.sprint.wrong;
    }
    if (!Number.isNaN(this.currentStat?.games.sprint.wrong)
        && !Number.isNaN(this.currentStat?.games.audiocall.wrong)) {
      const audiocallWrong = this.currentStat.games.audiocall.wrong;
      const audiocallRight = this.currentStat.games.audiocall.right;
      const sprintWrong = this.currentStat.games.sprint.wrong;
      const sprintRight = this.currentStat.games.sprint.right;

      this.currentStat.allGamesRightPercent = Math.trunc(((audiocallRight + sprintRight)
          / (audiocallWrong + audiocallRight + sprintWrong + sprintRight)) * 100);
    }
    if (this.currentStat.games.audiocall.wordList.length > 0) {
      this.currentStat.games.audiocall.wordList.forEach((word) => {
        if (!this.currentStat.wordList.find((el) => el.id === word.id)) {
          this.currentStat.wordList.push(word);
        }
      });
    }
    if (this.currentStat.games.sprint.wordList.length > 0) {
      this.currentStat.games.sprint.wordList.forEach((word) => {
        if (!this.currentStat.wordList.find((el) => el.id === word.id)) {
          this.currentStat.wordList.push(word);
        }
      });
    }
    this.currentStat.allNewWords = this.currentStat.wordList.length;
    this.setCurrentUserStatistics();
    // console.log('user statistic', this.currentStat);
  }
}
