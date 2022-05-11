import 'package:Decentio/components/primary_button.dart';
import 'package:Decentio/constants.dart';
import 'package:Decentio/screens/welcome_screen.dart';
import 'package:flutter/material.dart';

class SignInScreen extends StatefulWidget {
  const SignInScreen({Key? key}) : super(key: key);

  @override
  State<SignInScreen> createState() => _SignInScreenState();
}

class _SignInScreenState extends State<SignInScreen> {
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
                  "Please enter your credentials",
                  style: Theme.of(context).textTheme.headline1,
                ),
                SizedBox(height: DefaultPadding * 1.5),
                TextFormField(
                  decoration: const InputDecoration(
                    border: UnderlineInputBorder(),
                    labelText: 'Enter your username',
                  ),
                ),
                SizedBox(height: DefaultPadding * 1.5),
                TextFormField(
                  decoration: const InputDecoration(
                    border: UnderlineInputBorder(),
                    labelText: 'Enter your password',
                  ),
                ),
                SizedBox(height: DefaultPadding * 3),
                PrimaryButton(
                    text: "Sign in",
                    color: Theme.of(context).colorScheme.primary,
                    press: () {}),
                SizedBox(height: DefaultPadding * 1.5),
                PrimaryButton(
                  text: "Back",
                  color: Theme.of(context).colorScheme.secondary,
                  press: () => Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => WelcomeScreen(),
                    ),
                  ),
                ),
                Spacer(
                  flex: 2,
                ),
              ],
            )),
      ),
    );
  }
}
