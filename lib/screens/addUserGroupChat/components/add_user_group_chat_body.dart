import 'package:Decentio/components/chat_card.dart';
import 'package:Decentio/components/filled_outline_button.dart';
import 'package:Decentio/constants.dart';
import 'package:Decentio/messages/message_screen.dart';
import 'package:Decentio/models/chat/Chat.dart';
import 'package:Decentio/models/chat/chatStore.dart';
import 'package:Decentio/screens/addUserGroupChat/components/add_user_card.dart';
import 'package:flutter/material.dart';
import 'package:loggy/loggy.dart';

class AddUserBody extends StatefulWidget {
  const AddUserBody({Key? key}) : super(key: key);

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
            itemCount: chats.length,
            itemBuilder: (context, index) => AddUserCard(
                chat: chats[index],
                press: () => {
                      setState(() {
                        chats[index].isSelected = !chats[index].isSelected;
                        logDebug(chats[index].isSelected);
                      })
                    }),
          ),
        ),
      ],
    );
  }
}
