import 'package:Decentio/components/google_map.dart';
import 'package:Decentio/models/chatMessage/ChatMessage.dart';
import 'package:Decentio/models/chatUser/ChatUser.dart';
import 'package:flutter/material.dart';
import '../../../constants.dart';

class ChatInputField extends StatefulWidget {
  final Function() notifyParent;
  List<ChatMessage> chatMessages = [];
  ChatInputField(this.notifyParent, this.chatMessages);

  @override
  State<ChatInputField> createState() => _ChatInputFieldState();
}

class _ChatInputFieldState extends State<ChatInputField> {
  TextEditingController _textController = TextEditingController();
  @override
  Widget build(BuildContext context) {
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
      child: Container(
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
                          controller: _textController,
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
                    IconButton(
                      onPressed: () => Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => LocationMap(
                                widget.chatMessages, widget.notifyParent)),
                      ),
                      icon: Icon(
                        Icons.location_on,
                        color: Theme.of(context)
                            .textTheme
                            .bodyText1!
                            .color!
                            .withOpacity(0.64),
                      ),
                    ),
                    // Icon(
                    //   Icons.camera_alt_outlined,
                    //   color: Theme.of(context)
                    //       .textTheme
                    //       .bodyText1!
                    //       .color!
                    //       .withOpacity(0.64),
                    // ),
                  ],
                ),
              ),
            ),
            SizedBox(width: DefaultPadding / 3),
            IconButton(
              onPressed: () {
                setState(() {
                  if (_textController.text.isNotEmpty) {
                    widget.chatMessages.add(ChatMessage(
                        text: _textController.text,
                        sender: ChatUser(),
                        isSender: true,
                        time: DateTime.now(),
                        messageType: ChatMessageType.text,
                        messageStatus: MessageStatus.not_view));

                    widget.notifyParent();
                    _textController.clear();
                  }
                });
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
