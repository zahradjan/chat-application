import { makeAutoObservable } from "mobx";

export default class UserStore {
  userProfile;
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  async init() {
    const defaultOptions = { accessController: { write: [this.rootStore.mainStore.orbitDb.identity.id] } };
    this.userProfile = await this.rootStore.mainStore.orbitDb.kvstore("user", defaultOptions);
    await this.userProfile.load();
    console.log(this.userProfile.all);
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
