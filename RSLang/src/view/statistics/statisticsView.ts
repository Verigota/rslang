import { herokuApi } from '../../api';
import authStorage from '../../controller/authorization/auth-storage';
import DayStatistics from '../../controller/daystatistics/daystatistics';
import { Difficulty } from '../../controller/games/interfaces';
import { IMainSectionViewRender } from '../common/IMainViewRender';
import { statisticsView } from '../viewsContent/views';

export default class StatisticsView implements IMainSectionViewRender {
  private content: HTMLElement;

  constructor() {
    this.content = document.querySelector('#main') as HTMLElement;
  }

  render() {
    this.content.innerHTML = statisticsView.sections.join('');
    const dayStat = new DayStatistics();
    const dayStatData = dayStat.getCurrentUserStatistics();
    const newWordsEl = document.querySelector('#statistics-newwords') as HTMLParagraphElement;
    const percentRightEl = document.querySelector('#statistics-percent') as HTMLParagraphElement;
    const learntEl = document.querySelector('#statistics-learnt') as HTMLParagraphElement;
    const sprintLearntEl = document.querySelector('#sprint-learnt') as HTMLSpanElement;
    const sprintRightEl = document.querySelector('#sprint-right-answers') as HTMLSpanElement;
    const sprintBestSerieEl = document.querySelector('#sprint-longest-serie') as HTMLSpanElement;
    const audiocallLearntEl = document.querySelector('#audiocall-learnt') as HTMLSpanElement;
    const audiocallRightEl = document.querySelector('#audiocall-right-answers') as HTMLSpanElement;
    const audiocallBestSerieEl = document.querySelector('#audiocall-longest-serie') as HTMLSpanElement;
    const todayStatWrap = document.querySelector('.statistics__today') as HTMLParagraphElement;

    if (!authStorage.get()) {
      todayStatWrap.classList.add('hide-learnt');
      const date = new Date();
      let count = 0;
      herokuApi.getUserWords().then((res) => {
        count = res.data
          .filter((el) => el.difficulty === Difficulty.learned)
          .filter((el2) => {
            const dateStat = new Date(el2.optional.addTime);
            if (date.getFullYear() === dateStat.getFullYear()
              && date.getMonth() === dateStat.getMonth()
              && date.getDate() === dateStat.getDate()) {
              return true;
            }
            return false;
          }).length;
      });
      learntEl.innerText = count.toString();
    }

    newWordsEl.innerText = dayStatData.allGamesRight.toString();
    percentRightEl.innerText = dayStatData.allGamesRightPercent.toString();

    sprintLearntEl.innerText = dayStatData.games.sprint.right.toString();
    sprintRightEl.innerText = dayStatData.games.sprint.rightPercent.toString();
    sprintBestSerieEl.innerText = dayStatData.games.sprint.bestSerie.toString();

    audiocallLearntEl.innerText = dayStatData.games.audiocall.right.toString();
    audiocallRightEl.innerText = dayStatData.games.audiocall.rightPercent.toString();
    audiocallBestSerieEl.innerText = dayStatData.games.audiocall.bestSerie.toString();

    return Promise.resolve();
  }
}
