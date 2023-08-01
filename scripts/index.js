import { Card } from './Card.js';
import { openPopup } from './open.js';
import { closePopup } from './close.js';
import { FormValidator, formSelectors } from './FormValidator.js';

/* для формы добавления нового профиля*/
const buttonOpenPopupProfile = document.querySelector(".profile__button_add_change");//кнопка открытия формы 
//const buttonClosePopupProfile = document.querySelector(".popup__close-button_profile");//кнопка закрытия формы 
const popupProfile = document.querySelector("#profilePopup");//имя попапа формы - обертка попапа по id
const popupProfileTitle = document.querySelector(".profile__title");
const popupProfileSubtitle = document.querySelector(".profile__subtitle");
const nameInputProfile = document.querySelector("#name-input");
const proffessionInputProfile = document.querySelector("#proffession-input");
const formProfile = document.forms["edit-form"];//сама форма //нахожу форму заполнения профиля по name
const submitButtonSaveProfile = document.querySelector('.popup__button_save-profile');//нахожу кнопку Сохранить в форме Профиля

// для формы добавления места
const buttonOpenPopupAddNewCard = document.querySelector('.profile__button_add_card');//кнопка открытия формы
const popupAddNewCard = document.querySelector('#addPlacePopup');//форма попапа по id - обертка
const nameInputAddNewCard = document.querySelector(".popup__input_card_name");//значения полей формы контента
const linkImputAddNewCard = document.querySelector(".popup__input_card_link");//значения полей формы контента
const formAddNewCard = document.forms['add-place-form'];//нахожу форму добавления места по name
const submitButtonSaveCard = document.querySelector('.popup__button_save-card');//нахожу кнопку Сохранить в форме добавления места
// добавить карточки
const template = document.querySelector('#template');//нахожу элемент в html 
//const templateContent = template.content;//тег template имеет свойство .content, по нему я могу получить доступ к содержимому шаблона
//const templateElement = templateContent.querySelector('.element');//присваиваю переменную и нахожу в templateContent -  article class="element"
const cards = document.querySelector('.elements');//
//общая переменная popup для функции открытия и закрытия всех попапов по ESC
//const popups = document.querySelectorAll('.popup');//нахожу общий для всех попапов класс - обертка для функции закрытия попапов по ESC
// общая переменная для всех форм
const formSelector = document.querySelectorAll('.popup__form');
const validator = new FormValidator(formSelectors, formSelector);
validator.enableValidation(formSelectors);
const formAddNewCardValidator = new FormValidator(formSelectors, formAddNewCard);
formAddNewCardValidator.enableValidation(formSelectors, formSelector);
const formProfileValidator = new FormValidator(formSelectors, formProfile);
formProfileValidator.enableValidation(formSelectors);

/*для формы редактирования профиля*/
formProfile.addEventListener("submit", function (evt) {
  evt.preventDefault();
  popupProfileTitle.textContent = nameInputProfile.value;
  popupProfileSubtitle.textContent = proffessionInputProfile.value;
  closePopup(popupProfile);
});

/*при открытии формы заполнения профиля - заполнение по умолчанию*/
buttonOpenPopupProfile.addEventListener("click", function () {
  nameInputProfile.value = popupProfileTitle.textContent;
  proffessionInputProfile.value = popupProfileSubtitle.textContent;
  openPopup(popupProfile);
  enableSubmitButton(submitButtonSaveProfile);
  resetError(formProfile);
});

// для формы добавления места открытие формы
buttonOpenPopupAddNewCard.addEventListener('click', function () {//открытие попапа
  openPopup(popupAddNewCard);//открываю форму
  disableSubmitButton(submitButtonSaveCard);//делаю disable форме и кнопке Сохранить
  resetError(formAddNewCard);// убираю все тексты ошибок и подчеркивание в форме
  formAddNewCard.reset();// очищаю поля формы  
});

/*Функция сброса текста ошибки и подчеркивания полей ввода красным при открытии формы без предыдущего сохрания*/
function resetError(formElement) {
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
};
/*функция неактивной кнопки Submit и формы добавления карточки по умолчанию при открытии формы без предыдущего сохрания*/
function disableSubmitButton(submitButtonSaveCard) {
  submitButtonSaveCard.setAttribute('disabled', true);
  submitButtonSaveCard.classList.add('popup__button_disabled'); //добавляю класс неактивной кнопки  
};

/*функция активной кнопки Submit и формы по умолчанию при открытии формы профиля без предыдущего сохранения*/
function enableSubmitButton(submitButtonSaveProfile) {
  submitButtonSaveProfile.removeAttribute('disabled');//удаляю атрибут "disabled";
  submitButtonSaveProfile.classList.remove('popup__button_disabled'); //удаляю класс неактивной кнопки  
};

//добавление карточки 
formAddNewCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const newElement = new Card({ name: nameInputAddNewCard.value, link: linkImputAddNewCard.value }, '.template')
  const cardElement = newElement.generateCard();
  cards.prepend(cardElement);
  closePopup(popupAddNewCard);
});