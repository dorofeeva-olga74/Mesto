/*функция открытия попапов*/
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEscape);
}

/*функция закрытия попапов*/
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEscape);
}

//закрытие попапов через ESC
export function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');//нахожу открытый попап
    closePopup(openedPopup); //закрываю попап
  }
};
