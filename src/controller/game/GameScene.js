import Phaser from 'phaser';
import {APP_CONFIG, APP_FONTS} from '@constants/general.const';
import {addKeyHandler} from '@utils/ComponentUtils';
import {Pipe} from '@model/Pipe';
import {changeScene, getRandomNumber} from '@utils/CommonUtils';
import {Bird} from '@model/Bird';
import {UI} from '../../constants/ui.const';

const PIPE_DELAY = 2000;
const BIRD_START_POSITION = {
  x: 50,
  y: 100
};

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

    this.bird = this._addBird();
    this.pipes = this.add.group({});
    this._addNewRowOfPipes();
    this._addTimer();

    addKeyHandler(this, this._handleKey.bind(this));
  }

  update() {
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
      this
    );
  }

  _getUIText() {
    return UI[this.registry.get('lang')].game;
  }

  _addBird() {
    return new Bird({
      scene: this,
      x: BIRD_START_POSITION.x,
      y: BIRD_START_POSITION.y,
      texture: 'bird'
    });
  }

  _addPipe(x, y, frame) {
    this.pipes.add(
      new Pipe({
        scene: this,
        x: x,
        y: y,
        frame: frame,
        texture: 'pipe'
      })
    );
  }

  _addNewRowOfPipes() {
    const pipeHeight = 60;
    const pipesAmount = this.height / pipeHeight;
    const holeSize = 3;

    let hole = getRandomNumber(1, pipesAmount - holeSize - 1);

    for (let i = 0; i < pipesAmount; i++) {
      if (i >= hole && i < hole + holeSize) {
        continue;
      }
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
        i * pipeHeight,
        frame
      );
    }
  }

  _addTimer() {
    return this.time.addEvent({
      delay: PIPE_DELAY,
      callback: () => {
        this._addNewRowOfPipes();
        this.updateScore();
      },
      callbackScope: this,
      loop: true
    });
  }

  _handleKey(e) {
    switch (e.code) {
      case 'KeyP': {
        this.onPauseBtnClick();
        break;
      }
      default:
        break;
    }
  }

  _addScoreText() {
    return this.add.text(
      this.width - APP_CONFIG.edgeMargin,
      APP_CONFIG.edgeMargin,
      '',
      APP_FONTS.small
    )
      .setOrigin(1, 0)
      .setDepth(2);
  }

  onPauseBtnClick() {
    // not implemented
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
      pipe => pipe.body.setVelocityX(0),
      this
    );
    changeScene('GameOverScene', this, {score: this.score});
  }
}
