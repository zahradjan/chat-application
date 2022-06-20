import 'package:Decentio/constants.dart';
import 'package:Decentio/models/chatUser/ChatUser.dart';
import 'package:Decentio/models/chatUser/chatUserStore.dart';
import 'package:Decentio/models/groupChat/GroupChat.dart';
import 'package:Decentio/screens/addUserGroupChat/components/add_user_group_chat_body.dart';
import 'package:Decentio/screens/groupChat/group_chat_screen.dart';
import 'package:flutter/material.dart';

class AddUser extends StatefulWidget {
  ChatUser originalChatUser;
  Function() notifyParent;
  AddUser(
      {Key? key, required this.originalChatUser, required this.notifyParent})
      : super(key: key);
  @override
  State<AddUser> createState() => _AddUserState();
}

class _AddUserState extends State<AddUser> {
  //for now, in future it will be pulled from Backend
  List<ChatUser> availableChatUsers = chatUsers;
  List<ChatUser> selectedGroupChatUsers = [];

  void selectOriginalChatUser() {
    widget.originalChatUser.isSelected = true;
  }

  // @override
  // void initState() {
  //   super.initState();
  //   selectOriginalChatUser();
  // }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: buildAppBar(),
      body: AddUserBody(
        chatUsers: availableChatUsers,
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
          Text("Add user")
        ],
      ),
      actions: [
        IconButton(
          icon: Icon(Icons.check),
          onPressed: () {
            setState(() {
              selectedGroupChatUsers.clear();
              //TODO: this is just temporary solution, when BE is ready this will need to change
              availableChatUsers.forEach((chatUser) {
                if (chatUser.isSelected &&
                    !selectedGroupChatUsers.contains(chatUser))
                  selectedGroupChatUsers.add(chatUser);
              });
              GroupChat newGroupChat =
                  GroupChat(users: selectedGroupChatUsers, chatMessages: []);
              // chats.add(newGroupChat);
              Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => GroupChatScreen(
                      groupChat: newGroupChat,
                      notifyParent: widget.notifyParent,
                    ),
                  ));
            });
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
