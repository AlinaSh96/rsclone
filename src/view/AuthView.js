import { createElement, setElementVariable } from '@utils/CommonUtils';
import AuthAPIService from '@services/AuthAPIService';
import StatisticsAPIService from '@services/StatisticsAPIService';

export default class AuthView {
  constructor() {
    this.container = document.querySelector('.wrapper');
  }

  render(handlers) {
    const authForm = document.querySelector('.auth-block');
    if (authForm) {
      document.querySelector('.auth-block').remove();
    }
    this.formEl = createElement('div', 'auth-block');
    this.formEl.innerHTML = `
<button class="button-link auth-block__guest-login" type="button">Proceed as guest</button>
<div class="login-form">
  <input class="input login-form__login" type="text" placeholder="Login" maxlength="15" >
  <input class="input login-form__password" type="password" placeholder="Password" autocomplete="current-password" maxlength="15">
  <input class="login-form__pwd-checkbox" type="checkbox"><span class="login-form__pwd-span">Show Password</span>
  <div class="login-form__buttons">
      <button class="button login-form__login-btn"">Login</button>
      <button class="button login-form__sign-up-btn" >Sign up</button>
  </div>
  <div class="login-form__error"></div>
<div>`;
    this.container.appendChild(this.formEl);

    this.loginInput = document.querySelector('.login-form__login');
    this.loginPassword = document.querySelector('.login-form__password');
    this.loginBtn = document.querySelector('.login-form__login-btn');
    this.signUpBtn = document.querySelector('.login-form__sign-up-btn');
    this.guestLoginBtn = document.querySelector('.auth-block__guest-login');
    this.errorElement = document.querySelector('.login-form__error');
    this.passwordVisibilityCheckbox = document.querySelector(
      '.login-form__pwd-checkbox'
    );

    this.setFormWidth(handlers.calcFormWidth());
    this._addEventListeners(handlers);
  }

  setFormWidth(width) {
    setElementVariable(this.formEl, '--form-width', `${width}px`);
  }

  handleSignUpClick({ login }) {
    return async (e) => {
      const validationErrors = this._validatePassword(this.loginPassword.value);
      if (validationErrors.length > 0) {
        const validationMsg =
          'Password must contain the following: \n' +
          validationErrors.join('\n');
        this.errorElement.innerText = validationMsg;
        return;
      }
      this.errorElement.innerText = '';

      let loginResponseData = await AuthAPIService.register(
        this.loginInput.value,
        this.loginPassword.value
      );

      if (loginResponseData.status === 201) {
        const score = [
          ...(await StatisticsAPIService.getUserStatistics()).data,
        ].sort((a, b) => b.score - a.score)[0];

        login({
          user: this.loginInput.value,
          score: score ? score.score : 0,
        });
      } else {
        this.errorElement.innerText = loginResponseData.data.message;
      }
    };
  }

  handleLoginClick({ login }) {
    return async (e) => {
      let loginResponseData = await AuthAPIService.login(
        this.loginInput.value,
        this.loginPassword.value
      );

      if (loginResponseData.status === 200) {
        const score = [
          ...(await StatisticsAPIService.getUserStatistics()).data,
        ].sort((a, b) => b.score - a.score)[0];

        login({
          user: this.loginInput.value,
          score: score ? score.score : 0,
        });
      } else {
        this.errorElement.innerText = loginResponseData.data.reason;
      }
    };
  }

  handleGuestLoginClick({ login }) {
    return (e) => login();
  }

  _togglePasswordVisibility() {
    if (this.loginPassword.type === 'password') {
      this.loginPassword.type = 'text';
    } else {
      this.loginPassword.type = 'password';
    }
  }

  _addEventListeners(handlers) {
    this.loginBtn.addEventListener('click', this.handleLoginClick(handlers));
    this.signUpBtn.addEventListener('click', this.handleSignUpClick(handlers));
    this.guestLoginBtn.addEventListener(
      'click',
      this.handleGuestLoginClick(handlers)
    );
    this.passwordVisibilityCheckbox.addEventListener('click', () =>
      this._togglePasswordVisibility()
    );
  }

  _validatePassword(password) {
    let messages = [];

    if (password.length < 6) {
      messages.push('- a minimum of 6 characters in length');
    }
    if (!password.match(/[0-9]/g)) {
      messages.push('- a minimum of 1 numeric character [0-9]');
    }
    if (!password.match(/[a-z]/g)) {
      messages.push('- a minimum of 1 lower case letter [a-z]');
    }
    if (!password.match(/[A-Z]/g)) {
      messages.push('- a minimum of 1 upper case letter [A-Z]');
    }
    return messages;
  }

  destroy() {
    this.formEl.remove();
  }
}
