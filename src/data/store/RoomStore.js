import { makeAutoObservable, runInAction, toJS } from "mobx";
import { ChatRoom } from "../models/Room.js";
// var util = require("util");

export class RoomStore {
  //TODO:load rooms from db
  rooms;
  selectedRoom;
  selectedReceiver;
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.rooms = [];
    this.selectedRoom = undefined;
    this.selectedReceiver = undefined;
    makeAutoObservable(this);
  }

  async init() {
    if (this.rootStore.dataStore.ipfsNode === undefined) throw Error("IPFS Node not defined!");
    if (this.rootStore.dataStore.orbitDb === undefined) throw Error("OrbitDb not defined!");
    await this.loadRoomsDb();
    await this.setRoomsFromDb();
  }

  async createRoom(roomName) {
    if (this.rootStore.dataStore.ipfsNode === undefined) throw Error("IPFS Node not defined!");
    if (this.rootStore.dataStore.orbitDb === undefined) throw Error("OrbitDb not defined!");
    console.log(roomName);

    const chatRoom = new ChatRoom(this.rootStore, roomName);
    chatRoom.init();
    this.rooms.push(chatRoom);
    await this.roomsDb.add(roomName);
    console.log(chatRoom);
    console.log(toJS(this.rooms));
    // const roomJSON = util.inspect(chatRoom);
    // console.log(roomJSON);
    return chatRoom;
  }
  getRoom(roomName) {
    return this.rooms.find((room) => roomName === room.roomName);
  }
  getRoomByUser(chatUser) {
    return this.rooms.find((room) => room.chatRoomUsers.includes(chatUser));
  }

  async loadRoomsDb() {
    this.roomsDb = await this.rootStore.dataStore.orbitDb.feed("rooms");
    await this.roomsDb.load();
  }
  async setRoomsFromDb() {
    const all = await toJS(this.roomsDb.all);
    runInAction(() => {
      all.map((item) => {
        const roomName = item.payload.value;
        console.log(item.payload.value);
        const room = new ChatRoom(this.rootStore, roomName);
        room.init();
        return this.rooms.push(room);
      });
    });
  }

  createChatRoom(roomName, selectedUsers) {
    let room = this.createRoom(roomName);

    const message = { roomName: roomName };
    const stringifyMessage = JSON.stringify(message);
    console.log(roomName);
    console.log(selectedUsers);
    selectedUsers.forEach((user) => {
      console.log(user);
      this.rootStore.dataStore.ipfsNode.pubsub.publish(user.peerId[0], stringifyMessage);
    });
  }

  selectRoom(roomName) {
    let room = this.getRoom(roomName);

    this.selectedRoom = room;
    this.selectedReceiver = roomName;
  }

  selectUser(user, selectedUsers) {
    const isAlreadyAdded = selectedUsers.find((selectedUser) => selectedUser._username === user._username);
    console.log(isAlreadyAdded);
    if (isAlreadyAdded) return;
    selectedUsers.push(user);
    console.log(selectedUsers);
  }

  isChatRoomReady(roomName) {
    const room = this.getRoom(roomName);
    return room;
  }
}
