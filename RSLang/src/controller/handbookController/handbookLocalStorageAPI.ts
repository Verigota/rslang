import { ComplicatedWordsStorageDataT, RsLangHandbookDataT } from '../../types/types';
import { COMPLICATED_WORDS_KEY, WORDS_KEY } from './handbookControllerConstants';

export function getHandbookDataFromLocalStorage(): RsLangHandbookDataT {
  return JSON.parse(<string>localStorage.getItem(WORDS_KEY));
}

export function setHandbookDataToLocalStorage(
  _group: number,
  _page: number,
  _currPage: number,
  _activeWordCardIndex: number,
): void {
  localStorage.setItem(WORDS_KEY, JSON.stringify({
    group: _group,
    page: _page,
    currPage: _currPage,
    activeWordCardIndex: _activeWordCardIndex,
  }));
}

export function getHandbookComplicatedWordsDataFromLocalStorage(): ComplicatedWordsStorageDataT {
  return JSON.parse(<string>localStorage.getItem(COMPLICATED_WORDS_KEY));
}

export function setHandbookComplicatedWordsToLocalStorage(
  _page: number,
  _currPage: number,
  _activeWordCardIndex: number,
): void {
  localStorage.setItem(COMPLICATED_WORDS_KEY, JSON.stringify({
    page: _page,
    currPage: _currPage,
    activeWordCardIndex: _activeWordCardIndex,
  }));
}

export function updateHandbookWordsStorage(
  diffBetweenArrIndexAndPageNum: number,
  wordCardIndex: number,
) {
  const rsLangHandbookData:
  RsLangHandbookDataT = getHandbookDataFromLocalStorage();

  setHandbookDataToLocalStorage(
    rsLangHandbookData.group,
    rsLangHandbookData.currPage - diffBetweenArrIndexAndPageNum,
    rsLangHandbookData.currPage,
    wordCardIndex,
  );
}

export function updateHandbookComplicatedWordsStorage(
  diffBetweenArrIndexAndPageNum: number,
  wordCardIndex: number,
) {
  const handbookComplicatedWordsData:
  ComplicatedWordsStorageDataT = getHandbookComplicatedWordsDataFromLocalStorage();

  setHandbookComplicatedWordsToLocalStorage(
    handbookComplicatedWordsData.currPage - diffBetweenArrIndexAndPageNum,
    handbookComplicatedWordsData.currPage,
    wordCardIndex,
  );
}
