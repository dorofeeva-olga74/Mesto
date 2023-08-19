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
//объект с классами и селекторами для валидации форм
const formSelectors = {
  formSelector: '.popup__form',// форма
  inputSelector: '.popup__input',//инпут в форме
  submitButtonSelector: '.popup__button',//сохранить
  inactiveButtonClass: 'popup__button_disabled',//класс для неактивной кнопки "Сохранить"
  errorClass: 'popup__error_visible',// текст ошибки красный тег <р>
  inputErrorClass: 'popup__input_type_error',//инпут с ошибкой обводка красная 
};

//Для вызова FormValidator для формы добавления карточки
const formAddNewCardValidator = new FormValidator(formSelectors, formAddNewCard);
//Для вызова FormValidator для формы профиля
const formProfileValidator = new FormValidator(formSelectors, formProfile);
//Для нахождения контейнера с карточками
const containerSelector = '.elements';

export {
  initialCards, formSelectors, buttonOpenPopupProfile, nameInputProfile, proffessionInputProfile,
  formProfile, buttonOpenPopupAddNewCard, formAddNewCard, formAddNewCardValidator,
  formProfileValidator, containerSelector
}