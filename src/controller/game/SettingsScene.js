import {APP_CONFIG, APP_FONTS, COLORS} from '@constants/general.const';
import {getBestScore} from '@utils/StorageUtils';
import {changeScene, createElement} from '@utils/CommonUtils';

const BACK_TEXT = 'Back';
const DEFAULT_REDIRECT_SCENE = 'AuthScene';

export default class SettingsScene extends Phaser.Scene {
  constructor() {
    console.log('SettingsScene >>> constructor');
    super({
      key: 'SettingsScene'
    });
  }

  init(data) {
    console.log('SettingsScene >>> init');
    this.width = this.sys.canvas.width;
    this.height = this.sys.canvas.height;
    this.redirectScene = data.scene || DEFAULT_REDIRECT_SCENE;
  }

  create() {
    console.log('SettingsScene >>> create');
    this.backBtn = this.add.image(
      APP_CONFIG.edgeMargin * 2,
      APP_CONFIG.edgeMargin * 2,
      'back'
    ).setOrigin(0, 0);

    this.add.text(
      this.sys.canvas.width / 2,
      this.sys.canvas.height / 4,
      'Not implemented!',
      APP_FONTS.title
    ).setOrigin(0.5, 0);

    this._addEventListeners();
  }

  _addEventListeners() {
    this.backBtn
      .setInteractive({useHandCursor: true})
      .on('pointerdown', () => {
        changeScene(this.redirectScene, this);
      })
      .on('pointerover', function () {
        this.setFrame(1);
      })
      .on('pointerout', function () {
        this.setFrame(0);
      });
  }
}
