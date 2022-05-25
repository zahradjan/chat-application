import 'package:Decentio/models/chat/Chat.dart';
import 'package:Decentio/models/chatMessage/ChatMessage.dart';
import 'package:Decentio/models/chatMessage/chatMessageStore.dart';
import 'package:Decentio/models/chatUser/chatUserStore.dart';

List<Chat> chats = [
  Chat(
      user: chatUsers[0],
      // lastMessage: ChatMessage(
      //   text: "Hope you are doing well...",
      //   messageType: ChatMessageType.text,
      //   messageStatus: MessageStatus.viewed,
      //   isSender: false,
      // ),
      lastMessage: demoChatMessagesJenny.last,
      chatMessages: demoChatMessagesJenny),
  Chat(
      user: chatUsers[1],
      lastMessage: demoChatMessagesJacob.last,
      // lastMessage: ChatMessage(
      //   text: "Hello Abdullah! I am...",
      //   messageType: ChatMessageType.text,
      //   messageStatus: MessageStatus.viewed,
      //   isSender: false,
      // ),
      chatMessages: demoChatMessagesJacob),
  Chat(
      user: chatUsers[2],
      // lastMessage: ChatMessage(
      //   text: "Do you have update...",
      //   messageType: ChatMessageType.text,
      //   messageStatus: MessageStatus.viewed,
      //   isSender: false,
      // ),
      lastMessage: demoChatMessagesAlbert.last,
      chatMessages: demoChatMessagesAlbert),
  Chat(
      user: chatUsers[3],
      // lastMessage: ChatMessage(
      //   text: "You’re welcome :)",
      //   messageType: ChatMessageType.text,
      //   messageStatus: MessageStatus.viewed,
      //   isSender: false,
      // ),
      lastMessage: demoChatMessagesEsther.last,
      chatMessages: demoChatMessagesEsther),
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
