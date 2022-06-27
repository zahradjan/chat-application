
import 'package:Decentio/components/primary_button.dart';
import 'package:Decentio/configuration.dart';
import 'package:Decentio/constants.dart';
import 'package:Decentio/screens/profile/profile_image_widget.dart';
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
      body: GestureDetector(
        onTap: () => FocusManager.instance.primaryFocus?.unfocus(),
        child: SafeArea(
          child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: DefaultPadding),
              child: Column(
                children: [
                  // Spacer(
                  //   flex: 2,
                  // ),
                  SizedBox(height: DefaultPadding * 4),
                  ProfileImageWidget(),
                  SizedBox(height: DefaultPadding * 1.5),
                  TextFormField(
                    decoration: const InputDecoration(
                      border: UnderlineInputBorder(),
                      labelText: 'Enter your email',
                      labelStyle: TextStyle(),
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
                    color: Theme.of(context).buttonTheme.colorScheme!.primary,
                    press: () => Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) =>
                            ConfigurationBase.composeRegisteringUi(),
                      ),
                    ),
                  ),
                  SizedBox(height: DefaultPadding * 1.5),
                  PrimaryButton(
                      text: "Back",
                      color:
                          Theme.of(context).buttonTheme.colorScheme!.secondary,
                      press: () => Navigator.maybePop(context)),
                  Spacer(
                    flex: 2,
                  ),
                ],
              )),
        ),
      ),
    );
  }
}
