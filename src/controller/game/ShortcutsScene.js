import {APP_CONFIG, APP_FONTS} from '@constants/general.const';
import {changeScene} from '@utils/CommonUtils';
import {addKeyHandler, createBackBtn, createHeadingText, scaleUp} from '@utils/ComponentUtils';

const HEADING_TEXT = 'Shortcuts';
const MARGIN = 10;
const SHORTCUTS_TEXT = [
  {
    title: 'Main menu',
    shortcuts: [
      'S - Show/Hide settings',
      'Space - Start game/Enter as guest',
      'X - Logout'
    ]
  },
  {
    title: 'Settings',
    shortcuts: [
      'V - Turn sound on/off',
      'M - Turn music on/off',
      'A - Show/Hide authors',
      'K - Show/Hide shortcuts'
    ]
  },
  {
    title: 'In game',
    shortcuts: [
      'Space - Fly up',
      'P - Pause'
    ]
  },
  {
    title: 'Pause screen',
    shortcuts: [
      'B - Back to main menu',
      'P - Back to game'
    ]
  },
  {
    title: 'Game over screen',
    shortcuts: [
      'B - Back to main menu',
      'R - Restart game'
    ]
  }
];

export default class ShortcutsScene extends Phaser.Scene {
  constructor() {
    console.log('ShortcutsScene >>> constructor');
    super({
      key: 'ShortcutsScene'
    });
  }

  init() {
    console.log('ShortcutsScene >>> init');
    this.width = this.sys.canvas.width;
    this.height = this.sys.canvas.height;
  }

  create() {
    console.log('ShortcutsScene >>> create');
    createBackBtn(this, this.onBackBtnClick.bind(this));
    const headingText = createHeadingText(this, HEADING_TEXT);

    let offsetY = APP_CONFIG.edgeMargin * 2 + headingText.height;
    SHORTCUTS_TEXT
      .forEach(({title, shortcuts}) => {
        const text = this.add.text(
          this.width / 2,
          offsetY,
          title,
          APP_FONTS.base
        ).setOrigin(0.5, 0);
        scaleUp(this, text);
        offsetY += text.height + MARGIN;

        shortcuts.forEach(curShortcut => {
          const shortcutsText = this.add.text(
            this.width / 2,
            offsetY,
            curShortcut,
            APP_FONTS.small
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

  onBackBtnClick() {
    changeScene('SettingsScene', this);
  }
}
