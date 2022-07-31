import { makeAutoObservable, runInAction, toJS } from "mobx";
import { Monitor } from "../models/Monitor.js";

export class MonitorStore {
  monitors;
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.monitors = [];
    makeAutoObservable(this);
  }

  async createMonitor(topicName) {
    if (this.rootStore.dataStore.ipfsNode === undefined) throw Error("IPFS Node not defined!");
    if (this.rootStore.dataStore.orbitDb === undefined) throw Error("OrbitDb not defined!");
    const monitor = new Monitor(this.rootStore, topicName);
    await monitor.init();
    this.monitors.push(monitor);
    return monitor;
  }

  getMonitor(topicName) {
    //TODO: kdyz nenajde apod.
    return this.monitors.find((monitor) => topicName === monitor.topicName);
  }
}
