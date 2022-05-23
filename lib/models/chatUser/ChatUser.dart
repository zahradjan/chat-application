class ChatUser {
  String id;
  String name;
  String avatarImage;
  bool isActive;
  String lastSeen;

  ChatUser(
      {this.id = '',
      this.avatarImage = '',
      this.lastSeen = '',
      this.isActive = false,
      this.name = ''});
}
