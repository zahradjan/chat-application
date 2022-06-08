import 'package:Decentio/models/chatUser/ChatUser.dart';

abstract class IUserService {
  Future<ChatUser> connect(ChatUser user);
  Future<List<ChatUser>> online();
  Future<void> disconnect(ChatUser user);
  Future<ChatUser> fetch(String id);
}
