import 'package:Decentio/models/chatUser/ChatUser.dart';
import 'package:Decentio/screens/addUserGroupChat/components/add_user_card.dart';
import 'package:flutter/material.dart';
import 'package:loggy/loggy.dart';

class AddUserBody extends StatefulWidget {
  List<ChatUser> chatUsers;
  AddUserBody({Key? key, required this.chatUsers}) : super(key: key);

  @override
  State<AddUserBody> createState() => _AddUserBodyState();
}

class _AddUserBodyState extends State<AddUserBody> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Expanded(
          child: ListView.builder(
            itemCount: widget.chatUsers.length,
            itemBuilder: (context, index) => AddUserCard(
                chatUser: widget.chatUsers[index],
                press: () => {
                      setState(() {
                        widget.chatUsers[index].isSelected =
                            !widget.chatUsers[index].isSelected;
                        logDebug(widget.chatUsers[index].isSelected);
                      })
                    }),
          ),
        ),
      ],
    );
  }
}
