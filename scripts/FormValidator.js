//import * as scriptALL from './index.js';
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
  constructor(formSelectors, formSelector) {
    this._formSelectors = formSelectors;//обьект с классами и селекторами формы
    this._formSelector = formSelector;// форма     
  }

  //Публичный метод //правильный метод второй вариант
  /*функция запускает валидацию форм*///функция находит импуты в каждой форме и проверяет их на валидность
 /* enableValidation(formSelectors) {
    const coolectionForms = document.querySelectorAll(formSelectors.formSelector);//settings - это обьект который явл аргументом функции
    Array.from(coolectionForms).forEach((formSelector) => {//создаем массив из коллекции форм 
      const colectionInputs = formSelector.querySelectorAll(this._inputSelector);//находим все импуты в конкретной форме
      const submitCurrentButton = formSelector.querySelector(this._submitButtonSelector);//находим Сабмит в конкретной форме
      Array.from(colectionInputs).forEach((inputSelector) => {//создаем массив из Инпутов из коллекции Инпутов
        inputSelector.addEventListener('input', () => {//
          const isInputsGood = Array.from(colectionInputs).every((input) => input.validity.valid); // объявляем локальную переменную и методом every 
          //проверяем на валидность каждый импут и возвращает булевое значение 
          this._checkValidity(inputSelector, submitCurrentButton, formSelectors, isInputsGood); // вызываем функцию checkValidity
        });
      })
   })
  };*/
  
  enableValidation(formSelectors) {
    const coolectionForms = document.querySelectorAll(formSelectors.formSelector);//settings - это обьект который явл аргументом функции
    Array.from(coolectionForms).forEach((currentForm) => {//создаем массив из коллекции форм 
      const colectionInputs = currentForm.querySelectorAll(formSelectors.inputSelector);//находим все импуты в конкретной форме
      const submitCurrentButton = currentForm.querySelector(formSelectors.submitButtonSelector);//находим Сабмит в конкретной форме
      Array.from(colectionInputs).forEach((currentInput) => {//создаем массив из Инпутов из коллекции Инпутов
        currentInput.addEventListener('input', () => {//
          const isInputsGood = Array.from(colectionInputs).every((input) => input.validity.valid); // объявляем локальную переменную и методом every 
          //проверяем на валидность каждый импут и возвращает булевое значение 
          this._checkValidity(currentInput, submitCurrentButton, formSelectors, isInputsGood); // вызываем функцию checkValidity
        });
      })
    })
  };

  /*функция проверяет есть ли ошибка в форме и меняет цвет кнопки Сохранить*/
  
  _checkValidity(currentInput, submitCurrentButton, formSelectors, isInputsGood) { // добавляем параметр isInputsGood
    if (currentInput.validity.valid) {
      this._hideErrors(currentInput, submitCurrentButton, formSelectors)
    } else {
      this._showErrors(currentInput, submitCurrentButton, formSelectors)
    }
    this._toggleSubmitButton(submitCurrentButton, formSelectors, isInputsGood); // вызываем функцию toggleSubmitButton
  };

  /*функция показывает текст ошибки и подчеркивание полей ввода(инпутов)*/
  _showErrors(currentInput, submitCurrentButton, formSelectors) {
    currentInput.classList.add(formSelectors.inputErrorClass);
    currentInput.nextElementSibling.textContent = currentInput.validationMessage;
  };

  /*функция убирает текст ошибки и подчеркивание полей ввода(инпутов)*/
  _hideErrors(currentInput, submitCurrentButton, formSelectors) {
    currentInput.classList.remove(formSelectors.inputErrorClass);
    currentInput.nextElementSibling.textContent = '';
  };

  //функция включает и выключает кнопку Submit 
  _toggleSubmitButton(submitCurrentButton, formSelectors, isInputsGood) { // добавляем параметр isInputsGood
    if (!isInputsGood) {
      submitCurrentButton.classList.add(formSelectors.inactiveButtonClass);
      submitCurrentButton.disabled = true;
    } else {
      submitCurrentButton.classList.remove(formSelectors.inactiveButtonClass);
      //submitCurrentButton.disabled = false;
      submitCurrentButton.removeAttribute('disabled');
    }
  };
}   
