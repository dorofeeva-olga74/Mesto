import './index.css'; // добавьте импорт главного файла стилей
import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { PopupWithDeleteCard } from "../components/PopupWithDeleteCard.js";
import {
  formSelectors, buttonOpenPopupProfile, formProfile, buttonOpenPopupAddNewCard,
  formAddNewCard, formAddNewCardValidator, formProfileValidator, containerSelector,
  formAvatar, formAvatarValidator, buttonOpenPopupAvatar, formDelete, formDeleteValidator,
} from '../const/const.js';
//для карточек
export const apiConfig = {///1
  url: "https://mesto.nomoreparties.co/v1/cohort-74",
  headers: {
    "Content-Type": "application/json",
    "authorization": "ae84b954-9fdb-4967-8466-ffa99a62c9a2",
  },
};
/*API*/
const api = new Api(apiConfig);///2

/*ДЛЯ ФОРМЫ - ВСПЛЫВАЮЩАЯ КАРТИНКА*/
const popupWithImageElement = new PopupWithImage('.popup_img_open');

/*ДЛЯ ФОРМЫ ЗАПОЛНЕНИЯ ПРОФИЛЯ*/
//отображает информацию о пользователе на странице
const userInfoElement = new UserInfo({
  userNameSelector: ".profile__title",
  aboutUserSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar",
});
//Редактирование профиля //сабмит 
const popupWithFormProfileElement = new PopupWithForm('.popup_profile_open', (userInfo) => {
  popupWithFormProfileElement.changeSubmitButtonText("Сохранение...");
  api.changeUserData({
    name: userInfo.userName,
    about: userInfo.aboutUser,
  }).then((res) => {
    userInfoElement.setUserInfo(res),
      setTimeout(() => {
        popupWithFormProfileElement.close();
        popupWithFormProfileElement.changeSubmitButtonText('Сохранить');
      }, 500);
  })
    .catch((e) => {
      popupWithFormProfileElement.changeSubmitButtonText('Ошибка!');
      console.error(e?.reason || e?.message);
    })
    .finally(() => {
      popupWithFormProfileElement.changeSubmitButtonText('Сохранить');
    });
});
/*ДЛЯ ФОРМЫ ИЗМЕНЕНИЯ АВАТАРА ПРОФИЛЯ*/
//Редактирование Аватара профиля //сабмит 
const popupWithFormAvatarElement = new PopupWithForm('.popup_avatar', (avatar) => {
  popupWithFormAvatarElement.changeSubmitButtonText("Сохранение...");
  //validationFormAvatar.disableSubmitButton();
  api.changeAvatarUrl(avatar)
    .then(() => {
      //console.log(avatar),//ответ
        userInfoElement.setUserInfo(avatar);
      setTimeout(() => {
        popupWithFormAvatarElement.close();
        popupWithFormAvatarElement.changeSubmitButtonText('Сохранить');
      }, 500);
    })
    .catch((e) => {
      console.error(e?.reason || e?.message);
    })
    .finally(() => {
      popupWithFormAvatarElement.changeSubmitButtonText('Сохранить');
    });
});
/*ДЛЯ РЕДАКТИРОВАНИЯ ФОРМЫ ДОБАВЛЕНИЯ КАРТОЧКИ МЕСТА*/
// Создадим экземпляр карточки
//контейнер с карточками - отвечает за отрисовку элементов на странице
const cardSectionElement = new Section((data) => { //отвечает за отрисовку данных на странице   
  const cardElement = createCard(data);//форма карточки - template элемент     
  cardSectionElement.addItem(cardElement);//// Добавляем в DOM
},
  containerSelector//контейнер с карточками
);
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

//Создание карточки через форму //сабмит 
const popupWithFormMestoElement = new PopupWithForm('.popup_addplace_open', (data) => {
  popupWithFormMestoElement.changeSubmitButtonText("Сохранение...");
  api.creatCardApi({
    name: data.cardName,
    link: data.urlCard,
  }).then((data) => {
    cardSectionElement.addItem(createCard(data));
    setTimeout(() => {
      popupWithFormMestoElement.close();
      popupWithFormMestoElement.changeSubmitButtonText('Сохранить');
    }, 500);
  })
    .catch((e) => {
      popupWithFormMestoElement.changeSubmitButtonText('У Вас ошибка!');
      console.error(e?.reason || e?.message);
    })
})

/*ДЛЯ ФОРМЫ ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ КАРТОЧКИ МЕСТА*/
const popupWithDeleteCardElement = new PopupWithDeleteCard('.popup_addplace_delete', (deleteCardInstance) => {
  popupWithDeleteCardElement.changeSubmitButtonText("Удаление...");
  const cardId = deleteCardInstance.getCardId();// получила id карточки 
  formDeleteValidator.enableSubmitButton();// делаю активной кнопку Да//сабмита
  api.deleteCardApi(cardId)
    .then(() => {
      deleteCardInstance.deleteCard();//удаление карточки
      popupWithDeleteCardElement.changeSubmitButtonText('Да');
      setTimeout(() => {
        formDeleteValidator.enableSubmitButton();// делаю активной кнопку Да    
        popupWithDeleteCardElement.close();//закрываю попап      
      }, 500);
    })
    .catch((e) => {
      popupWithDeleteCardElement.changeSubmitButtonText('Ошибка!');
      console.error;
    })
    .finally(() => {
      popupWithDeleteCardElement.changeSubmitButtonText('Да');
    });
});

//обработчик кнопки "Добавить карточку" для формы добавления карточки - по умолчанию
const addCardButtonHandler = () => {
  popupWithFormMestoElement.open();//открываю форму
  formAddNewCard.reset();// очищаю поля формы  
  formAddNewCardValidator.resetForm();// убираю все тексты ошибок и подчеркивание в форме
  formAddNewCardValidator.disableSubmitButton()//делаю disable форме и кнопке Сохранить  
};
//обработчик кнопки "Добавить профиль" для формы заполнения профиля
const popupProfileButtonHandler = () => {
  popupWithFormProfileElement.setInputValue(userInfoElement.getUserInfo());//добавляется заполнение полей 
  popupWithFormProfileElement.open();//открываю профиль
  formProfileValidator.resetForm();//убираю тексты ошибок
  formProfileValidator.enableSubmitButton();// делаю активной кнопку Сохранить 
};
//обработчик кнопки "Добавить аватар" для формы изменения аватара
const popupAvatarButtonHandler = () => {
  popupWithFormAvatarElement.setInputValue(userInfoElement.getUserInfo());//добавляется заполнение полей 
  popupWithFormAvatarElement.open();//открываю профиль
  formAvatarValidator.resetForm();//убираю тексты ошибок
  formAvatarValidator.enableSubmitButton();// делаю активной кнопку Сохранить 
  popupWithFormAvatarElement.changeSubmitButtonText('Сохранить');
};

//при открытии формы добавления карточки - заполнение по умолчанию
buttonOpenPopupAddNewCard.addEventListener('click', addCardButtonHandler);
//при открытии формы заполнения профиля - заполнение по умолчанию
buttonOpenPopupProfile.addEventListener("click", popupProfileButtonHandler);
//при открытии формы заполнения аватара профиля - заполнение по умолчанию
buttonOpenPopupAvatar.addEventListener('click', popupAvatarButtonHandler);

/////////////////////////////////////////////////////////////////
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
  //console.log(card) ;   
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
function createCard(data) {
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

//Открытие попапа подтверждения удаления на клик по мусорке
const handleDeleteClick = (id, card) => {
  popupWithDeleteCardElement.changeSubmitButtonText('Да');
  popupWithDeleteCardElement.open(id, card);
}
//
popupWithImageElement.setEventListeners();
popupWithFormProfileElement.setEventListeners();
popupWithFormAvatarElement.setEventListeners();
popupWithFormMestoElement.setEventListeners();
popupWithDeleteCardElement.setEventListeners();