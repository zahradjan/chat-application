import React from "react";
import MainStore from "../database/MainStorage.js";
import SessionStore from "./SessionStore.js";
import UserStore from "./UserStore.js";

export default class RootStore {
  constructor() {
    this.sessionStore = new SessionStore(this);
    this.mainStore = new MainStore(this);
    this.userStore = new UserStore(this);
  }
}
export const StoresContext = React.createContext(new RootStore());
export const useStores = () => React.useContext(StoresContext);
