import IhandbookController from '../../controller/handbookController/IhandbookController';
import { WordsDataT, WordDataT } from '../../types/types';
import Handbook from '../handbook/handbook';

export interface IMainSectionViewRender {
  render: () => Promise<void>;
}

export interface HandbookViewData {
  wordsData: WordsDataT,
  wordData: WordDataT,
  handbookController: IhandbookController,
}

export class HandbookView implements IMainSectionViewRender {
  private handbook: Handbook;

  private getViewData: () => Promise<HandbookViewData>;

  constructor(getViewData: () => Promise<HandbookViewData>) {
    this.handbook = new Handbook(this);
    this.getViewData = getViewData;
  }

  public async render() {
    document.querySelector('.footer')?.classList.remove('hidden');
    const { wordData, wordsData, handbookController } = await this.getViewData();
    this.handbook.renderHandbook(wordsData, wordData, handbookController);
  }
}
