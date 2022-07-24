import { makeAutoObservable, runInAction, toJS } from "mobx";
import orbitdb from "orbit-db";
import IPFS from "ipfs";
export class ChannelStore {
  chatRoomMessagesDb;
  chatRoomMessages;
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.chatRoomMessagesDb = undefined;
    this.chatRoomMessages = [];
    makeAutoObservable(this);
  }

  async init() {
    if (this.rootStore.dataStore.ipfsNode === undefined) throw Error("IPFS Node not defined!");
    if (this.rootStore.dataStore.orbitDb === undefined) throw Error("OrbitDb not defined!");
    if (this.rootStore.dataStore.orbitDbPubsub === undefined) throw Error("OrbitDbPubsub not defined!");
    await this.rootStore.dataStore.orbitDbPubsub._ipfs.pubsub;
    runInAction(async () => {
      this.chatRoomMessagesDb = await this.rootStore.dataStore.orbitDb.feed("messages");
      await this.chatRoomMessagesDb.load();
      // await this.setMessagesFromDb();
      // await this.disconnectFromChatRoom("FirstChatRoom");
      await this.connectToChatRoom("FirstChatRoom");
    });
    // console.log(new orbitdb.Pubsub(this.rootStore.dataStore.ipfsNode));
    // console.log(this.rootStore.dataStore.orbitDb.Pubsub());
  }
  isChatRoomReady() {
    return !!this.rootStore.dataStore.orbitDbPubsub._ipfs.pubsub;
  }
  async setMessagesFromDb() {
    const entries = [];
    const all = await toJS(this.chatRoomMessagesDb.all);
    all.map((e) => entries.push(e.payload.value));
    runInAction(() => {
      this.chatRoomMessages = entries;
    });
    // all.map((e) => this.chatRoomMessages.push(e.payload.value));
  }

  async connectToChatRoom(chatRoomName) {
    await this.rootStore.dataStore.orbitDbPubsub._ipfs.pubsub.subscribe(chatRoomName, this.handleReceivingMessages.bind(this));

    // runInAction(async () => {
    // });
  }
  async disconnectFromChatRoom(chatRoomName) {
    await this.rootStore.dataStore.orbitDbPubsub._ipfs.pubsub.unsubscribe(chatRoomName, this.handleReceivingMessages.bind(this));

    // runInAction(async () => {
    // });
  }

  async handleReceivingMessages(msg) {
    // if(Buffer.isBuffer(msg))console.log(new TextDecoder().decode(msg));
    console.log(msg);
    console.log("Received MSG type:" + typeof msg);
    const parsedMsg = JSON.parse(msg.data.toString());
    console.log("ParsedMsg:" + parsedMsg);
    this.chatRoomMessages.push(parsedMsg);

    //   runInAction(() => {
    //     // this.chatRoomMessagesDb.add(msg );
    //     // console.log(this.chatRoomMessagesDb.all);
    //   });
  }
  async sendMessageToChatRoom(chatRoomName, message) {
    const msgJsonString = JSON.stringify(message);
    console.log(msgJsonString);
    console.log("Type " + typeof msgJsonString);

    const messageBuffer = Buffer.from(msgJsonString);
    console.log("Buffer: " + messageBuffer);
    await this.rootStore.dataStore.orbitDbPubsub._ipfs.pubsub.publish(chatRoomName, messageBuffer);

    // runInAction(async () => {});
  }
}
