import 'package:Decentio/components/primary_button.dart';
import 'package:Decentio/constants.dart';
import 'package:Decentio/screens/sign_in_screen.dart';
import 'package:Decentio/screens/sign_up_screen.dart';
import 'package:Decentio/theme.dart';
import 'package:flutter/material.dart';

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
              style: Theme.of(context).textTheme.headline1,
            ),
            SizedBox(height: DefaultPadding * 2),
            isLightTheme(context)
                ? Image.asset("assets/icons/decentioLogoLight.png")
                : Image.asset("assets/icons/decentioLogoDark.png"),
            SizedBox(height: DefaultPadding * 2),
            PrimaryButton(
              text: "Sign in",
              color: Theme.of(context).buttonTheme.colorScheme!.primary,
              press: () => Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => SignInScreen(),
                ),
              ),
            ),
            SizedBox(height: DefaultPadding * 1.5),
            PrimaryButton(
              text: "Sign up",
              color: Theme.of(context).buttonTheme.colorScheme!.secondary,
              press: () => Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => SignUpScreen(),
                ),
              ),
            ),
            Spacer(flex: 2)
          ],
        ),
      )),
    );
  }
}
