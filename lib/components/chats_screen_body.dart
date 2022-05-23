import 'package:Decentio/components/chat_card.dart';
import 'package:Decentio/components/filled_outline_button.dart';
import 'package:Decentio/constants.dart';
import 'package:Decentio/messages/components/message_screen_body.dart';
import 'package:Decentio/messages/message_screen.dart';
import 'package:Decentio/models/chat/Chat.dart';
import 'package:Decentio/models/chat/chatStore.dart';
import 'package:flutter/material.dart';

class ChatsScreenBody extends StatefulWidget {
  const ChatsScreenBody({Key? key}) : super(key: key);

  @override
  State<ChatsScreenBody> createState() => _ChatsScreenBodyState();
}

class _ChatsScreenBodyState extends State<ChatsScreenBody> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          padding: EdgeInsets.fromLTRB(
              DefaultPadding, 0, DefaultPadding, DefaultPadding),
          color: PrimaryColor,
          child: Row(
            children: [
              FillOutlineButton(press: () {}, text: "Recent Message"),
              SizedBox(width: DefaultPadding),
              FillOutlineButton(
                press: () {},
                text: "Active",
                isFilled: false,
              ),
            ],
          ),
        ),
        Expanded(
          child: ListView.builder(
            itemCount: chats.length,
            itemBuilder: (context, index) => ChatCard(
              chat: chats[index],
              press: () => Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => MessagesScreen(chatData: chats[index]),
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
