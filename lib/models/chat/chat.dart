import 'package:Decentio/models/chatUser/ChatUser.dart';

class Chat {
  ChatUser user;
  String lastMessage;
  bool isSelected;

  Chat({
    required this.user,
    this.lastMessage = '',
    this.isSelected = false,
  });
}
