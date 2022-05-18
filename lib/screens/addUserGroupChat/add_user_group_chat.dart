import 'package:Decentio/constants.dart';
import 'package:Decentio/models/chat.dart';
import 'package:Decentio/screens/addUserGroupChat/components/add_user_group_chat_body.dart';
import 'package:Decentio/screens/groupChat/group_chat_screen.dart';
import 'package:flutter/material.dart';

class AddUser extends StatefulWidget {
  Chat chatData;

  AddUser({required this.chatData});
  @override
  State<AddUser> createState() => _AddUserState();
}

class _AddUserState extends State<AddUser> {
  //const AddUser({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: buildAppBar(widget.chatData),
      body: AddUserBody(),
    );
  }

  AppBar buildAppBar(Chat chatData) {
    return AppBar(
      automaticallyImplyLeading: false,
      title: Row(
        children: [
          BackButton(),
          SizedBox(width: DefaultPadding * 0.75),
          Text("Add user")
        ],
      ),
      actions: [
        IconButton(
          icon: Icon(Icons.check),
          onPressed: () {
            Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => GroupChat(chatData: chatData),
                ));
          },
        ),
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