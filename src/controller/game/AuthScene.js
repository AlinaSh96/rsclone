import {APP_CONFIG, APP_FONTS} from '@constants/general.const';
import AuthController from '@controller/AuthController';
import {changeScene} from '@utils/CommonUtils';

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
    this.titleText = this.add.text(
      this.width / 2,
      this.height / 4,
      APP_CONFIG.title,
      APP_FONTS.title
    ).setOrigin(0.5, 0);

    this.settingsBtn = this.add.image(
      APP_CONFIG.edgeMargin,
      APP_CONFIG.edgeMargin,
      'settings'
    ).setOrigin(0, 0);

    this.authController = new AuthController();
    this.authController.start({
      calcFormWidth: this.calculateAuthFormWidth.bind(this),
      login: this.login.bind(this)
    });

    this._addEventListeners();
  }

  _addEventListeners() {
    this.settingsBtn
      .setInteractive({useHandCursor: true})
      .on('pointerdown', () => {
        changeScene('SettingsScene', this, {scene: 'AuthScene'});
        this.authController.stop();
      })
      .on('pointerover', function () {
        this.setFrame(1);
      })
      .on('pointerout', function () {
        this.setFrame(0);
      });
    this.titleText
      .setInteractive()
      .on('pointerover', function () {
        this.setStyle(APP_FONTS.baseHover);
      })
      .on('pointerout', function () {
        this.setStyle(APP_FONTS.title);
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
