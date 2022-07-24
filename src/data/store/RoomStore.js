import { makeAutoObservable } from "mobx";

export class RoomStore {
  constructor(rootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this);
  }
}
