import 'package:Decentio/screens/welcome_screen.dart';
import 'package:Decentio/theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_loggy/flutter_loggy.dart';
import 'package:loggy/loggy.dart';

void main() {
  Loggy.initLoggy(
    logPrinter: const PrettyDeveloperPrinter(),
  );
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Decentio',
      debugShowCheckedModeBanner: false,
      theme: lightThemeData(context),
      home: WelcomeScreen(),
    );
  }
}
