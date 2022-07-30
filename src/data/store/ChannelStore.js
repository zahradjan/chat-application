import IpfsPubsubPeerMonitor from "ipfs-pubsub-peer-monitor";
import { makeAutoObservable, runInAction } from "mobx";

export class ChannelStore {
  channel;
  channelName;
  peersDb;

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
      await this.rootStore.dataStore.peersDb.add(peerJoined);
      this.replicatePeersDB();
    });
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

  async listenForLeftPeers() {
    this.channel.on("leave", async (peerLeft) => {
      console.log("Peer left: " + peerLeft);
      console.log(`Peers on Pubsub ${this.channelName}: ` + (await this.channel.getPeers()));
    });
  }
}
