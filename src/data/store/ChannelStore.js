import IpfsPubsubPeerMonitor from "ipfs-pubsub-peer-monitor";
import { makeAutoObservable, runInAction, toJS } from "mobx";

export class ChannelStore {
  channel;
  channelName;
  peers;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.channel = undefined;
    this.peers = [];
    makeAutoObservable(this);
  }
  async init(topic) {
    if (this.rootStore.dataStore.ipfsNode === undefined) throw Error("IPFS Node not defined!");
    if (this.rootStore.dataStore.orbitDb === undefined) throw Error("OrbitDb not defined!");
    runInAction(async () => {
      this.channelName = topic;
      this.channel = new IpfsPubsubPeerMonitor(this.rootStore.dataStore.ipfsNode.pubsub, topic);
      await this.setPeersFromDb();
      await this.listenForJoinedPeers();
      await this.listenForLeftPeers();
    });
  }

  async setPeersFromDb() {
    const all = await toJS(this.rootStore.dataStore.peersDb.all);
    runInAction(() => {
      all.map((e) => {
        console.log(e.payload.value);
        return this.peers.push(e.payload.value);
      });
    });
  }

  async listenForJoinedPeers() {
    this.channel.on("join", async (peerJoined) => {
      console.log("Peer joined: " + peerJoined);
      console.log(`Peers on Pubsub ${this.channelName}: ` + (await this.channel.getPeers()));
      await this.savePeer(peerJoined);
      // this.replicatePeersDB();
    });
  }

  async listenForLeftPeers() {
    this.channel.on("leave", async (peerLeft) => {
      console.log("Peer left: " + peerLeft);
      console.log(`Peers on Pubsub ${this.channelName}: ` + (await this.channel.getPeers()));
      // await this.removePeer(peerLeft);
    });
  }

  async peerIsInDb(peer) {
    return this.rootStore.dataStore.peersDb
      .iterator()
      .collect()
      .find((item) => item.payload.value === peer);
  }

  async savePeer(peer) {
    runInAction(async () => {
      if (!(await this.peerIsInDb(peer))) {
        this.peers.push(peer);
        await this.rootStore.dataStore.peersDb.add(peer);
      }
    });
  }
  async removePeer(peer) {
    const entry = await this.rootStore.dataStore.peersDb
      .iterator()
      .collect()
      .map((item) => (item.payload.value === peer ? item : undefined));
    console.log(entry);
    if (entry) {
      await this.rootStore.dataStore.peersDb.remove(entry[0].hash);
    }
  }

  replicatePeersDB() {
    setTimeout(async () => {
      const nodeId = await this.rootStore.dataStore.getPeerId();
      const peersDbId = await this.rootStore.dataStore.getPeersDbId();
      console.log(nodeId);
      await this.rootStore.dataStore.peersDb.all.map((peer) => {
        const peerId = peer.payload.value;
        if (peerId !== nodeId) {
          console.log("jsem tu ");
          console.log(peerId);
          console.log(peersDbId);
          const stringifyPayload = JSON.stringify({ peerDb: peersDbId });
          this.rootStore.dataStore.ipfsNode.pubsub.publish(peerId, stringifyPayload);
        }
      });
    }, 2000);
  }
}
