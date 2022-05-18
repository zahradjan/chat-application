import 'package:Decentio/components/chats_screen_body.dart';
import 'package:Decentio/constants.dart';
import 'package:Decentio/messages/components/message_screen_body.dart';
import 'package:Decentio/models/chat.dart';
import 'package:Decentio/screens/addUserGroupChat/add_user_group_chat.dart';
import 'package:Decentio/screens/groupChat/group_chat_screen.dart';
import 'package:flutter/material.dart';

class MessagesScreen extends StatefulWidget {
  Chat chatData;
  MessagesScreen({required this.chatData});

  @override
  State<MessagesScreen> createState() => _MessagesScreenState();
}

class _MessagesScreenState extends State<MessagesScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: buildAppBar(widget.chatData),
      body: MessageScreenBody(),
    );
  }

  AppBar buildAppBar(Chat chatData) {
    return AppBar(
      automaticallyImplyLeading: false,
      title: Row(
        children: [
          BackButton(),
          CircleAvatar(
            backgroundImage: AssetImage(chatData.image),
          ),
          SizedBox(width: DefaultPadding * 0.75),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                chatData.name,
                style: TextStyle(fontSize: 16),
              ),
              Text(
                chatData.time,
                style: TextStyle(fontSize: 12),
              ),
            ],
          )
        ],
      ),
      actions: [
        IconButton(
          icon: Icon(Icons.local_phone),
          onPressed: () {},
        ),
        IconButton(
          icon: Icon(Icons.videocam),
          onPressed: () {},
        ),
        IconButton(
          icon: Icon(Icons.add),
          onPressed: () {
            Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => AddUser(
                    chatData: chatData,
                  ),
                ));
          },
        ),
        SizedBox(width: DefaultPadding / 2),
      ],
    );
  }
}
