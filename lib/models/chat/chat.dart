import 'package:Decentio/models/chatMessage/ChatMessage.dart';
import 'package:Decentio/models/chatUser/ChatUser.dart';

class Chat {
  String id;
  ChatUser user;
  List<ChatMessage> chatMessages;
  ChatMessage lastMessage;

  Chat({
    this.id = '',
    required this.chatMessages,
    required this.user,
    required this.lastMessage,
  });
}
