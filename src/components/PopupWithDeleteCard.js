import { Popup } from './Popup.js';
export class PopupWithDeleteCard extends Popup {
  constructor(popupSelector, submitCallBack) { //принимает в конструктор колбэк сабмита формы     
    super(popupSelector);
    this._submitCallBack = submitCallBack;
    this._form = this.popup.querySelector('.popup__form');
    this._submitButtonSelector = this._form.querySelector('.popup__button');//нахожу сабмит формы
    this._deleteCardInstance = null;  
  }
////Обработчик сабмита формы//удаление карточки//
_handleSubmitDeleteCard(evt) {
  evt.preventDefault();  
  this._submitCallBack(this._deleteCardInstance);;
  //this._submitButtonSelector.addEventListener('click', () => this.deleteCard());   
  this.close();//закрывается форма  
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
  //console.log(this._form);
  this._form.addEventListener('submit', (evt) => this._handleSubmitDeleteCard(evt));
  //this._form.addEventListener('click', (evt) =>this._setConfirmAction());   
}
//Закрытие формы
  close() { //Перезаписывает родительский метод      
    super.close();// наследует метод close от родительского и 
    this._form.reset();//сбрасывает форму
  }
}  
//Обработчик сабмита формы
/*_handleSubmit(evt) {
  //evt.preventDefault();//дописать код обработки сабмита
  //this._submitCallBack(this._getInputValues());//заполняются поля инпутов
  this._submitButtonSelector.addEventListener('click', () => this.deleteCard());
  this.close();//закрывается форма
} */ 

/*_setConfirmAction(handleDeleteCard) {////***** 
  this._setConfirmAction = handleAction;
}*/
  //удаление карточки//публичный метод///////////////
  /*deleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }*/
  
  //Закрытие формы
  /*close() { //Перезаписывает родительский метод      
    super.close();// наследует метод close от родительского и 
    //this._form.reset();//сбрасывает форму
  }*/
  
//приватный метод собирает данные всех полей формы 
  /*_getInputValues() {
    const data = {};
    this._inputList.forEach(element => {
      data[element.name] = element.value;
    })
    return data;
  }*/
  //публичный метод 
  /*setInputValue(userInfo) {
    Array.from(this._inputList).forEach((input) => {      
      if (Object.hasOwn(userInfo, input.name)) {
        input.value = userInfo[input.name];
      }
    });
  }*/
