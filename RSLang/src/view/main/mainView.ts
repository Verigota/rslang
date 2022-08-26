import { ViewType } from '../viewsContent/viewType';
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
    this.createView(mainView);
    return Promise.resolve();
  }

  public createView(view: ViewType) {
    if (this.content !== null) {
      if (this.currentView !== '') {
        this.content.classList.remove(this.currentView);
      }
      this.content.innerHTML = view.sections.join('');
      this.content.classList.add(view.name);
    }
    this.currentView = view.name;
  }
}

export default MainView;
