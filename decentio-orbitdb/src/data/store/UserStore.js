import { action, computed, makeAutoObservable, makeObservable, observable } from "mobx";

export default class UserStore {
  userProfile;
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.userProfile = undefined;
  }
  //TODO: makeAutoObservable nefunguje sprave na hodnotach ktere nebyli inicializovany, je potreba user profile inicializovat

  async init() {
    console.log(this.rootStore.dataStore.orbitDb);
    await this.setUser();
    console.log(this.userProfile.id);
  }
  async setUser() {
    if (this.rootStore.dataStore.orbitDb === undefined) throw Error("OrbitDb not defined!");
    const defaultOptions = { accessController: { write: [this.rootStore.dataStore.orbitDb.identity.id] } };
    this.userProfile = await this.rootStore.dataStore.orbitDb.kvstore("user", defaultOptions);
    await this.userProfile.load();
    return this.userProfile;
  }

  async deleteProfileField(key) {
    const cid = await this.userProfile.del(key);
    return cid;
  }

  getAllProfileFields() {
    return this.userProfile.all;
  }

  getProfileField(key) {
    return this.userProfile.get(key);
  }

  async updateProfileField(key, value) {
    const cid = await this.userProfile.set(key, value);
    return cid;
  }
  async loadFixtureData(fixtureData) {
    const fixtureKeys = Object.keys(fixtureData);
    for (let i in fixtureKeys) {
      let key = fixtureKeys[i];
      if (!this.userProfile.get(key)) await this.userProfile.set(key, fixtureData[key]);
    }
  }
}
