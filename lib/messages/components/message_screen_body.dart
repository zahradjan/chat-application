import 'package:Decentio/constants.dart';
import 'package:Decentio/messages/components/chat_input_field.dart';
import 'package:Decentio/messages/components/message.dart';
import 'package:Decentio/models/chat/Chat.dart';
import 'package:flutter/material.dart';

class MessageScreenBody extends StatefulWidget {
  Chat currentChat;
  Function() notifyParent;
  MessageScreenBody({required this.currentChat, required this.notifyParent});
  @override
  State<MessageScreenBody> createState() => _MessageScreenBodyState();
}

class _MessageScreenBodyState extends State<MessageScreenBody> {
  List<Widget> chatItems = [];

  void refreshMessages() {
    setState(() {
      //TODO: neni idealni potrebovalo by aby se jen pridali novy a ne zase vseci
      widget.currentChat.chatMessages.forEach((message) {
        chatItems.add(Message(message: message));
      });
      widget.notifyParent();
      // _scrollController.animateTo(
      //   _scrollController.position.maxScrollExtent,
      //   curve: Curves.easeOut,
      //   duration: const Duration(milliseconds: 300),
      // );
    });
  }

  //TODO:jeste bude potreba upravit az bude BE
  // List<ChatMessage> currentMessages = demoChatMessages;

  @override
  void initState() {
    super.initState();
    widget.currentChat.chatMessages.forEach((message) {
      chatItems.add(Message(message: message));
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
                    itemCount: chatItems.length,
                    itemBuilder: (context, index) {
                      final reversedIndex = chatItems.length - 1 - index;
                      return chatItems[reversedIndex];
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
