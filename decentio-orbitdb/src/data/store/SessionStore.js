import Cookies from "js-cookie";
import { makeAutoObservable } from "mobx";
const cookieKey = "orbit-chat-username";
export default class SessionStore {
  _user;
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  _readUserFromCache() {
    const username = Cookies.get(cookieKey);
    return username ? username : null;
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
      Cookies.set(cookieKey, user);
    } else {
      Cookies.remove(cookieKey);
    }
  }

  loadFromCache() {
    const cached = this._readUserFromCache();
    if (cached) this.login(cached);
  }

  login(user) {
    console.log("User login");
    return this._setUser(user);
  }

  logout() {
    console.log("User logout");
    return this._setUser(null);
  }
}
