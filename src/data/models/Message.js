import { v4 as uuidv4 } from "uuid";
export class Message {
  _id;
  from;
  senderName;
  data;
  sentTime;
  avatar;
  type;
  constructor(from, senderName, data, sentTime, avatar, type) {
    this._id = uuidv4();
    this.from = from;
    this.senderName = senderName;
    this.data = data;
    this.sentTime = sentTime;
    this.avatar = avatar;
    this.type = type;
  }
}
