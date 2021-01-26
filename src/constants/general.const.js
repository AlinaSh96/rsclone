const assetsFolderPath = './src/assets/';
const imagesFolderPath = `${assetsFolderPath}images/`;

export const APP_CONFIG = {
  title: 'Flappy Bird',
  assetsPackPath: `${assetsFolderPath}pack.json`,
  sceneChangeDuration: 150,
  maxWidth: 720,
  maxHeight: 1280,
  edgeMargin: 10
};

export const COLORS = {
  mainBckg: '#ADD8E6',
  // rgb presentation of mainBckg
  fadeBckg: {
    red: 173,
    green: 216,
    blue: 230
  },
  loadingBckg: 0xADD8E6,
  loadingBckg_: '#ADD8E6',
  loadingBar: 0x6FBBD3,
  loadingBar_: '#6FBBD3',
  progressBar: 0xFFB6C1,
  progressBar_: '#FFB6C1',
  textMain: '#2DADD5',
  textMainDarker: '#007AA3',
  textFocus: '#90EE90',
  textMainBorder: '#FFB6C1',
  // textMainBorder: '#90EE90',
  textSimple: '#000000',
  textSimpleBorder: '#FFFFFF',
}

export const GAME_OPTIONS = {
  birdGravity: 800,
  birdSpeed: 125,
  minPipeHeight: 50,
  pipeHole: [100, 130],
  birdFlapPower: 300, // flap thrust
  localStorageName: 'bestFlappyScore'
};

export const GAME_IMGS = {
  bird: `${imagesFolderPath}bird.png`,
  pipe: `${imagesFolderPath}pipe.png`
};

const fontFamily = 'Source Sans Pro';

export const APP_FONTS = {
  title: {
    fontFamily,
    fontSize: 50,
    fill: COLORS.textMain,
    stroke: COLORS.textMainBorder,
    strokeThickness: 6,
    align: 'center'
  },
  base: {
    fontFamily,
    fontSize: 40,
    fill: COLORS.textMain,
    stroke: COLORS.textMainBorder,
    strokeThickness: 5,
    align: 'center'
  },
  baseHover: {
    fill: COLORS.textMainDarker,
    stroke: COLORS.textFocus
  },
  simple: {
    fontFamily,
    fontSize: 16,
    fill: COLORS.textMainDarker,
    align: 'center'
  }
}