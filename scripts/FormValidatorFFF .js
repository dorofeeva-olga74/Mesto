//import { formSelectors } from './const.js';  

export class FormValidator {//настраивает валидацию полей формы:
  constructor( form, settings ) {
    /*this._isInputsGood = false;
    this._formSelectors = formSelectors;//обьект с классами и селекторами формы
    this._formSelector = formSelector; // форма          
    this._inputList =  Array.from(document.querySelectorAll(this._formSelectors.inputSelector));//находим все импуты в конкретной форме  
    //this._submitButtonSelector = this._formSelector.querySelector(this._formSelectors.submitButtonSelector);//находим кнопку Сохранить в конкретной форме
    this._inactiveButtonClass = this._formSelector.querySelector(this._formSelectors.inactiveButtonClass);
    this._errorClass = this._formSelector.errorClass;
    this._submitCurrentButton = this._formSelector.querySelector(this._submitButtonSelector);//находим Сабмит в конкретной форме    
  */
    this._isInputsGood = false;
    this.form = form;
    this.inputSelector = settings.inputSelector;
    this.inputList =  Array.from(document.querySelectorAll(this.inputSelector));//находим все импуты в конкретной форме  
    this.submitButtonSelector = settings.submitButtonSelector;
    this.inactiveButtonClass = settings.inactiveButtonClass;
    this.inputErrorClass = settings.inputErrorClass;
    this.errorClass = settings.errorClass;
  } 
  
  //Метод включает и выключает кнопку Submit 
  _toggleSubmitButton(submitCurrentButton) { // добавляем параметр isInputsGood
    
    if (!this._isInputsGood) {  
      console.log(this.form)        
      this.submitCurrentButton.classList.add(this.inactiveButtonClass);
      this.submitCurrentButton.disabled = true;
    } else {
      this.submitCurrentButton.classList.remove(this.inactiveButtonClass);
      this.submitCurrentButton.disabled = false;
      this.submitCurrentButton.removeAttribute('disabled');
    }
  };

 enableValidation() {  
    this.inputList.forEach((currentInput) => {// добавляем слушатель на каждое поле Инпута из массива Инпутов
        currentInput.addEventListener('input', () => {//
          const isInputsGood = Array.from(this.inputList).every((input) => input.validity.valid); // объявляем локальную переменную и методом every 
          //проверяем на валидность каждый импут и возвращает булевое значение 
          this._checkValidity(currentInput, submitCurrentButton, isInputsGood); // вызываем функцию checkValidity         
        });
      })    
  };  
  /*Метод проверяет есть ли ошибка в форме и меняет цвет кнопки Сохранить*/
  _checkValidity(currentInput, submitCurrentButton, isInputsGood) { // добавляем параметр isInputsGood
    
    if (currentInput.validity.valid) {
      this._hideErrors(currentInput, submitCurrentButton)
    } else {
      this._showErrors(currentInput, submitCurrentButton)
    }
    //this._toggleSubmitButton(submitCurrentButton, isInputsGood); // вызываем функцию toggleSubmitButton
  };
  /*_checkValidity(currentInput, submitCurrentButton) {
    if (currentInput.validity.valid) {
        // убрать красную обводку
        this._hideErrors(currentInput, submitCurrentButton)
    } else {
        // добавить красную обводку
        this._showErrors(currentInput, submitCurrentButton)
    }
}*/
  /*Метод показывает текст ошибки и подчеркивание полей ввода(инпутов)*/
  /*_showErrors(currentInput) {
    currentInput.classList.add(this._formSelectors.inputErrorClass);//добавляется красная обводка
    currentInput.nextElementSibling.textContent = currentInput.validationMessage;//добавляется текст ошибки
  };*/
  _showErrors(currentInput, submitCurrentButton) {
    currentInput.classList.add(this.inputErrorClass)
    currentInput.nextElementSibling.textContent = currentInput.validationMessage
    this.toggleSubmitButton(submitCurrentButton)    
}
  /*Метод убирает текст ошибки и подчеркивание полей ввода(инпутов)*/
  _hideErrors(currentInput, submitCurrentButton) {
    currentInput.classList.remove(this.inputErrorClass);
    currentInput.nextElementSibling.textContent = '';
    this.toggleSubmitButton(submitCurrentButton)
  };
  /*Метод неактивной кнопки Submit и формы */
/*_disableSubmitButton() {///что-то не так
  this._submitButtonSelector.setAttribute('disabled', true);
  this._submitButtonSelector.classList.add(this._formSelectors.inactiveButtonClass); //добавляю класс неактивной кнопки  
 
};*/

/*Метод активной кнопки Submit и формы */
/*_enableSubmitButton() {///что-то не так
  this._submitButtonSelector.removeAttribute('disabled', false);//удаляю атрибут "disabled";
  this._submitButtonSelector.classList.remove(this._formSelectors.inactiveButtonClass); //удаляю класс неактивной кнопки  
};*/
  
     
  /*_toggleBtnStateActive(submitCurrentButton) {
    if (!this._isInputsGood) {
        submitCurrentButton.classList.add(this.errorClass)
        submitCurrentButton.disabled = true
    } else {
        submitCurrentButton.classList.remove(this.errorClass)
        submitCurrentButton.disabled = false
    }
}*/
  /*Метод сброса текста ошибки и подчеркивания полей ввода красным при открытии формы без предыдущего сохрания*/
  /*resetError() {
    console.log(this)
    this._currentInput.classList.remove(formSelectors.inputErrorClass);
    this._currentInput.nextElementSibling.textContent = '';
  };
  
  /*_resetError() {
    //Array.from(formSelector).forEach((currentForm) => {//создаем массив из форм 
      // общая переменная для всех тегов <p>, параграфов с ошибкой
      const popupVisibleErrors = this._formSelector.querySelectorAll('.popup__error_visible');//нахожу текст ошибки
      console.log(popupVisibleErrors)
      // общая переменная для всех инпутов
      const popupInputs = this._formSelector.querySelectorAll('.popup__input');
    Array.from(popupInputs).forEach(() => {//создаем массив из Инпутов из коллекции Инпутов
      currentInput.remove(formSelectors.inputErrorClass);//убираю красную обводку инпута
    });
      //console.log(this)
      Array.from(popupVisibleErrors).forEach(() => {//создаем массив из тегов p - строчек ошибок инпутов
        this._currentPopupVisibleErrors.textContent = '';//добавляю пустой текст ошибки
      });
    //});
  };*/
  /*_resetError(formElement) {
  Array.from(formSelector).forEach((currentForm) => {//создаем массив из форм 
    // общая переменная для всех тегов <p>, параграфов с ошибкой
    const popupVisibleErrors = currentForm.querySelectorAll('.popup__error_visible');//нахожу текст ошибки
    // общая переменная для всех инпутов
    const popupInputs = currentForm.querySelectorAll('.popup__input');
    Array.from(popupInputs).forEach((currentInput) => {//создаем массив из Инпутов из коллекции Инпутов
      currentInput.classList.remove('popup__input_type_error');//убираю красную обводку инпута
    });
    Array.from(popupVisibleErrors).forEach((currentPopupVisibleErrors) => {//создаем массив из тегов p - строчек ошибок инпутов
      currentPopupVisibleErrors.textContent = '';//добавляю пустой текст ошибки
    });
  });
};*/
} 
/* const formSelectors = {
  formSelector: '.popup__form',// форма
  inputSelector: '.popup__input',//инпут в форме
  submitButtonSelector: '.popup__button',//сохранить
  inactiveButtonClass: 'popup__button_disabled',//класс для неактивной кнопки "Сохранить"
  errorClass: 'popup__error_visible',// текст ошибки красный тег <р>
  inputErrorClass: 'popup__input_type_error',//инпут с ошибкой обводка красная 
};*/
