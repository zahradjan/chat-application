import 'package:Decentio/models/chatMessage/chatMessageStore.dart';
import 'package:Decentio/models/chatUser/chatUserStore.dart';
import 'package:Decentio/models/groupChat/GroupChat.dart';

//already in chat Store
List<GroupChat> groupChats = [
  GroupChat(
      users: [chatUsers[2], chatUsers[3]], chatMessages: demoChatMessagesTeam)
];
