import 'package:Decentio/models/chatMessage/ChatMessage.dart';
import 'package:flutter/material.dart';


class FileMessage extends StatelessWidget {
  ChatMessage message;
  FileMessage({
    Key? key,
    required this.message,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
        // padding: EdgeInsets.symmetric(
        //   horizontal: DefaultPadding * 0.75,
        //   vertical: DefaultPadding / 2,
        // ),
        // decoration: BoxDecoration(
        //   color: PrimaryColor.withOpacity(message!.isSender ? 1 : 0.1),
        //   borderRadius: BorderRadius.circular(30),
        // ),
        // child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        //   Text(
        //     message!.text,
        //     style: TextStyle(
        //       color: message!.isSender
        //           ? Colors.white
        //           : Theme.of(context).textTheme.bodyText1!.color,
        //     ),
        //   ),
        //   Opacity(
        //     opacity: 0.5,
        //     child: Text(
        //       "${message!.time.hour}:${message!.time.minute}",
        //       style: TextStyle(
        //         fontSize: 12,
        //         color: message!.isSender
        //             ? Colors.white
        //             : Theme.of(context).textTheme.bodyText1!.color,
        //       ),
        //     ),
        //   ),
        // ])
        );
  }
}
