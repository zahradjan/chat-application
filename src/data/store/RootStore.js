import React from "react";
import { MonitorStore } from "./MonitorStore.js";
import DataStore from "./DataStore.js";
import { RoomStore } from "./RoomStore.js";
import SessionStore from "./SessionStore.js";
import UserStore from "./UserStore.js";

export default class RootStore {
  constructor() {
    this.sessionStore = new SessionStore(this);
    this.dataStore = new DataStore(this);
    this.userStore = new UserStore(this);
    this.monitorStore = new MonitorStore(this);
    this.roomStore = new RoomStore(this);
    this.initStores();
  }
  async initStores() {
    await this.sessionStore.init();
    await this.initDbStores();
  }

  async initDbStores() {
    if (this.sessionStore.isAuthenticated()) {
      await this.dataStore.init();
      await this.userStore.init();
      await this.monitorStore.init();
      await this.roomStore.init();
    }
  }
}
export const store = new RootStore();
export const StoresContext = React.createContext(store);
export const useStores = () => React.useContext(StoresContext);
