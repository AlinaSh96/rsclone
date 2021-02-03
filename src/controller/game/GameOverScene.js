import { APP_CONFIG, APP_FONTS } from '@constants/general.const';
import { setBestScore } from '@utils/StorageUtils';
import { changeScene } from '@utils/CommonUtils';
import {
  addKeyHandler,
  createBtn,
  jumpFromLeft,
  jumpFromRight,
  jumpFromUp,
} from '@utils/ComponentUtils';
import StatisticsAPIService from '@services/StatisticsAPIService';

const GAME_OVER_TEXT = 'GAME OVER';
const SCORE_TEXT = 'Score';
const HIGHSCORE_TEXT = 'Highscore';
const MARGIN = 100;

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameOverScene',
    });
  }

  async init({ score }) {
    this.width = this.sys.canvas.width;
    this.height = this.sys.canvas.height;

    this.score = score;
    this.initialHighscore = this.registry.get('highscore');
    if (this.registry.get('loggedIn')) {
      await StatisticsAPIService.postUserStatistic(this.score);
    }
    setBestScore(Math.max(this.score, this.initialHighscore));
  }

  create() {
    let offsetY = this.height / 10;
    this.gameOverText = this._createGameOverText(offsetY);

    offsetY += this.gameOverText.height + MARGIN;
    this.scoreText = this._createScoreText(offsetY);

    offsetY = this.height / 2;
    this._createGoToMenuBtn(offsetY);
    this._createRestartBtn(offsetY);

    addKeyHandler(this, this._handleKey.bind(this));
  }

  _handleKey(e) {
    switch (e.code) {
      case 'KeyB': {
        this.onMainMenuBtnClick();
        break;
      }
      case 'KeyR': {
        this.onRestartBtnClick();
        break;
      }
      default:
        break;
    }
  }

  _createGameOverText(offsetY) {
    const gameOverText = this.add
      .text(this.width / 2, offsetY, GAME_OVER_TEXT, APP_FONTS.title)
      .setOrigin(0.5, 0);
    jumpFromUp(this, gameOverText);
    return gameOverText;
  }

  _createScoreText(offsetY) {
    const scoreText = this.add
      .text(
        this.width / 2,
        offsetY,
        `${SCORE_TEXT}: ${this.score}\n${HIGHSCORE_TEXT}: ${this.initialHighscore}`,
        APP_FONTS.base
      )
      .setOrigin(0.5, 0);
    jumpFromUp(this, scoreText);
    return scoreText;
  }

  _createGoToMenuBtn(offsetY) {
    const mainMenuBtn = createBtn({
      x: this.width / 2 - APP_CONFIG.edgeMargin * 2,
      y: offsetY,
      originX: 1,
      originY: 0,
      name: 'home',
      scene: this,
      onClick: this.onMainMenuBtnClick.bind(this),
    });
    jumpFromLeft(this, mainMenuBtn);
    return mainMenuBtn;
  }

  _createRestartBtn(offsetY) {
    const mainMenuBtn = createBtn({
      x: this.width / 2 + APP_CONFIG.edgeMargin * 2,
      y: offsetY,
      originX: 0,
      originY: 0,
      name: 'restart',
      scene: this,
      onClick: this.onRestartBtnClick.bind(this),
    });
    jumpFromRight(this, mainMenuBtn);
    return mainMenuBtn;
  }

  onMainMenuBtnClick() {
    changeScene('MenuScene', this);
  }

  onRestartBtnClick() {
    changeScene('GameScene', this);
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }
}
