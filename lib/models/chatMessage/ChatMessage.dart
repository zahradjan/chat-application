import 'dart:io';

import 'package:Decentio/models/chatUser/ChatUser.dart';
import 'package:Decentio/models/location/location.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/cupertino.dart';
import 'package:uuid/uuid.dart';

enum ChatMessageType { text, audio, image, video, file, location, addedUser }
enum MessageStatus { not_sent, not_view, viewed }

class ChatMessage {
  String id;
  String text;
  PlatformFile? file;
  Location? location;
  @Deprecated('Will be substituted by file prop')
  Image? img;
  ChatMessageType messageType;
  MessageStatus messageStatus;
  DateTime time;
  ChatUser sender;
  bool isSender;

  ChatMessage({
    this.id = '',
    this.text = '',
    this.img,
    this.file,
    this.location,
    required this.time,
    required this.sender,
    required this.messageType,
    required this.messageStatus,
    required this.isSender,
  });
}
