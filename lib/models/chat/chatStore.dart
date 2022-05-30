import 'package:Decentio/models/chat/Chat.dart';
import 'package:Decentio/models/chatMessage/ChatMessage.dart';
import 'package:Decentio/models/chatMessage/chatMessageStore.dart';
import 'package:Decentio/models/chatUser/chatUserStore.dart';

List<Chat> chats = [
  Chat(
      user: chatUsers[0],
      lastMessage: demoChatMessagesKynes.last,
      chatMessages: demoChatMessagesKynes),
  Chat(
      user: chatUsers[1],
      lastMessage: demoChatMessagesJessica.last,
      chatMessages: demoChatMessagesJessica),
  Chat(
      user: chatUsers[2],
      lastMessage: demoChatMessagesDuncan.last,
      chatMessages: demoChatMessagesDuncan),
  Chat(
      user: chatUsers[3],
      lastMessage: demoChatMessagesLeto.last,
      chatMessages: demoChatMessagesLeto),
  Chat(
      user: chatUsers[4],
      lastMessage: demoChatMessagesChani.last,
      chatMessages: demoChatMessagesChani),
  Chat(
      user: chatUsers[5],
      lastMessage: demoChatMessagesBaron.last,
      chatMessages: demoChatMessagesBaron),
];
