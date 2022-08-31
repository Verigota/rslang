import { IMainSectionViewRender } from '../common/IMainViewRender';
import { statisticsView } from '../viewsContent/views';

export default class StatisticsView implements IMainSectionViewRender {
  private content: HTMLElement;

  constructor() {
    this.content = document.querySelector('#main') as HTMLElement;
  }

  render() {
    this.content.innerHTML = statisticsView.sections.join('');
    return Promise.resolve();
  }
}
