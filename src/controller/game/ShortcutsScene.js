import {APP_CONFIG, APP_FONTS} from '@constants/general.const';
import {changeScene} from '@utils/CommonUtils';
import {
  addKeyHandler, createBackBtn, createHeadingText, scaleUp,
} from '@utils/ComponentUtils';
import {UI} from '../../constants/ui.const';

const MARGIN = 10;

export default class ShortcutsScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'ShortcutsScene',
    });
  }

  init() {
    this.width = this.sys.canvas.width;
    this.height = this.sys.canvas.height;
  }

  create() {
    createBackBtn(this, this.onBackBtnClick.bind(this));
    const headingText = createHeadingText(this, this._getUIText().headingText);

    let offsetY = APP_CONFIG.edgeMargin * 2 + headingText.height;
    this._getUIText().shortcutItemsText
      .forEach(({title, shortcuts}) => {
        const text = this.add.text(
          this.width / 2,
          offsetY,
          title,
          APP_FONTS.base,
        ).setOrigin(0.5, 0);
        scaleUp(this, text);
        offsetY += text.height + MARGIN;

        shortcuts.forEach((curShortcut) => {
          const shortcutsText = this.add.text(
            this.width / 2,
            offsetY,
            curShortcut,
            APP_FONTS.small,
          ).setOrigin(0.5, 0);
          scaleUp(this, shortcutsText);
          offsetY += shortcutsText.height + MARGIN;
        });
      });

    addKeyHandler(this, this._handleKey.bind(this));
  }

  _handleKey(e) {
    switch (e.code) {
      case 'KeyK':
      case 'Backspace': {
        this.onBackBtnClick();
        break;
      }
      default:
        break;
    }
  }

  _getUIText() {
    return UI[this.registry.get('lang')].shortcuts;
  }

  onBackBtnClick() {
    changeScene('SettingsScene', this);
  }
}
