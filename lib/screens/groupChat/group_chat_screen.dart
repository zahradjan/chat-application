import 'package:Decentio/constants.dart';
import 'package:Decentio/messages/components/message_screen_body.dart';
import 'package:Decentio/models/chat.dart';
import 'package:flutter/material.dart';

class GroupChat extends StatefulWidget {
  Chat chatData;
  GroupChat({required this.chatData});
  // const GroupChat({ Key? key }) : super(key: key);

  @override
  State<GroupChat> createState() => _GroupChatState();
}

class _GroupChatState extends State<GroupChat> {
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
