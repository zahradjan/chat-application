import { makeAutoObservable } from "mobx";

export class MessageStore {
  messageDB;
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.messageDB = null;
    makeAutoObservable(this);
  }
  async init() {
    if (this.rootStore.dataStore.orbitDb === undefined) throw Error("OrbitDb not defined!");
    this.messageDB = await this.rootStore.dataStore.orbitDb.kvstore("messages");
    this.messageDB.load();
  }
}
