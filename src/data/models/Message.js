import { v4 as uuidv4 } from "uuid";
export class Message {
  _id;
  from;
  data;
  sentTime;
  avatar;
  constructor(from, data, sentTime, avatar) {
    this._id = uuidv4();
    this.from = from;
    this.data = data;
    this.sentTime = sentTime;
    this.avatar = avatar;
  }
}
