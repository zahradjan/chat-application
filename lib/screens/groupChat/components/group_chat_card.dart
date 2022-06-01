import 'package:Decentio/constants.dart';
import 'package:Decentio/models/groupChat/GroupChat.dart';
import 'package:flutter/material.dart';

class GroupChatCard extends StatelessWidget {
  GroupChatCard({Key? key, required this.press, required this.groupChat})
      : super(key: key);
  GroupChat groupChat;
  VoidCallback press;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: press,
      child: Padding(
        padding: const EdgeInsets.symmetric(
            horizontal: DefaultPadding, vertical: DefaultPadding * 0.75),
        child: Row(
          children: [
            Stack(
              children: [
                CircleAvatar(
                  backgroundColor: Theme.of(context).colorScheme.secondary,
                  radius: 24,
                  child: Icon(Icons.people_alt),
                ),
                if (groupChat.users.any((user) => user.isActive))
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
                      "Team",
                      style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w500,
                          color: Theme.of(context).colorScheme.primary),
                    ),
                    SizedBox(height: 8),
                    Opacity(
                      opacity: 0.64,
                      child: Text(groupChat.chatMessages.last.text,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(
                              color: Theme.of(context).colorScheme.secondary)),
                    ),
                  ],
                ),
              ),
            ),
            // Opacity(
            //   opacity: 0.64,
            //   child: Text(
            //     chat.user.lastSeen,
            //     style: TextStyle(color: Theme.of(context).colorScheme.primary),
            //   ),
            // ),
          ],
        ),
      ),
    );
  }
}
