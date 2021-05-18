export class FormValidator {

  constructor(options) {
    this._validationOptions = options.validationOptions;
    this._form = document.querySelector(options.formSelector);
    this._inputs = Array.from(this._form.querySelectorAll(this._validationOptions.inputSelector));
    this._submitButton = this._form.querySelector(this._validationOptions.submitButtonSelector);
  }

  enableValidation() {
    this._inputs.forEach((input) => {
      this._toggleButtonState(this._submitButton);
      input.addEventListener('input', () => {
        this._isInputValid(input);
        this._toggleButtonState(this._submitButton);
      });
    });
  }

  resetValidation() {
    this._toggleButtonState(this._submitButton);
    this._inputs.forEach((input) => {
      this._hideError(input);
    });
  }

  _isInputValid(input) {
    if (!input.validity.valid) {
      this._showError(input, input.validationMessage);
    } else {
      this._hideError(input);
    }
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputs)) {
      this._submitButton.classList.add(this._validationOptions.inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true);
    } else {
      this._submitButton.classList.remove(this._validationOptions.inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  }

  _hasInvalidInput() {
    return this._inputs.some((input) => {
      return !input.validity.valid;
    });
  }

  _showError(input, errorMessage) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._validationOptions.inputErrorClass);
    errorElement.textContent = errorMessage; 
    errorElement.classList.add(this._validationOptions.errorClass);
  }

  _hideError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._validationOptions.inputErrorClass);
    errorElement.classList.remove(this._validationOptions.errorClass);
    errorElement.textContent = ''; 
  }

}

export const validationOptions = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error_visible'
};