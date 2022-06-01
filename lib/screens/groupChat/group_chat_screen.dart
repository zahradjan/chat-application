import 'dart:ui';

import 'package:Decentio/constants.dart';
import 'package:Decentio/models/chat/Chat.dart';
import 'package:Decentio/models/chatUser/ChatUser.dart';
import 'package:Decentio/models/groupChat/GroupChat.dart';
import 'package:Decentio/screens/groupChat/components/group_chat_body.dart';
import 'package:flutter/material.dart';

class GroupChatScreen extends StatefulWidget {
  GroupChat groupChat;
  Function() notifyParent;
  GroupChatScreen({required this.groupChat, required this.notifyParent});
  // const GroupChat({ Key? key }) : super(key: key);

  @override
  State<GroupChatScreen> createState() => _GroupChatScreenState();
}

class _GroupChatScreenState extends State<GroupChatScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: buildAppBar(),
      body: GroupChatBody(
        groupChat: widget.groupChat,
        notifyParent: widget.notifyParent,
      ),
    );
  }

  AppBar buildAppBar() {
    return AppBar(
      automaticallyImplyLeading: false,
      title: Row(
        children: [
          BackButton(),
          SizedBox(width: DefaultPadding * 0.75),
          Text("Group chat")
        ],
      ),
      actions: [
        // IconButton(
        //   icon: Icon(Icons.local_phone),
        //   onPressed: () {},
        // ),
        // IconButton(
        //   icon: Icon(Icons.videocam),
        //   onPressed: () {},
        // ),
        // IconButton(
        //   icon: Icon(Icons.add),
        //   onPressed: () {
        //     Navigator.push(
        //         context,s
        //         MaterialPageRoute(
        //           builder: (context) => GroupChat(),
        //         ));
        //   },
        // ),
        SizedBox(width: DefaultPadding / 2),
      ],
    );
  }
}
