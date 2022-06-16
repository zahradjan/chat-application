import 'dart:io';

import 'package:Decentio/models/chatMessage/ChatMessage.dart';
import 'package:flutter/material.dart';

class ImageMessage extends StatelessWidget {
  ChatMessage message;
  ImageMessage({
    Key? key,
    required this.message,
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => Navigator.of(context).push(MaterialPageRoute(
          builder: (context) => GrowImage(
                message: message,
              ))),
      child: SizedBox(
        width: MediaQuery.of(context).size.width * 0.45,
        height: MediaQuery.of(context).size.width * 1, // 45% of total width
        child: AspectRatio(
          aspectRatio: 0.5,
          child: ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: Hero(
                tag: message, child: Image.file(File(message.file!.path!))),
          ),
        ),
      ),
    );
  }
}

class GrowImage extends StatelessWidget {
  ChatMessage message;
  GrowImage({Key? key, required this.message}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => Navigator.maybePop(context),
      child: SizedBox(
        width: MediaQuery.of(context).size.width * 1,
        height: MediaQuery.of(context).size.width * 1, // 45% of total width
        child: AspectRatio(
          aspectRatio: 0.5,
          child: ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: Hero(
                tag: message, child: Image.file(File(message.file!.path!))),
          ),
        ),
      ),
    );
  }
}
