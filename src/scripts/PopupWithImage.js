import { Popup } from './Popup.js';
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.imagePopup = this.popup.querySelector('.popup__image');
    this.namePopupImage = this.popup.querySelector('.popup__name-img');
    this.open = this.open.bind(this);
  }
  _setData(name, link) {
    /*для всплывающей картинки*/
    this.imagePopup.src = link;
    this.namePopupImage.textContent = name;
    this.alt = this.namePopupImage;
  }
  open(name, link) {
    super.open();
    this._setData(name, link);
  }
}