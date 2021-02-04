import AuthController from '@controller/AuthController';
import { changeScene } from '@utils/CommonUtils';
import {
  addKeyHandler,
  createSettingsBtn,
  createTitleText,
  handleMusic
} from '@utils/ComponentUtils';
import { setBestScore } from '@utils/StorageUtils';
import {UI} from '../../constants/ui.const';

const AUTH_FORM_WIDTH_PERCENT = 0.8;

export default class AuthScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'AuthScene',
    });
  }

  init() {
    this.width = this.sys.canvas.width;
    this.height = this.sys.canvas.height;
  }

  create() {
    handleMusic(this);

    createSettingsBtn(this, this.onSettingsBtnClick.bind(this));
    createTitleText(this);

    this.authController = new AuthController();
    this.authController.start({
      calcFormWidth: this.calculateAuthFormWidth.bind(this),
      login: this.login.bind(this),
      getUIText: this.getUIText.bind(this)
    });

    addKeyHandler(this, this._handleKey.bind(this));
  }

  _handleKey(e) {
    switch (e.code) {
      case 'KeyS': {
        if (e.target.className.includes('login-form')) break;
        this.onSettingsBtnClick();
        break;
      }
      case 'Space': {
        this.login();
        break;
      }
      default:
        break;
    }
  }

  getUIText() {
    return UI[this.registry.get('lang')].auth;
  }

  onSettingsBtnClick() {
    changeScene('SettingsScene', this, { scene: 'AuthScene' });
    this.authController.stop();
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  calculateAuthFormWidth() {
    return this.sys.canvas.getBoundingClientRect().width * AUTH_FORM_WIDTH_PERCENT;
  }

  login(data = {}) {
    setBestScore(data.score || 0);
    changeScene('MenuScene', this, data);
    this.authController.stop();
  }
}
