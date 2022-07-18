import { makeAutoObservable } from "mobx";

export default class UserStore {
  user;
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.user = undefined;
  }
  //TODO: makeAutoObservable nefunguje sprave na hodnotach ktere nebyli inicializovany, je potreba user profile inicializovat

  async init() {
    console.log(this.rootStore.dataStore.orbitDb);
    await this.setUserStore();
    console.log(this.user.id);
  }
  async setUserStore() {
    if (this.rootStore.dataStore.orbitDb === undefined) throw Error("OrbitDb not defined!");
    const defaultOptions = { accessController: { write: [this.rootStore.dataStore.orbitDb.identity.id] } };
    this.user = await this.rootStore.dataStore.orbitDb.kvstore("user", defaultOptions);
    await this.user.load();
    return this.user;
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
  async loadFixtureData(fixtureData) {
    const fixtureKeys = Object.keys(fixtureData);
    for (let i in fixtureKeys) {
      let key = fixtureKeys[i];
      if (!this.user.get(key)) await this.user.set(key, fixtureData[key]);
    }
  }
}
