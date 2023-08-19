import './index.css'; // добавьте импорт главного файла стилей

import { Card } from '../components/Card.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import {
  initialCards, formSelectors, buttonOpenPopupProfile, nameInputProfile,
  proffessionInputProfile, formProfile, buttonOpenPopupAddNewCard,
  formAddNewCard,  formAddNewCardValidator, formProfileValidator, containerSelector
} from '../const/const.js';

//ДЛЯ ФОРМЫ - ВСПЛЫВАЮЩАЯ КАРТИНКА
const popupWithImageElement = new PopupWithImage('.popup_img_open');
popupWithImageElement.setEventListeners();

/*ДЛЯ ФОРМЫ ЗАПОЛНЕНИЯ ПРОФИЛЯ*/
//отображает информацию о пользователе на странице
const userInfoElement = new UserInfo({
  userNameSelector: ".profile__title",
  aboutUserSelector: ".profile__subtitle",
});

const popupWithFormProfileElement = new PopupWithForm('.popup_profile_open', () => {
  userInfoElement.setUserInfo({ userName: nameInputProfile.value, aboutUser: proffessionInputProfile.value });
  userInfoElement.getUserInfo({ userName: nameInputProfile.value, aboutUser: proffessionInputProfile.value });

});
popupWithFormProfileElement.setEventListeners();

//обработчик кнопки "Добавить профиль" для формы заполнения профиля
const popupProfileButtonHandler = () => {
  popupWithFormProfileElement.setInputValue(userInfoElement.getUserInfo());//добавляется заполнение полей 
  popupWithFormProfileElement.open();//открываю профиль
  formProfileValidator.resetForm();//убираю тексты ошибок
  formProfileValidator.enableSubmitButton();// делаю активной кнопку Сохранить 
};
//при открытии формы заполнения профиля - заполнение по умолчанию
buttonOpenPopupProfile.addEventListener("click", popupProfileButtonHandler);

/*ДЛЯ РЕДАКТИРОВАНИЯ ФОРМЫ ДОБАВЛЕНИЯ КАРТОЧКИ МЕСТА*/
//отвечает за отрисовку элементов на странице
const cardSectionElement = new Section(
  {
    items: initialCards,
    renderer: ({ name, link }) => {      
      const cardElement = createCard(link, name);//форма карточки - template элемент     
      cardSectionElement.addItem(cardElement);//// Добавляем в DOM
    },
  },
  containerSelector//контейнер с карточками
);
//функция, которая отвечает за создание и отрисовку данных на странице
cardSectionElement.renderItems();
// 
const popupWithFormMestoElement = new PopupWithForm('.popup_addplace_open', (values) => {
  const { cardName, urlCard } = values;
  cardSectionElement.addItem(createCard(urlCard, cardName));
});
popupWithFormMestoElement.setEventListeners();

//Создаём карточку и возвращаем наружу
function createCard(link, name) {
  return new Card(
    { link, name }, '.template',////передаем два аргумента: обьект с данными и селектор темплейта
    popupWithImageElement.open
  ).generateCard();//// Создаём карточку и возвращаем наружу
}
//обработчик кнопки "Добавить" для формы добавления места - по умолчанию
const addCardButtonHandler = () => {
  popupWithFormMestoElement.open();//открываю форму
  formAddNewCard.reset();// очищаю поля формы  
  formAddNewCardValidator.resetForm();// убираю все тексты ошибок и подчеркивание в форме
  formAddNewCardValidator.disableSubmitButton()//делаю disable форме и кнопке Сохранить  
};
buttonOpenPopupAddNewCard.addEventListener('click', addCardButtonHandler);

//Вызываем  FormValidator для формы добавления карточки
formAddNewCardValidator.enableValidation(formSelectors, formAddNewCard);
//Вызываем FormValidator для формы профиля
formProfileValidator.enableValidation(formSelectors, formProfile);