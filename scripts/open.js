import { closeByEscape } from './close.js';
/*функция открытия попапов*/
export function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener('keydown', closeByEscape);
  }
  