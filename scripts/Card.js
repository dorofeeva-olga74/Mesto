import { initialCards, popupFullImage, popupCloseButton } from './const.js';
export class Card {
  constructor(data, templateSelector) {/*создает новый элемент на основе прототипа*/
    this._name = data.name;//name
    this._link = data.link;//link
    this._templateSelector = templateSelector; // записали селектор в приватное поле    
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
    nameFullImage.alt = this._name;
  }

  //метод публичный - подготовит карточку к публикации
  generateCard() { // Запишем разметку в приватное поле _newCard // у других элементов появится доступ к ней.
    this._newCard = this._getTemplate();
    this._setEventListeners(); // вызовите _setEventListeners 
    this._setData();
    // Вернём элемент наружу
    return this._newCard;
  }
  /*Открытие поппапа для всплывающей картинки*/
  _openImagePopup() {
    popupFullImage.classList.add('popup_opened');//
    document.querySelector('.popup__image').src = this._link;
    document.querySelector(".popup__name-img").textContent = this._name;
    this._alt = this._name;
    this._newCard.addEventListener('keydown', this._closeByEscape);
  }

  /*Закрытие поппапа*/
  _closePopup = () => {
    popupFullImage.classList.remove('popup_opened');
    this._newCard.removeEventListener('keydown', this._closeByEscape);
  }
  //закрытие попапов через ESC
  _closeByEscape = (evt) => {
    if (evt.key === 'Escape') {
      this._openedPopup = this._newCard.querySelector('.popup_opened');//нахожу открытый попап
      this._closePopup(); //закрываю попап
    }
  };
  //метод добавляет обработчики
  _setEventListeners() {
    /*раскрывается popup для всплывающей картинки*/
    this._newCard.querySelector('.element__img').addEventListener('click', () => {
      this._openImagePopup()// откройте попап    
    });
    /*закрывает попап*/
    popupCloseButton.addEventListener('click', () => {
      this._closePopup()// закройте попап
    });
    /*добавление лайка на кнопку*/
    this._newCard.querySelector('.element__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__like_active');
    });
    /* удаление карточки*/
    this._newCard.querySelector('.element__delete').addEventListener('click', (evt) => {
      this._newCard.remove();
    });
  }
}
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
