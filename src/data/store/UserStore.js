import { makeAutoObservable, runInAction } from "mobx";
import User from "../models/User.js";

export default class UserStore {
  userDb;
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.userDb = undefined;
    makeAutoObservable(this);
  }

  async init() {
    await this.setUserStore();
  }
  isUserStoreReady() {
    return !!this.userDb;
  }
  async setUserStore() {
    if (this.rootStore.dataStore.orbitDb === undefined) throw Error("OrbitDb not defined!");
    const defaultOptions = { accessController: { write: [this.rootStore.dataStore.orbitDb.identity.id] } };
    runInAction(async () => {
      this.userDb = await this.rootStore.dataStore.orbitDb.kvstore("user", defaultOptions);
      await this.userDb.load();
    });
  }
  async createUser(username) {
    const peerId = await this.rootStore.dataStore.getPeerId();
    const user = new User(username, peerId);
    await this.userDb.set("user", user);
  }

  async deleteProfileField(key) {
    const cid = await this.userDb.del(key);
    return cid;
  }

  getAllProfileFields() {
    return this.userDb.all;
  }

  getProfileField(key) {
    return this.userDb.get(key);
  }

  async updateUserField(key, value) {
    const cid = await this.userDb.set(key, value);
    return cid;
  }
}
