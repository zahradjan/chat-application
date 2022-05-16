import 'package:Decentio/constants.dart';
import 'package:Decentio/messages/components/chat_input_field.dart';
import 'package:Decentio/messages/components/message.dart';
import 'package:Decentio/models/ChatMessage.dart';
import 'package:flutter/material.dart';
import 'package:loggy/loggy.dart';

class MessageScreenBody extends StatefulWidget {
  @override
  State<MessageScreenBody> createState() => _MessageScreenBodyState();
}

class _MessageScreenBodyState extends State<MessageScreenBody> {
  ScrollController _scrollController = ScrollController();

  void _scrollToBottom() {
    logDebug(_scrollController.position.maxScrollExtent);
    _scrollController.jumpTo(_scrollController.position.maxScrollExtent);
  }

  @override
  Widget build(BuildContext context) {
    WidgetsBinding.instance!.addPostFrameCallback((_) => _scrollToBottom());
    return Scaffold(
      body: GestureDetector(
        onTap: () => FocusScope.of(context).unfocus(),
        child: Column(
          children: [
            Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: DefaultPadding),
                child: ListView.builder(
                    controller: _scrollController,
                    shrinkWrap: true,
                    // reverse: true,
                    itemCount: demeChatMessages.length,
                    itemBuilder: (context, index) {
                      return Message(message: demeChatMessages[index]);
                    }),
              ),
            ),
            ChatInputField(_scrollController),
          ],
        ),
      ),
    );
  }
}
