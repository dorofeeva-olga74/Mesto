/* для формы добавления нового профиля*/
const buttonOpenPopupProfile = document.querySelector(".profile__button_add_change");//кнопка открытия формы 
const buttonClosePopupProfile = document.querySelector(".popup__close-button_profile");//кнопка закрытия формы 
const popupProfile = document.querySelector("#profilePopup");//имя попапа формы - обертка попапа по id
const popupProfileTitle = document.querySelector(".profile__title");
const popupProfileSubtitle = document.querySelector(".profile__subtitle");
const nameInputProfile = document.querySelector("#name-input");
const proffessionInputProfile = document.querySelector("#proffession-input");
const formProfile = document.querySelector("#edit-form");//сама форма 

//общая переменная popup для функции открытия и закрытия всех попапов
const popup = document.querySelector('.popup');//нахожу общий для всех попапов класс - обертка для функций открытия/закрытия попапов
// для всплывающей картинки
const fullImage = document.querySelector('.popup__image');//нашла фото в попапе
const nameFullImage = document.querySelector(".popup__name-img"); //имя места - из открывающегося попапа картинки
const popupFullImage = document.querySelector('#picturePopup'); // нашла попап для открытия картинки
const popupFullImageClose = popupFullImage.querySelector('.popup__close-button_clipart');//нахожу кнопку закрытия всплывающей картинки в родительском элементе
// для формы добавления места
const buttonOpenPopupAddNewCard = document.querySelector('.profile__button_add_card');//кнопка открытия формы
const buttonClosePopupAddNewCard = document.querySelector('.popup__close-button_add-card');//кнопка закрытия формы
const popupAddNewCard = document.querySelector('#addPlacePopup');//форма попапа по id - обертка
const nameInputAddNewCard = document.querySelector(".popup__input_card_name");//значения полей формы контента
const linkImputAddNewCard = document.querySelector(".popup__input_card_link");//значения полей формы контента
const formAddNewCard = document.querySelector('#add-place-form');//форма попапа заполнения места по id

// добавить карточки
const template = document.querySelector('#template');//нахожу элемент в html 
const templateContent = template.content;//тег template имеет свойство .content, по нему я могу получить доступ к содержимому шаблона
const templateElement = templateContent.querySelector('.element');//присваиваю переменную и нахожу в templateContent -  article class="element"
const cards = document.querySelector('.elements');//

/*закрытие попапа всплывающей картинки*/
popupFullImageClose.addEventListener('click', function (evt) {
  closePopup(popupFullImage);
});

/*функция открытия попапов*/
function openPopup(popup) {
  popup.classList.add("popup_opened");
}
/*функция закрытия попапов*/
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

/*для формы редактирования профиля*/
formProfile.addEventListener("submit", function (evt) {
  evt.preventDefault();
  popupProfileTitle.textContent = nameInputProfile.value;
  popupProfileSubtitle.textContent = proffessionInputProfile.value;
  closePopup(popupProfile);
});
buttonOpenPopupProfile.addEventListener("click", function () {
  nameInputProfile.value = popupProfileTitle.textContent;
  proffessionInputProfile.value = popupProfileSubtitle.textContent;
  openPopup(popupProfile);
});
buttonClosePopupProfile.addEventListener("click", function () {
  closePopup(popupProfile);
});
// для формы добавления места
buttonOpenPopupAddNewCard.addEventListener('click', () => openPopup(popupAddNewCard));
buttonClosePopupAddNewCard.addEventListener('click', () => closePopup(popupAddNewCard));

// добавить карточки
initialCards.forEach(function (element) {  // итерация обьектов всего массива в том же порядке 
  const newElement = createInitialCards(element); //element - object
  cards.prepend(newElement);
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
  openPopup(popupFullImage);
  fullImage.src = evt.target.src;
  fullImage.alt = evt.currentTarget.alt; //берем всю карточку и из нее достаем текст и кладем в альт
  nameFullImage.textContent = evt.currentTarget.alt; //берем всю карточку и из нее достаем текст и кладем подпись картинки
}

//добавление карточки 
formAddNewCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const newElement = createInitialCards({ name: nameInputAddNewCard.value, link: linkImputAddNewCard.value })
  cards.prepend(newElement);
  nameInputAddNewCard.value = ''
  linkImputAddNewCard.value = ''
  closePopup(popupAddNewCard);
});   