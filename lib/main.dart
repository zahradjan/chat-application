// import 'dart:convert';

import 'package:Decentio/configuration.dart';
import 'package:Decentio/state_management/profile/profile_image_cubit.dart';
import 'package:Decentio/theme.dart';
// import 'package:dart_ipfs_client/dart_ipfs_client.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_loggy/flutter_loggy.dart';
import 'package:ipfs_client_flutter/ipfs_client_flutter.dart';
import 'package:loggy/loggy.dart';

void main() async {
  Loggy.initLoggy(
    logPrinter: const PrettyDeveloperPrinter(),
  );
  WidgetsFlutterBinding.ensureInitialized();
  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);
  var ipfs = IpfsClient();

  // var ipfs = Ipfs(url: 'http://127.0.0.1:5001');
  // var addRes = await ipfs.add(utf8.encode('Hello World!'));
  // logDebug(addRes.body.toJson());

  // var catRes = await ipfs.cat(addRes.body.hash);
  // logDebug(catRes.body.toJson());
  await ConfigurationBase.configure();
  final firstPage = ConfigurationBase.start();
  runApp(Decentio(firstPage));
}

class Decentio extends StatelessWidget {
  Widget initPage;
  Decentio(this.initPage);
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    ProfileImageCubit imageCubit = ProfileImageCubit();
    return MultiBlocProvider(
        providers: [
          BlocProvider<ProfileImageCubit>(
              create: (BuildContext context) => imageCubit),
        ],
        child: MaterialApp(
          title: 'Decentio',
          debugShowCheckedModeBanner: false,
          theme: lightThemeData(context),
          darkTheme: darkThemeData(context),
          home: initPage,
        ));
  }
}
