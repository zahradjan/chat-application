import 'package:Decentio/data/datasources/sqflite_datasource.dart';
import 'package:Decentio/data/factories/local_database_factory.dart';
import 'package:Decentio/services/message/message_service.dart';
import 'package:Decentio/services/typing/typing_notification_service.dart';
import 'package:Decentio/services/user/user_service.dart';
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
}
