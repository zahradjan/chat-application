import { makeAutoObservable, runInAction, toJS } from "mobx";
import { AvatarGenerator } from "random-avatar-generator";

export class RoomStore {
  avatar;
  room;
  chatRoomMessages;
  chatRoomMessagesDb;
  textDecoder;
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.room = undefined;
    this.chatRoomMessages = [];
    this.textDecoder = new TextDecoder();
    this.avatar = new AvatarGenerator();
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
    console.log(msg);
    //TODO: nevim proc ale kdyz je to zprava odeslana ze stejneho peeru tak je to string a jinak je to object
    if (typeof msg.data === "object") msg.data = this.textDecoder.decode(msg.data);
    const date = new Date(Date.now());
    const message = {
      data: msg.data,
      from: msg.from,
      sentTime: `${date.getHours()}:${date.getMinutes()}`,
      avatar: this.avatar.generateRandomAvatar(),
    };
    console.log(message);
    this.chatRoomMessages.push(message);
  }

  async connectToChatRoom(chatRoomName) {
    runInAction(async () => {
      await this.room.subscribe(chatRoomName, await this.echo.bind(this));
    });
  }

  async sendMessageToChatRoom(chatRoomName, message) {
    runInAction(async () => {
      await this.room.publish(chatRoomName, message);
    });
  }
}
