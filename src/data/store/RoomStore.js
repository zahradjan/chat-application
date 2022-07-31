import { makeAutoObservable } from "mobx";
import { ChatRoom } from "../models/Room.js";

export class RoomStore {
  //TODO:load rooms from db
  rooms;
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.rooms = [];
    makeAutoObservable(this);
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
    return this.rooms.find((room) => roomName === room.roomName);
  }

  isChatRoomReady(roomName) {
    const room = this.getRoom(roomName);
    console.log(!!room);
    return !!room;
  }
}
