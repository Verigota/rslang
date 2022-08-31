import PageName from '../enums/enums';

export type WordsDataT = WordDataT[];

export type WordDataT = {
  id: string,
  group: number,
  page: number,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string,
};

export type AggregatedWordDataT = {
  _id: string,
  group: number,
  page: number,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string,
  userWord: { difficulty: string },
};

export type AggregatedWordsDataT = AggregatedWordDataT[];

export type AggregatedWordResponseT = {
  paginatedResults: AggregatedWordsDataT;
  totalCount: { count: number }[];
};

export type AggregatedWordsResponseT = AggregatedWordResponseT[];

export type RsLangHandbookDataT = {
  group: number,
  page: number,
  currPage: number,
  activeWordCardIndex: number
};

export type ComplicatedWordsStorageDataT = {
  page: number,
  currPage: number,
  activeWordCardIndex: number
};

export type PageNameT = PageName.handbook | PageName.complicatedWords;

export type UserWord = {
  id: string,
  wordId: string,
  difficulty: string,
  optional: Record<string, never>,
};

export type UserWordsT = UserWord[];
