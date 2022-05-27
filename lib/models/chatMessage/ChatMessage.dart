import 'package:Decentio/models/chatUser/ChatUser.dart';

enum ChatMessageType { text, audio, image, video }
enum MessageStatus { not_sent, not_view, viewed }

class ChatMessage {
  String id;
  String text;
  ChatMessageType messageType;
  MessageStatus messageStatus;
  DateTime time;
  ChatUser sender;
  bool isSender;

  ChatMessage({
    this.id = '',
    this.text = '',
    required this.time,
    required this.sender,
    required this.messageType,
    required this.messageStatus,
    required this.isSender,
  });
}
