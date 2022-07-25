import IpfsPubsubPeerMonitor from "ipfs-pubsub-peer-monitor";
import { makeAutoObservable, runInAction, toJS } from "mobx";

export class ChannelStore {
  channel;
  channelName;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.channel = undefined;
    makeAutoObservable(this);
  }
  async init(topic) {
    if (this.rootStore.dataStore.ipfsNode === undefined) throw Error("IPFS Node not defined!");
    if (this.rootStore.dataStore.orbitDb === undefined) throw Error("OrbitDb not defined!");
    runInAction(async () => {
      this.channelName = topic;
      this.channel = new IpfsPubsubPeerMonitor(this.rootStore.dataStore.ipfsNode.pubsub, topic);
      await this.listenForJoinedPeers();
      await this.listenForLeftPeers();
    });
  }
  async listenForJoinedPeers() {
    this.channel.on("join", async (peerJoined) => {
      console.log("Peer joined: " + peerJoined);
      console.log(`Peers on Pubsub ${this.channelName}: ` + (await this.channel.getPeers()));
    });
  }
  async listenForLeftPeers() {
    this.channel.on("leave", async (peerLeft) => {
      console.log("Peer left: " + peerLeft);
      console.log(`Peers on Pubsub ${this.channelName}: ` + (await this.channel.getPeers()));
    });
  }
}
