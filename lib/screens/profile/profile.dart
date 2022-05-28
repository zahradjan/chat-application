import 'package:Decentio/components/primary_button.dart';
import 'package:Decentio/constants.dart';
import 'package:Decentio/screens/chats/chats_screen.dart';
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
              Center(
                child: CircleAvatar(
                  radius: 60,
                  backgroundImage: AssetImage("assets/images/user_6.jpg"),
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
                color: Theme.of(context).colorScheme.primary,
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
                color: Theme.of(context).colorScheme.secondary,
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
