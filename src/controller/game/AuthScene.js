import {APP_CONFIG, APP_FONTS, COLORS} from '@constants/general.const';
import AuthController from '@controller/AuthController';
import {changeScene} from '@utils/CommonUtils';

const SETTINGS_TEXT = 'Settings';
const EDGE_MARGIN = 10;
const AUTH_FORM_WIDTH_PERCENT = 0.6;

export default class AuthScene extends Phaser.Scene {
  constructor() {
    console.log('AuthScene >>> constructor');
    super({
      key: 'AuthScene'
    });
  }

  init() {
    console.log('AuthScene >>> init');
    this.width = this.sys.canvas.width;// this.cameras.main.width
    this.height = this.sys.canvas.height;
  }

  create() {
    console.log('AuthScene >>> create');
    this.add.text(
      this.width / 2,
      this.height / 4,
      APP_CONFIG.title,
      APP_FONTS.title
    ).setOrigin(0.5, 0);

    this.settingsText = this.add.text(
      EDGE_MARGIN,
      EDGE_MARGIN,
      SETTINGS_TEXT,
      APP_FONTS.base
    ).setOrigin(0, 0);

    this.authController = new AuthController();
    this.authController.start({
      calcFormWidth: this.calculateAuthFormWidth.bind(this),
      login: this.login.bind(this)
    });

    this._addEventListeners();
  }

  _addEventListeners() {
    this.settingsText
      .setInteractive({useHandCursor: true})
      .on('pointerover', function () {
        this.setStyle(APP_FONTS.baseHover);
      })
      .on('pointerout', function () {
        this.setStyle(APP_FONTS.base);
      })
      .on('pointerdown', () => {
        changeScene('SettingsScene', this, {scene: 'AuthScene'});
        this.authController.stop();
      });
  }

  calculateAuthFormWidth() {
    return this.width * AUTH_FORM_WIDTH_PERCENT;
  }

  login(data) {
    changeScene('MenuScene', this, data);
    this.authController.stop();
  }
}
