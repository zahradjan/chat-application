import 'package:Decentio/models/chatUser/ChatUser.dart';

class Chat {
  String id;
  ChatUser user;
  String lastMessage;

  Chat({
    this.id = '',
    required this.user,
    this.lastMessage = '',
  });
}
