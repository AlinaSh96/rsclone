import {APP_FONTS} from '@constants/general.const';
import {changeScene} from '@utils/CommonUtils';
import {scaleUp, createBackBtn, createBtn, createHeadingText, addKeyHandler} from '@utils/ComponentUtils';

const HEADING_TEXT = 'Settings';
const DEFAULT_REDIRECT_SCENE = 'AuthScene';
const MARGIN_LEFT = 60;
const MARGIN_BOTTOM = 50;

export default class SettingsScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'SettingsScene'
    });
  }

  init(data) {
    this.width = this.sys.canvas.width;
    this.height = this.sys.canvas.height;
    this.redirectScene = data.scene || DEFAULT_REDIRECT_SCENE;
  }

  create() {
    createBackBtn(this, this.onBackBtnClick.bind(this));
    createHeadingText(this, HEADING_TEXT);
    this._createMenuList();

    addKeyHandler(this, this._handleKey.bind(this));
  }

  _handleKey(e) {
    switch (e.code) {
      case 'KeyA': {
        this.onAuthorsBtnClick();
        break;
      }
      case 'KeyS':
      case 'Backspace': {
        this.onBackBtnClick();
        break;
      }
      case 'KeyK': {
        this.onShortcutsBtnClick();
        break;
      }
      case 'KeyM': {
        this.onMusicBtnClick();
        break;
      }
      case 'KeyV': {
        this.onSoundBtnClick();
        break;
      }
      default:
        break;
    }
  }

  _createMenuList() {
    const offsetLeft = this.width / 4;
    let offsetTop = this.height / 4;
    const menuList = [
      {
        name: 'soundOn',//todo should be dependant on app value
        text: 'Sound: ON',//todo should be dependant on app value
        onClick: this.onSoundBtnClick.bind(this)
      },
      {
        name: 'musicOn',//todo should be dependant on app value
        text: 'Music: ON',//todo should be dependant on app value
        onClick: this.onMusicBtnClick.bind(this)
      },
      {
        name: 'authors',
        text: 'Authors',
        onClick: this.onAuthorsBtnClick.bind(this)
      },
      {
        name: 'shortcuts',
        text: 'Shortcuts',
        onClick: this.onShortcutsBtnClick.bind(this)
      }
    ].map(({name, onClick, text}) => {
      const btn = createBtn({
        x: offsetLeft,
        y: offsetTop,
        name,
        scene: this,
        onClick,
        originY: 0.5,
        originX: 0.5
      });
      const btnText = this.add.text(
        offsetLeft + MARGIN_LEFT,
        offsetTop,
        text,
        APP_FONTS.base
      ).setOrigin(0, 0.5)
        .setInteractive({useHandCursor: true})
        .on('pointerup', onClick)
        .on('pointerover', function () {
          this.setStyle(APP_FONTS.baseHover);
        })
        .on('pointerout', function () {
          this.setStyle(APP_FONTS.base);
        });
      offsetTop += btn.height + MARGIN_BOTTOM;
      return {
        btn,
        btnText
      };
    });

    menuList.forEach(({btn, btnText}) => {
      scaleUp(this, btn);
      scaleUp(this, btnText);
    });
  }

  onBackBtnClick() {
    changeScene(this.redirectScene, this);
  }

  onSoundBtnClick() {

  }

  onMusicBtnClick() {

  }

  onAuthorsBtnClick() {
    changeScene('AuthorsScene', this);
  }

  onShortcutsBtnClick() {
    changeScene('ShortcutsScene', this);
  }
}
