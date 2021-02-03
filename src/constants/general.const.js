const assetsFolderPath = './src/assets/';
const imagesFolderPath = `${assetsFolderPath}images/`;

export const APP_CONFIG = {
  title: 'Flappy Bird',
  assetsPackPath: `${assetsFolderPath}pack.json`,
  sceneChangeDuration: 150,
  maxWidth: 720,

  maxHeight: 1080,
  edgeMargin: 10,
  animationDuration: 300
};

export const COLORS = {
  mainBckg: '#ADD8E6',
  // rgb presentation of mainBckg
  fadeBckg: {
    red: 173,
    green: 216,
    blue: 230,
  },
  loadingBckg: 0xADD8E6,
  loadingBckg_: '#ADD8E6',
  loadingBar: 0x6FBBD3,
  loadingBar_: '#6FBBD3',
  progressBar: 0xFFB6C1,
  progressBar_: '#FFB6C1',
  textMain: '#007AA3',
  // textMainDarker: '#007AA3',
  textFocus: '#90EE90',
  // textFocusDarker: '#4ee44e',
  textFocusDarker: '#20D420',
  textMainBorder: '#FFB6C1',
  textMainBorderDarker: '#FF4B69',
  textSimple: '#000000',
  textSimpleBorder: '#FFFFFF',
  strokeBase: '#000000'
}

export const GAME_OPTIONS = {
  birdGravity: 1000,
  birdSpeed: 200,
  minPipeHeight: 50,
  pipeHole: [100, 130],
  birdFlapPower: 400, // flap thrust
  localStorageName: 'bestFlappyScore'
};

export const GAME_IMGS = {
  bird: `${imagesFolderPath}bird.png`,
  pipe: `${imagesFolderPath}pipe.png`,
};

const fontFamily = '\"Potta One\"';

export const AUTHORS = [
  {
    name: 'Alina',
    gitHub: 'https://github.com/AlinaSh96'
  },
  {
    name: 'Anastasia',
    gitHub: 'https://github.com/ivanova-anastasia'
  },
  {
    name: 'Yevgeniya',
    gitHub: 'https://github.com/yevgeniya-a'
  }
];

export const RSS_LINK = 'https://rs.school/js';

export const APP_FONTS = {
  title: {
    fontFamily,
    fontSize: 50,
    fill: COLORS.textFocus,
    stroke: COLORS.textMain,
    strokeThickness: 8,
    align: 'center'
  },
  titleHover: {
    stroke: COLORS.textFocus,
    fill: COLORS.textMain,
  },
  base: {
    fontFamily,
    fontSize: 40,
    fill: COLORS.textMain,
    stroke: COLORS.textMainBorder,
    strokeThickness: 5,
    align: 'center',
  },
  baseHover: {
    stroke: COLORS.textFocus
  },
  small: {
    fontFamily,
    fontSize: 30,
    fill: COLORS.textMain,
    stroke: COLORS.textMainBorder,
    strokeThickness: 4,
    align: 'center'
  },
  simple: {
    fontFamily,
    fontSize: 22,
    fill: COLORS.textMain,
    stroke: COLORS.textMainBorder,
    strokeThickness: 5,
    align: 'center'
  },
  simpleHover: {
    fill: COLORS.textMain,
    stroke: COLORS.textMainBorder,
    strokeThickness: 5,
  }
};

export const BASE_BE_URL = 'https://rsclone-flappy-bird-be.herokuapp.com';

export const AUTHORIZATION_HEADER = 'authorization';
