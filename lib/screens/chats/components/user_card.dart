import 'package:Decentio/constants.dart';
import 'package:Decentio/models/chat/Chat.dart';
import 'package:Decentio/models/chatUser/ChatUser.dart';
import 'package:flutter/material.dart';

class UserCard extends StatelessWidget {
  const UserCard({
    Key? key,
    required this.chatUser,
  }) : super(key: key);
  final ChatUser chatUser;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      // onTap: press,
      child: Padding(
        padding: const EdgeInsets.symmetric(
            horizontal: DefaultPadding, vertical: DefaultPadding * 0.75),
        child: Row(
          children: [
            Stack(
              children: [
                CircleAvatar(
                  //TODO:tohle je potom pro group chaty icona
                  // backgroundColor: Theme.of(context).colorScheme.secondary,
                  // radius: 24,
                  // child: Icon(Icons.people_alt),
                  radius: 24,
                  backgroundImage: AssetImage(chatUser.avatarImage),
                ),
                if (chatUser.isActive)
                  Positioned(
                    right: 0,
                    bottom: 0,
                    child: Container(
                      height: 16,
                      width: 16,
                      decoration: BoxDecoration(
                        color: ActiveColor,
                        shape: BoxShape.circle,
                        border: Border.all(
                            color: Theme.of(context).scaffoldBackgroundColor,
                            width: 3),
                      ),
                    ),
                  )
              ],
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: DefaultPadding),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      chatUser.name,
                      style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w500,
                          color: Theme.of(context).colorScheme.primary),
                    ),
                    SizedBox(height: 8),
                    Opacity(
                      opacity: 0.64,
                      child: Text(
                        chatUser.lastSeen,
                        style: TextStyle(
                            color: Theme.of(context).colorScheme.primary),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
