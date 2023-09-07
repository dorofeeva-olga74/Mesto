import { FormValidator } from '../components/FormValidator.js';
import { Api } from '../components/Api.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Section } from "../components/Section.js";
import { createCard } from '../pages/index.js';
import { PopupWithDeleteCard } from "../components/PopupWithDeleteCard.js";

//для карточек
const apiConfig = {///1
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
const popupWithFormAvatarElement = new PopupWithForm('.popup_avatar', ({ avatar }) => {
  popupWithFormAvatarElement.changeSubmitButtonText("Сохранение...");
  //validationFormAvatar.disableSubmitButton();
  api.changeAvatarUrl({ avatar })
    .then(() => {
      //console.log(avatar),//ответ
      userInfoElement.setAvatar(avatar);
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
//Для нахождения контейнера с карточками
const containerSelector = '.elements';
/*ДЛЯ РЕДАКТИРОВАНИЯ ФОРМЫ ДОБАВЛЕНИЯ КАРТОЧКИ МЕСТА*/
//контейнер с карточками - отвечает за отрисовку элементов на странице
const cardSectionElement = new Section((data) => { //отвечает за отрисовку данных на странице   
  const cardElement = createCard(data);//форма карточки - template элемент     
  cardSectionElement.addItem(cardElement);//// Добавляем в DOM
},
containerSelector//контейнер с карточками
);
//Создание карточки через форму //сабмит 
const popupWithFormMestoElement = new PopupWithForm('.popup_addplace_open', (data) => {
  popupWithFormMestoElement.changeSubmitButtonText("Сохранение...");
  api.creatCardApi({
    name: data.cardName,
    link: data.urlCard,
  }).then((data) => {
    cardSectionElement.addItem(createCard(data));
    setTimeout(() => {
      popupWithFormMestoElement.close();//закрывается форма
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
//Открытие попапа подтверждения удаления на клик по мусорке
const handleDeleteClick = (id, card) => {
  popupWithDeleteCardElement.changeSubmitButtonText('Да');
  popupWithDeleteCardElement.open(id, card);
}

//для формы добавления нового профиля
const buttonOpenPopupProfile = document.querySelector(".profile__button_add_change");//кнопка открытия формы 
//const nameInputProfile = document.querySelector("#name-input");
//const proffessionInputProfile = document.querySelector("#proffession-input");
const formProfile = document.forms["edit-form"];//сама форма //нахожу форму заполнения профиля по name
// для формы добавления места
const buttonOpenPopupAddNewCard = document.querySelector('.profile__button_add_card');//кнопка открытия формы
const formAddNewCard = document.forms['add-place-form'];//нахожу форму добавления места по name
//const nameInputAddNewCard = document.querySelector(".popup__input_card_name");//значения полей формы контента
//const linkImputAddNewCard = document.querySelector(".popup__input_card_link");//значения полей формы контента
//const buttonDeleteCard = document.querySelector(".delete-button");//нахожу кнопку удаления карты
//для формы изменения аватара
const formAvatar = document.forms["avatar-form"];//сама форма //нахожу форму изменения аватара по name
const buttonOpenPopupAvatar = document.querySelector('.profile__avatar-set');
//для формы удаления карточки
const formDelete = document.forms["delete-card-form"];//сама форма //нахожу форму удаления карточки по name
//const buttonOpenPopupDelete = document.querySelector("element__delete");
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

//Для вызова FormValidator для формы добавления карточки
const formAddNewCardValidator = new FormValidator(formSelectors, formAddNewCard);
//Для вызова FormValidator для формы профиля
const formProfileValidator = new FormValidator(formSelectors, formProfile);
//Для вызова FormValidator для формы аватара
const formAvatarValidator = new FormValidator(formSelectors, formAvatar);
//Для вызова FormValidator для формы удаления
const formDeleteValidator = new FormValidator(formSelectors, formDelete);

export {
  api, popupWithImageElement, userInfoElement, popupWithFormProfileElement, 
  popupWithFormAvatarElement, cardSectionElement, popupWithFormMestoElement, 
  popupWithDeleteCardElement, addCardButtonHandler, popupProfileButtonHandler, 
  popupAvatarButtonHandler, handleDeleteClick,
  formSelectors, buttonOpenPopupProfile, formProfile, buttonOpenPopupAddNewCard,
  formAddNewCard, formAddNewCardValidator, formProfileValidator, formAvatar,
  formAvatarValidator, buttonOpenPopupAvatar, formDelete, formDeleteValidator
}

/*const initialCards = [
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
];*/