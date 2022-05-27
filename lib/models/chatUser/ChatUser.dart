class ChatUser {
  String id;
  String name;
  String avatarImage;
  bool isActive;
  bool isSelected;
  String lastSeen;

  ChatUser(
      {this.id = '',
      this.avatarImage = '',
      this.lastSeen = '',
      this.isActive = false,
      this.isSelected = false,
      this.name = ''});
}
