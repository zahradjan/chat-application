enum ChatMessageType { text, audio, image, video }
enum MessageStatus { not_sent, not_view, viewed }

class ChatMessage {
  String id;
  String text;
  ChatMessageType messageType;
  MessageStatus messageStatus;
  bool isSender;

  ChatMessage({
    this.id = '',
    this.text = '',
    required this.messageType,
    required this.messageStatus,
    required this.isSender,
  });
}
