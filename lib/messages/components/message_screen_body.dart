import 'package:Decentio/constants.dart';
import 'package:Decentio/messages/components/chat_input_field.dart';
import 'package:Decentio/messages/components/message.dart';
import 'package:Decentio/models/chatMessage/ChatMessage.dart';
import 'package:Decentio/models/chatMessage/chatMessageStore.dart';
import 'package:flutter/material.dart';
import 'package:loggy/loggy.dart';

class MessageScreenBody extends StatefulWidget {
  @override
  State<MessageScreenBody> createState() => _MessageScreenBodyState();
}

class _MessageScreenBodyState extends State<MessageScreenBody> {
  void refreshMessages() {
    setState(() {
      // _scrollController.animateTo(
      //   _scrollController.position.maxScrollExtent,
      //   curve: Curves.easeOut,
      //   duration: const Duration(milliseconds: 300),
      // );
    });
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
                    itemCount: demoChatMessages.length,
                    itemBuilder: (context, index) {
                      final reversedIndex = demoChatMessages.length - 1 - index;
                      return Message(message: demoChatMessages[reversedIndex]);
                    }),
              ),
            ),
            ChatInputField(refreshMessages, demoChatMessages),
          ],
        ),
      ),
    );
  }
}
