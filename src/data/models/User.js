export default class User {
  _username;
  avatar;
  peerId;
  password;
  constructor(username, peerId, password) {
    this._username = username;
    this.peerId = peerId;
    this.password = password;
  }
}
