import {GAME_OPTIONS, AUTHORIZATION_HEADER} from '@constants/general.const';

const save = (key, value) => localStorage.setItem(key, value);

const getBestScore = () => localStorage.getItem(GAME_OPTIONS.localStorageName) || 0;

const setBestScore = (score) => save(GAME_OPTIONS.localStorageName, score);

const getAuthToken = () => localStorage.getItem(AUTHORIZATION_HEADER.localStorageName);

const setAuthToken = (token) => save(AUTHORIZATION_HEADER.localStorageName, token);

const getMusicSetting = () => localStorage.getItem(GAME_OPTIONS.localStorageMusic);

const setMusicSetting = (music) => save(GAME_OPTIONS.localStorageMusic, music);

const getSoundSetting = () => localStorage.getItem(GAME_OPTIONS.localStorageSound);

const setSoundSetting = (sound) => save(GAME_OPTIONS.localStorageSound, sound);

const getLangSetting = () => localStorage.getItem(GAME_OPTIONS.localStorageLang);

const setLangSetting = (lang) => save(GAME_OPTIONS.localStorageLang, lang);

export {
  getBestScore,
  setBestScore,
  getAuthToken,
  setAuthToken,
  getMusicSetting,
  setMusicSetting,
  getSoundSetting,
  setSoundSetting,
  getLangSetting,
  setLangSetting,
};
