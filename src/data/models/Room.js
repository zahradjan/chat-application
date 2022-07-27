import { makeAutoObservable, runInAction, toJS } from "mobx";
import { Message } from "./Message.js";
import { AvatarGenerator } from "random-avatar-generator";
export class ChatRoom {
  pubsub;
  orbitDb;
  roomName;
  textDecoder;
  chatMessagesDb;
  chatRoomMessages;

  constructor(pubsub, orbitDb, roomName) {
    this.pubsub = pubsub;
    this.orbitDb = orbitDb;
    this.roomName = roomName;
    this.textDecoder = new TextDecoder();
    this.chatRoomMessages = [];
    makeAutoObservable(this);
  }
  async init() {
    await this.connectToChatRoom();
    await this.loadMsgDb();
    await this.setMessagesFromDb();
  }

  async loadMsgDb() {
    this.chatMessagesDb = await this.orbitDb.feed(`${this.roomName}-messages`);
    await this.chatMessagesDb.load();
  }

  async setMessagesFromDb() {
    const entries = [];
    const all = await toJS(this.chatMessagesDb.all);
    all.map((e) => entries.push(e.payload.value));
    this.chatRoomMessages = entries;
  }

  async connectToChatRoom() {
    runInAction(async () => {
      await this.pubsub.subscribe(this.roomName, await this.echo.bind(this));
    });
  }

  async sendMessageToChatRoom(msg) {
    console.log("Msg in sending: " + msg);
    //TODO:messages here
    // const date = new Date(Date.now());
    // const message = new Message(msg.from, msg, `${date.getHours()}:${date.getMinutes()}`, new AvatarGenerator().generateRandomAvatar(msg.from));
    // const stringifyMessage = JSON.stringify(message);
    runInAction(async () => {
      await this.pubsub.publish(this.roomName, msg);
    });
  }

  async echo(msg) {
    // console.log(typeof msg.data);
    console.log(msg);
    //TODO: nevim proc ale kdyz je to zprava odeslana ze stejneho peeru tak je to string a jinak je to object
    if (typeof msg.data === "object") msg.data = this.textDecoder.decode(msg.data);
    const date = new Date(Date.now());
    const message = new Message(msg.from, msg.data, `${date.getHours()}:${date.getMinutes()}`, new AvatarGenerator().generateRandomAvatar(msg.from));

    console.log(msg.data);

    // const parsedMessage = JSON.parse(msg.data);
    // console.log(parsedMessage);
    // this.chatMessagesDb.add(parsedMessage);
    this.chatRoomMessages.push(message);
  }
}
