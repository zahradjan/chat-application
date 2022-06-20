import 'package:Decentio/messages/components/message.dart';
import 'package:Decentio/models/chat/Chat.dart';
import 'package:Decentio/models/chatMessage/ChatMessage.dart';

abstract class IDataSource {
  Future<void> addChat(Chat chat);
  Future<void> addMessage(ChatMessage message);
  Future<Chat> findChat(String chatId);
  Future<List<Chat>> findAllChats();
  Future<void> updateMessage(ChatMessage message);
  Future<List<ChatMessage>> findMessages(String chatId);
  Future<void> deleteChat(String chatId);
  // Future<void> updateMessageReceipt(String messageId, ReceiptStatus status);
}
