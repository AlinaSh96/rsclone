import {createElement, setElementVariable} from '@utils/CommonUtils';
import AuthAPIService from '@services/AuthAPIService';
import StatisticsAPIService from '@services/StatisticsAPIService';

export default class AuthView {
  constructor() {
    this.container = document.querySelector('.wrapper');
  }

  render(handlers) {
    this.handlers = handlers;
    const authForm = document.querySelector('.auth-block');
    if (authForm) {
      document.querySelector('.auth-block').remove();
    }
    this.formEl = createElement('div', 'auth-block');
    this.formEl.innerHTML = `
<button class="button-link auth-block__guest-login" type="button">${handlers.getUIText().proceedAsGuest}</button>
<div class="login-form">
  <input class="input login-form__login" type="text" placeholder="${handlers.getUIText().loginPlaceholder}" maxlength="15" >
  <input class="input login-form__password" type="password" placeholder="${handlers.getUIText().passwordPlaceholder}" autocomplete="current-password" maxlength="15">
  <input class="login-form__pwd-checkbox" type="checkbox"><span class="login-form__pwd-span">${handlers.getUIText().showPasswordText}</span>
  <div class="login-form__buttons">
      <button class="button login-form__login-btn"">${handlers.getUIText().loginBtnText}</button>
      <button class="button login-form__sign-up-btn" >${handlers.getUIText().signUpBtnText}</button>
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
    this.passwordVisibilityCheckbox = document.querySelector('.login-form__pwd-checkbox');

    this.setFormWidth(handlers.calcFormWidth());
    this._addEventListeners(handlers);
  }

  setFormWidth(width) {
    setElementVariable(this.formEl, '--form-width', `${width}px`);
  }

  handleSignUpClick({login}) {
    return async () => {
      const validationErrors = this._validatePassword(this.loginPassword.value);
      if (validationErrors.length > 0) {
        const validationMsg = `${this.handlers.getUIText().passwordMustContainText}: \n${
          validationErrors.join('\n')
        }`;
        this.errorElement.innerText = validationMsg;
        return;
      }
      this.errorElement.innerText = '';

      const loginResponseData = await AuthAPIService.register(
        this.loginInput.value,
        this.loginPassword.value,
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

  handleLoginClick({login}) {
    return async () => {
      const loginResponseData = await AuthAPIService.login(
        this.loginInput.value,
        this.loginPassword.value,
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
      () => handlers.login(),
    );
    this.passwordVisibilityCheckbox.addEventListener('click', () => this._togglePasswordVisibility());
  }

  _validatePassword(password) {
    const messages = [];

    if (password.length < 6) {
      messages.push(this.handlers.getUIText().minCharsLengthText);
    }
    if (!password.match(/[0-9]/g)) {
      messages.push(this.handlers.getUIText().minOneNumText);
    }
    if (!password.match(/[a-z]/g)) {
      messages.push(this.handlers.getUIText().minOneLowerCaseText);
    }
    if (!password.match(/[A-Z]/g)) {
      messages.push(this.handlers.getUIText().minOneUpperCaseText);
    }
    return messages;
  }

  destroy() {
    this.formEl.remove();
  }
}
