import 'package:Decentio/cache/local_chache.dart';
import 'package:Decentio/models/chatUser/ChatUser.dart';
import 'package:Decentio/services/user/user_service.dart';
import 'package:Decentio/state_management/home/home_state.dart';
import 'package:bloc/bloc.dart';

class HomeCubit extends Cubit<HomeState> {
  ILocalCache _localCache;
  IUserService _userService;
  HomeCubit(this._userService, this._localCache) : super(HomeInitial());

  Future<ChatUser> connect() async {
    final userJson = _localCache.fetch('USER');
    userJson['last_seen'] = DateTime.now();
    userJson['active'] = true;

    final user = ChatUser.fromJson(userJson);
    await _userService.connect(user);
    return user;
  }

  Future<void> activeUsers(ChatUser user) async {
    emit(HomeLoading());
    final users = await _userService.online();
    users.removeWhere((element) => element.id == user.id);
    emit(HomeSuccess(users));
  }
}
