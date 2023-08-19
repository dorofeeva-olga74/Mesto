export class FormValidator {//настраивает валидацию полей формы:
  constructor(settings, form) {
    this.settings = settings;//обьект с классами и селекторами формы
    this.form = form;// форма  
    this._isInputsGood = false;
    this.submitCurrentButton = this.form.querySelector(settings.submitButtonSelector);//находим Сабмит в конкретной форме
    this.submitButtonSelector = this.settings.submitButtonSelector;
    this.inactiveButtonClass = this.settings.inactiveButtonClass;
    this.inputErrorClass = this.settings.inputErrorClass;
    this.errorClass = this.settings.errorClass;
  }
  //публичный метод очистки формы при открытии попапа/если предыдущее заполнение не было сохранено
  resetForm() {
    this._getColectionInputs().forEach((currentInput) => {
      this._hideErrors(currentInput);
    });
    this._toggleSubmitButton(this.submitCurrentButton, true);
  };
  //публичный метод неактивной кнопки Submit и формы добавления карточки по умолчанию
  // при открытии формы без предыдущего сохрания
  disableSubmitButton() {
    this.submitCurrentButton.setAttribute('disabled', true);
    this.submitCurrentButton.classList.add(this.inactiveButtonClass); //добавляю класс неактивной кнопки  
  };
  //публичный метод активной кнопки Submit и формы по умолчанию 
  //при открытии формы профиля без предыдущего сохранения
  enableSubmitButton() {
    this.submitCurrentButton.removeAttribute('disabled');//удаляю атрибут "disabled";
    this.submitCurrentButton.classList.remove(this.inactiveButtonClass); //удаляю класс неактивной кнопки  
  };
  //функция включает и выключает кнопку Submit - меняет цвет и делает 'disabled'
  _toggleSubmitButton() {
    if (!this._isInputsGood) {
      this.submitCurrentButton.classList.add(this.inactiveButtonClass);
      this.submitCurrentButton.disabled = true;
    } else {
      this.submitCurrentButton.classList.remove(this.inactiveButtonClass);
      //this.submitCurrentButton.disabled = false;
      this.submitCurrentButton.removeAttribute('disabled');
    }
  };
  //метод создает массив с инпутами
  _getColectionInputs() {
    return Array.from(this.form.querySelectorAll(this.settings.inputSelector))
  }
  //метод находит кнопку "Сохранить"
  _getSubmitCurrentButton() {
    return this.form.querySelector(this.submitButtonSelector)
  }
  //Публичный метод проверки импутов на валидность
  enableValidation() {
    this._getColectionInputs().forEach((currentInput) => {
      currentInput.addEventListener('input', () => {
        this._isInputsGood = this._getColectionInputs().every((input) => input.validity.valid)
        this._checkValidity(currentInput, this._getSubmitCurrentButton())
      })
    })
  }
  //функция проверяет есть ли ошибка в форме и меняет цвет кнопки Сохранить
  _checkValidity(currentInput, submitCurrentButton) {
    if (currentInput.validity.valid) {
      this._hideErrors(currentInput, submitCurrentButton)//убрать ошибку
    } else {
      this._showErrors(currentInput, submitCurrentButton)//показать ошибку
    }
    this._toggleSubmitButton(submitCurrentButton); // вызываем функцию toggleSubmitButton
  };
  /*функция показывает текст ошибки и подчеркивание полей ввода(инпутов)*/
  _showErrors(currentInput) {
    currentInput.classList.add(this.inputErrorClass);
    currentInput.nextElementSibling.textContent = currentInput.validationMessage;
  };
  /*функция убирает текст ошибки и подчеркивание полей ввода(инпутов)*/
  _hideErrors(currentInput) {
    currentInput.classList.remove(this.inputErrorClass);
    currentInput.nextElementSibling.textContent = '';
  };
} 