import {createElement, setElementVariable} from '@utils/CommonUtils';

export default class AuthView {
  constructor() {
    this.container = document.querySelector('.wrapper');
  }

  render(handlers) {
    const authForm = document.querySelector('.auth-form');
    if (authForm) {
      document.querySelector('.auth-form').remove();
    }
    this.formEl = createElement('div', 'auth-form');
    this.formEl.innerHTML = `
<input class="input auth-form__login" type="text" placeholder="Login" maxlength="15">
<input class="input auth-form__password" type="password" placeholder="Password" maxlength="15">
<div class="auth-form__buttons">
    <button class="button auth-form__login-btn" type="button">Login</button>
    <button class="button auth-form__sign-up-btn" type="button">Sign up</button>
</div>
<button class="button-link auth-form__guest-login" type="button">Proceed as guest</button>`;
    this.container.appendChild(this.formEl);

    this.loginBtn = document.querySelector('.auth-form__login-btn');
    this.signUpBtn = document.querySelector('.auth-form__sign-up-btn');
    this.guestLoginBtn = document.querySelector('.auth-form__guest-login');

    this.setFormWidth(handlers.calcFormWidth());
    this._addEventListeners(handlers);
  }

  setFormWidth(width) {
    console.log('Auth form width to set >>>', width);
    setElementVariable(this.formEl, '--form-width', `${width}px`);
  }

  handleSignUpClick(e) {
    console.log('handleSignUpClick');
    //todo implement handler
  }

  handleLoginClick({login}) {
    return (e) => {
      //todo add validation
      login({
        user: 'John123',
        score: 666
      });
    };
  }

  handleGuestLoginClick({login}) {
    return (e) => login();
  }

  _addEventListeners(handlers) {
    this.loginBtn.addEventListener('click', this.handleLoginClick(handlers));
    this.signUpBtn.addEventListener('click', this.handleSignUpClick.bind(this));
    this.guestLoginBtn.addEventListener('click', this.handleGuestLoginClick(handlers));
  }

  destroy() {
    this.formEl.remove();
  }
}
