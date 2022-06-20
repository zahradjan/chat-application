import 'package:Decentio/constants.dart';
import 'package:Decentio/models/chatUser/ChatUser.dart';
import 'package:flutter/material.dart';

//TODO: jeste popremyslet jak by slo vymyslet aby se pridalo vsechno jako v messagi zaroven je ale dobre sem davat usery
class UserAddedMessage extends StatefulWidget {
  ChatUser chatUser;
  UserAddedMessage({Key? key, required this.chatUser}) : super(key: key);

  @override
  State<UserAddedMessage> createState() => _UserAddedMessageState();
}

class _UserAddedMessageState extends State<UserAddedMessage> {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: DefaultPadding),
        child: Row(
          children: [
            Icon(Icons.person_add,
                color: Theme.of(context).colorScheme.primary),
            Text(
              " added user ",
              style: TextStyle(color: Theme.of(context).colorScheme.primary),
            ),
            Text(
              widget.chatUser.name,
              style: TextStyle(color: Theme.of(context).colorScheme.primary),
            )
          ],
        ),
      ),
    );
  }
}
