import OrbitDB from "orbit-db";
import IPFS from "ipfs";
import { makeAutoObservable } from "mobx";

export default class DataStore {
  ipfsNode;
  orbitDb;
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
      sync: false,
      // directory: `/orbitdb/decentio-orbitdb-chat-${Math.random()}}`,
      // Load only the local version of the database
      localOnly: true,
      // Allow anyone to write to the database,
      // otherwise only the creator of the database can write
      accessController: {
        write: ["*"],
      },
    };
    const ipfsConfig = {
      // preload: { enabled: false },
      relay: { enabled: true, hop: { enabled: true, active: true } },
      // Prevents large data transfers
      repo: `/orbitdb/decentio-orbitdb-chat-ipfs-${Math.random()}}`,
      EXPERIMENTAL: {
        pubsub: true,
      },
      // Addresses: {
      //   Swarm: ["/ip4/0.0.0.0/tcp/4011/ws", "/ip6/::/tcp/4011/ws"],
      // },
      // Swarm: {
      //   EnableRelayHop: true,
      // },
      // config: {
      //   Addresses: {
      //     Swarm: [
      //       // Use IPFS dev signal server
      //       // Websocket:
      //       // '/dns4/ws-star-signal-1.servep2p.com/tcp/443/wss/p2p-websocket-star',
      //       // '/dns4/ws-star-signal-2.servep2p.com/tcp/443/wss/p2p-websocket-star',
      //       // '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
      //       // WebRTC:
      //       // '/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star',
      //       // "/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
      //       // "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
      //       // "/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/",
      //       // Use local signal server
      //       // '/ip4/0.0.0.0/tcp/9090/wss/p2p-webrtc-star',
      //     ],
      //   },
      // },
    };

    await this.start(ipfsConfig, dbConfig);
  }

  async start(ipfsConf, orbitDbconf) {
    await this.startIpfsNode(ipfsConf);
    await this.startOrbitDb(orbitDbconf);

    const peerInfo = await this.ipfsNode.id();
    console.log(peerInfo.id);
    this.ipfsNode.pubsub.subscribe(peerInfo.id, this.handleMessageReceived.bind(this));

    // this.sendMessage(peerInfo.id, "Hello World");
    // // this.sendMessage(peerInfo.id, "Hello");
    // const defaultOptions = { accessController: { write: [this.orbitDb.identity.id] } };

    // const docStoreOptions = {
    //   ...defaultOptions,
    //   indexBy: "hash",
    // };

    // const messages = await this.orbitDb.docstore("messages", docStoreOptions);
    // await messages.load();

    // const user = new UserStorage(this.ipfsNode, this.orbitDb);
    // await user.init();
    // await user.updateProfileField("messages", messages.id);
    // await user.load();
    // await user.set("messages", messages.id);

    // await this.updateProfileField("username", "Paul Atreides", user);
    // user.set("avatarImage", "./../../images/paul_atreides.jpg");
    // await this.updateProfileField("username", "Duncan Idaho", user);
    // await this.loadFixtureData(
    //   {
    //     username: "Paul Atreides",
    //     messages: messages.id,
    //     nodeId: peerInfo.id,
    //   },
    //   user
    // );
    // const getUserProfileFields = await user.getAllProfileFields();
    // console.log(getUserProfileFields);
    // const peers = await this.ipfsNode.pubsub.peers(peerInfo.id);
    // console.log(peers);
    // this.ipfsNode.on("peer:connect", this.handlePeerConnected.bind(this));
  }

  async handleMessageReceived(msg) {
    const parsedMsg = JSON.parse(msg.data.toString());
    const msgKeys = Object.keys(parsedMsg);
    console.log(msgKeys);
    switch (msgKeys[0]) {
      case "userDb":
        var peerDb = await this.orbitDb.open(parsedMsg.userDb);
        peerDb.events.on("replicated", async () => {
          if (peerDb.get("messages")) {
            console.log(peerDb.all);
          }
        });
        break;
      default:
        break;
    }
    console.log(msg.data.toString());
    // if (this.onmessage) this.onmessage(msg);
  }

  // onmessage = console.log;

  handlePeerConnected(ipfsPeer, user) {
    const ipfsId = ipfsPeer.id.toB58String();
    setTimeout(async () => {
      await this.sendMessage(ipfsId, { userDb: user.id });
    }, 2000);
    console.log(ipfsPeer);
  }

  async sendMessage(topic, message) {
    try {
      const msgString = JSON.stringify(message);
      const messageBuffer = Buffer.from(msgString);
      await this.ipfsNode.pubsub.publish(topic, messageBuffer);
    } catch (e) {
      throw e;
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
    console.log(peers);
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
