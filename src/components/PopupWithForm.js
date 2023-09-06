import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallBack) { //принимает в конструктор колбэк сабмита формы     
    super(popupSelector);
    //console.log(this);//два попапа
    this._submitCallBack = submitCallBack;
    this._form = this.popup.querySelector('.popup__form');//форма попапа
    this._inputList = this._form.querySelectorAll('.popup__input');//собираю все импуты из поппапа
    this._submitButton = this._form.querySelector('.popup__button');//нахожу кнопку "Сохранить"
  }
  //приватный метод собирает данные всех полей формы 
  _getInputValues() {
    const data = {};    
    this._inputList.forEach(element => {
      data[element.name] = element.value;
    })    
    return data;   
  }
  //публичный метод 
  setInputValue(userInfo) {
   
    Array.from(this._inputList).forEach((input) => {      
      if (Object.hasOwn(userInfo, input.name)) {
        input.value = userInfo[input.name];
      }
    });
  }  
  //Обработчик сабмита формы
  _handleSubmit(evt) {    
    evt.preventDefault();
    this._submitCallBack(this._getInputValues());//заполняются поля инпутов    
    this.close();//закрывается форма
  }
  //Метод меняет текст при загрузке
  changeSubmitButtonText(changeText) {
    if (!changeText) return;
    this._submitButton.textContent = changeText;
  }
  //Закрытие формы
  close() { //Перезаписывает родительский метод      
    super.close();// наследует метод close от родительского и 
    this._form.reset();//сбрасывает форму
  }
  //Перезаписывает родительский метод и добавляет
  // обработчик клика иконке закрытия и добавляет обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => this._handleSubmit(evt));
  }
  
} 