import 'package:Decentio/models/chatMessage/ChatMessage.dart';
import 'package:Decentio/models/chatUser/ChatUser.dart';

class GroupChat {
  String id;
  List<ChatUser> users;
  List<ChatMessage> chatMessages;
  // ChatMessage lastMessage;

  GroupChat({
    this.id = '',
    required this.users,
    required this.chatMessages,
    // required this.lastMessage,
  });
}
