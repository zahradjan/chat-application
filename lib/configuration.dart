import 'package:Decentio/data/datasources/sqflite_datasource.dart';
import 'package:Decentio/data/factories/local_database_factory.dart';
import 'package:Decentio/models/chatUser/ChatUser.dart';
import 'package:Decentio/screens/sign_up_screen.dart';
import 'package:Decentio/services/message/message_service.dart';
import 'package:Decentio/services/typing/typing_notification_service.dart';
import 'package:Decentio/services/user/user_service.dart';
import 'package:Decentio/state_management/profile/profile_image_cubit.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sqflite/sqflite.dart';
import 'package:Decentio/data/datasources/datasource.dart';
import 'package:Decentio/cache/local_chache.dart';

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
    final sharedPreferences = await SharedPreferences.getInstance();
    _localCache = LocalCache(sharedPreferences);
  }

  static Widget start() {
    return composeOnboardingUi();
    // final user = _localCache.fetch('USER');
    // return user.isEmpty
    //     ? composeOnboardingUi()
    //     : composeHomeUi(ChatUser.fromJson(user));
  }

  static Widget composeOnboardingUi() {
    ProfileImageCubit imageCubit = ProfileImageCubit();
    return MultiBlocProvider(
      providers: [
        BlocProvider(create: (BuildContext context) => imageCubit),
      ],
      child: SignUpScreen(),
    );
  }

  // static Widget composeHomeUi(ChatUser me) {
  //   HomeCubit homeCubit = HomeCubit(_userService, _localCache);
  //   IHomeRouter router = HomeRouter(showMessageThread: composeMessageThreadUi);

  //   return MultiBlocProvider(
  //     providers: [
  //       BlocProvider(create: (BuildContext context) => homeCubit),
  //       BlocProvider(
  //         create: (BuildContext context) => _messageBloc,
  //       ),
  //       BlocProvider(create: (BuildContext context) => _typingNotificationBloc),
  //       BlocProvider(create: (BuildContext context) => _chatsCubit)
  //     ],
  //     child: Home(me, router),
  //   );
  // }
}
