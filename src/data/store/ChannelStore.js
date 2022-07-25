import { makeAutoObservable, runInAction, toJS } from "mobx";

export class ChannelStore {
  room;
  chatRoomMessagesDb;
  chatRoomMessages;
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.room = undefined;
    this.chatRoomMessagesDb = undefined;
    this.chatRoomMessages = [];
    makeAutoObservable(this);
  }

  async init() {
    if (this.rootStore.dataStore.ipfsNode === undefined) throw Error("IPFS Node not defined!");
    if (this.rootStore.dataStore.orbitDb === undefined) throw Error("OrbitDb not defined!");
    runInAction(async () => {
      this.room = await this.rootStore.dataStore.ipfsNode.pubsub;
      this.chatRoomMessagesDb = await this.rootStore.dataStore.orbitDb.feed("messages");
      await this.chatRoomMessagesDb.load();
      await this.setMessagesFromDb();
      // await this.connectToChatRoom("FirstChatRoom");
    });
  }
  isChatRoomReady() {
    return !!this.room;
  }
  async setMessagesFromDb() {
    const entries = [];
    const all = await toJS(this.chatRoomMessagesDb.all);
    all.map((e) => entries.push(e.payload.value));
    runInAction(() => {
      this.chatRoomMessages = entries;
    });
  }

  async connectToChatRoom(chatRoomName) {
    runInAction(async () => {
      await this.room.subscribe(chatRoomName, this.handleReceivingMessages.bind(this));
    });
  }

  async handleReceivingMessages(msg) {
    runInAction(() => {
      this.chatRoomMessagesDb.add({ message: msg });
      console.log(this.chatRoomMessagesDb.all);
      this.chatRoomMessages.push(msg);
      console.log(msg);
    });
  }
  async sendMessageToChatRoom(chatRoomName, message) {
    runInAction(async () => {
      await this.room.publish(chatRoomName, message);
    });
  }
}
