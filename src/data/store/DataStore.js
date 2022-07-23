import OrbitDB from "orbit-db";
import IPFS from "ipfs";
import { makeAutoObservable } from "mobx";
export default class DataStore {
  ipfsNode;
  orbitDb;
  pubsubMonitor;
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  async init() {
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
      // preload: { enabled: false },
      relay: { enabled: true, hop: { enabled: true, active: true } },
      // libp2p: {
      //   config: {
      //     dht: {
      //       enabled: true,
      //     },
      //     modules: {
      //       transport: ["WebRTCStar", "WebSockets"],
      //     },
      //     // transport: {
      //     //   WebRTCStar: {
      //     //     wrtc,
      //     //   },
      //     // },
      //   },
      // },
      // peerDiscovery: {
      //   autoDial: true, // Auto connect to discovered peers (limited by ConnectionManager minPeers)
      //   mdns: {
      //     // mdns options
      //     interval: 1000, // ms
      //     enabled: true,
      //   },
      //   webRTCStar: {
      //     // webrtc-star options
      //     interval: 1000, // ms
      //     enabled: false,
      //   },
      //   // .. other discovery module options.
      // },
      // Prevents large data transfers
      //TODO: nejak oddelit at to neni random ale treba username nebo neco
      repo: `/orbitdb/decentio-orbitdb-chat-ipfs-${this.rootStore.sessionStore._user}}`,
      EXPERIMENTAL: {
        pubsub: true,
      },

      config: {
        Addresses: {
          Swarm: [
            //       // Use IPFS dev signal server
            //       // Websocket:
            // "/dns4/ws-star-signal-1.servep2p.com/tcp/443/wss/p2p-websocket-star",
            // "/dns4/ws-star-signal-2.servep2p.com/tcp/443/wss/p2p-websocket-star",
            // "/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star",
            // WebRTC:
            "/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
            "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
            "/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/",
            "/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star",
            "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star",
            // "/ip4/0.0.0.0/tcp/4002",
            // "/ip4/127.0.0.1/tcp/4003/ws",
            // "/libp2p-webrtc-star/dns4/star-signal.cloud.ipfs.team/wss",
            // "/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star",
            //       // Use local signal server
            "/ip4/0.0.0.0/tcp/4011/ws",
            "/ip6/::/tcp/4011/ws",
          ],
        },
        Bootstrap: [],
      },
    };

    await this.start(ipfsConfig, dbConfig);
  }

  async start(ipfsConf, orbitDbconf) {
    await this.startIpfsNode(ipfsConf);
    await this.startOrbitDb(orbitDbconf);
    // this.ipfsNode.config.set("Addresses.Swarm", ["/ip4/0.0.0.0/tcp/4002", "/ip4/127.0.0.1/tcp/4003/ws"], console.log);
    //TODO: Peer se connecti na stejnym pubsub topicu a lze volat ten connect, joined apod.
    //potrebuji je umet propojit tak aby kazdy mel svoji DB a komunikovali nejakym chat roomu == pubsub room a v tom se ukladali ty zpravy
    // vymodelovat si podrobneji jak tam bude proudit ta informace
    const peerInfo = await this.ipfsNode.id();
    console.log("Peer ID: " + peerInfo.id);
    // this.ipfsNode.libp2p.on("peer:connect", this.handlePeerConnected.bind(this));
    // this.ipfsNode.libp2p.pubsub.on("peer:connect", (peer) => console.log("Connected peer: " + peer));
    // this.ipfsNode.libp2p.on("peer:discovery", (peer) => console.log("Peer: " + peer));
    // const defaultOptions = { accessController: { write: [this.orbitDb.identity.id] } };
    this.peersDb = await this.orbitDb.feed("peers");
    await this.peersDb.load();

    // const monitor = new PeerMonitor(this.ipfsNode.pubsub, "DecentioPubsubNetwork");
    // this.ipfsNode.libp2p.pubsub.unsubscribe("DecentioPubsubNetwork");
    this.ipfsNode.libp2p.pubsub.subscribe("DecentioPubsubNetwork", (msg) => console.log(msg));
    this.ipfsNode.libp2p.pubsub.publish("DecentioPubsubNetwork", { message: "Hello", name: this.rootStore.sessionStore._user });

    this.peersDb.events.on("peer", (peer) => console.log("PeersDB: " + peer));
    this.peersDb.events.on("replicated", (address) => console.log("Adrress: " + address));
    this.peersDb.events.on("ready", () => {
      console.log("ready");
    });
    // monitor.on("join", async (peerJoined) => {
    //   await this.peersDb.add({ peerId: peerJoined });
    //   const all = this.peersDb
    //     .iterator({ limit: -1 })
    //     .collect()
    //     .map((e) => e.payload.value);
    //   console.log(all);
    // });
    console.log(typeof peerInfo.id);
    // this.handlePeerConnected(peerInfo.id);

    // monitor.on("leave", (peer) => console.log("Peer left", peer));
    // monitor.on("error", (e) => console.error(e));

    // this.sendMessage("12D3KooWH1XyPHHfv2ipZEEkevBGrqNs7PXUCVALyh2vjLn9BtaJ", "Test");
    // if (peerInfo.id !== "12D3KooWH1XyPHHfv2ipZEEkevBGrqNs7PXUCVALyh2vjLn9BtaJ") {
    //   const addr = "/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/12D3KooWH1XyPHHfv2ipZEEkevBGrqNs7PXUCVALyh2vjLn9BtaJ";
    //   try {
    //     await this.ipfsNode.swarm.connect(addr);
    //   } catch (err) {
    //     console.log(err);
    //     await this.ipfsNode.swarm.connect(addr);
    //   }
    // }
    // this.handlePeerConnected(peerInfo);
    console.log("Peer Addresses: " + peerInfo.addresses);
    console.log(await this.getIpfsPeers());

    const topics = await this.ipfsNode.pubsub.ls();
    console.log(topics);

    const defaultOptions = { accessController: { write: [this.orbitDb.identity.id] } };

    const docStoreOptions = {
      ...defaultOptions,
      indexBy: "hash",
    };

    this.messages = await this.orbitDb.docstore("messages", docStoreOptions);
    await this.messages.load();
    console.log(this.messages.db);

    this.peersDb = await this.orbitDb.keyvalue("peers", defaultOptions);
    await this.peersDb.load();
  }

  async handleMessageReceived(msg) {
    const parsedMsg = JSON.parse(msg.data.toString());
    const msgKeys = Object.keys(parsedMsg);
    console.log("ParsedDb: " + parsedMsg);
    console.log(msgKeys[0]);
    switch (msgKeys[0]) {
      case "userDb":
        var peerDb = await this.orbitDb.open(parsedMsg.userDb);
        peerDb.events.on("replicated", async () => {
          console.log("DB replicated");
          // if (peerDb.get("pieces")) {
          await this.peersDb.set(peerDb.id, peerDb.all);
          console.log(peerDb.all);
          // }
        });
        break;
      default:
        break;
    }
    console.log(msg.data.toString());
    // if (this.onmessage) this.onmessage(msg);
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

  async createDBStore(address) {
    const store = await this.orbitDb.docstore(address);
    await store.load();
    return store;
  }

  async handleStop() {
    await this.orbitDb.disconnect();
    await this.ipfsNode.stop();
    delete this.orbitDb;
    delete this.ipfsNode;
  }
}
