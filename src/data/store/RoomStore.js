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
  setSelectedRoom(user) {
    let room;
    runInAction(async () => {
      room = this.getRoom(user.peerId);
      if (!room) {
        room = await this.createRoom(user.peerId);
        await room.init();
      }
      this.selectedReceiver = user._username;
      this.selectedRoom = room;
    });
  }

  isChatRoomReady(roomName) {
    const room = this.getRoom(roomName);
    console.log(!!room);
    return room !== undefined;
  }
}
