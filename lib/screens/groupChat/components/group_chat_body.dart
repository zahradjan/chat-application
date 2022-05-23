import 'package:Decentio/constants.dart';
import 'package:Decentio/messages/components/chat_input_field.dart';
import 'package:Decentio/messages/components/message.dart';
import 'package:Decentio/models/chat/chat.dart';
import 'package:Decentio/screens/groupChat/components/group_chat_added_user.dart';
import 'package:flutter/material.dart';

class GroupChatBody extends StatefulWidget {
  List<Chat> groupChatUsers;
  GroupChatBody({Key? key, required this.groupChatUsers}) : super(key: key);

  @override
  State<GroupChatBody> createState() => _GroupChatBodyState();
}

class _GroupChatBodyState extends State<GroupChatBody> {
  List groupChatMessages = [];

  void refreshMessages() {
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: GestureDetector(
        onTap: () => FocusScope.of(context).unfocus(),
        child: Column(
          children: [
            Expanded(
                child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: DefaultPadding),
              child: ListView.builder(
                  reverse: true,
                  itemCount: widget.groupChatUsers.length,
                  itemBuilder: (context, index) {
                    return GroupChatUser(
                        chatUser: widget.groupChatUsers[index]);
                  }),
            )),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: DefaultPadding),
                child: ListView.builder(
                    reverse: true,
                    itemCount: groupChatMessages.length,
                    itemBuilder: (context, index) {
                      final reversedIndex =
                          groupChatMessages.length - 1 - index;
                      return Message(message: groupChatMessages[reversedIndex]);
                    }),
              ),
            ),
            ChatInputField(refreshMessages, groupChatMessages),
          ],
        ),
      ),
    );
  }
}
