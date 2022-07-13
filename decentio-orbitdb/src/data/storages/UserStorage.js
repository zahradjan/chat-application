export default class UserStorage {
  userProfile;
  constructor(ipfsNode, orbitDb) {
    this.ipfsNode = ipfsNode;
    this.orbitDb = orbitDb;
  }

  async init() {
    const defaultOptions = { accessController: { write: [this.orbitDb.identity.id] } };
    this.userProfile = await this.orbitDb.kvstore("user", defaultOptions);
    await this.userProfile.load();
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
}
