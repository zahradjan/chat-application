import 'package:Decentio/constants.dart';
import 'package:Decentio/messages/components/chat_input_field.dart';
import 'package:Decentio/messages/components/message.dart';
import 'package:Decentio/models/chat/Chat.dart';
import 'package:Decentio/models/chatMessage/ChatMessage.dart';
import 'package:flutter/material.dart';
import 'package:loggy/loggy.dart';

class MessageScreenBody extends StatefulWidget {
  Chat currentChat;
  Function() notifyParent;
  MessageScreenBody({required this.currentChat, required this.notifyParent});
  @override
  State<MessageScreenBody> createState() => _MessageScreenBodyState();
}

class _MessageScreenBodyState extends State<MessageScreenBody> {
  List<ChatMessage> chatMessages = [];

  void refreshMessages() {
    setState(() {
      //TODO: neni idealni potrebovalo by aby se jen pridali novy a ne zase vseci

      widget.notifyParent();
    });
  }

  @override
  void initState() {
    super.initState();
    chatMessages = widget.currentChat.chatMessages;
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
                    itemCount: chatMessages.length,
                    itemBuilder: (context, index) {
                      final reversedIndex = chatMessages.length - 1 - index;
                      return Message(message: chatMessages[reversedIndex]);
                      // return Message(
                      //   message: widget.currentChat.chatMessages[reversedIndex],
                      // );
                    }),
              ),
            ),
            ChatInputField(refreshMessages, widget.currentChat.chatMessages),
          ],
        ),
      ),
    );
  }
}
