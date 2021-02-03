import {APP_FONTS} from '@constants/general.const';
import {changeScene} from '@utils/CommonUtils';
import {scaleUp, createBackBtn, createBtn, createHeadingText, addKeyHandler} from '@utils/ComponentUtils';
import {getMusicSetting, getSoundSetting, setMusicSetting, setSoundSetting} from '@utils/StorageUtils';

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

    if (getSoundSetting() === null) {
      setSoundSetting(1);
    }
    if (getMusicSetting() === null) {
      setMusicSetting(1);
    }
    this.registry.set('sound', +getSoundSetting());
    this.registry.set('music', +getMusicSetting());
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
    this.menuList = [
      {
        name: `sound${this.registry.get('sound') ? 'On' : 'Off'}`,
        text: `Sound: ${this.registry.get('sound') ? 'ON' : 'OFF'}`,
        onClick: this.onSoundBtnClick.bind(this)
      },
      {
        name: `music${this.registry.get('music') ? 'On' : 'Off'}`,
        text: `Music: ${this.registry.get('music') ? 'ON' : 'OFF'}`,
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
      const btnText = this._addSettingsText({
        x: offsetLeft + MARGIN_LEFT,
        y: offsetTop,
        text,
        onClick
      });
      offsetTop += btn.height + MARGIN_BOTTOM;
      return {
        btn,
        btnText
      };
    });

    this.menuList.forEach(({btn, btnText}) => {
      scaleUp(this, btn);
      scaleUp(this, btnText);
    });
  }

  _addSettingsText({x, y, text, onClick}) {
    return this.add.text(x, y, text, APP_FONTS.base)
      .setOrigin(0, 0.5)
      .setInteractive({useHandCursor: true})
      .on('pointerup', onClick)
      .on('pointerover', function () {
        this.setStyle(APP_FONTS.baseHover);
      })
      .on('pointerout', function () {
        this.setStyle(APP_FONTS.base);
      });
  }

  onBackBtnClick() {
    changeScene(this.redirectScene, this);
  }

  onSoundBtnClick() {
    this.registry.set('sound', this.registry.get('sound') ? 0 : 1);
    setSoundSetting(this.registry.get('sound'));
    this.menuList[0].btnText.text = `Sound: ${this.registry.get('sound') ? 'ON' : 'OFF'}`;
    this.menuList[0].btn.setTexture(`sound${this.registry.get('sound') ? 'On' : 'Off'}`);

  }

  onMusicBtnClick() {
    this.registry.set('music', this.registry.get('music') ? 0 : 1);
    setMusicSetting(this.registry.get('music'));
    this.menuList[1].btnText.text = `Music: ${this.registry.get('music') ? 'ON' : 'OFF'}`;
    this.menuList[1].btn.setTexture(`music${this.registry.get('music') ? 'On' : 'Off'}`);
  }

  onAuthorsBtnClick() {
    changeScene('AuthorsScene', this);
  }

  onShortcutsBtnClick() {
    changeScene('ShortcutsScene', this);
  }
}
