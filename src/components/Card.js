import { data } from "autoprefixer";

//import {buttonDeleteCard } from '../const/const.js';
export class Card {
  constructor(data,/* deleteCard,*//* handleDelete, */templateSelector, handlers, userId) {/*создает новый элемент на основе прототипа*/
   const { link, name, likes, owner, _id } = data;
   const { handleOpenPopupImage, handleLikeClick, handleDeleteClick } = handlers;
   //console.log(data);// карточки
  this._newCard = data.newCard;
  this.handlers  = handlers;  
  this._name = data.name;//name
  this._cardId = data._id;//id карточки
  this._link = data.link;//link 
  this._likes = data.likes;//массив лайков    
  //this._userId = localStorage.getItem('userId'); 
  this._userId = userId;//мой ID  
  this._isLiked = data.likes.some((like) => like._id === this._userId);
  this._liked = document.querySelector('.element__like');//liked 
  //let likesQuantity = data.likes.forEach((el) => this._liked.textContent = this._likes.length);
// console.log(likesQuantity);  
  this._ownerId = data.owner._id; //чужой ID
  this.likesQuantity = this._likes.length || 0;//цифры счетчика лайков
 //console.log(this.likesQuantity);
  this.handleLikeClick = handleLikeClick;  
  this.handleDeleteClick = handleDeleteClick;//удаление карточки  //d index.js
  this._templateSelector = templateSelector; // записали селектор в приватное поле
  this.handleOpenPopupImage = handleOpenPopupImage;//метод открывает попап с картинкой при клике на карточку
    
   // this._popupButonDelete = document.querySelector('.element__delete');//кнопка открытия попа удаления карточки
    //this._submitButtonSelector = submitButtonSelector;//'Да' - сабмит//popup__button_delete-card
    //this._deleteCardClick = deleteCardClick;//метод открывает попап для удаления крточки
    //this.isLiked = false;   
  }
  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const newTemplate = document.querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);
    // вернём DOM-элемент карточки
    return newTemplate;    
  }
  // Данные для карточки ОТПРАВЛЕНИЕ
  _setData() {
    /*для всплывающей картинки*/
    const fullImage = this._newCard.querySelector('.element__img');//нашла фото в попапе
    const nameFullImage = this._newCard.querySelector('.element__title'); //имя места - из открывающегося попапа картинки
    fullImage.src = this._link;    
    nameFullImage.textContent = this._name;
    fullImage.alt = this._name;
    /*для лайка*/    
    this.likeButton = this._newCard.querySelector('.element__like');    
    this.likesQuantity = this._newCard.querySelector('.element__like-counter');
    this.likesQuantity.textContent = this._likes.length;
    /*мой лайк*/
    this._isLiked = this._likes.some((like) => like._id === this._userId);    
    /*для мусорки*/
    this._deleteButton = this._newCard.querySelector('.element__delete');
    /*if (this._isLiked) {
      this.likeButton.classList.add('element__like_active');
    } */ 
    //console.log(this._deleteButton);    
  }  
  //////Лайки   
  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const newTemplate = document.querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);
    // вернём DOM-элемент карточки
    return newTemplate;    
  }  
  ////Удаление видимости мусорки
  /*_manageTrashButtonVisibility() {
    //console.log(this._userId);
    if (this._ownerId === this._userId) {      
     //this._newCard.querySelector(".element__delete").hidden = false;      
    }
  }*/
 //метод добавляет обработчики
 setEventListeners() {
  /*раскрывается popup для всплывающей картинки*/
  this._newCard.querySelector('.element__img').addEventListener('click', () => this._handleOpenPopupImage(this._name, this._link));// открытие попапа с картинкой    
  //добавление лайка на кнопку 
  //this._newCard.querySelector('.element__like').addEventListener("click", () => this.addLike()/*this._handleAddLikeClick());// добавление лайка на кнопку
  //добавление лайка на кнопку 
  this._newCard.querySelector('.element__like').addEventListener("click", () => this._handleLikeClick());// добавление лайка на кнопку
  //удаление лайка 
  //this._newCard.querySelector('.element__like').addEventListener("click", () => this.deleteLike());
  /* удаление карточки*/   
  //this._newCard.querySelector('.element__delete').addEventListener('click', () => this.deleteCard(this._cardId, this));
  this._newCard.querySelector('.element__delete').addEventListener('click', () => this._openDeletePopup());
  
  //console.log(this._handleDeleteCard);
/* удаление карточки через попап*/
 //this._newCard.querySelector('.element__delete').addEventListener('click', () => this.popupOpenDeleteCard());//на клик - функция-колбек, 
 //которая открывает попап подтверждения удаления
}

//Открывает попап удаления карточки
_openDeletePopup() {
  this.handleDeleteClick();
}
_handleLikeClick() {//
  this.handleLikeClick();
} 
//удаление карточки из попапа
_deleteCardPopup() {////*** */
  //this._deletePopup.classList.add('.popup_opened');
  this.deleteCard(this._cardId, this);
  
  //this._newCard.remove();
  //this._newCard = null;
}
  /*_handleImageClick() {
    this.handleImageClick(this._name, this._link);
  }*/
  //устанавливает состояние при загрузке(текст загрузки)
  setLoadingState(state) {
    this._newCard.querySelector('.element__like-counter').textContent = state;
  }
  //удаление карточки//публичный метод// ///////////////////
  deleteCard() {
   //api.deleteCardApi(id)
    this._newCard.remove();
    //this._newCard = null;
  }
  
  getCardId() {
  return this._cardId;
  }
//проверка лайка - есть или нет
  checkIsLiked() {//
    this.likeButton.classList.contains('element__like_active');
  }
  //добавление лайка на кнопку//публичный метод
  addLike(likesQuantity) {
    //console.log(like);
    this.likeButton.classList.add('element__like_active');    
    this.likesQuantity.textContent = likesQuantity;    
  } 
  ////удалить лайк
  deleteLike(likesQuantity) {
    this.likeButton.classList.remove('element__like_active');   
    this.likesQuantity.textContent = likesQuantity;        
  }
  
  //возвращает количество лайков у карточки 
  _checkIsOwnLikesExist() {
    //console.log(this._ownerId);
    return this._likes && this._likes.some((item) => item._ownerId === this._userId);////////
  }  
  ///метод добавления собственного лайка
  _setOwnActiveLikes() {
    if (this._checkIsOwnLikesExist()) {
      this.likeButton.classList.add('element__like_active');
    }
  }  
  //метод публичный - подготовит карточку к публикации/render
  generateCard() { // Запишем разметку в приватное поле _newCard // у других элементов появится доступ к ней.
    //this._manageTrashButtonVisibility();
    this._newCard = this._getTemplate();    
    this.setEventListeners(); // вызовите _setEventListeners //удаление, открытие и лайк
    this._setData();//для всплывающей картинки    
    this._setOwnActiveLikes();
    this._quantityLike();
    this._newCard._id = this._cardId;
    this._deleteButton = this._newCard.querySelector('.element__delete'); 
     if (this._ownerId === this._userId) {      
      this._deleteButton.hidden = false;
    }  
    this.likeButton = this._newCard.querySelector('.element__like');    
    this.likesQuantity = this._newCard.querySelector('.element__like-counter');
    this.likesQuantity.textContent = this._likes.length; 
    if (this._isLiked) {
      this.addLike();
    } 
    /*if (this._isLiked) {
      this.deleteLike();//addLike();
    };*/
    //this.setEventListeners();    
    // Вернём элемент наружу       
    return this._newCard;      
  }  
  //Открытие поппапа для всплывающей картинки
  _handleOpenPopupImage() {
    this.handleOpenPopupImage(this._name, this._link);
  }   
  //метод показывает количество лайков карточки
  _quantityLike() {    
    this._newCard.querySelector('.element__like-counter').textContent = this._likes.lenght;
  }   
  /*like() {
    this.isLiked = !this.isLiked;
  }*/  
  //удаление карточки//публичный метод// 
/*handleDeleteCard() {
  api.deleteCardApi(id)
     .then(() => {
      this._newCard.remove();
      this._newCard = null;
})
};*/
///////////////////
//добавление лайка на кнопку//публичный метод
/*addLike() {
  this._newCard.querySelector('.element__like').classList.toggle('element__like_active');
}
//удаление карточки//публичный метод
deleteCard() {
  this._newCard.remove();
  this._newCard = null;
}*/
//////////////////////////////  
  //Открытие поппапа для удаления карточки
  /*popupOpenDeleteCard() {////////////передать ip
    console.log(this._submitButtonSelector)
    this._deleteCardClick(this._submitButtonSelector);
  }*/
 
}