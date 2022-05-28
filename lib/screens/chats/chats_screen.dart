import 'package:Decentio/components/filled_outline_button.dart';
import 'package:Decentio/screens/chats/components/users_body.dart';
import 'package:Decentio/screens/chats/components/chats_screen_body.dart';
import 'package:Decentio/constants.dart';
import 'package:flutter/material.dart';

class ChatsScreen extends StatefulWidget {
  const ChatsScreen({Key? key}) : super(key: key);

  @override
  State<ChatsScreen> createState() => _ChatsScreenState();
}

class _ChatsScreenState extends State<ChatsScreen> {
  final ValueNotifier<int> pageIndex = ValueNotifier(0);
  final pages = const [
    ChatsScreenBody(),
    UsersBody(),
    ChatsScreenBody(),
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
          iconSize: 30,
          onPressed: () {},
          icon: CircleAvatar(
            radius: 25,
            backgroundImage: AssetImage("assets/images/user_5.png"),
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
}
