import IpfsPubsubPeerMonitor from "ipfs-pubsub-peer-monitor";
import { makeAutoObservable, runInAction, toJS } from "mobx";

export class MonitorStore {
  monitor;
  topicName;
  peers;
  peersDb;
  texDecoder;
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.monitor = undefined;
    this.peersDb = undefined;
    this.peers = [];
    this.topicName = "DecentioGlobalNetwork";
    this.texDecoder = new TextDecoder();
    makeAutoObservable(this);
  }

  async init() {
    if (this.rootStore.dataStore.ipfsNode === undefined) throw Error("IPFS Node not defined!");
    if (this.rootStore.dataStore.orbitDb === undefined) throw Error("OrbitDb not defined!");
    runInAction(async () => {
      await this.subscribeToOwnPubsub();
      await this.subscribeToDecentioPubsub();
      await this.loadPeersDb();
      await this.setPeersFromDb();
      this.monitor = new IpfsPubsubPeerMonitor(this.rootStore.dataStore.ipfsNode.pubsub, this.topicName);
      await this.listenForJoinedPeers();
      await this.listenForLeftPeers();
    });
  }
  async isMonitorReady() {
    return this.monitor;
  }

  async setPeersFromDb() {
    const all = await toJS(this.peersDb.all);
    runInAction(() => {
      all.map((e) => {
        // console.log(e.payload.value);
        return this.peers.push(e.payload.value);
      });
    });
  }

  async listenForJoinedPeers() {
    this.monitor.on("join", async (peerJoined) => {
      console.log("Peer joined: " + peerJoined);
      console.log(`Peers on Pubsub ${this.topicName}: ` + (await this.monitor.getPeers()));
      setTimeout(async () => {
        let peerInDb = this.peerIsInDb(peerJoined);

        if (peerInDb) {
          // const room = await this.rootStore.roomStore.getRoom(peerJoined);
          // //mozna lepsi ten init
          // await room.connectToChatRoom();
        } else {
          await this.sendUserDbId(peerJoined);
          // const room = await this.rootStore.roomStore.createRoom(peerJoined);
          // await room.init();
        }
      }, 2000);
    });
  }

  async listenForLeftPeers() {
    this.monitor.on("leave", async (peerLeft) => {
      console.log("Peer left: " + peerLeft);
      console.log(`Peers on Pubsub ${this.topicName}: ` + (await this.monitor.getPeers()));
      // await this.removePeer(peerLeft);
    });
  }

  peerIsInDb(peer) {
    console.log(peer);
    const peers = toJS(this.peers);
    console.log(toJS(this.peers));
    return peers.find((item) => item.user.peerId === peer);
  }

  async savePeer(peer) {
    runInAction(async () => {
      console.log(!this.peerIsInDb(peer));
      if (!this.peerIsInDb(peer)) {
        this.peers.push(peer);
        await this.peersDb.add(peer);
      }
    });
  }
  async removePeer(peer) {
    const entry = await this.peersDb
      .iterator()
      .collect()
      .map((item) => (item.payload.value === peer ? item : undefined));
    console.log(entry);
    if (entry) {
      await this.peersDb.remove(entry[0].hash);
    }
  }
  async sendUserDbId(peer) {
    console.log(this.peerIsInDb(peer));

    const userDbId = await this.rootStore.userStore.getUserDbId();

    const stringifyPayload = JSON.stringify({ userDb: userDbId });
    console.log(stringifyPayload);
    await this.rootStore.dataStore.ipfsNode.pubsub.publish(peer, stringifyPayload);
  }

  async subscribeToOwnPubsub() {
    const peerInfoId = this.rootStore.dataStore.peerId;
    console.log("Peer ID: " + peerInfoId);
    await this.rootStore.dataStore.ipfsNode.pubsub.subscribe(peerInfoId, async (msg) => {
      console.log(msg.data);

      // this.processMessage(msg);
      if (typeof msg.data === "object") msg.data = this.texDecoder.decode(msg.data);
      const parsedMsg = JSON.parse(msg.data);
      console.log(parsedMsg);
      console.log(parsedMsg.userDb);
      //TODO: tahle podminka vubec nefunguje

      if (parsedMsg.userDb) {
        await this.replicateUserDb(parsedMsg);
        const room = await this.rootStore.roomStore.createRoom(msg.from);
        await room.init();
      } else {
        const targetRoom = this.rootStore.roomStore.getRoom(msg.from);
        console.log(targetRoom);
        if (targetRoom) {
          targetRoom.setMessage(msg);
        }
      }
    });
  }

  async subscribeToDecentioPubsub() {
    await this.rootStore.dataStore.ipfsNode.pubsub.subscribe("DecentioGlobalNetwork", () => {});
  }

  async replicateUserDb(parsedMsg) {
    var peerDbOuter = await this.rootStore.dataStore.orbitDb.open(parsedMsg.userDb);
    peerDbOuter.events.on("replicated", async () => {
      console.log("DB replicated");
      await this.peersDb.add(peerDbOuter.all);
      console.log(peerDbOuter.all);
      this.peers.push(peerDbOuter.all);
      console.log(this.peersDb.all);
      console.log(this.peers);
    });
  }

  async loadPeersDb() {
    this.peersDb = await this.rootStore.dataStore.orbitDb.feed("peers");
    await this.peersDb.load();
  }

  replicatePeersDB() {
    setTimeout(async () => {
      const nodeId = await this.rootStore.dataStore.getPeerId();
      const peersDbId = await this.peersDb.id;
      console.log(nodeId);
      await this.peersDb.all.map((peer) => {
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
  processMessage(msg) {
    if (typeof msg.data === "object") msg.data = this.texDecoder.decode(msg.data);
  }
  async getPeersDbId() {
    const id = await this.peersDb.id;
    return id;
  }
}
