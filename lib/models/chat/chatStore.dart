import 'package:Decentio/models/chat/Chat.dart';
import 'package:Decentio/models/chatUser/chatUserStore.dart';

List<Chat> chats = [
  Chat(
    user: chatUsers[0],
    lastMessage: "Hope you are doing well...",
    isSelected: false,
  ),
  Chat(
    user: chatUsers[1],
    lastMessage: "Hello Abdullah! I am...",
    isSelected: false,
  ),
  Chat(
    user: chatUsers[2],
    lastMessage: "Do you have update...",
    isSelected: false,
  ),
  Chat(
    user: chatUsers[3],
    lastMessage: "You’re welcome :)",
    isSelected: false,
  ),
  // Chat(
  //   user: chatUsers[4],
  //   lastMessage: "Thanks",
  //   isSelected: false,
  // ),
  // Chat(
  //   lastMessage: "Hope you are doing well...",
  //   isSelected: false,
  // ),
  // Chat(
  //   lastMessage: "Hello Abdullah! I am...",
  //   isSelected: false,
  // ),
  // Chat(
  //   lastMessage: "Do you have update...",
  //   isSelected: false,
  // ),
];
