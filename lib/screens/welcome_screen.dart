import 'package:Decentio/components/primary_button.dart';
import 'package:Decentio/constants.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class WelcomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
          child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: DefaultPadding),
        child: Column(
          children: [
            Spacer(
              flex: 2,
            ),
            Text(
              "Welcome to Decentio",
              style: GoogleFonts.getFont("Lato",
                  textStyle: TextStyle(
                      fontSize: 24, color: TextLightThemePrimaryColor)),
            ),
            SizedBox(height: DefaultPadding * 1.5),
            PrimaryButton(text: "Sign in", press: () {}),
            SizedBox(height: DefaultPadding * 1.5),
            PrimaryButton(text: "Sign up", press: () {}),
            Spacer(flex: 2)
          ],
        ),
      )),
    );
  }
}
