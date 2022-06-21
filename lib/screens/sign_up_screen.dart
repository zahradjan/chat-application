import 'dart:io';

import 'package:Decentio/components/primary_button.dart';
import 'package:Decentio/constants.dart';
import 'package:Decentio/screens/welcome_screen.dart';
import 'package:Decentio/state_management/profile/profile_image_cubit.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

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
                  SizedBox(
                    height: 130,
                    width: MediaQuery.of(context).size.width,
                    child: InkWell(
                      borderRadius: BorderRadius.circular(126.0),
                      onTap: () async {
                        await context.read<ProfileImageCubit>().getImage();
                      },
                      child: Center(
                        child: CircleAvatar(
                          radius: 70,
                          backgroundColor:
                              Theme.of(context).colorScheme.secondary,
                          child: BlocBuilder<ProfileImageCubit, String>(
                            builder: (context, state) {
                              return ClipRRect(
                                borderRadius: BorderRadius.circular(100.0),
                                child: state == ''
                                    ? Icon(Icons.person_outline_rounded,
                                        size: 50.0, color: Colors.black)
                                    : Image.file(File(state),
                                        width: 400,
                                        height: 400,
                                        fit: BoxFit.fill),
                              );
                            },
                          ),
                        ),
                      ),
                    ),
                  ),
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
                      press: () {}),
                  SizedBox(height: DefaultPadding * 1.5),
                  PrimaryButton(
                    text: "Back",
                    color: Theme.of(context).buttonTheme.colorScheme!.secondary,
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
      ),
    );
  }
}
