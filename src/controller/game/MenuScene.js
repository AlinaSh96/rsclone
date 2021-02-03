import {APP_CONFIG, APP_FONTS, RSS_LINK} from '@constants/general.const';
import {getBestScore} from '@utils/StorageUtils';
import {changeScene} from '@utils/CommonUtils';
import {
  addJumpingAnimation,
  addKeyHandler,
  createBtn,
  createSettingsBtn,
  createTitleText, jumpFromLeft, jumpFromRight,
  jumpFromUp,
  scaleUp
} from '@utils/ComponentUtils';

const PLAY_TEXT = 'Press Space to play';
const HIGHSCORE_TEXT = 'Highscore: ';
const GUEST_USER_NAME = 'Guest';
const BIRD_ANIMATION_ANGLE = 14;
const BIRD_ANIMATION_OFFSET = 50;
const MARGIN = 30;

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'MenuScene'
    });
  }

  init(data) {
    this._initUserInfo(data);

    this.width = this.sys.canvas.width;
    this.height = this.sys.canvas.height;
  }

  create() {
    this.settingsBtn = createSettingsBtn(this, this.onSettingsBtnClick.bind(this));
    const statisticsBtn = createBtn({
      x: MARGIN + this.settingsBtn.width,
      y: APP_CONFIG.edgeMargin,
      name: 'statistics',
      scene: this,
      onClick: this.onStatisticsBtnClick.bind(this)
    });
    jumpFromUp(this, statisticsBtn);
    this.logoutBtn = this._createLogoutBtn();
    this._createLoginText();
    this._createHighscoreText();
    createTitleText(this);
    this._createBirdImg();
    this._createPlayText();
    this.rssImg = this._createRSSImg();
    this._createPlayBtn();

    addKeyHandler(this, this._handleKey.bind(this));
  }

  _handleKey(e) {
    switch (e.code) {
      case 'KeyS': {
        this.onSettingsBtnClick();
        break;
      }
      case 'KeyT': {
        this.onStatisticsBtnClick();
        break;
      }
      case 'KeyX': {
        this.onLogoutBtnClick();
        break;
      }
      case 'Space': {
        this.onPlayBtnClick();
        break;
      }
      default:
        break;
    }
  }

  _initUserInfo(data) {
    if (this.registry.get('loggedIn') && this.registry.get('user')) {
      return;
    }
    this.registry.set('loggedIn', !!(data && data.user));
    if (this.registry.get('loggedIn')) {
      this.registry.set('user', data.user);
      this.registry.set('highscore', data.score || 0);
    } else {
      this.registry.set('user', GUEST_USER_NAME);
      this.registry.set('highscore', getBestScore());
    }
  }

  _createLogoutBtn() {
    const x = this.width - APP_CONFIG.edgeMargin;
    const y = APP_CONFIG.edgeMargin + this.settingsBtn.height / 2;
    const logoutBtn = createBtn({
      x,
      y,
      name: this.registry.get('loggedIn') ? 'logout' : 'login',
      scene: this,
      onClick: this.onLogoutBtnClick.bind(this),
      originX: 1,
      originY: 0.5
    });
    jumpFromUp(this, logoutBtn);
    return logoutBtn;
  }

  _createLoginText() {
    const x = this.width - APP_CONFIG.edgeMargin * 2 - this.logoutBtn.width;
    const y = APP_CONFIG.edgeMargin + this.settingsBtn.height / 2;
    const loginText = this.add.text(
      x,
      y,
      this.registry.get('user'),
      APP_FONTS.simple
    ).setOrigin(1, 0.5);
    jumpFromUp(this, loginText);
    return loginText;
  }

  _createHighscoreText() {
    const scoreText = this.add.text(
      this.width - APP_CONFIG.edgeMargin,
      APP_CONFIG.edgeMargin * 2 + this.logoutBtn.height,
      `${HIGHSCORE_TEXT}${this.registry.get('highscore')}`,
      APP_FONTS.base
    ).setOrigin(1, 0);
    scaleUp(this, scoreText);
  }

  _createBirdImg() {
    const x = this.width / 2;
    const y = this.height / 2;
    const birdImg = this.add.image(x, y, 'bird')
      .setOrigin(0.5)
      .setScale(3);

    this.tweens.add({
      targets: birdImg,
      angle: birdImg.angle - (BIRD_ANIMATION_ANGLE / 2),
      duration: APP_CONFIG.animationDuration,
      ease: 'Sine.easeInOut'
    });
    this.tweens.add({
      targets: birdImg,
      angle: birdImg.angle + BIRD_ANIMATION_ANGLE,
      y: birdImg.y + BIRD_ANIMATION_OFFSET,
      duration: APP_CONFIG.animationDuration * 2,
      ease: 'Sine.easeInOut',
      yoyo: 1,
      loop: -1,
      delay: APP_CONFIG.animationDuration
    });
    return birdImg;
  }

  _createPlayText() {
    const playText = this.add.text(
      this.width / 2,
      this.height / 5 * 3,
      PLAY_TEXT,
      APP_FONTS.base
    ).setOrigin(0.5, 0);
    scaleUp(this, playText);
    addJumpingAnimation(this, playText);
    return playText;
  }

  _createRSSImg() {
    const rssImg = this.add.image(
      APP_CONFIG.edgeMargin,
      this.height - APP_CONFIG.edgeMargin,
      'rss'
    ).setOrigin(0, 1)
      .setScale(0.3)
      .setInteractive({useHandCursor: true})
      .on('pointerup', () => {
        window.open(RSS_LINK, '_blank');
      });
    jumpFromLeft(this, rssImg);
    return rssImg;
  }

  _createPlayBtn() {
    const playBtn = createBtn({
      x: this.width - APP_CONFIG.edgeMargin,
      y: this.height - APP_CONFIG.edgeMargin,
      originX: 1,
      originY: 1,
      name: 'play',
      scene: this,
      onClick: this.onPlayBtnClick.bind(this)
    });
    jumpFromRight(this, playBtn);
    return playBtn;
  }

  onLogoutBtnClick() {
    this.registry.set('loggedIn', false);
    changeScene('AuthScene', this);
  }

  onSettingsBtnClick() {
    changeScene('SettingsScene', this, {scene: 'MenuScene'});
  }

  onStatisticsBtnClick() {
    changeScene('StatisticsScene', this);
  }

  onPlayBtnClick() {
    changeScene('GameScene', this);
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }
}
