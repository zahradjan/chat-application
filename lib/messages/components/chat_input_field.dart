import 'dart:io';

import 'package:Decentio/components/google_map.dart';
import 'package:Decentio/models/chatMessage/ChatMessage.dart';
import 'package:Decentio/models/chatUser/ChatUser.dart';
import 'package:Decentio/services/locationshare/location_share_service_impl.dart';
import 'package:app_settings/app_settings.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:loggy/loggy.dart';
import 'package:uuid/uuid.dart';
import '../../../constants.dart';

class ChatInputField extends StatefulWidget {
  final Function() notifyParent;
  List<ChatMessage> chatMessages = [];
  ChatInputField(this.notifyParent, this.chatMessages);

  @override
  State<ChatInputField> createState() => _ChatInputFieldState();
}

class _ChatInputFieldState extends State<ChatInputField> {
  TextEditingController _textController = TextEditingController();
  LocationShareService _locationShareService = LocationShareService();
  Future<List<PlatformFile>?> pickAFile() async {
    FilePickerResult? result = await FilePicker.platform.pickFiles();
    // TODO: poresit v pripade ze uzivatel nic nevybere
    return result?.files;

    // Share.shareFiles([result.files.single.path.toString()]);
    // Share.share(result.files.single.path.toString());
    // } else {
    //   // User canceled the picker
    //   // Doresit vyjimku
    //   NullThrownError();
    // }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: DefaultPadding,
        vertical: DefaultPadding / 2,
      ),
      decoration: BoxDecoration(
        color: Theme.of(context).scaffoldBackgroundColor,
        boxShadow: [
          BoxShadow(
            offset: Offset(0, 4),
            blurRadius: 32,
            color: Color(0xFF087949).withOpacity(0.08),
          ),
        ],
      ),
      child: Container(
        child: Row(
          children: [
            Icon(Icons.mic, color: PrimaryColor),
            SizedBox(width: DefaultPadding / 30),
            Expanded(
              child: Container(
                padding: EdgeInsets.symmetric(
                  horizontal: DefaultPadding * 0.5,
                ),
                decoration: BoxDecoration(
                  color: Theme.of(context).scaffoldBackgroundColor,
                  borderRadius: BorderRadius.circular(40),
                ),
                child: Row(
                  children: [
                    Icon(
                      Icons.sentiment_satisfied_alt_outlined,
                      color: Theme.of(context)
                          .textTheme
                          .bodyText1!
                          .color!
                          .withOpacity(0.64),
                    ),
                    SizedBox(width: DefaultPadding / 4),
                    Expanded(
                      child: TextField(
                          controller: _textController,
                          textCapitalization: TextCapitalization.sentences,
                          style: TextStyle(
                              color: Theme.of(context).colorScheme.primary),
                          decoration: InputDecoration(
                            hintText: "Type message",
                            border: InputBorder.none,
                          )),
                    ),
                    IconButton(
                      icon: Icon(
                        Icons.attach_file,
                        color: Theme.of(context)
                            .textTheme
                            .bodyText1!
                            .color!
                            .withOpacity(0.64),
                      ),
                      onPressed: () {
                        var attachedFiles = pickAFile();
                        attachedFiles.then((files) => files?.forEach((file) {
                              var fileType = ChatMessageType.file;
                              logDebug(file.extension);

                              if (['jpg', 'png'].contains(file.extension)) {
                                fileType = ChatMessageType.image;
                              }

                              setState(() {
                                widget.chatMessages.add(ChatMessage(
                                    sender: ChatUser(),
                                    file: file,
                                    // img: Image.file(File(file.path!)),
                                    isSender: true,
                                    time: DateTime.now(),
                                    messageType: fileType,
                                    messageStatus: MessageStatus.not_view));
                                widget.notifyParent();
                              });
                              logDebug(fileType);
                            }));
                      },
                    ),
                    SizedBox(width: DefaultPadding / 4),
                    IconButton(
                      onPressed: () async {
                        bool serviceEnabled =
                            await _locationShareService.locationServiceStatus();
                        if (!serviceEnabled) {
                          showDialog(
                            context: context,
                            builder: (context) => AlertDialog(
                              title: Text("Location service disabled"),

                              titleTextStyle: TextStyle(
                                  color: Theme.of(context).colorScheme.primary),
                              // backgroundColor: Theme.of(context).colorScheme.primary,
                              content: Text("Please enable location service"),
                              contentTextStyle: TextStyle(
                                  color: Theme.of(context).colorScheme.primary),
                            ),
                          );
                          return;
                        }
                        ;
                        LocationPermission permission =
                            await _locationShareService.locationPermission();
                        // Test if location services are enabled.

                        if (permission == LocationPermission.deniedForever) {
                          // Permissions are denied forever, handle appropriately.
                          showDialog(
                            context: context,
                            builder: (context) => AlertDialog(
                              title: Text("Location permission denied"),

                              titleTextStyle: TextStyle(
                                  color: Theme.of(context).colorScheme.primary),
                              // backgroundColor: Theme.of(context).colorScheme.primary,
                              content: Text(
                                  "In order to share your location you need to give Decentio permission"),
                              contentTextStyle: TextStyle(
                                  color: Theme.of(context).colorScheme.primary),
                              actions: [
                                TextButton(
                                    onPressed: AppSettings.openLocationSettings,
                                    child: Text("Settings"))
                              ],
                            ),
                          );
                          return;
                        }

                        LatLng userPosition =
                            await _locationShareService.getUserLatLng();

                        Navigator.push(
                          context,
                          MaterialPageRoute(builder: (context) {
                            return LocationMap(widget.chatMessages,
                                widget.notifyParent, userPosition);
                          }),
                        );
                      },
                      icon: Icon(
                        Icons.location_on,
                        color: Theme.of(context)
                            .textTheme
                            .bodyText1!
                            .color!
                            .withOpacity(0.64),
                      ),
                    ),
                    // Icon(
                    //   Icons.camera_alt_outlined,
                    //   color: Theme.of(context)
                    //       .textTheme
                    //       .bodyText1!
                    //       .color!
                    //       .withOpacity(0.64),
                    // ),
                  ],
                ),
              ),
            ),
            SizedBox(width: DefaultPadding / 3),
            IconButton(
              onPressed: () {
                setState(() {
                  var id = Uuid().v4();
                  if (_textController.text.isNotEmpty) {
                    widget.chatMessages.add(ChatMessage(
                        id: id,
                        text: _textController.text,
                        sender: ChatUser(),
                        isSender: true,
                        time: DateTime.now(),
                        messageType: ChatMessageType.text,
                        messageStatus: MessageStatus.not_view));

                    widget.notifyParent();
                    _textController.clear();
                  }
                });
              },
              icon: Icon(Icons.send),
              color: Theme.of(context).colorScheme.primary,
            )
          ],
        ),
      ),
    );
  }
}
