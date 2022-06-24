import 'package:Decentio/models/chatUser/ChatUser.dart';
import 'package:Decentio/screens/chats/components/users_body.dart';
import 'package:Decentio/screens/chats/components/chats_screen_body.dart';
import 'package:Decentio/constants.dart';
import 'package:Decentio/screens/profile/profile.dart';
import 'package:Decentio/state_management/home/home_cubit.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class ChatsScreen extends StatefulWidget {
  ChatUser me;
  ChatsScreen({required this.me, Key? key}) : super(key: key);

  @override
  State<ChatsScreen> createState() => _ChatsScreenState();
}

class _ChatsScreenState extends State<ChatsScreen> {
  ChatUser? _user;
  @override
  void initState() {
    // TODO: implement initState
    _user = widget.me;
    _initialSetup();
    super.initState();
  }

  final ValueNotifier<int> pageIndex = ValueNotifier(0);
  late var pages = [
    ChatsScreenBody(me: widget.me),
    UsersBody(),
    //TODO:CallsBodyScreen
    // ChatsScreenBody(
    //   me: _user!,
    // ),
  ];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: buildAppBar(),
      body: ValueListenableBuilder(
        valueListenable: pageIndex,
        builder: (context, int value, _) {
          return pages[value];
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: PrimaryColor,
        child: Icon(
          Icons.person_add_alt_1,
          color: Colors.white,
        ),
      ),
      bottomNavigationBar: buildBottomNavigationBar(),
    );
  }

  BottomNavigationBar buildBottomNavigationBar() {
    return BottomNavigationBar(
      type: BottomNavigationBarType.fixed,
      currentIndex: pageIndex.value,
      onTap: (value) {
        setState(() {
          pageIndex.value = value;
        });
      },
      items: [
        BottomNavigationBarItem(icon: Icon(Icons.messenger), label: "Chats"),
        BottomNavigationBarItem(icon: Icon(Icons.people), label: "People"),
        BottomNavigationBarItem(icon: Icon(Icons.call), label: "Calls"),
      ],
    );
  }

  AppBar buildAppBar() {
    return AppBar(
      automaticallyImplyLeading: false,
      title: Row(children: [
        IconButton(
          onPressed: () => Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => Profile(),
            ),
          ),
          icon: CircleAvatar(
            radius: 30,
            backgroundImage: AssetImage("assets/images/paul_atreides.jpg"),
          ),
        ),
        SizedBox(
          width: 6,
        ),
        Text("Chats")
      ]),
      actions: [
        IconButton(
          icon: Icon(Icons.search),
          onPressed: () {},
        ),
      ],
    );
  }

  _initialSetup() async {
    // final user =
    //     (!_user!.isActive) ? await context.read<HomeCubit>().connect() : _user;

    // // context.read<ChatsCubit>().chats();
    // context.read<HomeCubit>().activeUsers(user!);
    // context.read<MessageBloc>().add(MessageEvent.onSubscribed(user));
  }
}
