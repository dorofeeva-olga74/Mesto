const openPopupButtonProfile = document.querySelector(".profile__button_add_change");//кнопка открытия формы 
const closePopupButtonProfile = document.querySelector(".popup__close-button_profile");//кнопка закрытия формы 
const editPopupProfile = document.querySelector("#edit-popup-profile");//имя попапа формы - обертка попапа по id
const popupTitleProfile = document.querySelector(".profile__title"); 
const popupSubtitleProfile = document.querySelector(".profile__subtitle"); 
const nameInput = document.querySelector("#name-input"); 
const proffessionInput = document.querySelector("#proffession-input"); 
const editForm = document.querySelector("#edit-form");//сама форма 
const popup = document.querySelector('.popup');//нахожу общий для всех попапов класс - обертка для функций открытия/закрытия попапов
// для формы добавления места
const popupImage = document.querySelector('.popup__image');//нашла фото в попапе
const imagePopup = document.querySelector('#popup-img'); // нашла попап для открытия фото
const closePopupImg = imagePopup.querySelector('.popup__close-button_clipart');//нахожу кнопку закрытия всплывающей картинки в родительском элементе
const openPopupButtonAddCard = document.querySelector('.profile__button_add_card');//кнопка открытия формы
const closePopupButtonAddCard = document.querySelector('.popup__close-button_add-card');//кнопка закрытия формы
const popupAddPlace = document.querySelector('#popup-add-place');//форма попапа по id - обертка
const popupTitlePlace = document.querySelector(".popup__name-img"); //имя места - из открывающегося попапа картинки
const placeInput = document.querySelector(".popup__input_card_name");//значения полей формы контента
const linkImput = document.querySelector(".popup__input_card_link");//значения полей формы контента
const addPlaceForm = document.querySelector('#add-place-form');//форма попапа заполнения места по id

// добавить карточки
const template = document.querySelector('#template');//нахожу элемент в html 
const templateContent = template.content;//тег template имеет свойство .content, по нему я могу получить доступ к содержимому шаблона
const templateElement = templateContent.querySelector('.element');//присваиваю переменную и нахожу в templateContent -  article class="element"
const elements = document.querySelector('.elements');//



/*popup для формы профиля*/ 

/*закрытие попапа всплывающей картинки*/    
closePopupImg.addEventListener('click', function (evt) { 
  closePopup(imagePopup); 
}); 
/*функция открытия попапов*/
function openPopup(popup) { 
  popup.classList.add("popup_opened");  
} 
function closePopup(popup) { 
  popup.classList.remove("popup_opened"); 
} 
/*для формы редактирования профиля*/
editForm.addEventListener("submit", function (evt) { 
  evt.preventDefault(); 
  popupTitleProfile.textContent = nameInput.value; 
  popupSubtitleProfile.textContent = proffessionInput.value; 
  closePopup(editPopupProfile); 
});
openPopupButtonProfile.addEventListener("click", function () { 
  nameInput.value = popupTitleProfile.textContent; 
  proffessionInput.value = popupSubtitleProfile.textContent;
  openPopup(editPopupProfile); 
}); 
closePopupButtonProfile.addEventListener("click", function () { 
  closePopup(editPopupProfile); 
});
// для формы добавления места



openPopupButtonAddCard.addEventListener('click', () => openPopup(popupAddPlace));
closePopupButtonAddCard.addEventListener('click', () => closePopup(popupAddPlace));


// добавить карточки
initialCards.forEach(function (element) {  // итерация обьектов всего массива в том же порядке 
  const newElement = createInitialCards(element); //element - object
  elements.prepend(newElement); 
}); 

function createInitialCards(element) {  //функция создает новый элемент на основе прототипа 
const newElement = templateElement.cloneNode(true); 
const templateImage = newElement.querySelector('.element__img'); 
const templateTitle = newElement.querySelector('.element__title'); 
const like = newElement.querySelector('.element__like'); 
const deleteButton = newElement.querySelector('.element__delete'); 

  /*для всплывающей картинки*/ 
  templateImage.src = element.link;//для добавления в новую карточку картинки  
  templateImage.alt = element.name;     //названия и лайка 
  templateTitle.textContent = element.name;

  /*добавление лайка на кнопку*/ 
  like.addEventListener('click', function (evt) { 
    evt.target.classList.toggle('element__like_active'); 
  });
  /* удаление карточки*/ 
  deleteButton.addEventListener('click', function (evt) { 
    newElement.remove();
  });  
  /*раскрывается popup для всплывающей картинки*/ 
  templateImage.addEventListener('click', (e) => popupScopedImage(e))
  return newElement;
};

const popupScopedImage = (evt) => {
  openPopup(imagePopup);
  popupImage.src = evt.target.src;
  popupImage.alt = evt.currentTarget.alt; //берем всю карточку и из нее достаем текст и кладем в альт
  popupTitlePlace.textContent = evt.currentTarget.alt; //берем всю карточку и из нее достаем текст и кладем подпись картинки
}

//добавление карточки 
addPlaceForm.addEventListener('submit', function (evt) { 
  evt.preventDefault(); 
  const newElement = createInitialCards({name: placeInput.value, link: linkImput.value})
  elements.prepend(newElement); 
  placeInput.value = ''
  linkImput.value = ''
  closePopup(popupAddPlace)
});   