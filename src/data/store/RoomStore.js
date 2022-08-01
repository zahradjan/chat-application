import { makeAutoObservable, runInAction, toJS } from "mobx";
import { ChatRoom } from "../models/Room.js";
// var util = require("util");

export class RoomStore {
  //TODO:load rooms from db
  rooms;
  selectedRoom;
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.rooms = [];
    this.selectedRoom = undefined;
    makeAutoObservable(this);
  }

  // async init() {
  //   if (this.rootStore.dataStore.ipfsNode === undefined) throw Error("IPFS Node not defined!");
  //   if (this.rootStore.dataStore.orbitDb === undefined) throw Error("OrbitDb not defined!");
  //   await this.loadRoomsDb();
  //   await this.setRoomsFromDb();
  // }

  async createRoom(roomName) {
    if (this.rootStore.dataStore.ipfsNode === undefined) throw Error("IPFS Node not defined!");
    if (this.rootStore.dataStore.orbitDb === undefined) throw Error("OrbitDb not defined!");
    console.log(roomName);

    const chatRoom = new ChatRoom(this.rootStore, roomName);

    this.rooms.push(chatRoom);
    console.log(chatRoom);
    console.log(toJS(this.rooms));
    // const roomJSON = util.inspect(chatRoom);
    // console.log(roomJSON);
    // await this.roomsDb.add(roomName);
    return chatRoom;
  }
  //TODO: hodit peer == user jako propertu roomky aby byli spojeny a zaroven myslet na vice useru v jedne roomce
  getRoom(roomName) {
    //TODO: kdyz nenajde apod.
    return this.rooms.find((room) => roomName === room.roomName);
  }

  // async loadRoomsDb() {
  //   this.roomsDb = await this.rootStore.dataStore.orbitDb.feed("rooms");
  //   await this.roomsDb.load();
  // }
  // async setRoomsFromDb() {
  //   const all = await toJS(this.roomsDb.all);
  //   runInAction(() => {
  //     all.map((e) => {
  //       console.log(e.payload.value);
  //       return this.rooms.push(e.payload.value);
  //     });
  //   });
  // }
  setSelectedRoom(roomName) {
    let room;
    runInAction(async () => {
      room = this.getRoom(roomName);
      if (!room) {
        room = await this.createRoom(roomName);
        await room.init();
      }
      console.log(room);
      this.selectedRoom = room;
    });
  }

  isChatRoomReady(roomName) {
    const room = this.getRoom(roomName);
    console.log(!!room);
    return !!room;
  }
}
