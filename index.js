const openPopupButton = document.querySelector("#open-popup-button");
const closePopupButton = document.querySelector("#close-popup-button");
const editPopup = document.querySelector("#edit-popup");
const popupTitle = document.querySelector(".profile__title");
const popupSubtitle = document.querySelector(".profile__subtitle");
const nameInput = document.querySelector("#name-input");
const proffessionInput = document.querySelector("#proffession-input");
const editForm = document.querySelector("#edit-form");


openPopupButton.addEventListener("click", function () {
    openPopup(editPopup);
});

closePopupButton.addEventListener("click", function () {
    closePopup(editPopup);
});

nameInput.value = popupTitle.textContent;
proffessionInput.value = popupSubtitle.textContent;

editForm.addEventListener("submit", function (event) {
    event.preventDefault();
    popupTitle.textContent = nameInput.value;
    popupSubtitle.textContent = proffessionInput.value;
    closePopup(editPopup);
});

function openPopup(popup) {
    popup.classList.add("popup_is-opened");
}

function closePopup(popup) {
    popup.classList.remove("popup_is-opened");
}