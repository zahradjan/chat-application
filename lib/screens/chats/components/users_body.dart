import 'package:Decentio/models/chatUser/chatUserStore.dart';
import 'package:Decentio/screens/chats/components/user_card.dart';
import 'package:flutter/material.dart';

class UsersBody extends StatefulWidget {
  const UsersBody({Key? key}) : super(key: key);

  @override
  State<UsersBody> createState() => _UsersBodyState();
}

class _UsersBodyState extends State<UsersBody> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Expanded(
          child: ListView.builder(
              itemCount: chatUsers.length,
              itemBuilder: (context, index) {
                return UserCard(chatUser: chatUsers[index]);
              }),
        ),
      ],
    );
  }
}
