import '@styles/styles.scss';
import GameController from '@controller/GameController';
import AppView from '@view/AppView';

export default class App {
  constructor() {
    this.appView = new AppView();
    this.gameController = new GameController();
  }

  start() {
    this.appView.render();
    this.gameController.start();
  }
}
