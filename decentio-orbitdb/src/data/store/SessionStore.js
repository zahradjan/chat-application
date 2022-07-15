import Cookies from "js-cookie";
import { makeAutoObservable, runInAction } from "mobx";
const cookieKey = "orbit-chat-username";
export default class SessionStore {
  _user;
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  async init() {
    await this.loadFromCache();
    console.log(this._user);
    console.log(this.isAuthenticated());
  }
  _readUserFromCache() {
    const username = Cookies.get(cookieKey);
    console.log(username);
    return username ? username : null;
  }
  isAuthenticated() {
    return !!this._user;
  }

  async _setUser(user) {
    if (!user) throw new Error('"username" is not defined');
    // ;if (user && !user.username) throw new Error('"user.username" is not defined')
    runInAction(() => {
      this._user = user;
    });
    this._cacheUser(user);
  }

  _cacheUser(user) {
    if (user) {
      Cookies.set(cookieKey, user);
    } else {
      Cookies.remove(cookieKey);
    }
  }

  async loadFromCache() {
    const cached = this._readUserFromCache();
    if (cached) await this.login(cached);
  }

  async login(user) {
    console.log("User login");
    return await this._setUser(user);
  }

  logout() {
    console.log("User logout");
    return this._setUser(null);
  }
}
