import Phaser from 'phaser';
import gameConfig from '@controller/game/GameConfig';

export default class GameController {
  start() {
    this.game = new Phaser.Game(gameConfig); // Start Phaser
  }
}
