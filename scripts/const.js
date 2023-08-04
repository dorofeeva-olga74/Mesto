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
//элементы всплывающей картинки
const popupFullImage = document.querySelector('#picturePopup'); // нашла попап для открытия картинки
const imagePopup = document.querySelector('.popup__image');
const namePopupImage = document.querySelector(".popup__name-img");

//объект с классами и селекторами для валидации форм
const formSelectors = {
  formSelector: '.popup__form',// форма
  inputSelector: '.popup__input',//инпут в форме
  submitButtonSelector: '.popup__button',//сохранить
  inactiveButtonClass: 'popup__button_disabled',//класс для неактивной кнопки "Сохранить"
  errorClass: 'popup__error_visible',// текст ошибки красный тег <р>
  inputErrorClass: 'popup__input_type_error',//инпут с ошибкой обводка красная 
};

//находим форму
//export const formSelector = document.querySelectorAll('.popup__form');
export { initialCards, formSelectors, popupFullImage, imagePopup, namePopupImage}