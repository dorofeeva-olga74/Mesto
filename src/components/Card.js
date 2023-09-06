export class Card {
  constructor(data, templateSelector, handlers, userId) {/*создает новый элемент на основе прототипа*/
    const { handleOpenPopupImage, handleLikeClick, handleDeleteClick } = handlers;
    this._newCard = data.newCard;
    this.handlers = handlers;
    this._name = data.name;//name
    this._cardId = data._id;//id карточки
    this._link = data.link;//link 
    this._likes = data.likes;//массив лайков    
    this._userId = userId;//мой ID  
    this._isLiked = data.likes.some((like) => like._id === this._userId);//сравнение id для лайков
    this._liked = document.querySelector('.element__like');//кнопка лайка дом документ
    this._ownerId = data.owner._id; //чужой ID
    this.likesQuantity = this._likes.length || 0;//цифры счетчика лайков
    this.handleLikeClick = handleLikeClick;
    this.handleDeleteClick = handleDeleteClick;//удаление карточки  //index.js
    this._templateSelector = templateSelector; // записали селектор в приватное поле
    this.handleOpenPopupImage = handleOpenPopupImage;//метод открывает попап с картинкой при клике на карточку
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
    this.likesQuantity.textContent = this._likes.length || 0;
    /*мой лайк*/
    this._isLiked = this._likes.some((like) => like._id === this._userId);
    /*кнопка - "Удалить карточку"*/
    this._deleteButton = this._newCard.querySelector('.element__delete');
    //console.log(this._likes);
    if (this._isLiked) {
      this.likeButton.classList.add('element__like_active');
      this.likesQuantity.textContent = this._likes.length || 0;
    }
  }
  //Лайки   
  _setLikesCount(quantity) {//
    if (quantity === undefined) return;
    this._liked.textContent = quantity;
  }
  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const newTemplate = document.querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);
    // вернём DOM-элемент карточки
    return newTemplate;
  }
  //метод добавляет обработчики
  setEventListeners() {
    /*раскрывается popup для всплывающей картинки*/
    this._newCard.querySelector('.element__img').addEventListener('click', () => this._handleOpenPopupImage(this._name, this._link));// открытие попапа с картинкой    
    /*добавление лайка на кнопку */
    this._newCard.querySelector('.element__like').addEventListener("click", () => this._handleLikeClick());// добавление лайка на кнопку
    /* открытие попапа подтверждения удаления карточки при нажатии на мусорку*/
    this._newCard.querySelector('.element__delete').addEventListener('click', () => this._openDeletePopup());
  }
  //Открывает попап удаления карточки
  _openDeletePopup() {
    this.handleDeleteClick();
  }
  _handleLikeClick() {
    this.handleLikeClick();
  }
  //устанавливает состояние при загрузке(текст загрузки)
  setLoadingState(state) {
    this._newCard.querySelector('.element__like-counter').textContent = state;
  }
  //удаление карточки//публичный метод
  deleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }
  //получение id карточки 
  getCardId() {
    return this._cardId;
  }
  //проверка лайка - есть активный лайк или нет
  checkIsLiked() {
    return this.likeButton.classList.contains('element__like_active');
  }
  //добавление лайка на кнопку//публичный метод
  addLike(likesQuantity) {
    this.likeButton.classList.add('element__like_active');
    this.likesQuantity.textContent = likesQuantity;
  }
  //удалить лайк
  deleteLike(likesQuantity) {
    this.likeButton.classList.remove('element__like_active');
    this.likesQuantity.textContent = likesQuantity;
  }
  //возвращает количество лайков у карточки и проверяет есть ли мой лайк
  _checkIsOwnLikesExist() {
    return this._likes && this._likes.some((item) => item._ownerId === this._userId);
  }
  ///метод добавления собственного лайка
  _setOwnActiveLikes(likesQuantity) {
    if (this._checkIsOwnLikesExist()) {
      this.likeButton.classList.add('element__like_active');
      this.likesQuantity.textContent = likesQuantity;
    }
  }
  //метод публичный - подготовит карточку к публикации/render
  generateCard() { // Запишем разметку в приватное поле _newCard // у других элементов появится доступ к ней.
    this._newCard = this._getTemplate();
    this.setEventListeners(); // вызовите _setEventListeners //удаление, открытие и лайк
    this._setData();
    this._isLiked = this._likes.some((like) => like._id === this._userId);
    if (this._ownerId === this._userId) {
      this._deleteButton.hidden = false;
    }
    if (this._isLiked) {
      this.addLike();
      this.likesQuantity.textContent = this._likes.length || 0;//все правильно
    }
    // Вернём элемент наружу       
    return this._newCard;
  }
  //Открытие поппапа для всплывающей картинки
  _handleOpenPopupImage() {
    this.handleOpenPopupImage(this._name, this._link);
  }
}   