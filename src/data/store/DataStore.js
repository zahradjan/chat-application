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
    if (!this.rootStore.sessionStore.isAuthenticated()) throw Error("User is not defined");
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
            // "/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
            "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
            "/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/",
            "/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star",
            "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star",
            // // "/ip4/0.0.0.0/tcp/4002",
            // "/ip4/127.0.0.1/tcp/4003/ws",
            // "/libp2p-webrtc-star/dns4/star-signal.cloud.ipfs.team/wss",
            // "/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star",
            //       // Use local signal server
            // "/ip4/0.0.0.0/tcp/4011/ws",
            // "/ip6/::/tcp/4011/ws",
          ],
        },
        Bootstrap: [
          // "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
          // "/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/",
          // "/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star",
          // "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star",
        ],
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
    // setInterval(async () => {
    //   const peers = await this.getIpfsPeers();
    //   console.log(peers);
    //   // await peers.map(async (peerId) => {
    //   //   try {
    //   //     await this.connectToPeer(peerId.peer);
    //   //   } catch {}
    //   // });
    //   // const topics = await this.ipfsNode.pubsub.ls();
    //   // console.log(topics);
    // }, 10000);
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

  async connectToPeer(multiaddr, protocol = "/dnsaddr/bootstrap.libp2p.io/p2p/") {
    try {
      await this.ipfsNode.swarm.connect(protocol + multiaddr);
    } catch (err) {
      console.log(err);
      await this.ipfsNode.swarm.connect(protocol + multiaddr);
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
