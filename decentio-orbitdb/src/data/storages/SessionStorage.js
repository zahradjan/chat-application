import Cookies from "js-cookie";

const cookieKey = "orbit-chat-username";
export default class SessionStorage {
  _user;

  _readUserFromCache() {
    const username = Cookies.get(cookieKey);
    return username ? { username } : null;
  }

  async _setUser(user) {
    if (user && !user.username) throw new Error('"user.username" is not defined');
    // runInAction(() => {
    this._user = user;
    // })
    this._cacheUser(user);
  }

  _cacheUser(user) {
    if (user) {
      Cookies.set(cookieKey, user.username);
    } else {
      Cookies.remove(cookieKey);
    }
  }
}
