import {GAME_OPTIONS} from '@constants/general.const';

const save = (key, value) => localStorage.setItem(key, value);

const getBestScore = () => localStorage.getItem(GAME_OPTIONS.localStorageName) || 0;

const setBestScore = (score) => save(GAME_OPTIONS.localStorageName, score);

export {
  getBestScore,
  setBestScore
};
