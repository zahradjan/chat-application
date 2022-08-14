import { makeAutoObservable } from "mobx";
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
    return this.userDb;
  }
  async setUserStore() {
    if (this.rootStore.dataStore.orbitDb === undefined) throw Error("OrbitDb not defined!");
    // const defaultOptions = { accessController: { write: "*" } };

    this.userDb = await this.rootStore.dataStore.orbitDb.kvstore("user");
    await this.userDb.load();
  }
  async createUser(username, password) {
    const peersId = [];
    const peerId = this.rootStore.dataStore.peerId;
    peersId.push(peerId);

    const user = new User(username, peersId, password);

    await this.userDb.set("user", user);
  }
  async setUser(user) {
    console.log(user.identity);
    console.log(user);
    this.userDb = await this.rootStore.dataStore.orbitDb.open(user.identity);
    // const peerId = this.rootStore.dataStore.peerId;
    // // // console.log(user);
    // user.data.user.peerId.push(peerId);
    // // // console.log(user);
    // await this.userDb.set("user", user);
    // console.log(user);
  }
  // async updatePeerId() {
  //   const peerId = this.rootStore.dataStore.peerId;
  //   this.updateUserField("peerId", [...peerId]);
  // }

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

  async getUserDbId() {
    const id = await this.userDb.id;
    return id;
  }
}
