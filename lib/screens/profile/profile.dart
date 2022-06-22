import 'dart:io';

import 'package:Decentio/components/primary_button.dart';
import 'package:Decentio/constants.dart';
import 'package:Decentio/screens/chats/chats_screen.dart';
import 'package:Decentio/state_management/profile/profile_image_cubit.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class Profile extends StatefulWidget {
  const Profile({Key? key}) : super(key: key);

  @override
  State<Profile> createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
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
              Spacer(
                flex: 2,
              ),
              // SizedBox(height: DefaultPadding * 2),
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
                      backgroundColor: Theme.of(context).colorScheme.secondary,
                      child: BlocBuilder<ProfileImageCubit, String>(
                        builder: (context, state) {
                          return ClipRRect(
                            borderRadius: BorderRadius.circular(100.0),
                            child: state == ''
                                ? Icon(Icons.person_outline_rounded,
                                    size: 50.0, color: Colors.black)
                                : Image.file(File(state),
                                    width: 400, height: 400, fit: BoxFit.fill),
                          );
                        },
                      ),
                    ),
                  ),
                ),
              ),
              SizedBox(height: 8),
              Text(
                "Paul Atreides",
                style: Theme.of(context).textTheme.headline1,
              ),
              SizedBox(height: DefaultPadding * 2),
              TextFormField(
                decoration: const InputDecoration(
                  border: UnderlineInputBorder(),
                  labelText: 'Change your name',
                ),
              ),
              SizedBox(height: 8),
              TextFormField(
                decoration: const InputDecoration(
                  border: UnderlineInputBorder(),
                  labelText: 'Change your password',
                ),
              ),
              SizedBox(height: DefaultPadding * 2),
              PrimaryButton(
                text: "Confirm",
                color: Theme.of(context).buttonTheme.colorScheme!.primary,
                press: () => Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => ChatsScreen(),
                  ),
                ),
              ),
              SizedBox(height: 8),
              PrimaryButton(
                text: "Back",
                color: Theme.of(context).buttonTheme.colorScheme!.secondary,
                press: () => Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => ChatsScreen(),
                  ),
                ),
              ),
              Spacer(flex: 2)
            ],
          ),
        )),
      ),
    );
  }
}
