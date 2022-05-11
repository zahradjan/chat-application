import 'package:Decentio/components/primary_button.dart';
import 'package:Decentio/constants.dart';
import 'package:Decentio/screens/welcome_screen.dart';
import 'package:flutter/material.dart';

class SignUpScreen extends StatefulWidget {
  const SignUpScreen({Key? key}) : super(key: key);

  @override
  State<SignUpScreen> createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<SignUpScreen> {
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
                    labelText: 'Enter your email',
                  ),
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
                    text: "Sign up",
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
