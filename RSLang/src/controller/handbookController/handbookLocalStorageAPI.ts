import { RsLangHandbookDataT } from '../../types/types';

export function getHandbookDataFromLocalStorage(key: string): RsLangHandbookDataT {
  return JSON.parse(<string>localStorage.getItem(key));
}

export function setHandbookDataToLocalStorage(
  key: string,
  _group: number,
  _page: number,
  _currPage: number,
  _activeWordCardIndex: number,
): void {
  localStorage.setItem(key, JSON.stringify({
    group: _group,
    page: _page,
    currPage: _currPage,
    activeWordCardIndex: _activeWordCardIndex,
  }));
}
