import { User } from "@chatscope/use-chat";
import Cookies from "js-cookie";
import { action, computed, makeAutoObservable, makeObservable, observable } from "mobx";
const cookieKey = "orbit-chat-username";
export default class SessionStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  _user = null;

  async init() {
    await this.loadFromCache();
    console.log(this._user);
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
    this._cacheUser(user);
    this._user = user;
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
