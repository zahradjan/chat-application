class Chat {
  String name, lastMessage, image, lastSeen;
  bool isActive, isSelected;

  Chat({
    this.name = '',
    this.lastMessage = '',
    this.image = '',
    this.lastSeen = '',
    this.isActive = false,
    this.isSelected = false,
  });
}

List chatsData = [
  Chat(
    name: "Jenny Wilson",
    lastMessage: "Hope you are doing well...",
    image: "assets/images/user.png",
    lastSeen: "3m ago",
    isActive: false,
    isSelected: false,
  ),
  Chat(
    name: "Esther Howard",
    lastMessage: "Hello Abdullah! I am...",
    image: "assets/images/user_2.png",
    lastSeen: "8m ago",
    isActive: true,
    isSelected: false,
  ),
  Chat(
    name: "Ralph Edwards",
    lastMessage: "Do you have update...",
    image: "assets/images/user_3.png",
    lastSeen: "5d ago",
    isActive: false,
    isSelected: false,
  ),
  Chat(
    name: "Jacob Jones",
    lastMessage: "You’re welcome :)",
    image: "assets/images/user_4.png",
    lastSeen: "5d ago",
    isActive: true,
    isSelected: false,
  ),
  Chat(
    name: "Albert Flores",
    lastMessage: "Thanks",
    image: "assets/images/user_5.png",
    lastSeen: "6d ago",
    isActive: false,
    isSelected: false,
  ),
  Chat(
    name: "Jenny Wilson",
    lastMessage: "Hope you are doing well...",
    image: "assets/images/user.png",
    lastSeen: "3m ago",
    isActive: false,
    isSelected: false,
  ),
  Chat(
    name: "Esther Howard",
    lastMessage: "Hello Abdullah! I am...",
    image: "assets/images/user_2.png",
    lastSeen: "8m ago",
    isActive: true,
    isSelected: false,
  ),
  Chat(
    name: "Ralph Edwards",
    lastMessage: "Do you have update...",
    image: "assets/images/user_3.png",
    lastSeen: "5d ago",
    isActive: false,
    isSelected: false,
  ),
];
