import './index.css'; // добавьте импорт главного файла стилей
import { Card } from '../components/Card.js';
import {
  api, popupWithImageElement, userInfoElement, popupWithFormProfileElement, 
  popupWithFormAvatarElement, cardSectionElement, popupWithFormMestoElement,
  popupWithDeleteCardElement, addCardButtonHandler, popupProfileButtonHandler, 
  popupAvatarButtonHandler, handleDeleteClick,
  formSelectors, buttonOpenPopupProfile, formProfile, buttonOpenPopupAddNewCard,
  formAddNewCard, formAddNewCardValidator, formProfileValidator, formAvatar, 
  formAvatarValidator, buttonOpenPopupAvatar, formDelete, formDeleteValidator,
} from '../utils/constants.js';

/*ДЛЯ РЕДАКТИРОВАНИЯ ФОРМЫ ДОБАВЛЕНИЯ КАРТОЧКИ МЕСТА*/
//*Создаем и возвращаем все карточки*/
/*самовызывающаяся асинхронная функция*/
(async () => {
  api.getInitialCards()  ///3 //api.getAllTodos
    .then((data) => {
      cardSectionElement.renderItems(data);//в классе Секцион вызвать функцию renderItems 
      //console.log(data)//это массив с карточками
      //console.log(cardSectionElement);//секция с карточками
    });
})();//самовызывающаяся асинхронная функция

//при открытии формы добавления карточки - заполнение по умолчанию
buttonOpenPopupAddNewCard.addEventListener('click', addCardButtonHandler);
//при открытии формы заполнения профиля - заполнение по умолчанию
buttonOpenPopupProfile.addEventListener("click", popupProfileButtonHandler);
//при открытии формы заполнения аватара профиля - заполнение по умолчанию
buttonOpenPopupAvatar.addEventListener('click', popupAvatarButtonHandler);

/*ВАЛИДАЦИЯ ФОРМ*/
//Вызываем  FormValidator для формы добавления карточки
formAddNewCardValidator.enableValidation(formSelectors, formAddNewCard);
//Вызываем FormValidator для формы профиля
formProfileValidator.enableValidation(formSelectors, formProfile);
//Вызываем FormValidator для формы аватара
formAvatarValidator.enableValidation(formSelectors, formAvatar);
//Вызываем FormValidator для формы удаления карточки
formDeleteValidator.enableValidation(formSelectors, formDelete);

//ФУНКЦИЯ ДЛЯ ДОБАВЛЕНИЯ И СНЯТИЯ ЛАЙКОВ НА КАРТОЧКАХ
function handleLikeClick(card) {
  card.setLoadingState('Загрузка...');////текст загрузки
  const cardId = card.getCardId();// получила id карточки  
  if (card.checkIsLiked()) {//проверяю стоит мой лайк или нет, если есть
    api.deleteLikeCardData(cardId)//удаляю лайк
      .then((res) => {
        card.addLike(res.likes.length)//количество лайков
        card.deleteLike(res.likes.length) /*(likes?.length)*///количество лайков;       
      })
      .catch((e) => {
        card.setLoadingState('Ошибка');//текст загрузки
        console.error;//ошибка
      })
      .finally((data) => {
        card._setLikesCount(data)
      });
  } else {//если нет моего лайка
    api.addLikeCardData(cardId)//добавляю лайк
      .then((res) => {
        card.addLike(res.likes.length)//количество лайков
      })
      .catch((e) => {
        card.setLoadingState('Ошибка');////текст загрузки
        console.error;//ошибка
      })
      .finally((data) => {
        card._setLikesCount(data)
      });
  }
}
//ФУНКЦИЯ СОЗДАЕТ КАРТОЧКУ И ВОЗВРАЩАЕТ НАРУЖУ
export function createCard(data) {
  const card = new Card(data, '.template', { //передаем три аргумента: обьект с данными, 
    //метод удаления карты по id, селектор темплейта
    handleOpenPopupImage: popupWithImageElement.open,
    handleDeleteClick: () => handleDeleteClick(card),
    handleLikeClick: () => handleLikeClick(card),
  }, userInfoElement.getUserId())
  return card.generateCard();//удаление, открытие, лайк
}
// ЗАПРОС ДАННЫХ КАРТОЧЕК И ПОЛЬЗОВАТЕЛЯ
//!!!Массив промиссов в нем и данные о карточках и о пользователях
// часть данных о пользователях прокидывать в карточку
Promise.all([api.getUserCardsData(), api.getInitialCards()])
  .then(([UserInfoAnswer, cardsAnswer]) => {
    let userIdCard;
    userIdCard = UserInfoAnswer._id;
    userInfoElement.setUserInfo(UserInfoAnswer);
    cardSectionElement.renderItems(cardsAnswer);

  })
  .catch((e) => console.error(e?.reason || e?.message));

//
popupWithImageElement.setEventListeners();
popupWithFormProfileElement.setEventListeners();
popupWithFormAvatarElement.setEventListeners();
popupWithFormMestoElement.setEventListeners();
popupWithDeleteCardElement.setEventListeners();