import 'package:Decentio/constants.dart';
import 'package:Decentio/models/chat/chat.dart';
import 'package:flutter/material.dart';

class GroupChatUser extends StatefulWidget {
  Chat chatUser;
  GroupChatUser({Key? key, required this.chatUser}) : super(key: key);

  @override
  State<GroupChatUser> createState() => _GroupChatUserState();
}

class _GroupChatUserState extends State<GroupChatUser> {
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
              widget.chatUser.user.name,
              style: TextStyle(color: Theme.of(context).colorScheme.primary),
            )
          ],
        ),
      ),
    );
  }
}
