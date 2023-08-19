//класс отвечает за управление отображением информации о пользователе на странице
export class UserInfo {
  constructor({ userNameSelector, aboutUserSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._aboutUser = document.querySelector(aboutUserSelector);
  }
  //публичный метод возвращает объект с данными пользователя
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      aboutUser: this._aboutUser.textContent,
    };
  }
  //публичный метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ userName, aboutUser }) {
    this._userName.textContent = userName;
    this._aboutUser.textContent = aboutUser;
  }
}  