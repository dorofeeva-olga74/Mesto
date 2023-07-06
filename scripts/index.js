/* для формы добавления нового профиля*/
const buttonOpenPopupProfile = document.querySelector(".profile__button_add_change");//кнопка открытия формы 
const buttonClosePopupProfile = document.querySelector(".popup__close-button_profile");//кнопка закрытия формы 
const popupProfile = document.querySelector("#profilePopup");//имя попапа формы - обертка попапа по id
const popupProfileTitle = document.querySelector(".profile__title");
const popupProfileSubtitle = document.querySelector(".profile__subtitle");
const nameInputProfile = document.querySelector("#name-input");
const proffessionInputProfile = document.querySelector("#proffession-input");
const formProfile = document.forms["edit-form"];//сама форма //нахожу форму заполнения профиля по name
const submitButtonSaveProfile = document.querySelector('.popup__button_save-profile');//нахожу кнопку Сохранить в форме Профиля
// для всплывающей картинки
const fullImage = document.querySelector('.popup__image');//нашла фото в попапе
const nameFullImage = document.querySelector(".popup__name-img"); //имя места - из открывающегося попапа картинки
const popupFullImage = document.querySelector('#picturePopup'); // нашла попап для открытия картинки
// для формы добавления места
const buttonOpenPopupAddNewCard = document.querySelector('.profile__button_add_card');//кнопка открытия формы
const popupAddNewCard = document.querySelector('#addPlacePopup');//форма попапа по id - обертка
const nameInputAddNewCard = document.querySelector(".popup__input_card_name");//значения полей формы контента
const linkImputAddNewCard = document.querySelector(".popup__input_card_link");//значения полей формы контента
const formAddNewCard = document.forms['add-place-form'];//нахожу форму добавления места по name
const submitButtonSaveCard = document.querySelector('.popup__button_save-card');//нахожу кнопку Сохранить в форме добавления места
// добавить карточки
const template = document.querySelector('#template');//нахожу элемент в html 
const templateContent = template.content;//тег template имеет свойство .content, по нему я могу получить доступ к содержимому шаблона
const templateElement = templateContent.querySelector('.element');//присваиваю переменную и нахожу в templateContent -  article class="element"
const cards = document.querySelector('.elements');//
//общая переменная popup для функции открытия и закрытия всех попапов по ESC
const popups = document.querySelectorAll('.popup');//нахожу общий для всех попапов класс - обертка для функции закрытия попапов по ESC
// общая переменная для всех форм
const forms = document.querySelectorAll('.popup__form');

/*функция открытия попапов*/
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEscape);
}
/*функция закрытия попапов*/
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEscape);
}

/*для формы редактирования профиля*/
formProfile.addEventListener("submit", function (evt) {
  evt.preventDefault();
  popupProfileTitle.textContent = nameInputProfile.value;
  popupProfileSubtitle.textContent = proffessionInputProfile.value;
  closePopup(popupProfile);
});

/*при открытии формы заполнения профиля - заполнение по умолчанию*/
buttonOpenPopupProfile.addEventListener("click", function () {
  nameInputProfile.value = popupProfileTitle.textContent;
  proffessionInputProfile.value = popupProfileSubtitle.textContent;
  openPopup(popupProfile);
  enableSubmitButton(submitButtonSaveProfile);
  resetError(formProfile);
});

// для формы добавления места открытие формы
buttonOpenPopupAddNewCard.addEventListener('click', function () {//открытие попапа
  openPopup(popupAddNewCard);//открываю форму
  disableSubmitButton(submitButtonSaveCard);//делаю disable форме и кнопке Сохранить
  resetError(formAddNewCard);// убираю все тексты ошибок и подчеркивание в форме
  formAddNewCard.reset();// очищаю поля формы  
});

/*Функция сброса текста ошибки и подчеркивания полей ввода красным при открытии формы без предыдущего сохрания*/
function resetError(formElement) {
  Array.from(forms).forEach((currentForm) => {//создаем массив из форм 
    // общая переменная для всех тегов <p>, параграфов с ошибкой
    const popupVisibleErrors = currentForm.querySelectorAll('.popup__error_visible');//нахожу текст ошибки
    // общая переменная для всех инпутов
    const popupInputs = currentForm.querySelectorAll('.popup__input');
    Array.from(popupInputs).forEach((currentInput) => {//создаем массив из Инпутов из коллекции Инпутов
      currentInput.classList.remove('popup__input_type_error');//убираю красную обводку инпута
    });
    Array.from(popupVisibleErrors).forEach((currentPopupVisibleErrors) => {//создаем массив из тегов p - строчек ошибок инпутов
      currentPopupVisibleErrors.textContent = '';//добавляю пустой текст ошибки
    });
  });
};

/*функция неактивной кнопки Submit и формы добавления карточки по умолчанию при открытии формы без предыдущего сохрания*/
function disableSubmitButton(submitButtonSaveCard) {
  submitButtonSaveCard.setAttribute('disabled', true);
  submitButtonSaveCard.classList.add('popup__button_disabled'); //добавляю класс неактивной кнопки  
};

/*функция активной кнопки Submit и формы по умолчанию при открытии формы профиля без предыдущего сохранения*/
function enableSubmitButton(submitButtonSaveProfile) {
  submitButtonSaveProfile.removeAttribute('disabled');//удаляю атрибут "disabled";
  submitButtonSaveProfile.classList.remove('popup__button_disabled'); //удаляю класс неактивной кнопки  
};

// добавить карточки
initialCards.forEach(function (element) {  // итерация обьектов всего массива в том же порядке 
  const newElement = createCard(element); //element - object
  cards.prepend(newElement);
});

function createCard(element) {  //функция создает новый элемент на основе прототипа 
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
  templateImage.addEventListener('click', (e) => openImagePopup(e));

  return newElement;
};

const openImagePopup = (evt) => {
  openPopup(popupFullImage);
  fullImage.src = evt.target.src;
  fullImage.alt = evt.currentTarget.alt; //берем всю карточку и из нее достаем текст и кладем в альт
  nameFullImage.textContent = evt.currentTarget.alt; //берем всю карточку и из нее достаем текст и кладем подпись картинки
};
//добавление карточки 
formAddNewCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const newElement = createCard({ name: nameInputAddNewCard.value, link: linkImputAddNewCard.value })
  cards.prepend(newElement);
  closePopup(popupAddNewCard);
});

//закрытие попапов через ESC
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');//нахожу открытый попап
    closePopup(openedPopup); //закрываю попап
  }
};

//закрытие по оверлею и на крестики
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  })
});