import {changeScene} from '@utils/CommonUtils';
import {createBackBtn, createHeadingText, addKeyHandler} from '@utils/ComponentUtils';
import StatisticsView from '@view/StatisticsView'
import {UI} from '../../constants/ui.const';

const STATISTICS_FORM_WIDTH_PERCENT = 0.9;

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
    createHeadingText(this, this.getUIText().headingText);

    this.statisticsView = new StatisticsView();
    this.statisticsView.render({
      calcFormWidth: this.calculateStatisticsFormWidth.bind(this),
      getUIText: this.getUIText.bind(this)
    });

    addKeyHandler(this, this._handleKey.bind(this));
  }

  calculateStatisticsFormWidth() {
    return this.sys.canvas.getBoundingClientRect().width * STATISTICS_FORM_WIDTH_PERCENT;
  }

  _handleKey(e) {
    switch (e.code) {
      case 'KeyT':
      case 'Backspace': {
        this.statisticsView.destroy();
        this.onBackBtnClick();
        break;
      }
      default:
        break;
    }
  }

  getUIText() {
    return UI[this.registry.get('lang')].statistics;
  }

  onBackBtnClick() {
    this.statisticsView.destroy();
    changeScene('MenuScene', this);
  }
}
