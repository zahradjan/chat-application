import 'package:Decentio/models/chatMessage/ChatMessage.dart';
import 'package:Decentio/models/chatUser/chatUserStore.dart';

List<ChatMessage> demoChatMessagesAlbert = [
  ChatMessage(
    text: "Hi Sajol,",
    messageType: ChatMessageType.text,
    messageStatus: MessageStatus.viewed,
    sender: chatUsers[0],
    time: DateTime.now(),
    isSender: false,
  ),
  ChatMessage(
    text: "Hello Albert, How are you?",
    messageType: ChatMessageType.text,
    messageStatus: MessageStatus.viewed,
    sender: chatUsers[0],
    time: DateTime.now(),
    isSender: true,
  ),
  ChatMessage(
    text: "",
    messageType: ChatMessageType.audio,
    messageStatus: MessageStatus.viewed,
    sender: chatUsers[0],
    time: DateTime.now(),
    isSender: false,
  ),
  ChatMessage(
    text: "",
    messageType: ChatMessageType.video,
    messageStatus: MessageStatus.viewed,
    sender: chatUsers[0],
    time: DateTime.now(),
    isSender: true,
  ),
  ChatMessage(
    text: "Error happend",
    messageType: ChatMessageType.text,
    messageStatus: MessageStatus.not_sent,
    sender: chatUsers[0],
    time: DateTime.now(),
    isSender: true,
  ),
  ChatMessage(
    text: "This looks great man!!",
    messageType: ChatMessageType.text,
    messageStatus: MessageStatus.viewed,
    sender: chatUsers[0],
    time: DateTime.now(),
    isSender: false,
  ),
  ChatMessage(
    text: "Glad you like it",
    messageType: ChatMessageType.text,
    messageStatus: MessageStatus.not_view,
    sender: chatUsers[0],
    time: DateTime.now(),
    isSender: true,
  ),
  ChatMessage(
    text: "Hope you are doing well...",
    messageType: ChatMessageType.text,
    messageStatus: MessageStatus.not_view,
    sender: chatUsers[0],
    time: DateTime.now(),
    isSender: false,
  ),
];

List<ChatMessage> demoChatMessagesJacob = [
  ChatMessage(
    text: "Hi Sajol,",
    messageType: ChatMessageType.text,
    messageStatus: MessageStatus.viewed,
    sender: chatUsers[1],
    time: DateTime.now(),
    isSender: false,
  ),
  ChatMessage(
    text: "Hello Jacob, How are you?",
    messageType: ChatMessageType.text,
    messageStatus: MessageStatus.viewed,
    sender: chatUsers[0],
    time: DateTime.now(),
    isSender: true,
  ),
  ChatMessage(
    text: "",
    messageType: ChatMessageType.audio,
    messageStatus: MessageStatus.viewed,
    sender: chatUsers[1],
    time: DateTime.now(),
    isSender: false,
  ),
  ChatMessage(
    text: "",
    messageType: ChatMessageType.video,
    messageStatus: MessageStatus.viewed,
    sender: chatUsers[0],
    time: DateTime.now(),
    isSender: true,
  ),
  ChatMessage(
    text: "Error happend",
    messageType: ChatMessageType.text,
    messageStatus: MessageStatus.not_sent,
    sender: chatUsers[0],
    time: DateTime.now(),
    isSender: true,
  ),
  ChatMessage(
    text: "This looks great man!!",
    messageType: ChatMessageType.text,
    messageStatus: MessageStatus.viewed,
    sender: chatUsers[1],
    time: DateTime.now(),
    isSender: false,
  ),
  ChatMessage(
    text: "Glad you like it",
    messageType: ChatMessageType.text,
    messageStatus: MessageStatus.not_view,
    sender: chatUsers[0],
    time: DateTime.now(),
    isSender: true,
  ),
  ChatMessage(
    text: "Hello Abdullah! I am...",
    messageType: ChatMessageType.text,
    messageStatus: MessageStatus.not_view,
    sender: chatUsers[1],
    time: DateTime.now(),
    isSender: false,
  ),
];

List<ChatMessage> demoChatMessagesJoe = [
  ChatMessage(
    text: "Hi Sajol,",
    messageType: ChatMessageType.text,
    messageStatus: MessageStatus.viewed,
    sender: chatUsers[2],
    time: DateTime.now(),
    isSender: false,
  ),
  ChatMessage(
    text: "Hello Joe, How are you?",
    messageType: ChatMessageType.text,
    messageStatus: MessageStatus.viewed,
    sender: chatUsers[0],
    time: DateTime.now(),
    isSender: true,
  ),
  ChatMessage(
    text: "",
    messageType: ChatMessageType.audio,
    messageStatus: MessageStatus.viewed,
    sender: chatUsers[2],
    time: DateTime.now(),
    isSender: false,
  ),
  ChatMessage(
    text: "",
    messageType: ChatMessageType.video,
    messageStatus: MessageStatus.viewed,
    sender: chatUsers[0],
    time: DateTime.now(),
    isSender: true,
  ),
  ChatMessage(
    text: "Error happend",
    messageType: ChatMessageType.text,
    messageStatus: MessageStatus.not_sent,
    sender: chatUsers[0],
    time: DateTime.now(),
    isSender: true,
  ),
  ChatMessage(
    text: "This looks great man!!",
    messageType: ChatMessageType.text,
    messageStatus: MessageStatus.viewed,
    sender: chatUsers[2],
    time: DateTime.now(),
    isSender: false,
  ),
  ChatMessage(
    text: "Glad you like it",
    messageType: ChatMessageType.text,
    messageStatus: MessageStatus.not_view,
    sender: chatUsers[0],
    time: DateTime.now(),
    isSender: true,
  ),
  ChatMessage(
    text: "Do you have update...",
    messageType: ChatMessageType.text,
    messageStatus: MessageStatus.not_view,
    sender: chatUsers[2],
    time: DateTime.now(),
    isSender: false,
  ),
];
List<ChatMessage> demoChatMessagesEsther = [
  ChatMessage(
    text: "Hi Sajol,",
    messageType: ChatMessageType.text,
    messageStatus: MessageStatus.viewed,
    sender: chatUsers[3],
    time: DateTime.now(),
    isSender: false,
  ),
  ChatMessage(
    text: "Hello Esther, How are you?",
    messageType: ChatMessageType.text,
    messageStatus: MessageStatus.viewed,
    sender: chatUsers[0],
    time: DateTime.now(),
    isSender: true,
  ),
  ChatMessage(
    text: "",
    messageType: ChatMessageType.audio,
    messageStatus: MessageStatus.viewed,
    sender: chatUsers[3],
    time: DateTime.now(),
    isSender: false,
  ),
  ChatMessage(
    text: "",
    messageType: ChatMessageType.video,
    messageStatus: MessageStatus.viewed,
    sender: chatUsers[0],
    time: DateTime.now(),
    isSender: true,
  ),
  ChatMessage(
    text: "Error happend",
    messageType: ChatMessageType.text,
    messageStatus: MessageStatus.not_sent,
    sender: chatUsers[0],
    time: DateTime.now(),
    isSender: true,
  ),
  ChatMessage(
    text: "This looks great man!!",
    messageType: ChatMessageType.text,
    messageStatus: MessageStatus.viewed,
    sender: chatUsers[3],
    time: DateTime.now(),
    isSender: false,
  ),
  ChatMessage(
    text: "Glad you like it",
    messageType: ChatMessageType.text,
    messageStatus: MessageStatus.not_view,
    sender: chatUsers[0],
    time: DateTime.now(),
    isSender: true,
  ),
  ChatMessage(
    text: "You’re welcome :)",
    messageType: ChatMessageType.text,
    messageStatus: MessageStatus.not_view,
    sender: chatUsers[3],
    time: DateTime.now(),
    isSender: false,
  ),
];
