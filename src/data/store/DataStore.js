import OrbitDB from "orbit-db";
import IPFS from "ipfs";
import { makeAutoObservable } from "mobx";
export default class DataStore {
  ipfsNode;
  orbitDb;
  peerId;
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.peers = [];
    makeAutoObservable(this);
  }

  async init() {
    // if (!this.rootStore.sessionStore.isAuthenticated()) throw Error("User is not defined");
    if (this.ipfsNode !== undefined) return;
    if (this.orbitDb !== undefined) return;

    const dbConfig = {
      // If database doesn't exist, create it
      create: true,
      // Don't wait to load from the network
      sync: true,
      // directory: `/orbitdb/decentio-orbitdb-chat-${Math.random()}}`,
      // Load only the local version of the database
      localOnly: false,
      // Allow anyone to write to the database,
      // otherwise only the creator of the database can write
      accessController: {
        write: ["*"],
      },
    };
    const ipfsConfig = {
      preload: { enabled: false },
      // relay: { enabled: true, hop: { enabled: true, active: true } },
      // repo: `/orbitdb/decentio-orbitdb-chat-ipfs-${this.rootStore.sessionStore._user}`,
      EXPERIMENTAL: {
        pubsub: true,
      },

      config: {
        Addresses: {
          Swarm: [
            "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
            "/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/",
            "/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star",
            "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star",
          ],
        },
        Bootstrap: [],
      },
    };

    await this.start(ipfsConfig, dbConfig);
  }

  async start(ipfsConf, orbitDbconf) {
    console.log(this.ipfsNode);
    console.log(this.orbitDb);
    await this.startIpfsNode(ipfsConf);
    await this.startOrbitDb(orbitDbconf);
    console.log(this.ipfsNode);
    console.log(this.orbitDb);
    this.peerId = await this.getPeerId();
    console.log(this.orbitDb.identity.id);
    // setInterval(async () => {
    //   const peers = await this.getIpfsPeers();
    //   console.log(peers);
    //   await peers.map(async (peerId) => {
    //     try {
    //       // await this.connectToPeer(peerId.peer);
    //     } catch {}
    //   });
    //   // const topics = await this.ipfsNode.pubsub.ls();
    //   // console.log(topics);
    // }, 10000);
    const multiaddr = await this.ipfsNode.swarm.localAddrs();
    console.log(multiaddr);
    // this.ipfsNode.libp2p.connectionManager.on("peer:connect", this.onPeerConnect.bind(this));
  }
  async onPeerConnect(connection) {
    console.log("Peer connected:" + connection.remotePeer._idB58String);
  }

  async getPeerId() {
    if (this.ipfsNode === undefined) throw Error("IPFS Node not defined");
    const peerInfo = await this.ipfsNode.id();
    return peerInfo.id;
  }

  async connectToPeer(multiaddr, protocol = "/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/") {
    try {
      await this.ipfsNode.swarm.connect(multiaddr);
    } catch (err) {
      console.log(err);
      await this.ipfsNode.swarm.connect(multiaddr);
    }
  }

  async startIpfsNode(ipfsConf) {
    this.ipfsNode = await IPFS.create(ipfsConf);
  }
  async startOrbitDb(orbitDbconf) {
    this.orbitDb = await OrbitDB.createInstance(this.ipfsNode, orbitDbconf);
  }
  async getIpfsPeers() {
    const peers = await this.ipfsNode.swarm.peers();
    // console.log(peers);
    return peers;
  }

  async handleStop() {
    await this.orbitDb.disconnect();
    await this.ipfsNode.stop();
    delete this.orbitDb;
    delete this.ipfsNode;
  }
}
