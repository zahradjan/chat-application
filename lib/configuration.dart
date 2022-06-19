import 'package:Decentio/data/datasources/sqflite_datasource.dart';
import 'package:Decentio/data/factories/local_database_factory.dart';
import 'package:sqflite/sqflite.dart';
import 'package:Decentio/data/datasources/datasource.dart';

class ConfigurationBase {
  static late Database _db;
  static late IDataSource _dataSource;

  static configure() async {
    _db = await LocalDatabaseFactory().createDatabase();
    _dataSource = SqfliteDataSource(_db);
  }
}
