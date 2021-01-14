/* eslint-disable no-restricted-globals */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
// import App from '@controller/AppController';

// const app = new App();
// app.start();
import Phaser from 'phaser';
// Variables go here
let game;
let gameOptions = {
  birdGravity: 800,
  birdSpeed: 125,
  minPipeHeight: 50,
  pipeHole: [100, 130],
  birdFlapPower: 300, // flap thrust
  localStorageName: 'bestFlappyScore',
};

// The playGame class holds a game scene
export class playGame extends Phaser.Scene {
  constructor() {
    super('PlayGame');
  }

  // eslint-disable-next-line class-methods-use-this
  preload() {
    this.load.image('bird', './src/assets/images/bird.png');
    this.load.image('pipe', './src/assets/images/pipe.png');
  }

  create() {
    this.pipetop = this.physics.add.sprite(400, 100, 'pipe');
    // this.pipetop.scale = 5;
    this.pipebot = this.physics.add.sprite(400, 200, 'pipe');
    this.pipetop.setOrigin(0, 1);
    this.pipebot.setOrigin(0, 0);
    this.pipetop.setVelocityX(-gameOptions.birdSpeed);
    this.pipebot.setVelocityX(-gameOptions.birdSpeed);

    this.bird = this.physics.add.sprite(80, 240, 'bird');
    this.bird.body.gravity.y = gameOptions.birdGravity;
    this.input.on('pointerdown', this.flap, this);

    this.physics.add.overlap(this.bird, this.pipetop, this.die, null, this);
    this.physics.add.overlap(this.bird, this.pipebot, this.die, null, this);
    this.bird.setCollideWorldBounds(true);// Turn on world bounds collisions
    this.bird.body.onWorldBounds = true;// Turn the event listener
    this.physics.world.on('worldbounds', this.die, this);// When touching world bounds

    this.score = 0;
    this.topScore = localStorage.getItem(gameOptions.localStorageName) == null ? 0
      : localStorage.getItem(gameOptions.localStorageName);
    this.scoreText = this.add.text(10, 10, '');
    this.updateScore(this.score);
  }

  flap() {
    this.bird.body.velocity.y = -gameOptions.birdFlapPower;
    this.tweens.add({
      targets: this.bird,
      angle: -20,
      ease: 'Linear',
      duration: 100,
      repeat: 0,
      yoyo: false,
    });
  }

  update() {
    if (this.pipetop.getBounds().right < 0) {
      this.pipetop.x = 320 + 30;
      this.pipebot.x = 320 + 30;
      let pipeHoleHeight = Phaser.Math.Between(gameOptions.pipeHole[0],
        gameOptions.pipeHole[1]); // Random gap size
      let pipeHolePosition = Phaser.Math.Between(gameOptions.minPipeHeight
      + pipeHoleHeight / 2,
      480 - gameOptions.minPipeHeight - pipeHoleHeight / 2);
      this.pipetop.y = pipeHolePosition - pipeHoleHeight / 2;
      this.pipebot.y = pipeHolePosition + pipeHoleHeight / 2;
      this.updateScore(1);
    }

    if (this.bird.angle < 20) this.bird.angle += 1;
  }

  updateScore(inc) {
    this.score += inc;
    this.scoreText.text = `Score: ${this.score}\nBest: ${this.topScore}`;
  }

  die() {
    localStorage.setItem(gameOptions.localStorageName, Math.max(this.score, this.topScore));
    this.scene.start('PlayGame');
  }
}

export const gameConfig = {
  width: 320, // Width of the game in pixels
  height: 480, // Height of the game in pixels
  backgroundColor: '#87ceeb', // The background color
  physics: { // The type of physics engine to use
    default: 'arcade', // Use simple arcade-style physics engine
    arcade: {
      gravity: {
        y: 0, // Vertical gravity for the whole scene
      },
    },
  },
  parent: 'game', // Create the game inside the <div id='game'>
  scene: playGame, // The class containing the methods to create our game (preload, create, update)
  audio: {disableWebAudio: true}, // Use HTML5 audio instead of WebAudio
};
