export class Card {
  constructor(data, templateSelector, handleCardClick) {/*создает новый элемент на основе прототипа*/
    this._name = data.name;//name
    this._link = data.link;//link
    this._templateSelector = templateSelector; // записали селектор в приватное поле
    this._handleCardClick = handleCardClick;//метод открывает попап с картинкой при клике на карточку
  }

  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const newTemplate = document.querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);
    // вернём DOM-элемент карточки
    return newTemplate;
  }
  // Добавим данные для всплывающей картинки
  _setData() {
    const fullImage = this._newCard.querySelector('.element__img');//нашла фото в попапе
    const nameFullImage = this._newCard.querySelector('.element__title'); //имя места - из открывающегося попапа картинки
    /*для всплывающей картинки*/
    fullImage.src = this._link;
    nameFullImage.textContent = this._name;
    fullImage.alt = this._name;
  }
  //метод публичный - подготовит карточку к публикации
  generateCard() { // Запишем разметку в приватное поле _newCard // у других элементов появится доступ к ней.
    this._newCard = this._getTemplate();
    this._setEventListeners(); // вызовите _setEventListeners 
    this._setData();
    // Вернём элемент наружу
    return this._newCard;
  }
  //метод добавляет обработчики
  _setEventListeners() {
    /*раскрывается popup для всплывающей картинки*/
    this._newCard.querySelector('.element__img').addEventListener('click', () => this._cardPopupOpen());// откройте попап    
    //добавление лайка на кнопку 
    this._newCard.querySelector('.element__like').addEventListener("click", () => this.addLike());
    /* удаление карточки*/
    this._newCard.querySelector('.element__delete').addEventListener('click', () => this.deleteCard());
  }
  //добавление лайка на кнопку//публичный метод
  addLike() {
    this._newCard.querySelector('.element__like').classList.toggle('element__like_active');
  }
  //удаление карточки//публичный метод
  deleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }
  //Открытие поппапа для всплывающей картинки
  _cardPopupOpen() {
    this._handleCardClick(this._name, this._link);
  }
}