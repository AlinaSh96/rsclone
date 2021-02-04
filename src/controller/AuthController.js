import AuthView from '@view/AuthView';

export default class AuthController {
  start(handlers) {
    this.authView = new AuthView();
    this.authView.render(handlers);
  }

  stop() {
    this.authView.destroy();
  }
}
