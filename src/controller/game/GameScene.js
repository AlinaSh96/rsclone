import Phaser from 'phaser';
import {APP_CONFIG, APP_FONTS, GAME_OPTIONS} from '@constants/general.const';
import Pipe from '@model/Pipe';
import {changeScene, getRandomNumber} from '@utils/CommonUtils';
import Bird from '@model/Bird';
import {UI} from '@constants/ui.const';

const BIRD_START_POSITION = {
  x: 50,
  y: 100,
};
const TOWN_HEIGHT = 128;
const SPEED_RATE = 5;
const MILLISECS = 1000;
const CLOUD_SPAWN_MIN_TIME = 3000;
const CLOUD_SPAWN_MAX_TIME = 10000;
const PIPE_HEIGHT = 60;
const PIPE_SPAWN_MIN_TIME = 2000;
const PIPE_SPAWN_MAX_TIME = 3500;
const PIPE_HOLE_MIN = 3;
const PIPE_HOLE_MAX = 6;
const DIFFICULTY_MAX = 100;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  init() {
    this.width = this.sys.canvas.width;
    this.height = this.sys.canvas.height;
  }

  create() {
    this.scoreText = this._addScoreText();
    this.setScore(0);

    this.town = this._addTown();
    this.bird = this._addBird();
    this.pipes = this.add.group({});
    this._addTimer();
    this._addClouds();
  }

  update(time, delta) {
    if (this.bird.isDead()) {
      this.die();
      return;
    }
    this.bird.update();
    this.physics.overlap(
      this.bird,
      this.pipes,
      this.die,
      null,
      this,
    );

    this.town.tilePositionX -= (delta * GAME_OPTIONS.birdSpeed) / (SPEED_RATE * MILLISECS);
  }

  _getUIText() {
    return UI[this.registry.get('lang')].game;
  }

  _addBird() {
    return new Bird({
      scene: this,
      x: BIRD_START_POSITION.x,
      y: BIRD_START_POSITION.y,
      texture: 'bird',
    });
  }

  _addPipe(x, y, frame) {
    this.pipes.add(
      new Pipe({
        scene: this,
        x,
        y,
        frame,
        texture: 'pipe',
      }),
    );
  }

  _addTown() {
    return this.add.tileSprite(
      0,
      this.height,
      this.width,
      TOWN_HEIGHT,
      'town',
    ).setOrigin(0, 1);
  }

  _addNewRowOfPipes() {
    this.updateScore();
    const pipesAmount = this.height / PIPE_HEIGHT;
    const holeSize = this._calculatePipeHoleDifficulty();
    const hole = getRandomNumber(1, pipesAmount - holeSize - 1);

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < pipesAmount; i++) {
      if (i < hole || i >= hole + holeSize) {
        let frame;
        if (i === hole - 1) {
          frame = 0;
        } else if (i === hole + holeSize) {
          frame = 1;
        } else {
          frame = 2;
        }
        this._addPipe(
          this.width - APP_CONFIG.edgeMargin,
          i * PIPE_HEIGHT,
          frame,
        );
      }
    }

    const delay = Phaser.Math.RND.integerInRange(PIPE_SPAWN_MIN_TIME, PIPE_SPAWN_MAX_TIME)
      - this._calculateGameSpeed() * 2;
    this.time.addEvent({
      delay,
      callback: this._addNewRowOfPipes.bind(this),
    });
  }

  _calculateGameSpeed() {
    return GAME_OPTIONS.birdSpeed + this.score * SPEED_RATE;
  }

  _addTimer() {
    return this.time.addEvent({
      delay: 0,
      callback: this._addNewRowOfPipes.bind(this),
    });
  }

  _addScoreText() {
    return this.add.text(
      this.width - APP_CONFIG.edgeMargin,
      APP_CONFIG.edgeMargin,
      '',
      APP_FONTS.small,
    )
      .setOrigin(1, 0)
      .setDepth(2);
  }

  setScore(score = 0) {
    this.score = score;
    this.scoreText.text = `${this._getUIText().scoreText}: ${this.score}\n${
      this._getUIText().bestText}: ${this.registry.get('highscore')}`;
  }

  updateScore() {
    this.setScore(this.score + 1);
  }

  die() {
    this.bird.die();
    Phaser.Actions.Call(
      this.pipes.getChildren(),
      (pipe) => pipe.body.setVelocityX(0),
      this,
    );
    changeScene('GameOverScene', this, {score: this.score});
  }

  _addClouds() {
    const makeNewCloud = (cloudX = this.width, startTimer = true) => {
      const cloudY = getRandomNumber(0, this.height / 2);
      const cloud = this.clouds.create(cloudX, cloudY, 'clouds', getRandomNumber(0, 21));
      const cloudScale = getRandomNumber(1, 4);

      cloud.alpha = (1 / cloudScale) * 2;
      cloud.setScale(cloudScale);
      this.physics.world.enable(cloud);
      cloud.body.allowGravity = false;
      cloud.body.setGravity(false);
      cloud.body.velocity.x = (-GAME_OPTIONS.birdSpeed / cloudScale) * 0.5;
      cloud.setOrigin(0, 0.5);

      if (startTimer) {
        this.time.addEvent({
          delay: Phaser.Math.RND.integerInRange(CLOUD_SPAWN_MIN_TIME, CLOUD_SPAWN_MAX_TIME),
          callback: makeNewCloud,
          loop: false,
        });
      }
    };

    this.clouds = this.add.group();
    let cloudX = 0;
    while (cloudX < this.width) {
      makeNewCloud(cloudX, false);
      cloudX += getRandomNumber(0, 100);
    }

    this.time.addEvent({
      callback: makeNewCloud,
      loop: false,
    });
  }

  _calculatePipeHoleDifficulty() {
    return Math.round(
      PIPE_HOLE_MIN
      + getRandomNumber(0, PIPE_HOLE_MAX - PIPE_HOLE_MIN)
      * (this.score / (DIFFICULTY_MAX + 1)),
    );
  }
}
