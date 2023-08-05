import { Card } from './Card.js';
import { openPopup, closePopup } from './popup.js';
import { FormValidator } from './FormValidator.js';
import { initialCards, formSelectors} from './const.js';
export const formSelector = document.querySelectorAll('.popup__form');

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
const popupInputAddNewCard = popupAddNewCard.querySelectorAll('.popup__input');
const nameInputAddNewCard = document.querySelector(".popup__input_card_name");//значения полей формы контента
const linkImputAddNewCard = document.querySelector(".popup__input_card_link");//значения полей формы контента
const formAddNewCard = document.forms['add-place-form'];//нахожу форму добавления места по name
//const submitButtonSaveCard = document.querySelector('.popup__button_save-card');//нахожу кнопку Сохранить в форме добавления места
//const popupInputAddNewCard = formAddNewCard.querySelectorAll('.popup__input');
// добавить карточки
//const template = document.querySelector('#template');//нахожу элемент в html 
//const templateContent = template.content;//тег template имеет свойство .content, по нему я могу получить доступ к содержимому шаблона
//const templateElement = templateContent.querySelector('.element');//присваиваю переменную и нахожу в templateContent -  article class="element"
const cards = document.querySelector('.elements');//
//общая переменная popup для функции открытия и закрытия всех попапов по ESC
//const popups = document.querySelectorAll('.popup');//нахожу общий для всех попапов класс - обертка для функции закрытия попапов по ESC
// общая переменная для всех форм

const popupCloseButton = document.querySelector('.popup__close-button')// нашла кнопку закрытия  
const formAddNewCardValidator = new FormValidator(formSelectors, formAddNewCard);
formAddNewCardValidator.enableValidation(formSelectors, formAddNewCard);
const formProfileValidator = new FormValidator(formSelectors, formProfile);
formProfileValidator.enableValidation(formSelectors, formProfile);

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
  formProfileValidator.resetForm(formSelectors, formProfile);//убираю тексты ошибок
  formProfileValidator.enableSubmitButton(formSelectors, formProfile);// делаю активной кнопку Сохранить 
});

// для формы добавления места открытие формы
buttonOpenPopupAddNewCard.addEventListener('click', function () {//открытие попапа
  openPopup(popupAddNewCard);//открываю форму
  formAddNewCard.reset();// очищаю поля формы  
  formAddNewCardValidator.resetForm(formSelectors, formAddNewCard);// убираю все тексты ошибок и подчеркивание в форме
  formAddNewCardValidator.disableSubmitButton(formSelectors,formAddNewCard)//делаю disable форме и кнопке Сохранить  
});

//закрывает попап
popupCloseButton.addEventListener('click', () => {
  closePopup(popupAddNewCard)// закройте попап
});

/*функция неактивной кнопки Submit и формы добавления карточки по умолчанию при открытии формы без предыдущего сохрания*/
/*function disableSubmitButton(submitButtonSaveCard) {
  submitButtonSaveCard.setAttribute('disabled', true);
  submitButtonSaveCard.classList.add('popup__button_disabled'); //добавляю класс неактивной кнопки  
};*/

/*функция активной кнопки Submit и формы по умолчанию при открытии формы профиля без предыдущего сохранения*/
/*function enableSubmitButton(submitButtonSaveProfile) {
  submitButtonSaveProfile.removeAttribute('disabled');//удаляю атрибут "disabled";
  submitButtonSaveProfile.classList.remove('popup__button_disabled'); //удаляю класс неактивной кнопки  
};*/

//добавление карточки 
formAddNewCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const newElement = new Card({ name: nameInputAddNewCard.value, link: linkImputAddNewCard.value }, '.template')
  const cardElement = newElement.generateCard();
  cards.prepend(cardElement);
  closePopup(popupAddNewCard);
});
//Теперь цикл обойдёт массив initialCards и для каждого его элемента:
//-создаст новый экземпляр класса Card,-подготовит карточку к публикации,-добавит новую карточку в DOM.
initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item, '.template');//передаем два аргумента: обьект с данными и селектор темплейта
  // Создаём карточку и возвращаем наружу
  const newTemplate = card.generateCard();
  // Добавляем в DOM
  document.querySelector('.elements').prepend(newTemplate);
});