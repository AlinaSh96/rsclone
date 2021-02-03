import { GAME_OPTIONS, AUTHORIZATION_HEADER } from '@constants/general.const';

const save = (key, value) => localStorage.setItem(key, value);

const getBestScore = () =>
  localStorage.getItem(GAME_OPTIONS.localStorageName) || 0;

const setBestScore = (score) => save(GAME_OPTIONS.localStorageName, score);

const getAuthToken = () =>
  localStorage.getItem(AUTHORIZATION_HEADER.localStorageName);

const setAuthToken = (token) =>
  save(AUTHORIZATION_HEADER.localStorageName, token);

export { getBestScore, setBestScore, getAuthToken, setAuthToken };
