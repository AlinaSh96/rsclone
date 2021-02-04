import {createElement} from '@utils/CommonUtils';

export default class AppView {
  constructor() {
    this.container = document.body;
  }

  render() {
    const gameWrapperEl = createElement('div', 'wrapper');
    const gameEl = createElement('div', 'game');
    gameEl.id = 'game';

    gameWrapperEl.appendChild(gameEl);
    this.container.appendChild(gameWrapperEl);
  }
}
