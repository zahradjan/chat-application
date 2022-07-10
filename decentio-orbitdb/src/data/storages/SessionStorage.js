import Cookies from "js-cookie";

const cookieKey = "orbit-chat-username";
export default class SessionStorage {
  _user;

  _readUserFromCache() {
    const username = Cookies.get(cookieKey);
    return username ? { username } : null;
  }
  isAuthenticated() {
    return !!this._user;
  }

  async _setUser(user) {
    if (!user) throw new Error('"username" is not defined');
    // ;if (user && !user.username) throw new Error('"user.username" is not defined')
    // runInAction(() => {
    this._user = user;
    // })
    console.log(user);
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
