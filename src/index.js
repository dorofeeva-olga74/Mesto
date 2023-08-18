import './pages/index.css'; // добавьте импорт главного файла стилей

import { Card } from './scripts/Card.js';
import { PopupWithImage } from './scripts/PopupWithImage.js';
import { PopupWithForm } from './scripts/PopupWithForm.js';
import { UserInfo } from "./scripts/UserInfo.js";
import { Section } from "./scripts/Section.js";
import {
  initialCards, formSelectors, buttonOpenPopupProfile, nameInputProfile,
  proffessionInputProfile, formProfile, buttonOpenPopupAddNewCard,
  formAddNewCard,  formAddNewCardValidator, formProfileValidator, containerSelector
} from './scripts/const.js';

//ДЛЯ ФОРМЫ - ВСПЛЫВАЮЩАЯ КАРТИНКА
const newPopupWithImage = new PopupWithImage('.popup_img_open');
newPopupWithImage.setEventListeners();

/*ДЛЯ ФОРМЫ ЗАПОЛНЕНИЯ ПРОФИЛЯ*/
//отображает информацию о пользователе на странице
const newUserInfo = new UserInfo({
  userNameSelector: ".profile__title",
  aboutUserSelector: ".profile__subtitle",
});

const newPopupWithFormProfile = new PopupWithForm('.popup_profile_open', () => {
  newUserInfo.setUserInfo({ userName: nameInputProfile.value, aboutUser: proffessionInputProfile.value });
  newUserInfo.getUserInfo({ userName: nameInputProfile.value, aboutUser: proffessionInputProfile.value });

});
newPopupWithFormProfile.setEventListeners();

//обработчик кнопки "Добавить профиль" для формы заполнения профиля
const popupProfileButtonHandler = () => {
  newPopupWithFormProfile.setInputValue(newUserInfo.getUserInfo());//добавляется заполнение полей 
  newPopupWithFormProfile.open();//открываю профиль
  formProfileValidator.resetForm();//убираю тексты ошибок
  formProfileValidator.enableSubmitButton();// делаю активной кнопку Сохранить 
};
//при открытии формы заполнения профиля - заполнение по умолчанию
buttonOpenPopupProfile.addEventListener("click", popupProfileButtonHandler);

/*ДЛЯ РЕДАКТИРОВАНИЯ ФОРМЫ ДОБАВЛЕНИЯ КАРТОЧКИ МЕСТА*/
//отвечает за отрисовку элементов на странице
const newCardSection = new Section(
  {
    items: initialCards,
    renderer: ({ name, link }) => {      
      const cardElement = createCard(link, name);//форма карточки - template элемент     
      newCardSection.addItem(cardElement);//// Добавляем в DOM
    },
  },
  containerSelector//контейнер с карточками
);
//функция, которая отвечает за создание и отрисовку данных на странице
newCardSection.renderItems();
// 
const newPopupWithFormMesto = new PopupWithForm('.popup_addplace_open', (values) => {
  const { cardName, urlCard } = values;
  newCardSection.addItem(createCard(urlCard, cardName));
});
newPopupWithFormMesto.setEventListeners();

//Создаём карточку и возвращаем наружу
function createCard(link, name) {
  return new Card(
    { link, name }, '.template',////передаем два аргумента: обьект с данными и селектор темплейта
    newPopupWithImage.open
  ).generateCard();//// Создаём карточку и возвращаем наружу
}
//обработчик кнопки "Добавить" для формы добавления места - по умолчанию
const addCardButtonHandler = () => {
  newPopupWithFormMesto.open();//открываю форму
  formAddNewCard.reset();// очищаю поля формы  
  formAddNewCardValidator.resetForm();// убираю все тексты ошибок и подчеркивание в форме
  formAddNewCardValidator.disableSubmitButton()//делаю disable форме и кнопке Сохранить  
};
buttonOpenPopupAddNewCard.addEventListener('click', addCardButtonHandler);

//Вызываем  FormValidator для формы добавления карточки
formAddNewCardValidator.enableValidation(formSelectors, formAddNewCard);
//Вызываем FormValidator для формы профиля
formProfileValidator.enableValidation(formSelectors, formProfile);