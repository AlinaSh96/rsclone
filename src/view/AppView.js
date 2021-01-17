import {createElement} from '@utils/CommonUtils';

export default class AppView {
  render() {
    document.body.appendChild(createElement('div', 'game'));

    //todo footer
  }
}
