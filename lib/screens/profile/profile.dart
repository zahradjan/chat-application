
import 'package:Decentio/components/primary_button.dart';
import 'package:Decentio/constants.dart';
import 'package:Decentio/screens/profile/profile_image_widget.dart';
import 'package:flutter/material.dart';

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
              ProfileImageWidget(),
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
                  //TODO: save new edits and push to chats screen
                  press: () => Navigator.maybePop(context)),

              SizedBox(height: 8),
              PrimaryButton(
                  text: "Back",
                  color: Theme.of(context).buttonTheme.colorScheme!.secondary,
                  press: () => Navigator.maybePop(context)),
              Spacer(flex: 2)
            ],
          ),
        )),
      ),
    );
  }
}
