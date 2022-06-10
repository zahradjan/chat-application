import 'package:Decentio/constants.dart';
import 'package:Decentio/models/chatUser/ChatUser.dart';
import 'package:flutter/material.dart';

class GroupChatUserAdded extends StatefulWidget {
  ChatUser chatUser;
  GroupChatUserAdded({Key? key, required this.chatUser}) : super(key: key);

  @override
  State<GroupChatUserAdded> createState() => _GroupChatUserAddedState();
}

class _GroupChatUserAddedState extends State<GroupChatUserAdded> {
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
