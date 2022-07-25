import { makeAutoObservable, runInAction } from "mobx";

export default class UserStore {
  user;
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.user = undefined;
    makeAutoObservable(this);
  }

  async init() {
    await this.setUserStore();
  }
  isUserStoreReady() {
    return !!this.user;
  }
  async setUserStore() {
    if (this.rootStore.dataStore.orbitDb === undefined) throw Error("OrbitDb not defined!");
    const defaultOptions = { accessController: { write: [this.rootStore.dataStore.orbitDb.identity.id] } };
    await this.rootStore.dataStore.orbitDb.kvstore("user", defaultOptions).then((data) =>
      runInAction(() => {
        this.user = data;
      })
    );
    await this.user.load();
  }

  async deleteProfileField(key) {
    const cid = await this.user.del(key);
    return cid;
  }

  getAllProfileFields() {
    return this.user.all;
  }

  getProfileField(key) {
    return this.user.get(key);
  }

  async updateUserField(key, value) {
    const cid = await this.user.set(key, value);
    return cid;
  }
}
