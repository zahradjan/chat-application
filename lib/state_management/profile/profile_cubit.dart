import 'package:Decentio/cache/local_chache.dart';
import 'package:Decentio/models/chatUser/ChatUser.dart';
import 'package:Decentio/services/user/user_service.dart';
import 'package:Decentio/state_management/profile/profile_state.dart';
import 'package:bloc/bloc.dart';
import 'package:uuid/uuid.dart';

class ProfileCubit extends Cubit<ProfileState> {
  final IUserService _userService;
  final ILocalCache _localCache;

  ProfileCubit(this._userService, this._localCache) : super(ProfileInitial());

  Future<void> connectProfile(String name) async {
    //TODO: dulezite aby neprepisovalo
    var uuid = Uuid().v4();
    emit(ProfileLoading());
    //TODO: profile image upload

    final user = ChatUser(
      id: uuid,
      name: name,
      isActive: true,
      //TODO: DateTime refactor
      lastSeen: "now",
    );

    final userJson = user.toJson();
    await _localCache.save('User', userJson);
    emit(ProfileSuccess(user));
  }

  Future<void> updateProfile({String name = '', String? password}) async {
    //TODO: image, and other props update
    emit(ProfileLoading());
    var profileUser = _localCache.fetch("User");
    var chatUser = ChatUser.fromJson(profileUser);
    chatUser.name = name;
    final userJson = chatUser.toJson();
    await _localCache.save('User', userJson);
    emit(ProfileSuccess(chatUser));
  }
}
