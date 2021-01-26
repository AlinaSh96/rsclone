import {createElement} from '@utils/CommonUtils';

export default class AppView {
  render() {
    const gameWrapperEl = createElement('div', 'wrapper');
    const gameEl = createElement('div', 'game');
    gameEl.id = 'game';

    gameWrapperEl.appendChild(gameEl);
    document.body.appendChild(gameWrapperEl);
  }
}
