import 'package:Decentio/models/chatMessage/ChatMessage.dart';

class LocalMessage {
  String chatId;
  String id;
  ChatMessage message;

  LocalMessage(this.id, this.chatId, this.message);

  Map<String, dynamic> toMap() => {
        'chat_id': chatId,
        'id': message.id,
        'sender': message.sender,
        'receipt': message.messageStatus,
        'received_at': message.time.toString()
      };

  factory LocalMessage.fromMap(Map<String, dynamic> json) {
    final message = ChatMessage(
        sender: json['sender'],
        time: DateTime.parse(json['received_at']),
        messageType: json['messageType'],
        isSender: json['isSender'],
        messageStatus: json['messageStatus']);

    final localMessage = LocalMessage(json['id'], json['chat_id'], message);
    localMessage.id = json['id'];
    return localMessage;
  }
}
