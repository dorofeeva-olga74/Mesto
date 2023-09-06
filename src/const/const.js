import { FormValidator } from '../components/FormValidator.js';
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
//для формы добавления нового профиля
const buttonOpenPopupProfile = document.querySelector(".profile__button_add_change");//кнопка открытия формы 
const nameInputProfile = document.querySelector("#name-input");
const proffessionInputProfile = document.querySelector("#proffession-input");
const formProfile = document.forms["edit-form"];//сама форма //нахожу форму заполнения профиля по name
// для формы добавления места
const buttonOpenPopupAddNewCard = document.querySelector('.profile__button_add_card');//кнопка открытия формы
const formAddNewCard = document.forms['add-place-form'];//нахожу форму добавления места по name
const nameInputAddNewCard = document.querySelector(".popup__input_card_name");//значения полей формы контента
const linkImputAddNewCard = document.querySelector(".popup__input_card_link");//значения полей формы контента
const buttonDeleteCard = document.querySelector(".delete-button");//нахожу кнопку удаления карты
//для формы изменения аватара
const formAvatar = document.forms["avatar-form"];//сама форма //нахожу форму изменения аватара по name
const buttonOpenPopupAvatar = document.querySelector('.profile__avatar-set');
//для формы удаления карточки
const formDelete = document.forms["delete-card-form"];//сама форма //нахожу форму удаления карточки по name
const buttonOpenPopupDelete = document.querySelector("element__delete");

////////////////
// для формы добавления места
/*const buttonOpenPopupAddNewCard = document.querySelector('.profile__button_add_card');//кнопка открытия формы
const popupAddNewCard = document.querySelector('#addPlacePopup');//форма попапа по id - обертка
const nameInputAddNewCard = document.querySelector(".popup__input_card_name");//значения полей формы контента
const linkImputAddNewCard = document.querySelector(".popup__input_card_link");//значения полей формы контента
const formAddNewCard = document.forms['add-place-form'];//нахожу форму добавления места по name
const cards = document.querySelector('.elements');//*/
//////////////////////////////////////
//объект с классами и селекторами для валидации форм
const formSelectors = {
  formSelector: '.popup__form',// форма
  inputSelector: '.popup__input',//инпут в форме
  submitButtonSelector: '.popup__button',//сохранить
  inactiveButtonClass: 'popup__button_disabled',//класс для неактивной кнопки "Сохранить"
  errorClass: 'popup__error_visible',// текст ошибки красный тег <р>
  inputErrorClass: 'popup__input_type_error',//инпут с ошибкой обводка красная 
};
//Для нахождения контейнера с карточками
const containerSelector = '.elements';
//Для вызова FormValidator для формы добавления карточки
const formAddNewCardValidator = new FormValidator(formSelectors, formAddNewCard);
//Для вызова FormValidator для формы профиля
const formProfileValidator = new FormValidator(formSelectors, formProfile);
//Для вызова FormValidator для формы аватара
const formAvatarValidator = new FormValidator(formSelectors, formAvatar);
//Для вызова FormValidator для формы удаления
const formDeleteValidator = new FormValidator(formSelectors, formDelete);

export {
  initialCards, formSelectors, buttonOpenPopupProfile, nameInputProfile, proffessionInputProfile,
  formProfile, buttonOpenPopupAddNewCard, formAddNewCard, formAddNewCardValidator,
  formProfileValidator, containerSelector, nameInputAddNewCard, linkImputAddNewCard, formAvatar,
  formAvatarValidator, buttonOpenPopupAvatar, buttonDeleteCard, formDelete, buttonOpenPopupDelete, 
  formDeleteValidator,
}