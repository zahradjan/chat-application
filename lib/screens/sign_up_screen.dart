import 'package:Decentio/state_management/profile/profile_cubit.dart';
import 'package:Decentio/state_management/profile/profile_state.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:Decentio/components/primary_button.dart';
import 'package:Decentio/configuration.dart';
import 'package:Decentio/constants.dart';
import 'package:Decentio/screens/profile/profile_image_widget.dart';
import 'package:flutter/material.dart';
import 'package:loggy/loggy.dart';

class SignUpScreen extends StatefulWidget {
  const SignUpScreen({Key? key}) : super(key: key);

  @override
  State<SignUpScreen> createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<SignUpScreen> {
  String _username = '';
  String _email = '';
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => FocusManager.instance.primaryFocus?.unfocus(),
      child: Scaffold(
        resizeToAvoidBottomInset: false,
        body: SafeArea(
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
                  SizedBox(height: DefaultPadding * 1.5),
                  TextFormField(
                    decoration: const InputDecoration(
                      border: UnderlineInputBorder(),
                      labelText: 'Enter your username',
                    ),
                    onChanged: (value) {
                      _username = value;
                    },
                  ),
                  SizedBox(height: DefaultPadding * 1.5),
                  // TextFormField(
                  //   decoration: const InputDecoration(
                  //     border: UnderlineInputBorder(),
                  //     labelText: 'Enter your password',
                  //   ),
                  // ),
                  SizedBox(height: DefaultPadding * 3),
                  BlocConsumer<ProfileCubit, ProfileState>(
                    builder: (context, state) => state is ProfileLoading
                        ? Center(child: CircularProgressIndicator())
                        : PrimaryButton(
                            text: "Sign up",
                            color: Theme.of(context)
                                .buttonTheme
                                .colorScheme!
                                .primary,
                            press: () async {
                              final error = checkInputs();
                              if (error.isNotEmpty) {
                                final snackBar = SnackBar(
                                  content: Text(
                                    error,
                                    style: TextStyle(
                                        fontSize: 14.0,
                                        fontWeight: FontWeight.bold),
                                  ),
                                );
                                ScaffoldMessenger.of(context)
                                    .showSnackBar(snackBar);
                                return;
                              }
                              await createProfileInSession();
                            },
                          ),
                    listener: (_, state) {
                      if (state is ProfileSuccess) {
                        logDebug(state);
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) =>
                                ConfigurationBase.composeChatsUI(state.user),
                          ),
                        );
                      }
                    },
                  ),

                  SizedBox(height: DefaultPadding * 1.5),
                  PrimaryButton(
                      text: "Back",
                      color:
                          Theme.of(context).buttonTheme.colorScheme!.secondary,
                      press: () => Navigator.maybePop(context)),
                  // Spacer(
                  //   flex: 2,
                  // ),
                ],
              )),
        ),
      ),
    );
  }

  createProfileInSession() async {
    //TODO: profile image upload
    await context.read<ProfileCubit>().connectProfile(_username);
  }

  String checkInputs() {
    var error = '';
    if (_email.isEmpty) error = 'Enter email';

    if (_username.isEmpty) error = error + '\nEnter display name';

    return error;
  }
}
