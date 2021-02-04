import {APP_CONFIG, COLORS} from '@constants/general.const';
import {changeScene} from '@utils/CommonUtils';
import WebFont from 'webfontloader';
import {
  getMusicSetting, getSoundSetting, setMusicSetting, setSoundSetting,
} from '@utils/StorageUtils';
import {getLangSetting, setLangSetting} from '../../utils/StorageUtils';
import {UI} from '../../constants/ui.const';

const LOADING_BAR = {
  height: 20,
  border: 2,
};

const PROGRESS_BAR = {
  height: 16,
};

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'BootScene',
    });
  }

  init() {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;

    if (getSoundSetting() === null) {
      setSoundSetting(1);
    }
    if (getMusicSetting() === null) {
      setMusicSetting(1);
    }
    if (getLangSetting() === null || !UI[getLangSetting()]) {
      setLangSetting(APP_CONFIG.defaultLang);
    }
    this.registry.set('sound', +getSoundSetting());
    this.registry.set('music', +getMusicSetting());
    this.registry.set('lang', getLangSetting());
  }

  preload() {
    this.cameras.main.setBackgroundColor(COLORS.loadingBckg);
    this._createLoadingBar();

    this.load.on('progress', this._createProgressBar, this);
    this.load.on('complete', this._progressCompleteHandler, this);

    this._loadAssets();
  }

  update() {
    changeScene('AuthScene', this);
  }

  _createProgressBar(v) {
    this.progressBar.clear();
    this.progressBar.fillStyle(COLORS.progressBar, 1);
    this.progressBar.fillRect(
      this.width / 4,
      this.height / 2 - PROGRESS_BAR.height,
      (this.width / 2) * v,
      PROGRESS_BAR.height,
    );
  }

  _createLoadingBar() {
    this.loadingBar = this.add.graphics();
    this.loadingBar.fillStyle(COLORS.loadingBar, 1);
    this.loadingBar.fillRect(
      this.width / 4 - LOADING_BAR.border,
      this.height / 2 - (LOADING_BAR.height - LOADING_BAR.border),
      this.width / 2 + LOADING_BAR.border * 2,
      LOADING_BAR.height,
    );
    this.progressBar = this.add.graphics();
  }

  _progressCompleteHandler() {
    this.progressBar.destroy();
    this.loadingBar.destroy();
  }

  _loadAssets() {
    WebFont.load({google: {families: ['Potta One']}});
    this.load.pack('preload', APP_CONFIG.assetsPackPath, 'preload');
  }
}
