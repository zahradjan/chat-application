export default class User {
  _username;
  avatar;
  peerId;
  constructor(username, peerId) {
    this._username = username;
    this.peerId = peerId;
  }
}
