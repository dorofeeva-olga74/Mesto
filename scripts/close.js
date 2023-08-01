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
//Закрытие попапов по оверлею и на крестик
export const closeByOverlay =
  document.querySelectorAll('.popup').forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup)
      }
    })
  });
