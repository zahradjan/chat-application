import 'package:Decentio/models/chatMessage/ChatMessage.dart';
import 'package:Decentio/models/chatUser/ChatUser.dart';

class Chat {
  String id;
  ChatUser user;
  ChatMessage lastMessage;

  Chat({
    this.id = '',
    required this.user,
    required this.lastMessage,
  });
}
