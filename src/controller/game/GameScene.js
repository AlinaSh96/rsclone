import Phaser from 'phaser';
import {GAME_OPTIONS, GAME_IMGS} from '@constants/general.const';
import {getBestScore, setBestScore} from '@utils/StorageUtils';

// The GameScene class holds a game scene
export default class GameScene extends Phaser.Scene {
  constructor() {
    super('PlayGame');
  }

  preload() {
    this.load.image('bird', GAME_IMGS.bird);
    this.load.image('pipe', GAME_IMGS.pipe);
  }

  create() {
    this.pipetop = this.physics.add.sprite(400, 100, 'pipe');
    // this.pipetop.scale = 5;
    this.pipebot = this.physics.add.sprite(400, 200, 'pipe');
    this.pipetop.setOrigin(0, 1);
    this.pipebot.setOrigin(0, 0);
    this.pipetop.setVelocityX(-GAME_OPTIONS.birdSpeed);
    this.pipebot.setVelocityX(-GAME_OPTIONS.birdSpeed);

    this.bird = this.physics.add.sprite(80, 240, 'bird');
    this.bird.body.gravity.y = GAME_OPTIONS.birdGravity;
    this.input.on('pointerdown', this.flap, this);

    this.physics.add.overlap(this.bird, this.pipetop, this.die, null, this);
    this.physics.add.overlap(this.bird, this.pipebot, this.die, null, this);
    this.bird.setCollideWorldBounds(true);// Turn on world bounds collisions
    this.bird.body.onWorldBounds = true;// Turn the event listener
    this.physics.world.on('worldbounds', this.die, this);// When touching world bounds

    this.score = 0;
    this.topScore = getBestScore();
    this.scoreText = this.add.text(10, 10, '');
    this.updateScore(this.score);
  }

  flap() {
    this.bird.body.velocity.y = -GAME_OPTIONS.birdFlapPower;
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
      let pipeHoleHeight = Phaser.Math.Between(GAME_OPTIONS.pipeHole[0],
        GAME_OPTIONS.pipeHole[1]); // Random gap size
      let pipeHolePosition = Phaser.Math.Between(GAME_OPTIONS.minPipeHeight
      + pipeHoleHeight / 2,
      480 - GAME_OPTIONS.minPipeHeight - pipeHoleHeight / 2);
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
    setBestScore(Math.max(this.score, this.topScore));
    this.scene.start('PlayGame');
  }
}
