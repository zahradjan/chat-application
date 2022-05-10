

import 'package:flutter/material.dart';

class WelcomeScreen extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(child: Column(children: [Text("Decentio Welcomes you!",textAlign: TextAlign.center,)],),),
      
    );
  }
}