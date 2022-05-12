import 'package:Decentio/models/ChatMessage.dart';
import 'package:flutter/material.dart';

import '../../../constants.dart';

class ChatInputField extends StatelessWidget {
  const ChatInputField({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final _textController = TextEditingController();
    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: DefaultPadding,
        vertical: DefaultPadding / 2,
      ),
      decoration: BoxDecoration(
        color: Theme.of(context).scaffoldBackgroundColor,
        boxShadow: [
          BoxShadow(
            offset: Offset(0, 4),
            blurRadius: 32,
            color: Color(0xFF087949).withOpacity(0.08),
          ),
        ],
      ),
      child: SafeArea(
        child: Row(
          children: [
            Icon(Icons.mic, color: PrimaryColor),
            SizedBox(width: DefaultPadding / 30),
            Expanded(
              child: Container(
                padding: EdgeInsets.symmetric(
                  horizontal: DefaultPadding * 0.5,
                ),
                decoration: BoxDecoration(
                  color: Theme.of(context).scaffoldBackgroundColor,
                  borderRadius: BorderRadius.circular(40),
                ),
                child: Row(
                  children: [
                    Icon(
                      Icons.sentiment_satisfied_alt_outlined,
                      color: Theme.of(context)
                          .textTheme
                          .bodyText1!
                          .color!
                          .withOpacity(0.64),
                    ),
                    SizedBox(width: DefaultPadding / 4),
                    Expanded(
                      child: TextField(
                          textCapitalization: TextCapitalization.sentences,
                          style: TextStyle(
                              color: Theme.of(context).colorScheme.primary),
                          decoration: InputDecoration(
                            hintText: "Type message",
                            border: InputBorder.none,
                          )),
                    ),
                    Icon(
                      Icons.attach_file,
                      color: Theme.of(context)
                          .textTheme
                          .bodyText1!
                          .color!
                          .withOpacity(0.64),
                    ),
                    SizedBox(width: DefaultPadding / 4),
                    Icon(
                      Icons.camera_alt_outlined,
                      color: Theme.of(context)
                          .textTheme
                          .bodyText1!
                          .color!
                          .withOpacity(0.64),
                    ),
                  ],
                ),
              ),
            ),
            SizedBox(width: DefaultPadding / 3),
            IconButton(
              onPressed: () {
                demeChatMessages.add(ChatMessage(
                    text: _textController.text,
                    isSender: true,
                    messageType: ChatMessageType.text,
                    messageStatus: MessageStatus.not_view));
              },
              icon: Icon(Icons.send),
              color: Theme.of(context).colorScheme.primary,
            )
          ],
        ),
      ),
    );
  }
}
