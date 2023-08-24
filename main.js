(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(e,n){for(var r=0;r<n.length;r++){var o=n[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(void 0,i=function(e,n){if("object"!==t(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,"string");if("object"!==t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o.key),"symbol"===t(i)?i:String(i)),o)}var i}var n=function(){function t(e,n,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=e.name,this._link=e.link,this._templateSelector=n,this._handleCardClick=r}var n,r;return n=t,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._templateSelector).content.querySelector(".element").cloneNode(!0)}},{key:"_setData",value:function(){var t=this._newCard.querySelector(".element__img"),e=this._newCard.querySelector(".element__title");t.src=this._link,e.textContent=this._name,t.alt=this._name}},{key:"generateCard",value:function(){return this._newCard=this._getTemplate(),this._setEventListeners(),this._setData(),this._newCard}},{key:"_setEventListeners",value:function(){var t=this;this._newCard.querySelector(".element__img").addEventListener("click",(function(){return t._cardPopupOpen()})),this._newCard.querySelector(".element__like").addEventListener("click",(function(){return t.addLike()})),this._newCard.querySelector(".element__delete").addEventListener("click",(function(){return t.deleteCard()}))}},{key:"addLike",value:function(){this._newCard.querySelector(".element__like").classList.toggle("element__like_active")}},{key:"deleteCard",value:function(){this._newCard.remove(),this._newCard=null}},{key:"_cardPopupOpen",value:function(){this._handleCardClick(this._name,this._link)}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function r(t){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}function o(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,(void 0,i=function(t,e){if("object"!==r(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,"string");if("object"!==r(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(o.key),"symbol"===r(i)?i:String(i)),o)}var i}var i=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.popup=document.querySelector(e),this.open=this.open.bind(this),this._handleEscClose=this._handleEscClose.bind(this)}var e,n;return e=t,(n=[{key:"open",value:function(){this.popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this.popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(t){"Escape"===t.key&&this.close()}},{key:"setEventListeners",value:function(){var t=this;this.popup.addEventListener("mousedown",(function(e){e.target.classList.contains("popup_opened")&&t.close(),e.target.classList.contains("popup__close-button")&&t.close()}))}}])&&o(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function u(t){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u(t)}function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==u(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==u(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===u(o)?o:String(o)),r)}var o}function a(){return a="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=f(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},a.apply(this,arguments)}function l(t,e){return l=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},l(t,e)}function c(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function f(t){return f=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},f(t)}var p=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&l(t,e)}(p,t);var e,n,r,o,i=(r=p,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=f(r);if(o){var n=f(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===u(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return c(t)}(this,t)});function p(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,p),(e=i.call(this,t)).imagePopup=e.popup.querySelector(".popup__image"),e.namePopupImage=e.popup.querySelector(".popup__name-img"),e.open=e.open.bind(c(e)),e}return e=p,(n=[{key:"_setData",value:function(t,e){this.imagePopup.src=e,this.namePopupImage.textContent=t,this.alt=this.namePopupImage}},{key:"open",value:function(t,e){a(f(p.prototype),"open",this).call(this),this._setData(t,e)}}])&&s(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),p}(i);function y(t){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},y(t)}function m(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==y(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==y(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===y(o)?o:String(o)),r)}var o}function b(){return b="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=v(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},b.apply(this,arguments)}function d(t,e){return d=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},d(t,e)}function v(t){return v=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},v(t)}var h=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&d(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=v(r);if(o){var n=v(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===y(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t,e){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,t))._submitCallBack=e,n._form=n.popup.querySelector(".popup__form"),n._inputList=n._form.querySelectorAll(".popup__input"),n}return e=u,(n=[{key:"_getInputValues",value:function(){var t={};return this._inputList.forEach((function(e){t[e.name]=e.value})),t}},{key:"setInputValue",value:function(t){Array.from(this._inputList).forEach((function(e){Object.hasOwn(t,e.name)&&(e.value=t[e.name])}))}},{key:"_handleSubmit",value:function(t){t.preventDefault(),this._submitCallBack(this._getInputValues()),this.close()}},{key:"close",value:function(){b(v(u.prototype),"close",this).call(this),this._form.reset()}},{key:"setEventListeners",value:function(){var t=this;b(v(u.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(e){return t._handleSubmit(e)}))}}])&&m(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(i);function _(t){return _="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_(t)}function S(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==_(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==_(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===_(o)?o:String(o)),r)}var o}var g=function(){function t(e){var n=e.userNameSelector,r=e.aboutUserSelector;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._userName=document.querySelector(n),this._aboutUser=document.querySelector(r)}var e,n;return e=t,(n=[{key:"getUserInfo",value:function(){return{userName:this._userName.textContent,aboutUser:this._aboutUser.textContent}}},{key:"setUserInfo",value:function(t){var e=t.userName,n=t.aboutUser;this._userName.textContent=e,this._aboutUser.textContent=n}}])&&S(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function w(t){return w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},w(t)}function k(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==w(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==w(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===w(o)?o:String(o)),r)}var o}var C=function(){function t(e,n){var r=e.items,o=e.renderer;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._container=document.querySelector(n),this._renderedItems=r,this._renderer=o}var e,n;return e=t,(n=[{key:"addItem",value:function(t){this._container.prepend(t)}},{key:"renderItems",value:function(){var t=this;this._renderedItems.forEach((function(e){t._renderer(e)}))}}])&&k(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function E(t){return E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},E(t)}function j(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==E(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==E(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===E(o)?o:String(o)),r)}var o}var P=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.settings=e,this.form=n,this._isInputsGood=!1,this.submitCurrentButton=this.form.querySelector(e.submitButtonSelector),this.submitButtonSelector=this.settings.submitButtonSelector,this.inactiveButtonClass=this.settings.inactiveButtonClass,this.inputErrorClass=this.settings.inputErrorClass,this.errorClass=this.settings.errorClass}var e,n;return e=t,(n=[{key:"resetForm",value:function(){var t=this;this._getColectionInputs().forEach((function(e){t._hideErrors(e)})),this._toggleSubmitButton(this.submitCurrentButton,!0)}},{key:"disableSubmitButton",value:function(){this.submitCurrentButton.setAttribute("disabled",!0),this.submitCurrentButton.classList.add(this.inactiveButtonClass)}},{key:"enableSubmitButton",value:function(){this.submitCurrentButton.removeAttribute("disabled"),this.submitCurrentButton.classList.remove(this.inactiveButtonClass)}},{key:"_toggleSubmitButton",value:function(){this._isInputsGood?(this.submitCurrentButton.classList.remove(this.inactiveButtonClass),this.submitCurrentButton.removeAttribute("disabled")):(this.submitCurrentButton.classList.add(this.inactiveButtonClass),this.submitCurrentButton.disabled=!0)}},{key:"_getColectionInputs",value:function(){return Array.from(this.form.querySelectorAll(this.settings.inputSelector))}},{key:"_getSubmitCurrentButton",value:function(){return this.form.querySelector(this.submitButtonSelector)}},{key:"enableValidation",value:function(){var t=this;this._getColectionInputs().forEach((function(e){e.addEventListener("input",(function(){t._isInputsGood=t._getColectionInputs().every((function(t){return t.validity.valid})),t._checkValidity(e,t._getSubmitCurrentButton())}))}))}},{key:"_checkValidity",value:function(t,e){t.validity.valid?this._hideErrors(t,e):this._showErrors(t,e),this._toggleSubmitButton(e)}},{key:"_showErrors",value:function(t){t.classList.add(this.inputErrorClass),t.nextElementSibling.textContent=t.validationMessage}},{key:"_hideErrors",value:function(t){t.classList.remove(this.inputErrorClass),t.nextElementSibling.textContent=""}}])&&j(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}(),O=document.querySelector(".profile__button_add_change"),B=document.querySelector("#name-input"),L=document.querySelector("#proffession-input"),I=document.forms["edit-form"],q=document.querySelector(".profile__button_add_card"),x=document.forms["add-place-form"],T={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",errorClass:"popup__error_visible",inputErrorClass:"popup__input_type_error"},R=new P(T,x),U=new P(T,I),N=new p(".popup_img_open");N.setEventListeners();var D=new g({userNameSelector:".profile__title",aboutUserSelector:".profile__subtitle"}),V=new h(".popup_profile_open",(function(){D.setUserInfo({userName:B.value,aboutUser:L.value}),D.getUserInfo({userName:B.value,aboutUser:L.value})}));V.setEventListeners(),O.addEventListener("click",(function(){V.setInputValue(D.getUserInfo()),V.open(),U.resetForm(),U.enableSubmitButton()}));var A=new C({items:[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}],renderer:function(t){var e=t.name,n=G(t.link,e);A.addItem(n)}},".elements");A.renderItems();var F=new h(".popup_addplace_open",(function(t){var e=t.cardName,n=t.urlCard;A.addItem(G(n,e))}));function G(t,e){return new n({link:t,name:e},".template",N.open).generateCard()}F.setEventListeners(),q.addEventListener("click",(function(){F.open(),x.reset(),R.resetForm(),R.disableSubmitButton()})),R.enableValidation(T,x),U.enableValidation(T,I)})();