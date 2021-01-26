import GameScene from '@controller/game/GameScene';
import MenuScene from '@controller/game/MenuScene';
import BootScene from '@controller/game/BootScene';
import {APP_CONFIG, COLORS} from '@constants/general.const';
import AuthScene from '@controller/game/AuthScene';
import SettingsScene from '@controller/game/SettingsScene';

const calcAppWidth = () => {
  const width = window.innerWidth
    || document.documentElement.clientWidth;
  return Math.min(width, APP_CONFIG.maxWidth);
}

const calcAppHeight = () => {
  let height = window.innerHeight
    || document.documentElement.clientHeight;
  return Math.min(height, APP_CONFIG.maxHeight);
}

const width = calcAppWidth();
const height = calcAppHeight();

export const gameConfig = {
  width, // Width of the game in pixels
  height, // Height of the game in pixels
  backgroundColor: COLORS.mainBckg, // The background color
  // scale: {
  //   mode: Phaser.Scale.FIT,
  //   autoCenter: Phaser.Scale.CENTER_BOTH,
  //   width: 640,
  //   height: 960
  // },
  input: {
    keyboard: true
  },
  physics: { // The type of physics engine to use
    default: 'arcade', // Use simple arcade-style physics engine
    arcade: {
      gravity: {
        y: 0 // Vertical gravity for the whole scene // todo 300
      }
    }
  },
  parent: 'game', // Create the game inside the <div id='game'>
  scene: [BootScene, AuthScene, MenuScene, SettingsScene/*, GameScene*/], // The class containing the methods to create our game (preload, create, update)
  audio: {disableWebAudio: true}, // Use HTML5 audio instead of WebAudio
  render: {pixelArt: true, antialias: false}
};
