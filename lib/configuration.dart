import 'package:Decentio/data/datasources/sqflite_datasource.dart';
import 'package:Decentio/data/factories/local_database_factory.dart';
import 'package:Decentio/models/chatUser/ChatUser.dart';
import 'package:Decentio/screens/chats/chats_screen.dart';
import 'package:Decentio/screens/profile/profile.dart';
import 'package:Decentio/screens/sign_up_screen.dart';
import 'package:Decentio/screens/welcome_screen.dart';
import 'package:Decentio/services/message/message_service.dart';
import 'package:Decentio/services/typing/typing_notification_service.dart';
import 'package:Decentio/services/user/user_service.dart';
import 'package:Decentio/services/user/user_service_impl.dart';
import 'package:Decentio/state_management/home/home_cubit.dart';
import 'package:Decentio/state_management/profile/profile_cubit.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sqflite/sqflite.dart';
import 'package:Decentio/data/datasources/datasource.dart';
import 'package:Decentio/cache/local_chache.dart';
import 'package:Decentio/models/chatUser/chatUserStore.dart';

class ConfigurationBase {
  static late Database _db;
  static late IDataSource _dataSource;
  static late ILocalCache _localCache;
  static late IMessageService _messageService;
  static late IUserService _userService;
  static late ITypingNotificationService _typingNotification;

  static configure() async {
    _db = await LocalDatabaseFactory().createDatabase();
    _dataSource = SqfliteDataSource(_db);
    _userService = UserService();
    final sharedPreferences = await SharedPreferences.getInstance();
    _localCache = LocalCache(sharedPreferences);
  }

  static Widget start() {
    // final me = chatUsers[0];

    //TODO: dodelat nahravani usera
    final user = _localCache.fetch('USER');
    return user.isEmpty
        ? composeRegisteringUi()
        : composeChatsUI(ChatUser.fromJson(user));
  }

  static Widget composeChatsUI(ChatUser me) {
    HomeCubit homeCubit = HomeCubit(_userService, _localCache);

    //TODO: add providers
    return MultiBlocProvider(
      providers: [
        BlocProvider(create: (BuildContext context) => homeCubit),
      ],
      child: ChatsScreen(me: me),
    );
  }

  static Widget composeProfileUI(ChatUser me) {
    ProfileCubit profileCubit = ProfileCubit(_userService, _localCache);

    //TODO: add providers
    return MultiBlocProvider(
      providers: [
        BlocProvider(create: (BuildContext context) => profileCubit),
      ],
      child: Profile(profileUser: me),
    );
  }

  static Widget composeRegisteringUi() {
    // IHomeRouter router = HomeRouter(showMessageThread: composeMessageThreadUi);
    ProfileCubit profileCubit = ProfileCubit(_userService, _localCache);
    // TODO: add providers
    return MultiBlocProvider(
      providers: [
        BlocProvider(create: (BuildContext context) => profileCubit),
      ],
      child: SignUpScreen(),
    );
  }
}
