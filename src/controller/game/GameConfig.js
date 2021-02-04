import GameScene from '@controller/game/GameScene';
import MenuScene from '@controller/game/MenuScene';
import BootScene from '@controller/game/BootScene';
import {COLORS} from '@constants/general.const';
import AuthScene from '@controller/game/AuthScene';
import SettingsScene from '@controller/game/SettingsScene';
import AuthorsScene from '@controller/game/AuthorsScene';
import ShortcutsScene from '@controller/game/ShortcutsScene';
import GameOverScene from '@controller/game/GameOverScene';
import StatisticsScene from '@controller/game/StatisticsScene';

export const gameConfig = {
  backgroundColor: COLORS.mainBckg,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 720,
    height: 1080,
  },
  input: {
    keyboard: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 0,
      },
    },
  },
  parent: 'game',
  scene: [
    BootScene,
    AuthScene,
    MenuScene,
    SettingsScene,
    AuthorsScene,
    ShortcutsScene,
    GameScene,
    GameOverScene,
    StatisticsScene,
  ],
  audio: {
    disableWebAudio: true,
  },
  render: {
    pixelArt: true,
    antialias: false,
  },
};
