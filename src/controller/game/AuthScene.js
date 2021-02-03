import AuthController from '@controller/AuthController';
import { changeScene } from '@utils/CommonUtils';
import {
  addKeyHandler,
  createSettingsBtn,
  createTitleText,
} from '@utils/ComponentUtils';

const AUTH_FORM_WIDTH_PERCENT = 0.6;

export default class AuthScene extends Phaser.Scene {
  constructor() {
    console.log('AuthScene >>> constructor');
    super({
      key: 'AuthScene',
    });
  }

  init() {
    console.log('AuthScene >>> init');
    this.width = this.sys.canvas.width; // this.cameras.main.width
    this.height = this.sys.canvas.height;
  }

  create() {
    console.log('AuthScene >>> create');
    createSettingsBtn(this, this.onSettingsBtnClick.bind(this));
    createTitleText(this);

    this.authController = new AuthController();
    this.authController.start({
      calcFormWidth: this.calculateAuthFormWidth.bind(this),
      login: this.login.bind(this),
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
    return this.width * AUTH_FORM_WIDTH_PERCENT;
  }

  login(data) {
    changeScene('MenuScene', this, data);
    this.authController.stop();
  }
}
