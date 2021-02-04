import {APP_FONTS, AUTHORS, RSS_LINK} from '@constants/general.const';
import {changeScene} from '@utils/CommonUtils';
import {scaleUp, createBackBtn, addScalingAnimation, createHeadingText, addKeyHandler} from '@utils/ComponentUtils';

const HEADING_TEXT = 'Authors';
const MADE_BY_TEXT = 'Made special for';
const TEAM_TITLE_TEXT = 'The team';
const MARGIN_INNER = 30;
const MARGIN_OUTER = 60;
const IMG_SCALE = 0.45;
const IMG_INITIAL_SCALE = 0.4;

export default class AuthorsScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'AuthorsScene'
    });
  }

  init() {
    this.width = this.sys.canvas.width;
    this.height = this.sys.canvas.height;
  }

  create() {
    createBackBtn(this, this.onBackBtnClick.bind(this));
    createHeadingText(this, HEADING_TEXT);

    let offsetY = this.height / 5;
    this.madeByText = this._createMadeByText(offsetY);

    offsetY += this.madeByText.height + MARGIN_INNER;
    this.rssImg = this._createRSSImg(offsetY);

    offsetY += this.rssImg.displayHeight + MARGIN_OUTER * 2;
    this.teamTitleText = this._createTeamTitleText(offsetY);

    offsetY += this.teamTitleText.height + MARGIN_OUTER;
    this.authorList = this._createAuthorsText(offsetY);

    [
      this.madeByText,
      this.teamTitleText,
      ...this.authorList
    ].forEach(obj => scaleUp(this, obj));
    scaleUp(this, this.rssImg, 0.1, 0.4);

    addKeyHandler(this, this._handleKey.bind(this));
  }

  _handleKey(e) {
    switch (e.code) {
      case 'KeyA':
      case 'Backspace': {
        this.onBackBtnClick();
        break;
      }
      default:
        break;
    }
  }

  _createMadeByText(offsetY) {
    return this.add.text(
      this.width / 2,
      offsetY,
      MADE_BY_TEXT,
      APP_FONTS.base
    ).setOrigin(0.5, 0);
  }

  _createRSSImg(offsetY) {
    return this.add.image(
      this.width / 2,
      offsetY,
      'rss'
    ).setOrigin(0.5, 0)
      .setScale(0.4)
      .setInteractive({useHandCursor: true})
      .on('pointerup', () => {
        window.open(RSS_LINK, '_blank');
      })
      .on('pointerover', () =>
        addScalingAnimation(this, this.rssImg, IMG_SCALE)
      )
      .on('pointerout', () =>
        addScalingAnimation(this, this.rssImg, IMG_INITIAL_SCALE)
      );
  }

  _createTeamTitleText(offsetY) {
    return this.add.text(
      this.width / 2,
      offsetY,
      TEAM_TITLE_TEXT,
      APP_FONTS.base
    ).setOrigin(0.5, 0);
  }

  _createAuthorsText(offsetY) {
    return AUTHORS.map(({name, gitHub}) => {
      const author = this.add.text(
        this.width / 2,
        offsetY,
        name,
        APP_FONTS.base
      ).setOrigin(0.5, 0)
        .setInteractive({useHandCursor: true})
        .on('pointerup', () => {
          window.open(gitHub, '_blank');
        })
        .on('pointerover', function () {
          this.setStyle(APP_FONTS.baseHover);
        })
        .on('pointerout', function () {
          this.setStyle(APP_FONTS.base);
        });
      offsetY += author.height + MARGIN_INNER;
      return author;
    });
  }

  onBackBtnClick() {
    changeScene('SettingsScene', this);
  }
}
