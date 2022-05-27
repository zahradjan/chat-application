import 'package:Decentio/constants.dart';
import 'package:Decentio/messages/components/chat_input_field.dart';
import 'package:Decentio/messages/components/message.dart';
import 'package:Decentio/models/chat/Chat.dart';
import 'package:Decentio/models/chatMessage/ChatMessage.dart';
import 'package:Decentio/models/chatMessage/chatMessageStore.dart';
import 'package:Decentio/models/chatUser/ChatUser.dart';
import 'package:flutter/material.dart';
import 'package:loggy/loggy.dart';

class MessageScreenBody extends StatefulWidget {
  Chat currentChat;
  MessageScreenBody({required this.currentChat});
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

  List<Widget> chatItems = [];
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
            ChatInputField(refreshMessages, chatItems),
          ],
        ),
      ),
    );
  }
}
