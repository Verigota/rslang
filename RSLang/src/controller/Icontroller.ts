import { AxiosResponse } from 'axios';
import { WordDataT } from '../types/types';

export default interface Icontroller {
  cardHandler(group: number, page: number): Promise<AxiosResponse<unknown, unknown>>;

  wordInfoAudioHandler(
    wordData: WordDataT,
    audioElement: HTMLAudioElement,
    playCounter: { numOfPlays: number },
  ): void
}
