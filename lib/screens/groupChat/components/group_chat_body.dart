import 'package:Decentio/constants.dart';
import 'package:Decentio/messages/components/chat_input_field.dart';
import 'package:Decentio/messages/components/message.dart';
import 'package:Decentio/models/chat/Chat.dart';
import 'package:Decentio/models/chatMessage/ChatMessage.dart';
import 'package:Decentio/models/chatUser/ChatUser.dart';
import 'package:Decentio/screens/groupChat/components/group_chat_added_user.dart';
import 'package:flutter/material.dart';
import 'package:loggy/loggy.dart';

class GroupChatBody extends StatefulWidget {
  List<ChatUser> groupChatUsers;
  GroupChatBody({Key? key, required this.groupChatUsers}) : super(key: key);

  @override
  State<GroupChatBody> createState() => _GroupChatBodyState();
}

class _GroupChatBodyState extends State<GroupChatBody> {
  //TODO: Domyslet jak se budou posilat ti spravni useri se svyma messages, nejakej subscriptor kterej bude hlidat kdyz prijde zprava jeste z BE
  // prozatim zkusit vymyslet jak propojit spravnyho usera s messagema ktere posila
  List<Widget> groupChatItems = [];
  // List groupChatMessages = [];

  @override
  void initState() {
    super.initState();
    widget.groupChatUsers.forEach((chatUser) {
      groupChatItems.add(GroupChatUserAdded(chatUser: chatUser));
    });
  }

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
                    itemCount: groupChatItems.length,
                    itemBuilder: (context, index) {
                      final reversedIndex = groupChatItems.length - 1 - index;
                      return groupChatItems[reversedIndex];
                    }),
              ),
            ),
            ChatInputField(refreshMessages, groupChatItems),
          ],
        ),
      ),
    );
  }
}
