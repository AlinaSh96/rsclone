import {changeScene} from '@utils/CommonUtils';
import {createBackBtn, createHeadingText, addKeyHandler} from '@utils/ComponentUtils';

const HEADING_TEXT = 'Statistics';

export default class StatisticsScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'StatisticsScene'
    });
  }

  init() {
    this.width = this.sys.canvas.width;
    this.height = this.sys.canvas.height;
  }

  create() {
    createBackBtn(this, this.onBackBtnClick.bind(this));
    createHeadingText(this, HEADING_TEXT);

    addKeyHandler(this, this._handleKey.bind(this));
  }

  _handleKey(e) {
    switch (e.code) {
      case 'KeyT':
      case 'Backspace': {
        this.onBackBtnClick();
        break;
      }
      default:
        break;
    }
  }

  onBackBtnClick() {
    changeScene('MenuScene', this);
  }
}
