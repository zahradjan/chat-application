import 'package:Decentio/constants.dart';
import 'package:Decentio/models/chatMessage/ChatMessage.dart';
import 'package:file_icon/file_icon.dart';
import 'package:flutter/material.dart';
import 'package:loggy/loggy.dart';

class FileMessage extends StatelessWidget {
  ChatMessage message;
  FileMessage({
    Key? key,
    required this.message,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
        padding: EdgeInsets.symmetric(
          horizontal: DefaultPadding * 0.75,
          vertical: DefaultPadding / 2,
        ),
        decoration: BoxDecoration(
          color: PrimaryColor.withOpacity(message.isSender ? 1 : 0.1),
          borderRadius: BorderRadius.circular(30),
        ),
        child: InkWell(
          onTap: () => downloadFile(),
          child:
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(
              children: [
                FileIcon(
                  message.file!.extension!,
                  size: 35,
                ),
                // SizedBox(width: 2),
                Text(
                  message.file!.name,
                  style: TextStyle(
                    decoration: TextDecoration.underline,
                    decorationThickness: 3,
                    color: message.isSender
                        ? Colors.white
                        : Theme.of(context).textTheme.bodyText1!.color,
                  ),
                ),
              ],
            ),
            Opacity(
              opacity: 0.5,
              child: Text(
                "${message.time.hour}:${message.time.minute}",
                style: TextStyle(
                  fontSize: 12,
                  color: message.isSender
                      ? Colors.white
                      : Theme.of(context).textTheme.bodyText1!.color,
                ),
              ),
            ),
          ]),
        ));
  }

  downloadFile() {
    logDebug("Downloading file!");
  }
}
