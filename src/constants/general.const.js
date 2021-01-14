export const GAME_OPTIONS = {
  birdGravity: 800,
  birdSpeed: 125,
  minPipeHeight: 50,
  pipeHole: [100, 130],
  birdFlapPower: 300, // flap thrust
  localStorageName: 'bestFlappyScore'
};

const imagesFolderPath = './src/assets/images/';

export const GAME_IMGS = {
  bird: `${imagesFolderPath}bird.png`,
  pipe: `${imagesFolderPath}pipe.png`
};