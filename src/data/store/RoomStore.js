import { makeAutoObservable } from "mobx";
import { ChatRoom } from "../models/Room.js";

export class RoomStore {
  //TODO: avatar temporary dont forget to refactor this
  rooms;
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.rooms = [];
    makeAutoObservable(this);
  }

  async init() {
    if (this.rootStore.dataStore.ipfsNode === undefined) throw Error("IPFS Node not defined!");
    if (this.rootStore.dataStore.orbitDb === undefined) throw Error("OrbitDb not defined!");

    // runInAction(async () => {
    //   this.room = await this.rootStore.dataStore.ipfsNode.pubsub;
    //   this.chatRoomMessagesDb = await this.rootStore.dataStore.orbitDb.feed("messages");
    //   await this.chatRoomMessagesDb.load();
    //   await this.setMessagesFromDb();
    //   await this.connectToChatRoom("TestChatRoom");
    // });
  }
  createRoom(roomName) {
    if (this.rootStore.dataStore.ipfsNode === undefined) throw Error("IPFS Node not defined!");
    if (this.rootStore.dataStore.orbitDb === undefined) throw Error("OrbitDb not defined!");
    const chatRoom = new ChatRoom(
      this.rootStore.dataStore.ipfsNode,
      this.rootStore.dataStore.ipfsNode.pubsub,
      this.rootStore.dataStore.orbitDb,
      roomName
    );
    this.rooms.push(chatRoom);
    return chatRoom;
  }

  getRoom(roomName) {
    //TODO: kdyz nenajde apod.
    return this.rooms.find((room) => (roomName = room.roomName));
  }

  isChatRoomReady(roomName) {
    const room = this.getRoom(roomName);
    console.log(!!room);
    return !!room;
  }
}
