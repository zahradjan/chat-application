import 'dart:io';

import 'package:Decentio/models/chatUser/ChatUser.dart';
import 'package:flutter/cupertino.dart';

enum ChatMessageType { text, audio, image, video, file }
enum MessageStatus { not_sent, not_view, viewed }

class ChatMessage {
  String id;
  String text;
  File? file;
  @Deprecated('Will be substituted by file prop')
  Image? img;
  ChatMessageType messageType;
  MessageStatus messageStatus;
  DateTime time;
  ChatUser sender;
  bool isSender;

  ChatMessage({
    this.id = '',
    this.text = '',
    this.img,
    this.file,
    required this.time,
    required this.sender,
    required this.messageType,
    required this.messageStatus,
    required this.isSender,
  });
}
