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
    this.backText = this.add.text(//todo replace with btn
      APP_CONFIG.edgeMargin,
      APP_CONFIG.edgeMargin,
      BACK_TEXT,
      APP_FONTS.base
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
    this.backText
      .setInteractive({useHandCursor: true})
      .on('pointerover', function () {
        this.setStyle(APP_FONTS.baseHover);
      })
      .on('pointerout', function () {
        this.setStyle(APP_FONTS.base);
      })
      .on('pointerdown', () => {
        changeScene(this.redirectScene, this);
      });
  }
}
