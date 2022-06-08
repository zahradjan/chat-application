import 'package:Decentio/models/chatUser/ChatUser.dart';
import 'package:Decentio/services/user/user_service.dart';

class UserService implements IUserService {
  @override
  Future<ChatUser> connect(ChatUser user) {
    // TODO: implement connect
    throw UnimplementedError();
  }

  @override
  Future<void> disconnect(ChatUser user) {
    // TODO: implement disconnect
    throw UnimplementedError();
  }

  @override
  Future<ChatUser> fetch(String id) {
    // TODO: implement fetch
    throw UnimplementedError();
  }

  @override
  Future<List<ChatUser>> online() {
    // TODO: implement online
    throw UnimplementedError();
  }
}
