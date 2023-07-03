/* для формы добавления нового профиля*/
const buttonOpenPopupProfile = document.querySelector(".profile__button_add_change");//кнопка открытия формы 
const buttonClosePopupProfile = document.querySelector(".popup__close-button_profile");//кнопка закрытия формы 
const popupProfile = document.querySelector("#profilePopup");//имя попапа формы - обертка попапа по id
const popupProfileTitle = document.querySelector(".profile__title");
const popupProfileSubtitle = document.querySelector(".profile__subtitle");
const nameInputProfile = document.querySelector("#name-input");
const proffessionInputProfile = document.querySelector("#proffession-input");
const formProfile = document.querySelector("#edit-form");//сама форма 

// для всплывающей картинки
const fullImage = document.querySelector('.popup__image');//нашла фото в попапе
const nameFullImage = document.querySelector(".popup__name-img"); //имя места - из открывающегося попапа картинки
const popupFullImage = document.querySelector('#picturePopup'); // нашла попап для открытия картинки
const popupFullImageClose = document.querySelector('.popup__close-button_clipart');//нахожу кнопку закрытия всплывающей картинки в родительском элементе
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

//для закрытия по оверлей
const popupCloseImageOverlay = document.querySelector('.popup_img_open');
const popupCloseProfileOverlay = document.querySelector('.popup_profile_open');
const popupCloseAddNewCardOverlay = document.querySelector('.popup_addplace_open');

//общая переменная popup для функции открытия и закрытия всех попапов по ESC
const popup = document.querySelectorAll('.popup');//нахожу общий для всех попапов класс - обертка для функции закрытия попапов по ESC
// общая переменная для всех форм
const form = document.querySelectorAll('.popup__form');

/*функция открытия попапов*/
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

/*функция закрытия попапов*/
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

/*закрытие попапа всплывающей картинки*/
popupFullImageClose.addEventListener('click', function (evt) {
  closePopup(popupFullImage);
});

/*для закрытия картинки по оверлею*/
popupCloseImageOverlay.addEventListener('click', function (evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(popupFullImage);
  }
});

/*для формы редактирования профиля*/
formProfile.addEventListener("submit", function (evt) {
  evt.preventDefault();
  popupProfileTitle.textContent = nameInputProfile.value;
  popupProfileSubtitle.textContent = proffessionInputProfile.value;
  formProfile.reset();
  closePopup(popupProfile);
});

/*при открытии формы заполнения профиля - заполнение по умолчанию*/
buttonOpenPopupProfile.addEventListener("click", function () {
  nameInputProfile.value = popupProfileTitle.textContent;
  proffessionInputProfile.value = popupProfileSubtitle.textContent;
  openPopup(popupProfile);
  activeSubmitButton();
  resetError();
});

/*закрытие формы добавления профиля*/
buttonClosePopupProfile.addEventListener("click", function (evt) {
  closePopup(popupProfile);
});
/*для закрытия попапа редактирования профиля по оверлею*/
popupCloseProfileOverlay.addEventListener('mousedown', function (evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(popupProfile);
  }
});

// для формы добавления места открытие формы
buttonOpenPopupAddNewCard.addEventListener('click', function () {//открытие попапа
  openPopup(popupAddNewCard);//открываю форму
  disableSubmitButton();//делаю disable форме
  resetError();// убираю все тексты ошибок и подчеркивание
  formAddNewCard.reset();// очищаю поля формы
});

/*Функция сброса текста ошибки и подчеркивания полей ввода красным при открытии формы без предыдущего сохрания*/
function resetError() {
  Array.from(form).forEach((currentForm) => {//создаем массив из форм 
    // общая переменная для всех тегов <p>, параграфов с ошибкой
    const popupErrorVisible = currentForm.querySelectorAll('.popup__error_visible');//нахожу текст ошибки
    // общая переменная для всех инпутов
    const popupInputs = currentForm.querySelectorAll('.popup__input');
    Array.from(popupInputs).forEach((currentInput) => {//создаем массив из Инпутов из коллекции Инпутов
      currentInput.classList.remove('popup__input_type_error');//убираю красную обводку инпута
    });
    Array.from(popupErrorVisible).forEach((currentpopupErrorVisible) => {//создаем массив из тегов p - строчек ошибок инпутов
      currentpopupErrorVisible.textContent = '';//добавляю пустой текст ошибки
    });
  });
};
/*функция неактивной кнопки Submit и формы по умолчанию при открытии формы без предыдущего сохрания*/
function disableSubmitButton() {
  Array.from(form).forEach((currentForm) => {
    const submitButton = currentForm.querySelector('.popup__button');//нахожу кнопку Сохранить
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add('popup__button_disabled'); //добавляю класс неактивной кнопки  
  });
};
/*функция активной кнопки Submit и формы по умолчанию при открытии формы без предыдущего сохрания*/
function activeSubmitButton() {
  Array.from(form).forEach((currentForm) => {
    const submitButton = currentForm.querySelector('.popup__button');//нахожу кнопку Сохранить
    submitButton.removeAttribute('disabled');//удаляю атрибут "disabled";
    submitButton.classList.remove('popup__button_disabled'); //удаляю класс неактивной кнопки  
  });
};

// закрытие попапа формы добавления карточки
buttonClosePopupAddNewCard.addEventListener("click", function (evt) {//закрытие попапа
  closePopup(popupAddNewCard);
});

/*для закрытия формы добавления карточки по оверлею*/
popupCloseAddNewCardOverlay.addEventListener('mousedown', function (evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(popupAddNewCard)
  }
});

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
  closePopup(popupAddNewCard);
  const submitCardButton = document.querySelector('#save-add-place');//нахожу кнопку Сохранить
  submitCardButton.classList.add('popup__button_disabled'); //добавляю класс неактивной кнопки
  formAddNewCard.reset();//очищаю поля формы    
  submitCardButton.disabled = true;
});

//закрытие попапов через ESC
popup.forEach((popup) => {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  })
});