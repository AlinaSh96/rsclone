import {APP_CONFIG, APP_FONTS, AUTHORS, COLORS, RSS_LINK} from '@constants/general.const';
import {getBestScore} from '@utils/StorageUtils';
import {changeScene} from '@utils/CommonUtils';
import {addKeyHandler, createBtn, createSettingsBtn, createTitleText} from '@utils/ComponentUtils';

const PLAY_TEXT = 'Press Space to play';
const HIGHSCORE_TEXT = 'Highscore: ';
const GUEST_USER_NAME = 'Guest';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    console.log('MenuScene >>> constructor');
    super({
      key: 'MenuScene',
    });
    this.loggedIn = false;
  }

  init(data) {
    console.log('MenuScene >>> init', data);
    this._initUserInfo(data);

    this.width = this.sys.canvas.width;
    this.height = this.sys.canvas.height;
  }

  create() {
    console.log('MenuScene >>> create');
    this.settingsBtn = createSettingsBtn(this, this.onSettingsBtnClick.bind(this));
    this.logoutBtn = this._createLogoutBtn();
    this._createLoginText();
    this._createHighscoreText();
    createTitleText(this);
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
    if (data && data.user) {
      this.loggedIn = true;
    }
    if (this.loggedIn) {
      this.user = data.user;
      this.highscore = data.score || 0;
    } else {
      this.user = GUEST_USER_NAME;
      this.highscore = getBestScore();
    }
  }

  _createLogoutBtn() {
    return createBtn({
      x: this.width - APP_CONFIG.edgeMargin,
      y: APP_CONFIG.edgeMargin + this.settingsBtn.height / 2,
      name: this.loggedIn ? 'logout' : 'login',
      scene: this,
      onClick: this.onLogoutBtnClick.bind(this),
      originX: 1,
      originY: 0.5
    });
  }

  _createLoginText() {
    return this.add.text(
      this.width - APP_CONFIG.edgeMargin * 2 - this.logoutBtn.width,
      APP_CONFIG.edgeMargin + this.settingsBtn.height / 2,
      this.user,
      APP_FONTS.simple
    ).setOrigin(1, 0.5);
  }

  _createHighscoreText() {
    return this.add.text(
      this.width - APP_CONFIG.edgeMargin,
      APP_CONFIG.edgeMargin * 2 + this.logoutBtn.height,
      `${HIGHSCORE_TEXT}${this.highscore}`,
      APP_FONTS.base
    ).setOrigin(1, 0);
  }

  _createPlayText() {
    return this.add.text(
      this.width / 2,
      this.height / 5 * 3,
      PLAY_TEXT,
      APP_FONTS.base
    ).setOrigin(0.5, 0);
  }

  _createRSSImg() {
    return this.add.image(
      APP_CONFIG.edgeMargin,
      this.height - APP_CONFIG.edgeMargin,
      'rss'
    ).setOrigin(0, 1)
      .setScale(0.3)
      .setInteractive({useHandCursor: true})
      .on('pointerup', () => {
        window.open(RSS_LINK, '_blank');
      });
  }

  _createPlayBtn() {
    return createBtn({
      x: this.width - APP_CONFIG.edgeMargin,
      y: this.height - APP_CONFIG.edgeMargin,
      originX: 1,
      originY: 1,
      name: 'play',
      scene: this,
      onClick: this.onPlayBtnClick.bind(this)
    });
  }

  onLogoutBtnClick() {
    changeScene('AuthScene', this);
  }

  onSettingsBtnClick() {
    changeScene('SettingsScene', this, {scene: 'MenuScene'});
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
