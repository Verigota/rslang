import { IMainSectionViewRender } from './IMainViewRender';

export default abstract class BaseView implements IMainSectionViewRender {
  abstract render() : Promise<void>;

  // eslint-disable-next-line class-methods-use-this
  destroy() {}
}
