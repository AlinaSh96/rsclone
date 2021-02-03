import { APP_CONFIG, APP_FONTS, COLORS } from '@constants/general.const';
import { getBestScore } from '@utils/StorageUtils';
import { changeScene, createElement } from '@utils/CommonUtils';

const PLAY_TEXT = 'Press Space to play';
const HIGHSCORE_TEXT = 'Highscore: ';
const SETTINGS_TEXT = 'Settings';
const AUTHORS_TEXT = 'Authors:\nAlina\nAnastasia\nYevgeniya';
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
    if (data && data.user) {
      this.loggedIn = true;
    }
    this.user = data.user || GUEST_USER_NAME;

    this.startKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.startKey.isDown = false;

    this.width = this.sys.canvas.width;
    this.height = this.sys.canvas.height;
  }

  create() {
    console.log('MenuScene >>> create');
    this.add
      .text(this.width / 2, this.height / 4, APP_CONFIG.title, APP_FONTS.title)
      .setOrigin(0.5, 0);

    this.add
      .text(this.width / 2, (this.height / 4) * 3, PLAY_TEXT, APP_FONTS.base)
      .setOrigin(0.5, 0);

    const highScore = getBestScore();
    this.add
      .text(
        this.width - APP_CONFIG.edgeMargin,
        APP_CONFIG.edgeMargin,
        `${HIGHSCORE_TEXT}${highScore}`,
        APP_FONTS.base
      )
      .setOrigin(1, 0);

    this.settingsText = this.add
      .text(
        APP_CONFIG.edgeMargin,
        APP_CONFIG.edgeMargin,
        SETTINGS_TEXT,
        APP_FONTS.base
      )
      .setOrigin(0, 0);

    this.add
      .text(
        APP_CONFIG.edgeMargin,
        this.height - APP_CONFIG.edgeMargin,
        AUTHORS_TEXT,
        APP_FONTS.simple
      )
      .setOrigin(0, 1);

    this._addEventListeners();
  }

  _addEventListeners() {
    this.settingsText
      .setInteractive({ useHandCursor: true })
      .on('pointerover', function () {
        this.setStyle(APP_FONTS.baseHover);
      })
      .on('pointerout', function () {
        this.setStyle(APP_FONTS.base);
      })
      .on('pointerdown', () => {
        changeScene('SettingsScene', this, { scene: 'MenuScene' });
      });
  }

  // update() {
  //   console.log('MenuScene >>> update');
  //   if (this.startKey.isDown) {
  //     this.scene.start('GameScene');
  //   }
  // }
}
