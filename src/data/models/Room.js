import { get, makeAutoObservable, runInAction, toJS } from "mobx";
import { Message } from "./Message.js";
import { AvatarGenerator } from "random-avatar-generator";
import { v4 as uuidv4 } from "uuid";
export class ChatRoom {
  roomId;
  pubsub;
  ipfsNode;
  orbitDb;
  roomName;
  textDecoder;
  chatMessagesDb;
  chatRoomMessages;

  constructor(rootStore, roomName) {
    this.roomId = uuidv4();
    this.rootStore = rootStore;
    this.ipfsNode = rootStore.dataStore.ipfsNode;
    this.pubsub = rootStore.dataStore.ipfsNode.pubsub;
    this.orbitDb = rootStore.dataStore.orbitDb;
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
    // if (this.chatRoomMessages !== []) return;
    const all = await toJS(this.chatMessagesDb.all);
    // console.log(toJS(this.chatRoomMessages));
    runInAction(() => {
      all.map((e) => {
        // console.log(e.payload.value);
        return this.chatRoomMessages.push(e.payload.value);
      });
    });
  }

  async connectToChatRoom() {
    runInAction(async () => {
      // await this.pubsub.unsubscribe(this.roomName, (msg) => console.log(msg));
      await this.pubsub.subscribe(this.roomName, await this.setMessage.bind(this));
    });
  }

  async sendMessageToChatRoom(msg) {
    console.log("Msg in sending: " + msg);
    //TODO:messages here
    // const date = new Date(Date.now());
    // const message = new Message(msg.from, msg, `${date.getHours()}:${date.getMinutes()}`, new AvatarGenerator().generateRandomAvatar(msg.from));
    const sender = this.rootStore.sessionStore._user;

    const message = { sender: sender, msg: msg };
    const stringifyMessage = JSON.stringify(message);
    runInAction(async () => {
      await this.pubsub.publish(this.roomName, stringifyMessage);
    });
  }

  async setMessage(msg) {
    // console.log(typeof msg.data);
    console.log(msg.data);
    //TODO: nevim proc ale kdyz je to zprava odeslana ze stejneho peeru tak je to string a jinak je to object
    if (typeof msg.data === "object") msg.data = this.textDecoder.decode(msg.data);
    const parsedMsg = JSON.parse(msg.data);
    const userName = parsedMsg.sender;
    console.log(parsedMsg);
    let type = "message";
    if (msg.data.includes("path")) {
      let file = await this.retrieveFileFromIpfs(parsedMsg.msg.path);
      console.log(file);
      parsedMsg["file"] = file;
      type = "file";
    }
    // parsedMsg["sender"] = user;
    console.log(parsedMsg);
    const date = new Date(Date.now());
    const message = new Message(
      msg.from,
      userName,
      parsedMsg,
      `${date.getHours()}:${date.getMinutes()}`,
      new AvatarGenerator().generateRandomAvatar(msg.from),
      type
    );
    console.log(message);

    await this.saveMessage(message);
  }

  async saveMessage(message) {
    runInAction(async () => {
      this.chatRoomMessages.push(message);
      await this.chatMessagesDb.add(message);
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
    //TODO: lepsi ukladat Blob protoze ty URL budou temporary
    file = blob;

    return file;
  }
}
