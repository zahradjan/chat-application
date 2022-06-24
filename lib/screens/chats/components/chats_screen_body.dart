import 'package:Decentio/models/chatUser/ChatUser.dart';
import 'package:Decentio/models/groupChat/GroupChat.dart';
import 'package:Decentio/screens/chats/components/user_card.dart';
import 'package:Decentio/screens/chats/components/chat_card.dart';
import 'package:Decentio/components/filled_outline_button.dart';
import 'package:Decentio/constants.dart';
import 'package:Decentio/messages/message_screen.dart';
import 'package:Decentio/models/chat/Chat.dart';
import 'package:Decentio/models/chat/chatStore.dart';
import 'package:Decentio/screens/groupChat/components/group_chat_card.dart';
import 'package:Decentio/screens/groupChat/group_chat_screen.dart';
import 'package:Decentio/state_management/home/home_cubit.dart';
import 'package:Decentio/state_management/home/home_state.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class ChatsScreenBody extends StatefulWidget {
  ChatUser me;
  ChatsScreenBody({Key? key, required this.me}) : super(key: key);

  @override
  State<ChatsScreenBody> createState() => _ChatsScreenBodyState();
}

class _ChatsScreenBodyState extends State<ChatsScreenBody> {
  List<ChatUser> activeUsers = [];
  String listSwitcher = "";
  bool recentMessFill = true;
  bool activeUsersFill = false;
  void refresh() {
    setState(() {});
  }

  @override
  void initState() {
    // TODO: implement initState
    _initialSetup();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          padding: EdgeInsets.fromLTRB(
              DefaultPadding, 0, DefaultPadding, DefaultPadding),
          color: Theme.of(context).primaryColor,
          child: Row(
            children: [
              FillOutlineButton(
                  press: () {
                    setState(() {
                      listSwitcher = "recentMessages";
                      recentMessFill = true;
                      activeUsersFill = false;
                    });
                  },
                  isFilled: recentMessFill,
                  text: "Recent Message"),
              SizedBox(width: DefaultPadding),
              SizedBox(
                child: BlocBuilder<HomeCubit, HomeState>(
                    builder: (_, state) => FillOutlineButton(
                          press: () {
                            setState(() {
                              listSwitcher = "activeUsers";
                              recentMessFill = false;
                              activeUsersFill = true;
                            });
                          },
                          text: state is HomeSuccess
                              ? "Active (${state.onlineUsers.length})"
                              : "Active (0)",
                          isFilled: activeUsersFill,
                        )),
              )
              // FillOutlineButton(
              //   press: () {
              //     setState(() {
              //       listSwitcher = "activeUsers";
              //       recentMessFill = false;
              //       activeUsersFill = true;
              //     });
              //   },
              //   text: "Active",
              //   isFilled: activeUsersFill,
              // ),
            ],
          ),
        ),
        buildChatsList(listSwitcher)
      ],
    );
  }

  Widget buildChatsList(String listSwitcher) {
    switch (listSwitcher) {
      case "recentMessages":
        {
          return buildRecentMessagesList();
        }

      case "activeUsers":
        {
          return buildActiveUsersList();
        }
      default:
        {
          return buildRecentMessagesList();
        }
    }
  }

  Widget buildRecentMessagesList() {
    return Expanded(
      child: ListView.builder(
          itemCount: chats.length,
          itemBuilder: (context, index) {
            if (chats[index] is GroupChat) {
              return GroupChatCard(
                groupChat: chats[index],
                press: () => Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => GroupChatScreen(
                      groupChat: chats[index],
                      notifyParent: refresh,
                    ),
                  ),
                ),
              );
            } else {
              return ChatCard(
                chat: chats[index],
                press: () => Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => MessagesScreen(
                        chatData: chats[index], notifyParent: refresh),
                  ),
                ),
              );
            }
          }),
    );
  }

  Widget buildActiveUsersList() {
    List activeChatUsers = [];
    chats.forEach((chat) => {
          //TODO:Tohle jeste pozmenit budou se posilat jenom chatUsers z nejakyho jinyho listu
          if (chat is Chat && chat.user.isActive) activeChatUsers.add(chat.user)
        });
    return Expanded(
      child: ListView.builder(
          itemCount: activeChatUsers.length,
          itemBuilder: (context, index) {
            return UserCard(
              chatUser: activeChatUsers[index],
              // press: () => Navigator.push(
              //   context,
              //   MaterialPageRoute(
              //     builder: (context) =>
              //         MessagesScreen(chatData: activeChatUsers[index]),
              //   ),
              // ),
            );
          }),
    );
  }

  _initialSetup() async {
    // final user = (!widget.me.isActive)
    //     ? await context.read<HomeCubit>().connect()
    //     : widget.me;

    // // context.read<ChatsCubit>().chats();
    context.read<HomeCubit>().activeUsers(widget.me);
    // context.read<MessageBloc>().add(MessageEvent.onSubscribed(user));
  }
}
