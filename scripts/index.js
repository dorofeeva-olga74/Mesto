import { Card } from './Card.js';
import { openPopup, closePopup } from './popup.js';
import {
  initialCards, formSelectors, buttonOpenPopupProfile,
  popupProfile, popupProfileTitle, popupProfileSubtitle, nameInputProfile, proffessionInputProfile, formProfile,
  buttonOpenPopupAddNewCard, popupAddNewCard, nameInputAddNewCard, linkImputAddNewCard, formAddNewCard, cards,
  popupCloseButton, formAddNewCardValidator, formProfileValidator
} from './const.js';

//Вызываем  FormValidator для формы добавления карточки
formAddNewCardValidator.enableValidation(formSelectors, formAddNewCard);
//Вызываем FormValidator для формы профиля
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

// для формы добавления места открытие формы - по умолчанию
buttonOpenPopupAddNewCard.addEventListener('click', function () {//открытие попапа
  openPopup(popupAddNewCard);//открываю форму
  formAddNewCard.reset();// очищаю поля формы  
  formAddNewCardValidator.resetForm(formSelectors, formAddNewCard);// убираю все тексты ошибок и подчеркивание в форме
  formAddNewCardValidator.disableSubmitButton(formSelectors, formAddNewCard)//делаю disable форме и кнопке Сохранить  
});

//закрывает попап 
popupCloseButton.addEventListener('click', () => {
  closePopup(popupAddNewCard)// закройте попап
});

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