/*popup для формы профиля*/
const openPopupButton = document.querySelector("#open-popup-button");//кнопка открытия формы
const closePopupButton = document.querySelector("#close-popup-button");//кнопка закрытия формы
const editPopup = document.querySelector("#edit-popup");//имя попапа формы
const popupTitle = document.querySelector(".profile__title");
const popupSubtitle = document.querySelector(".profile__subtitle");
const nameInput = document.querySelector("#name-input");
const proffessionInput = document.querySelector("#proffession-input");
const editForm = document.querySelector("#edit-form");//сама форма
const popup = document.querySelector('.popup');

editForm.addEventListener("submit", function (event) {
  event.preventDefault();
  popupTitle.textContent = nameInput.value;
  popupSubtitle.textContent = proffessionInput.value;
  closePopup(editPopup);
});
function openPopup(popup) {
  popup.classList.add("popup_opened");
  nameInput.value = popupTitle.textContent;
  proffessionInput.value = popupSubtitle.textContent;
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

openPopupButton.addEventListener("click", function () {
  openPopup(editPopup);
});
closePopupButton.addEventListener("click", function () {
  closePopup(editPopup);
});
// для формы добавления места
const openPopupButtonAddCard = document.querySelector('#open-popup-button-add-card');
const closePopupButtonAddCard = document.querySelector('#close-popup-button-add-card');
const popupAddPlace = document.querySelector('#popup-add-place');
const popupTitlePlace = document.querySelector(".element__title");
const popupImagePlace = document.querySelector(".element__img");
const placeInput = document.querySelector('#place-input');
const linkImput = document.querySelector("#link-imput");
const addPlaceForm = document.querySelector('#add-place-form');//formElement

openPopupButtonAddCard.addEventListener('click', function () {
  openPopupPlace(popupAddPlace);
});

closePopupButtonAddCard.addEventListener('click', function () {
  сlosePopupPlace(popupAddPlace);
});
addPlaceForm.addEventListener('submit', function (event) {
  event.preventDefault();
  popupTitlePlace.textContent = placeInput.value;//сохраниение названия и линка
  popupImagePlace.textContent = linkImput.value;
  сlosePopupPlace(popupAddPlace);
});
function openPopupPlace(popup) {
  popup.classList.add('popup_opened');
}
function сlosePopupPlace(popup) {
  popup.classList.remove('popup_opened');
};
// добавить карточки
const template = document.querySelector('#template');//нахожу элемент в html 
const templateContent = template.content;//тег template имеет свойство .content, по нему я могу получить доступ к содержимому шаблона
const templateElement = templateContent.querySelector('.element');//присваиваю переменную и нахожу в templateContent -  article class="element"
const elements = document.querySelector('.elements');//
/*const popupAddPlace = document.querySelector('#popup-add-place');*///formElement
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(function (element) {  // итерация обьектов всего массива в том же порядке
  const newElement = createInitialCards(element.name, element.link);
  elements.prepend(newElement);
});

function createInitialCards(name, link) {  //функция создает новый элемент на основе прототипа
  const newElement = templateElement.cloneNode(true);
  const templateImage = newElement.querySelector('.element__img');
  const templateTitle = newElement.querySelector('.element__title');
  const like = newElement.querySelector('.element__like');
  const popupImage = document.querySelector('.popup__image');//нашла фото в попапе
  const figcaption = document.querySelector('.popup__title_img');//нашла подпись к фото в попапе
  const imagePopup = document.querySelector('#popup-img'); // нашла попап для открытия фото

  templateImage.src = link;//для добавления в новую карточку картинки 
  templateImage.alt = name;     //названия и лайка
  templateTitle.textContent = name;

  /*добавление лайка на кнопку*/
  like.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
  /* удаление карточки*/
  const deleteButton = newElement.querySelector('.element__delete');
  deleteButton.addEventListener('click', function (evt) {
    elements.removeChild(newElement);
  });
  /*добавление анимации для открытия попапов*/
  const PopupTransform = document.querySelector('.popup');
  PopupTransform.addEventListener('click', function (evt) {
    evt.target.classList.toggle('popup_button_active');
  });
  /*раскрывается popup для всплывающей картинки*/
  templateImage.addEventListener('click', function (evt) {
    openPopup(imagePopup);
    /*закрытие попапа всплывающей картинки*/
    const closePopupImg = document.querySelector('#close-popup-img');
    closePopupImg.addEventListener('click', function (evt) {
      closePopup(imagePopup);
    });
    popupImage.src = templateImage.src;
    popupImage.alt = templateImage.alt;
    figcaption.textContent = templateImage.alt;
  });
  return newElement;
};
//добавление карточки
popupAddPlace.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const form = evt.target;//исходный элемент на котором произошло событие
  const formData = new FormData(form);
  const values = Object.fromEntries(formData);
  const name = values.name;
  const link = values.link;
  const newElement = createInitialCards(name, link);
  elements.prepend(newElement);
  form.reset();
});  