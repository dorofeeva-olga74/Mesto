//import { formSelectors } from './const';
// включение валидации вызовом enableValidation
export const formSelectors = {
  formSelector: '.popup__form',// форма
  inputSelector: '.popup__input',//инпут в форме
  submitButtonSelector: '.popup__button',//сохранить
  inactiveButtonClass: 'popup__button_disabled',//класс для неактивной кнопки "Сохранить"
  errorClass: 'popup__error_visible',// текст ошибки красный тег <р>
  inputErrorClass: 'popup__input_type_error',//инпут с ошибкой обводка красная 
};

export class FormValidator {//настраивает валидацию полей формы:
  constructor(form, settings) {
    this.settings = settings;//обьект с классами и селекторами формы
    this.form = form;// форма  
    this._isInputsGood = false;    
    this.submitCurrentButton = this.settings.querySelector(formSelectors.submitButtonSelector);//находим Сабмит в конкретной форме
    this.submitButtonSelector = this.form.submitButtonSelector;
    this.inactiveButtonClass = this.form.inactiveButtonClass;
    this.inputErrorClass = this.form.inputErrorClass;
    this.errorClass = this.form.errorClass;    
  }
  //публичный метод очистки формы при открытии попапа/если предыдущее заполнение не было сохранено
  resetForm() {    
    this._getColectionInputs().forEach((currentInput) => {
        this._hideErrors(currentInput);
      });
    this._toggleSubmitButton(this.submitCurrentButton, true);
    }; 
  /*публичный метод неактивной кнопки Submit и формы добавления карточки по умолчанию при открытии формы без предыдущего сохрания*/
  disableSubmitButton() {    
    this.submitCurrentButton.setAttribute('disabled', true);
    this.submitCurrentButton.classList.add(this.inactiveButtonClass); //добавляю класс неактивной кнопки  
  };
  /*публичный метод активной кнопки Submit и формы по умолчанию при открытии формы профиля без предыдущего сохранения*/
  enableSubmitButton() {
    this.submitCurrentButton.removeAttribute('disabled');//удаляю атрибут "disabled";
    this.submitCurrentButton.classList.remove(this.inactiveButtonClass); //удаляю класс неактивной кнопки  
  };

  //функция включает и выключает кнопку Submit 
  _toggleSubmitButton() { 
    if (!this._isInputsGood) {        
      this.submitCurrentButton.classList.add(this.form.inactiveButtonClass);
      this.submitCurrentButton.disabled = true;      
    } else {
      this.submitCurrentButton.classList.remove(this.form.inactiveButtonClass);
      //this.submitCurrentButton.disabled = false;
      this.submitCurrentButton.removeAttribute('disabled');
    }
  };
  _getColectionInputs() {    
    return Array.from(this.settings.querySelectorAll(this.form.inputSelector))
  }
  _getSubmitCurrentButton() {  
    return this.settings.querySelector(this.submitButtonSelector)
  }

  //Публичный метод 
  enableValidation() {    
    this._getColectionInputs().forEach((currentInput) => {      
        currentInput.addEventListener('input', () => {
            this._isInputsGood = this._getColectionInputs().every((input) => input.validity.valid)
            this._checkValidity(currentInput, this._getSubmitCurrentButton())
        })
    })
}


/*функция активной кнопки Submit и формы по умолчанию при открытии формы профиля без предыдущего сохранения*/
/*function enableSubmitButton(submitButtonSaveProfile) {
  submitButtonSaveProfile.removeAttribute('disabled');//удаляю атрибут "disabled";
  submitButtonSaveProfile.classList.remove('popup__button_disabled'); //удаляю класс неактивной кнопки  
};*/
  /*enableValidation(submitCurrentButton) {
    //const coolectionForms = document.querySelectorAll(formSelectors.formSelector);//settings - это обьект который явл аргументом функции
    //Array.from(coolectionForms).forEach((currentForm) => {//создаем массив из коллекции форм 
      
      //const colectionInputs = this.settings.querySelectorAll(settings.inputSelector);//находим все импуты в конкретной форме
      //const submitCurrentButton = this.settings.querySelector(formSelectors.submitButtonSelector);//находим Сабмит в конкретной форме
      Array.from(this.colectionInputs).forEach((currentInput) => {//создаем массив из Инпутов из коллекции Инпутов
        currentInput.addEventListener('input', () => {//
          this._isInputsGood = Array.from(this.colectionInputs).every((input) => input.validity.valid); // объявляем локальную переменную и методом every 
          //проверяем на валидность каждый импут и возвращает булевое значение 
          this._checkValidity(/*currentInput, submitCurrentButton); // вызываем функцию checkValidity
       // });
      //})
   // })
  //};*/

  /*функция проверяет есть ли ошибка в форме и меняет цвет кнопки Сохранить*/
  
  _checkValidity(currentInput, submitCurrentButton) { 
    if (currentInput.validity.valid) {//убрать ошибку
      this._hideErrors(currentInput, submitCurrentButton)
    } else {//показать ошибку
      this._showErrors(currentInput, submitCurrentButton)
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
