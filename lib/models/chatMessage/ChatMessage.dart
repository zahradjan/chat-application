import 'package:Decentio/models/chatUser/ChatUser.dart';
import 'package:flutter/cupertino.dart';

enum ChatMessageType { text, audio, image, video }
enum MessageStatus { not_sent, not_view, viewed }

class ChatMessage {
  String id;
  String text;
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
    required this.time,
    required this.sender,
    required this.messageType,
    required this.messageStatus,
    required this.isSender,
  });
}
