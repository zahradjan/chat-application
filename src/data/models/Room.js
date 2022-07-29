import { makeAutoObservable, runInAction, toJS } from "mobx";
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

  async retrieveFileFromIpfs(path, mimeType) {
    const ipfsFile = await this.ipfsNode.cat(path);

    console.log(ipfsFile);

    let file;
    // const blobToBase64 = (blob) => {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(blob);
    //   return new Promise((resolve) => {
    //     reader.onloadend = () => {
    //       resolve(reader.result);
    //     };
    //   });
    // };
    // let content = [];
    // for await (const chunk of ipfsFile) {
    //   content.push(chunk);
    // }
    // var buffer = Buffer.from(content);
    // console.log(this.textDecoder.decode(content));
    // file = new Blob(content);
    console.log(mimeType);
    const content = [];
    for await (const chunk of ipfsFile) {
      // console.log(chunk);
      content.push(chunk);
    }
    console.log(content);

    // const data = this.base64ToArrayBuffer(content);
    // console.log(data);
    const blob = new Blob(content, { type: "image/" + mimeType });

    file = blob;

    return file;
  }

  base64ToArrayBuffer(data) {
    var binaryString = window.atob(data);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
      var ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }

  async echo(msg) {
    // console.log(typeof msg.data);
    console.log(msg.data);
    //TODO: nevim proc ale kdyz je to zprava odeslana ze stejneho peeru tak je to string a jinak je to object
    if (typeof msg.data === "object") msg.data = this.textDecoder.decode(msg.data);
    const parsedMsg = JSON.parse(msg.data);
    console.log(parsedMsg);
    if (msg.data.includes("path")) {
      let file = await this.retrieveFileFromIpfs(parsedMsg.path, this.getFileExtension(parsedMsg.fileName));
      console.log(file);
      parsedMsg["filePath"] = file;
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
