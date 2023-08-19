//класс отвечает за открытие и закрытие попапа
export class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);//селектор попапа 
    this.open = this.open.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  //публичный метод открытия попапов
  open() {
    this.popup.classList.add("popup_opened");
    document.addEventListener('keydown', this._handleEscClose);
  }
  //публичный метод закрытия попапов
  close() {
    this.popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', this._handleEscClose);
  }
  //приватный метод закрытия попапов через ESC
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close(); //закрываю попап
    }
  };
  //публичный метод - Закрытие попапов по оверлею и на крестик
  setEventListeners() {
    this.popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close()
      }
      if (evt.target.classList.contains('popup__close-button')) {
        this.close()
      }
    });
  }
}
