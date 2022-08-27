// import { ViewType } from '../viewsContent/viewType';
import { mainView } from '../viewsContent/views';
import { IMainSectionViewRender } from '../common/IMainViewRender';

class MainView implements IMainSectionViewRender {
  private currentView: string;

  private content: HTMLElement | null = null;

  constructor() {
    this.currentView = '';
    this.content = document.querySelector('.content') as HTMLElement;
    this.content.innerHTML = '';
  }

  public render() {
    if (this.content !== null) {
      this.content.innerHTML = mainView.sections.join('');
    }
    return Promise.resolve();
  }
}

export default MainView;
