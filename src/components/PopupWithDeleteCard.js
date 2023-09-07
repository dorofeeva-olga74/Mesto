import { Popup } from './Popup.js';
export class PopupWithDeleteCard extends Popup {
  constructor(popupSelector, submitCallBack) { //принимает в конструктор колбэк сабмита формы     
    super(popupSelector);
    this._submitCallBack = submitCallBack;
    this._form = this.popup.querySelector('.popup__form');
    this._submitButtonSelector = this._form.querySelector('.popup__button');//нахожу сабмит формы
    this._deleteCardInstance = null;
  }
  //Обработчик сабмита формы//удаление карточки//
  _handleSubmitDeleteCard(evt) {
    evt.preventDefault();
    this._submitCallBack(this._deleteCardInstance);    
  }
  changeSubmitButtonText(newText) {
    if (!newText) return;
    this._submitButtonSelector.textContent = newText;
  }
  open(cardInstance) {
    super.open();
    this._deleteCardInstance = cardInstance;
  }
  //Перезаписывает родительский метод 
  // обработчик клика иконке удаления и добавляет обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => this._handleSubmitDeleteCard(evt));
  }
  //Закрытие формы
  close() { //Перезаписывает родительский метод      
    super.close();// наследует метод close от родительского и 
    this._form.reset();//сбрасывает форму
  }
}  
