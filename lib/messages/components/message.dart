import 'package:Decentio/messages/components/audio_message.dart';
import 'package:Decentio/messages/components/file_message.dart';
import 'package:Decentio/messages/components/image_message.dart';
import 'package:Decentio/messages/components/location_message.dart';
import 'package:Decentio/messages/components/text_message.dart';
import 'package:Decentio/messages/components/video_message.dart';
import 'package:Decentio/models/chatMessage/ChatMessage.dart';
import 'package:flutter/material.dart';

import '../../../constants.dart';

class Message extends StatelessWidget {
  const Message({
    Key? key,
    required this.message,
  }) : super(key: key);

  final ChatMessage message;

  @override
  Widget build(BuildContext context) {
    Widget messageContaint(ChatMessage message) {
      switch (message.messageType) {
        case ChatMessageType.text:
          return TextMessage(message: message);
        case ChatMessageType.audio:
          return AudioMessage(message: message);
        case ChatMessageType.video:
          return VideoMessage();
        case ChatMessageType.image:
          return ImageMessage(message: message);
        case ChatMessageType.file:
          return FileMessage(message: message);
        case ChatMessageType.location:
          return LocationMessage(message: message);
        default:
          return SizedBox();
      }
    }

    return Padding(
      padding: const EdgeInsets.only(
          top: DefaultPadding, bottom: DefaultPadding / 5),
      child: Row(
        mainAxisAlignment:
            message.isSender ? MainAxisAlignment.end : MainAxisAlignment.start,
        children: [
          if (!message.isSender) ...[
            CircleAvatar(
              radius: 12,
              backgroundImage: AssetImage(message.sender.avatarImage!),
            ),
            SizedBox(width: DefaultPadding / 2),
          ],
          messageContaint(message),
          if (message.isSender) MessageStatusDot(status: message.messageStatus)
        ],
      ),
    );
  }
}

class MessageStatusDot extends StatelessWidget {
  final MessageStatus? status;

  const MessageStatusDot({Key? key, this.status}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    Color dotColor(MessageStatus status) {
      switch (status) {
        case MessageStatus.not_sent:
          return ErrorColor;
        case MessageStatus.not_view:
          return SecondaryColor;
        // return Theme.of(context).textTheme.bodyText1!.color!.withOpacity(0.1);
        case MessageStatus.viewed:
          return PrimaryColor;
        default:
          return Colors.transparent;
      }
    }

    return Container(
      margin: EdgeInsets.only(left: DefaultPadding / 2),
      height: 12,
      width: 12,
      decoration: BoxDecoration(
        color: dotColor(status!),
        shape: BoxShape.circle,
      ),
      child: Icon(
        status == MessageStatus.not_sent ? Icons.close : Icons.done,
        size: 8,
        // color: Theme.of(context).scaffoldBackgroundColor,
      ),
    );
  }
}
