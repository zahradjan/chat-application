import 'package:flutter/material.dart';

class ChatUser {
  String id;
  String name;
  String? avatarImage;
  bool isActive;
  bool isSelected;
  //TODO: zmenit na DateTime
  String lastSeen;

  ChatUser(
      {this.id = '',
      this.avatarImage,
      this.lastSeen = '',
      this.isActive = false,
      this.isSelected = false,
      this.name = ''});

  toJson() => {
        'id': id,
        'name': name,
        'avatarImage': avatarImage,
        'is_active': isActive,
        'last_seen': lastSeen,
      };

  factory ChatUser.fromJson(Map<String, dynamic> json) {
    final user = ChatUser(
        name: json['name'],
        avatarImage: json['avatar_image'],
        isActive: json['is_active'],
        lastSeen: json['last_seen']);
    user.id = json['id'];
    return user;
  }
}
