import { herokuApi } from '../../api';
import { LearntWordsPesp } from '../../api/interfaces';
import { WordsDataT } from '../../types/types';
import authStorage from '../authorization/auth-storage';
import { IGameStart } from './audiocall/interfaces';

function getNotLearntWordsOnPage(learntWords: LearntWordsPesp, pageWords: WordsDataT) {
  // eslint-disable-next-line no-underscore-dangle
  const learntWordIds = learntWords[0].paginatedResults.map((word) => word._id);
  return pageWords.filter((word) => !learntWordIds.includes(word.id));
}

export default async function getGameWords(startOpt: IGameStart)
  : Promise<WordsDataT> {
  if (startOpt.page !== undefined) {
    const user = authStorage.get();
    const isHardWords = localStorage.getItem('complicatedWordsPage');
    let { page } = startOpt;
    if (user) {
      if (isHardWords) {
        const complWords = localStorage.getItem('handbookComplicatedWords');
        let pageHard = JSON.parse(complWords as string).page;
        let gameWords = (await herokuApi.getAllUserAggregatedHardWords(pageHard))
          .data[0]
          .paginatedResults;
        while (gameWords.length < 20 && pageHard > 0) {
          pageHard -= 1;
          // eslint-disable-next-line no-await-in-loop
          const pageWord = (await herokuApi.getAllUserAggregatedHardWords(pageHard))
            .data[0]
            .paginatedResults;
          gameWords = gameWords.concat(pageWord);
        }
        // eslint-disable-next-line no-underscore-dangle
        return gameWords.map((word) => ({ ...word, id: word._id }));
      }
      const learntWordsPromise = herokuApi.getLearntUserWords(user.userId);
      const currPageWordsPromise = herokuApi.getChunkOfWords(startOpt.level, page);
      const promises = [learntWordsPromise, currPageWordsPromise];
      const [learntWords, currPageWords] = await Promise.all(promises);
      let gameWords = getNotLearntWordsOnPage(
        learntWords.data as LearntWordsPesp,
        currPageWords.data as WordsDataT,
      );
      while (gameWords.length < 20 && page > 0) {
        page -= 1;
        // eslint-disable-next-line no-await-in-loop
        const pageWords = await herokuApi.getChunkOfWords(startOpt.level, page);
        gameWords = gameWords.concat(getNotLearntWordsOnPage(
          learntWords.data as LearntWordsPesp,
          pageWords.data,
        ));
      }
      return gameWords;
    }
    return (await herokuApi.getChunkOfWords(startOpt.level, startOpt.page)).data;
  }
  const pageCounts = 30;
  const page = Math.floor(Math.random() * (pageCounts + 1));
  return (await herokuApi.getChunkOfWords(startOpt.level, page)).data;
}
