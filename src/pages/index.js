import './index.css'; // добавьте импорт главного файла стилей
import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { PopupWithDeleteCard } from "../components/PopupWithDeleteCard.js";
import {
  /*initialCards, */formSelectors, buttonOpenPopupProfile, nameInputProfile,
  proffessionInputProfile, formProfile, buttonOpenPopupAddNewCard,
  formAddNewCard,  formAddNewCardValidator, formProfileValidator, containerSelector, 
  nameInputAddNewCard, linkImputAddNewCard, formAvatar, formAvatarValidator, buttonOpenPopupAvatar, 
  buttonDeleteCard, formDelete, buttonOpenPopupDelete, formDeleteValidator,
} from '../const/const.js';
import { data } from 'autoprefixer';
//для карточек
export const apiConfig = {///1
  url: "https://mesto.nomoreparties.co/v1/cohort-74",
  headers: {
    "Content-Type": "application/json",
    "authorization": "ae84b954-9fdb-4967-8466-ffa99a62c9a2",
  },
};
//API
const api = new Api(apiConfig);///2

//ДЛЯ ФОРМЫ - ВСПЛЫВАЮЩАЯ КАРТИНКА
const popupWithImageElement = new PopupWithImage('.popup_img_open');
popupWithImageElement.setEventListeners();

/*ДЛЯ ФОРМЫ ЗАПОЛНЕНИЯ ПРОФИЛЯ*/
//отображает информацию о пользователе на странице
const userInfoElement = new UserInfo({
  userNameSelector: ".profile__title",
  aboutUserSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar",
});
//обработчик кнопки "Добавить профиль" для формы заполнения профиля
const popupProfileButtonHandler = () => {
  popupWithFormProfileElement.setInputValue(userInfoElement.getUserInfo());//добавляется заполнение полей 
  popupWithFormProfileElement.open();//открываю профиль
  formProfileValidator.resetForm();//убираю тексты ошибок
  formProfileValidator.enableSubmitButton();// делаю активной кнопку Сохранить 
};
//при открытии формы заполнения профиля - заполнение по умолчанию
buttonOpenPopupProfile.addEventListener("click", popupProfileButtonHandler);
//Сабмит заполнения профиля
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
////////АВАТАР///////////
//обработчик кнопки "Добавить аватар" для формы изменения аватара
const popupAvatarButtonHandler = () => {
  popupWithFormAvatarElement.setInputValue(userInfoElement.getUserInfo());//добавляется заполнение полей 
  popupWithFormAvatarElement.open();//открываю профиль
  formAvatarValidator.resetForm();//убираю тексты ошибок
  formAvatarValidator.enableSubmitButton();// делаю активной кнопку Сохранить 
  popupWithFormAvatarElement.changeSubmitButtonText('Сохранить');
};
buttonOpenPopupAvatar.addEventListener('click', popupAvatarButtonHandler);

//Изменение Аватара
const popupWithFormAvatarElement  = new PopupWithForm('.popup_avatar', (avatar) => {
  //console.log(avatar);//адрес
  popupWithFormAvatarElement.changeSubmitButtonText("Сохранение...");
  //validationFormAvatar.disableSubmitButton();
  api.changeAvatarUrl(avatar)
  .then(() => {
      console.log(avatar),//ответ
      //userInfoElement.changeAvatarUrl(res),
      userInfoElement.setUserInfo(avatar);
      //popupWithFormAvatarElement.changeSubmitButtonText('Готово!');
      setTimeout(() => {
        popupWithFormAvatarElement.close();
        popupWithFormAvatarElement.changeSubmitButtonText('Сохранить');
      }, 500);
    })
    .catch((e) => {
      //popupWithFormAvatarElement.changeSubmitButtonText('Ошибка!');
      console.error(e?.reason || e?.message);
    })
    .finally(() => {
      popupWithFormAvatarElement.changeSubmitButtonText('Сохранить');      
    }); 
});  
  //userInfoElement.setUserInfo({ userName: nameInputProfile.value, aboutUser: proffessionInputProfile.value });
  //userInfoElement.getUserInfo({ userName: nameInputProfile.value, aboutUser: proffessionInputProfile.value });
/*ДЛЯ РЕДАКТИРОВАНИЯ ФОРМЫ ДОБАВЛЕНИЯ КАРТОЧКИ МЕСТА*/
// Создадим экземпляр карточки
//контейнер с карточками - отвечает за отрисовку элементов на странице
const cardSectionElement = new Section((data) => { //отвечает за отрисовку данных на странице   
  const cardElement = createCard(data);//форма карточки - template элемент     
      cardSectionElement.addItem(cardElement);//// Добавляем в DOM
    },
    containerSelector//контейнер с карточками
);
/////*Создаем и возвращаем карточки*/
//самовызывающаяся асинхронная функция
(async() => {
api.getInitialCards()  ///3 //api.getAllTodos
  .then((data) => {
  cardSectionElement.renderItems(data);//в классе Секцион вызвать функцию renderItems  
  //console.log(data)//это массив с карточками
  //console.log(cardSectionElement);//секция с карточками
});
})();//самовызывающаяся асинхронная функция

// сабмит!!!!//создание карточки в форме
const popupWithFormMestoElement = new PopupWithForm('.popup_addplace_open', (data) => {
  popupWithFormMestoElement.changeSubmitButtonText("Сохранение...");
   //Вызываем  FormValidator для формы добавления карточки
   //formAddNewCardValidator.disableSubmitButton();
  //formAddNewCardValidator.enableValidation(formSelectors, formAddNewCard);
  api.creatCardApi({
    name:  data.cardName,
    link:  data.urlCard,    
    }).then((data) => {
      cardSectionElement.addItem(createCard(data));
      //popupWithFormMestoElement.setEventListeners();      
      setTimeout(() => {
        popupWithFormMestoElement.close();
        popupWithFormMestoElement.changeSubmitButtonText('Сохранить');
      }, 500);
    })
      .catch((e) => {
        popupWithFormMestoElement.changeSubmitButtonText('У Вас ошибка!');
        console.error(e?.reason || e?.message);
      })
      .finally(() => {
        popupWithFormMestoElement.changeSubmitButtonText('Сохранить');        
      });      
    }) 

////
/*api.getUserInfo() 
  .then((userInfoElement) => {
    userInfoElement.setUserInfo({ userName, aboutUser })
console.log(userInfoElement);
});*/

//обработчик кнопки "Добавить" для формы добавления места - по умолчанию
const addCardButtonHandler = () => {
  popupWithFormMestoElement.open();//открываю форму
  formAddNewCard.reset();// очищаю поля формы  
  formAddNewCardValidator.resetForm();// убираю все тексты ошибок и подчеркивание в форме
  formAddNewCardValidator.disableSubmitButton()//делаю disable форме и кнопке Сохранить
  
};
buttonOpenPopupAddNewCard.addEventListener('click', addCardButtonHandler);
////////////////
popupWithFormProfileElement.setEventListeners();  
popupWithFormAvatarElement.setEventListeners();
popupWithFormMestoElement.setEventListeners();
//PopupWithDeleteCardElement.setEventListeners();
/////////////////
//Вызываем  FormValidator для формы добавления карточки
formAddNewCardValidator.enableValidation(formSelectors, formAddNewCard);
//Вызываем FormValidator для формы профиля
formProfileValidator.enableValidation(formSelectors, formProfile);
//Вызываем FormValidator для формы аватара
formAvatarValidator.enableValidation(formSelectors, formAvatar);
//Вызываем FormValidator для формы удаления карточки
formDeleteValidator.enableValidation(formSelectors, formDelete);
////////

//добавление лайка
/*const handleAddLike = (id) => {
  console.log(handleAddLike);
  api.addLikeCardData(id)
     .then(() => {
      card.addLike()(id);
     })     
};*/
//удаление лайка
/*const handleDeleteLike = (card) => {//
  console.log(handleDeleteLike);
  api.deleteLikeCardData(card.id)
     .then(() => {
      card.deleteLike(id);
     })     
};*/
/////////функция для установки лайков и удаления лайков
function handleLikeClick(card) {
   card.setLoadingState('Загрузка...');////текст загрузки   
   //console.log(card);
  //const cardIsLiked = card._isLiked;
  const cardId = card.getCardId();// получила id карточки  
  if (card.checkIsLiked()) {//проверяю стоит мой лайк или нет, если есть
    api.deleteLikeCardData(cardId)//удаляю лайк
     .then((res) => {      
      card.deleteLike(res.likes.length) /*(likes?.length)*///количество лайков;
     })   
      /*.catch((e) => {
        card.setLoadingState('Ошибка');//текст загрузки
        console.error;//ошибка
      });*/
    } else {//если нет лайка
    api.addLikeCardData(cardId)//добавляю лайк
     .then((res) => {
      card.addLike(res.likes.length);//количество лайков
     })     
      .catch((e) => {
        card.setLoadingState('Ошибка');////текст загрузки
        console.error;//ошибка
      });
  }  
}
//////////////////////////////////////////////////////////////////
//обработчик кнопки "УДАЛИТЬ КАРТОЧКУ" для формы удаления
/*const popupDeleteButtonHandler = () => {
 // PopupWithDeleteCardElement.setInputValue(userInfoElement.getUserInfo());//добавляется заполнение полей 
  PopupWithDeleteCardElement.open();//открываю попап подтверждения
  //formDeleteValidator.resetForm();//убираю тексты ошибок
  //formDeleteValidator.enableSubmitButton();// делаю активной кнопку Да
  PopupWithDeleteCardElement.changeSubmitButtonText('Да');
};*/
//buttonOpenPopupDelete.addEventListener('click', popupDeleteButtonHandler);
//ДЛЯ ФОРМЫ - УДАЛИТЬ КАРТОЧКУ
const PopupWithDeleteCardElement = new PopupWithDeleteCard('.popup_addplace_delete', (deleteCardInstance) => {
  PopupWithDeleteCardElement.changeSubmitButtonText("Удаление...");
  //const cardId = deleteCardInstance.getCardId();// получила id карточки 
  //validationFormDeleteCard.disableSubmitButton();
// сабмит!!!!//создание карточки в форме  
  api.deleteCardApi(userIdCard)
  .then(() => {
    deleteCardInstance.deleteCard(userIdCard);
    PopupWithDeleteCardElement.changeSubmitButtonText('Да');
    setTimeout(() => {
      PopupWithDeleteCardElement.close();
      //validationFormDeleteCard.enableSubmitButton();
    }, 500);
  })
  .catch((e) => {
    PopupWithDeleteCardElement.changeSubmitButtonText('Ошибка!');
    console.error;
  })
  .finally(() => {
    PopupWithDeleteCardElement.changeSubmitButtonText('Да');        
   });
  }); 
 /////////////////////////////////

///////ЗДЕСЬ ОСТАНОВИЛАСЬ!!!!!07-18//**************** */
//Открытие попапа подтверждения удаления на клик по мусорке
const handleDeleteClick = (id, card) => {
  PopupWithDeleteCardElement.changeSubmitButtonText('Да');
  PopupWithDeleteCardElement.open(id, card);
 // PopupWithDeleteCardElement._setConfirmAction(handleDeleteClick);
}
PopupWithDeleteCardElement.setEventListeners();
//////Создаём карточку и возвращаем наружу
function createCard(data) { 
  const card = new Card(data, '.template', { //передаем три аргумента: обьект с данными, 
  //метод удаления карты по id, селектор темплейта
  handleOpenPopupImage: popupWithImageElement.open,  
  handleDeleteClick: () => handleDeleteClick(card),   
  handleLikeClick: () => handleLikeClick(card),   
  }, userInfoElement.getUserId())
  //console.log(card); 
  return card.generateCard();//// Создаём карточку и возвращаем наружу//удаление, открытие и лайк
}
// Запрашиваю карточки и данные пользователя
//!!!Массив промиссов в нем и данные о карточках и о пользователях// часть данных о пользователях
//прокидывать в карточку
let userIdCard;
Promise.all([api.getUserCardsData(), api.getInitialCards()])
.then(([ UserInfoAnswer, cardsAnswer]) => {  
 userIdCard = UserInfoAnswer._id; 
 userInfoElement.setUserInfo(UserInfoAnswer);
 cardSectionElement.renderItems(cardsAnswer);
  //console.log(userInfo.id);  
})
.catch((e) => console.error(e?.reason || e?.message));



//удаление карточки//
/*const handleDeleteCard = async(card) => {
  //let id = 
  const data = await api.deleteCardApi(card.id)
     //console.log(data);
     card.deleteCard();
     card = null;   
};*/
/*const handleDeleteCard = (id, card) => {
  if (card.userId === card.ownerId) {
      api.deleteCard(id)
      .then( ()=> {
          deletePopup.close();
          card.delete();
      })
  }*/

///////////
// Запрашиваю карточки и данные пользователя
//let userId;
/*const userInfo = new Promise((resolve) => {
  setTimeout(() => {
    //console.log(resolve);
    resolve({ userName: nameInputProfile.value, aboutUser: proffessionInputProfile.value, id: '123'})
    userId = { userName: nameInputProfile.value, aboutUser: proffessionInputProfile.value, id: '123'};
  }, 500);
});*/
////
//!!!Массив промиссов в нем и данные о карточках и о пользователях// часть данных о пользователях
//прокидывать в карточку
/*Promise.all([api.getInitialCards(), userInfo])
.then(([data, userInfo]) => {
data.forEach(element => {
  //console.log(element);// у него есть массив лайков, id , name, link - это карточка
  createCard(element, userInfo.id);
  //console.log(userInfo);// у него есть name, aboutuser, id - это профиль
});
})*/