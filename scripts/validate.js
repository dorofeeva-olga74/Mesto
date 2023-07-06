// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation({ // settings //вызов функции для валидации форм, в ней ключи обьекта это переменные 
  formSelector: '.popup__form',// форма
  inputSelector: '.popup__input',//инпут в форме
  submitButtonSelector: '.popup__button',//сохранить
  inactiveButtonClass: 'popup__button_disabled',//класс для неактивной кнопки "Сохранить"
  errorClass: 'popup__error_visible',// текст ошибки красный тег <р>
  inputErrorClass: 'popup__input_type_error',//инпут с ошибкой обводка красная 
});

/*функция запускает валидацию форм*///функция находит импуты в каждой форме и проверяет их на валидность
function enableValidation(settings) {
  const coolectionForms = document.querySelectorAll(settings.formSelector);//settings - это обьект который явл аргументом функции
  Array.from(coolectionForms).forEach((currentForm) => {//создаем массив из коллекции форм 
    const colectionInputs = currentForm.querySelectorAll(settings.inputSelector);//находим все импуты в конкретной форме
    const submitCurrentButton = currentForm.querySelector(settings.submitButtonSelector);//находим Сабмит в конкретной форме
    Array.from(colectionInputs).forEach((currentInput) => {//создаем массив из Инпутов из коллекции Инпутов
      currentInput.addEventListener('input', () => {//
        const isInputsGood = Array.from(colectionInputs).every((input) => input.validity.valid); // объявляем локальную переменную и методом every 
        //проверяем на валидность каждый импут и возвращает булевое значение 
        checkValidity(currentInput, submitCurrentButton, settings, isInputsGood); // вызываем функцию checkValidity
      });
    })
  })
};
/*функция проверяет есть ли ошибка в форме и меняет цвет кнопки Сохранить*/
function checkValidity(currentInput, submitCurrentButton, settings, isInputsGood) { // добавляем параметр isInputsGood
  if (currentInput.validity.valid) {
    hideErrors(currentInput, submitCurrentButton, settings)
  } else {
    showErrors(currentInput, submitCurrentButton, settings)
  }
  toggleSubmitButton(submitCurrentButton, settings, isInputsGood); // вызываем функцию toggleSubmitButton
};

/*функция показывает текст ошибки и подчеркивание полей ввода(инпутов)*/
function showErrors(currentInput, submitCurrentButton, settings) {
  currentInput.classList.add(settings.inputErrorClass);
  currentInput.nextElementSibling.textContent = currentInput.validationMessage;
};

/*функция убирает текст ошибки и подчеркивание полей ввода(инпутов)*/
function hideErrors(currentInput, submitCurrentButton, settings) {
  currentInput.classList.remove(settings.inputErrorClass);
  currentInput.nextElementSibling.textContent = '';
};

//функция включает и выключает кнопку Submit 
function toggleSubmitButton(submitCurrentButton, settings, isInputsGood) { // добавляем параметр isInputsGood
  if (!isInputsGood) {
    submitCurrentButton.classList.add(settings.inactiveButtonClass);
    submitCurrentButton.disabled = true;
  } else {
    submitCurrentButton.classList.remove(settings.inactiveButtonClass);
    //submitCurrentButton.disabled = false;
    submitCurrentButton.removeAttribute('disabled');
  }
};   