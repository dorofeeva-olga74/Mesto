export class Section {//отвечает за отрисовку элементов на странице
  constructor(renderer, containerSelector) {//убрать items
    this._container = document.querySelector(containerSelector);//селектор контейнера, в который нужно добавлять созданные элементы
    //this._renderedItems = items;//массив данных, которые нужно добавить на страницу при инициализации класса
    this._renderer = renderer;// функция, которая отвечает за создание и отрисовку данных на странице  
  }

  //публичный метод addItem, который принимает //DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
  //публичный метод, который отвечает за отрисовку всех элементов
  renderItems(cardsArray) {
    cardsArray.forEach((item) => {
      this._renderer(item);
    });
  }
  //удаление карточки по id
  deleteItem(cardId) {
    document.getElementById(cardId).remove();
    item = null;
  }
}