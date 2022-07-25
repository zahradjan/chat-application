import { makeAutoObservable, runInAction, toJS } from "mobx";

export class RoomStore {
  room;
  chatRoomMessages;
  chatRoomMessagesDb;
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.room = undefined;
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
      await this.connectToChatRoom("TestChatRoom");
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
  async echo(msg) {
    console.log(typeof msg.data);
    //TODO: nevim proc ale kdyz je to zprava odeslana ze stejneho peeru tak je to string a jinak je to object
    if (typeof msg.data === "object") msg.data = new TextDecoder().decode(msg.data);
    this.chatRoomMessages.push(msg.data);
  }

  async connectToChatRoom(chatRoomName) {
    runInAction(async () => {
      await this.room.subscribe(chatRoomName, await this.echo.bind(this));
    });
  }

  // async handleReceivingMessages(msg) {
  //   runInAction(() => {
  //     this.chatRoomMessagesDb.add({ message: msg });
  //     console.log(this.chatRoomMessagesDb.all);
  //     this.chatRoomMessages.push(msg);
  //     console.log(msg);
  //   });
  // }
  async sendMessageToChatRoom(chatRoomName, message) {
    runInAction(async () => {
      await this.room.publish(chatRoomName, message);
    });
  }
}
