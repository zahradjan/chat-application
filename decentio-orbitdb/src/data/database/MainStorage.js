import OrbitDB from "orbit-db";
import IPFS from "ipfs";
import { makeAutoObservable } from "mobx";
export default class MainStorage {
  constructor(sessionStorage) {
    this.sessionStorage = sessionStorage;
    makeAutoObservable(this);
  }

  init() {
    if (!this.sessionStorage._user) return;
    if (this.ipfsNode) return;
    if (this.orbitDb) return;
    console.log(this.sessionStorage._user);
    const dbConfig = {
      // If database doesn't exist, create it
      create: true,
      // Don't wait to load from the network
      sync: false,
      directory: `/orbitdb/decentio-orbitdb-chat-${this.sessionStorage._user}`,
      // Load only the local version of the database
      // localOnly: true,
      // Allow anyone to write to the database,
      // otherwise only the creator of the database can write
      accessController: {
        write: ["*"],
      },
    };
    const ipfsConfig = {
      preload: { enabled: false }, // Prevents large data transfers
      repo: `/orbitdb/decentio-orbitdb-chat-ipfs-${this.sessionStorage._user}`,
      EXPERIMENTAL: {
        pubsub: true,
      },
      config: {
        Addresses: {
          Swarm: [
            // Use IPFS dev signal server
            // Websocket:
            // '/dns4/ws-star-signal-1.servep2p.com/tcp/443/wss/p2p-websocket-star',
            // '/dns4/ws-star-signal-2.servep2p.com/tcp/443/wss/p2p-websocket-star',
            // '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
            // WebRTC:
            // '/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star',
            "/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
            "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
            "/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/",
            // Use local signal server
            // '/ip4/0.0.0.0/tcp/9090/wss/p2p-webrtc-star',
          ],
        },
      },
    };
    this.start(ipfsConfig, dbConfig);
  }

  async start(ipfsConf, orbitDbconf) {
    await this.startIpfsNode(ipfsConf);
    await this.startOrbitDb(orbitDbconf);
  }

  async startIpfsNode(ipfsConf) {
    this.ipfsNode = await IPFS.create(ipfsConf);
  }
  async startOrbitDb(orbitDbconf) {
    this.orbitDb = await OrbitDB.createInstance(this.ipfsNode, orbitDbconf);
  }

  async handleStop() {
    await this.orbitDb.disconnect();
    await this.ipfsNode.stop();
    delete this.orbitDb;
    delete this.ipfsNode;
  }
}
