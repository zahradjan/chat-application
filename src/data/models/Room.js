import { get, makeAutoObservable, runInAction, toJS } from "mobx";
import { Message } from "./Message.js";
import { AvatarGenerator } from "random-avatar-generator";
export class ChatRoom {
  pubsub;
  ipfsNode;
  orbitDb;
  roomName;
  textDecoder;
  chatMessagesDb;
  chatRoomMessages;

  constructor(ipfsNode, pubsub, orbitDb, roomName) {
    this.ipfsNode = ipfsNode;
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
      await this.pubsub.unsubscribe(this.roomName, (msg) => console.log(msg));
      await this.pubsub.subscribe(this.roomName, await this.echo.bind(this));
    });
  }

  async sendMessageToChatRoom(msg) {
    console.log("Msg in sending: " + msg);
    //TODO:messages here
    // const date = new Date(Date.now());
    // const message = new Message(msg.from, msg, `${date.getHours()}:${date.getMinutes()}`, new AvatarGenerator().generateRandomAvatar(msg.from));
    const stringifyMessage = JSON.stringify(msg);
    runInAction(async () => {
      await this.pubsub.publish(this.roomName, stringifyMessage);
    });
  }

  async uploadFile(filesContent) {
    //TODO: maybe Multiple files if interested
    console.log(filesContent[0]);
    console.log(filesContent[0].name.split(".").pop());
    const result = await this.ipfsNode.add(filesContent[0]);
    console.log(result);
    const fileMessage = { fileName: filesContent[0].name, path: result.path };
    console.log(fileMessage);
    this.sendMessageToChatRoom(fileMessage);
  }
  getFileExtension(fileName) {
    return fileName.split(".").pop();
  }

  fileIsImage(fileName) {
    const match = fileName.match(/\.(jpg|jpeg|png|gif)$/i);
    console.log(match);
    return match !== null;
  }
  async retrieveFileFromIpfs(path) {
    const ipfsFile = await this.ipfsNode.cat(path);

    console.log(ipfsFile);

    let file;

    const content = [];
    for await (const chunk of ipfsFile) {
      content.push(chunk);
    }
    console.log(content);

    const blob = new Blob(content);

    file = blob;

    return file;
  }

  async echo(msg) {
    // console.log(typeof msg.data);
    console.log(msg.data);
    //TODO: nevim proc ale kdyz je to zprava odeslana ze stejneho peeru tak je to string a jinak je to object
    if (typeof msg.data === "object") msg.data = this.textDecoder.decode(msg.data);
    const parsedMsg = JSON.parse(msg.data);
    console.log(parsedMsg);
    if (msg.data.includes("path")) {
      let file = await this.retrieveFileFromIpfs(parsedMsg.path);
      console.log(file);
      parsedMsg["file"] = file;
    }
    console.log(parsedMsg);
    const date = new Date(Date.now());
    const message = new Message(msg.from, parsedMsg, `${date.getHours()}:${date.getMinutes()}`, new AvatarGenerator().generateRandomAvatar(msg.from));

    console.log(message);

    // const parsedMessage = JSON.parse(msg.data);
    // console.log(parsedMessage);
    await this.saveMessage(message);
  }

  async saveMessage(message) {
    // await this.chatMessagesDb.add(message);
    this.chatRoomMessages.push(message);
  }
}
