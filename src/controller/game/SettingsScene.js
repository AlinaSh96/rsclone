import {APP_FONTS} from '@constants/general.const';
import {changeScene} from '@utils/CommonUtils';
import {scaleUp, createBackBtn, createBtn, createHeadingText, addKeyHandler, handleMusic} from '@utils/ComponentUtils';
import {setMusicSetting, setSoundSetting} from '@utils/StorageUtils';
import {UI} from '../../constants/ui.const';
import {setLangSetting} from '../../utils/StorageUtils';

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
    createHeadingText(this, this._getUIText().headingText);
    this._createMenuList();

    addKeyHandler(this, this._handleKey.bind(this));
  }

  _getUIText() {
    return UI[this.registry.get('lang')].settings;
  }

  _getUIGeneralText() {
    return UI[this.registry.get('lang')];
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
      case 'KeyL': {
        this.onLangBtnClick();
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
        text: `${this._getUIText().soundText}: ${
          this.registry.get('sound')
            ? this._getUIGeneralText().onText
            : this._getUIGeneralText().offText
        }`,
        onClick: this.onSoundBtnClick.bind(this)
      },
      {
        name: `music${this.registry.get('music') ? 'On' : 'Off'}`,
        text: `${this._getUIText().musicText}: ${
          this.registry.get('music')
            ? this._getUIGeneralText().onText
            : this._getUIGeneralText().offText
        }`,
        onClick: this.onMusicBtnClick.bind(this)
      },
      {
        name: 'language',
        text: `${this._getUIText().languageText}: ${
          this._getUIGeneralText().name
        }`,
        onClick: this.onLangBtnClick.bind(this)
      },
      {
        name: 'authors',
        text: this._getUIText().authorsText,
        onClick: this.onAuthorsBtnClick.bind(this)
      },
      {
        name: 'shortcuts',
        text: this._getUIText().shortcutsText,
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

  _getNextLang() {
    const curLang = this.registry.get('lang');
    const langs = Object.keys(UI);
    const nextIndex = (langs.indexOf(curLang) + 1) % langs.length;
    return langs[nextIndex];
  }

  _handleLangSwitch() {
    this.scene.start('SettingsScene');
  }

  onBackBtnClick() {
    changeScene(this.redirectScene, this);
  }

  onSoundBtnClick() {
    this.registry.set('sound', this.registry.get('sound') ? 0 : 1);
    setSoundSetting(this.registry.get('sound'));
    this.menuList[0].btnText.text = `${this._getUIText().soundText}: ${
      this.registry.get('sound')
        ? this._getUIGeneralText().onText
        : this._getUIGeneralText().offText
    }`;
    this.menuList[0].btn.setTexture(`sound${this.registry.get('sound') ? 'On' : 'Off'}`);

  }

  onMusicBtnClick() {
    this.registry.set('music', this.registry.get('music') ? 0 : 1);
    setMusicSetting(this.registry.get('music'));
    this.menuList[1].btnText.text = `${this._getUIText().musicText}: ${
      this.registry.get('music')
        ? this._getUIGeneralText().onText
        : this._getUIGeneralText().offText
    }`;
    this.menuList[1].btn.setTexture(`music${this.registry.get('music') ? 'On' : 'Off'}`);
    handleMusic(this);
  }

  onLangBtnClick() {
    const nextLang = this._getNextLang();
    this.registry.set('lang', nextLang);
    setLangSetting(nextLang);
    this.menuList[2].btnText.text = `${this._getUIText().languageText}: ${
      this._getUIGeneralText().name
    }`;
    this._handleLangSwitch();
  }

  onAuthorsBtnClick() {
    changeScene('AuthorsScene', this);
  }

  onShortcutsBtnClick() {
    changeScene('ShortcutsScene', this);
  }
}
