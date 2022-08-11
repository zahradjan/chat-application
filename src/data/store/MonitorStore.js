import IpfsPubsubPeerMonitor from "ipfs-pubsub-peer-monitor";
import { makeAutoObservable, runInAction, toJS } from "mobx";

export class MonitorStore {
  monitor;
  topicName;
  peers;
  peersDb;
  texDecoder;
  errorMessage;
  login;
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.monitor = undefined;
    this.peersDb = undefined;
    this.peers = [];
    this.errorMessage = "";
    this.login = "Login";
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
    return !!this.monitor;
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

        if (!peerInDb) {
          await this.sendUserDbId(peerJoined);
        }
      }, 2000);
    });
  }

  async listenForLeftPeers() {
    this.monitor.on("leave", async (peerLeft) => {
      console.log("Peer left: " + peerLeft);
      console.log(`Peers on Pubsub ${this.topicName}: ` + (await this.monitor.getPeers()));
    });
  }
  setErrorMessage(errorMessage) {
    this.errorMessage = errorMessage;
  }

  peerIsInDb(peer) {
    console.log(peer);
    const peers = toJS(this.peers);
    console.log(toJS(this.peers));
    return peers.find((item) => item.user.peerId === peer);
  }

  setLoginForm() {
    this.login = "Login";
  }
  setSignUpForm() {
    this.login = "SignUp";
  }

  isLoginForm() {
    return this.login === "Login";
  }

  userAlreadyExist(user) {
    console.log(user);
    const peers = toJS(this.peers);
    console.log(toJS(this.peers));
    return peers.find((item) => item.user._username === user);
  }

  // passwordCorrect(user) {
  //   console.log(user);
  //   const peers = toJS(this.peers);
  //   console.log(toJS(this.peers));
  //   return peers.find((item) => item.user._username === user);
  // }

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
    const userDbId = await this.rootStore.userStore.getUserDbId();

    const stringifyPayload = JSON.stringify({ userDb: userDbId });
    console.log(stringifyPayload);
    await this.rootStore.dataStore.ipfsNode.pubsub.publish(peer, stringifyPayload);
  }

  async subscribeToOwnPubsub() {
    const peerInfoId = this.rootStore.dataStore.peerId;
    console.log("Peer ID: " + peerInfoId);
    await this.rootStore.dataStore.ipfsNode.pubsub.subscribe(peerInfoId, async (msg) => {
      if (typeof msg.data === "object") msg.data = this.texDecoder.decode(msg.data);
      const parsedMsg = JSON.parse(msg.data);
      let targetRoom;
      if (parsedMsg.userDb) {
        await this.replicateUserDb(parsedMsg);
        targetRoom = await this.rootStore.roomStore.createRoom(msg.from);
        await targetRoom.init();
      } else {
        targetRoom = this.rootStore.roomStore.getRoom(msg.from);
        console.log(targetRoom);
      }
      if (targetRoom) {
        targetRoom.setMessage(msg);
      }
    });
  }

  async subscribeToDecentioPubsub() {
    await this.rootStore.dataStore.ipfsNode.pubsub.subscribe("DecentioGlobalNetwork", () => {});
  }

  async replicateUserDb(parsedMsg) {
    var peerDbOuter = await this.rootStore.dataStore.orbitDb.open(parsedMsg.userDb);
    await peerDbOuter.load();
    peerDbOuter.events.on("replicated", async () => {
      console.log("DB replicated");
      await this.peersDb.add(peerDbOuter.all);
      console.log(this.peersDb.all);
      this.peers.push(peerDbOuter.all);
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

  async queryCatalog(queryFn) {
    //  const dbAddrs = Object.values(this.peersDb.all).map(peer => peer.pieces)

    const allPieces = await Promise.all(
      this.peersDb.all.map(async (addr) => {
        const db = await this.rootStore.dataStore.orbitDb.open(addr);
        await db.load();

        return db.query(queryFn);
      })
    );

    // return allPieces.reduce((flatPieces, pieces) => flatPieces.concat(pieces), this.pieces.query(queryFn))
  }

  processMessage(msg) {
    if (typeof msg.data === "object") msg.data = this.texDecoder.decode(msg.data);
  }
  async getPeersDbId() {
    const id = await this.peersDb.id;
    return id;
  }
}
