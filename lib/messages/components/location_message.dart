import 'dart:io';

import 'package:Decentio/models/chatMessage/ChatMessage.dart';
import 'package:flutter/material.dart';
import 'package:map_launcher/map_launcher.dart';

class LocationMessage extends StatelessWidget {
  ChatMessage message;
  LocationMessage({
    Key? key,
    required this.message,
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => launchMap(),
      child: SizedBox(
        width: MediaQuery.of(context).size.width * 0.45,
        height: MediaQuery.of(context).size.width * 1, // 45% of total width
        child: AspectRatio(
          aspectRatio: 0.5,
          child: ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: message.location!.locationImage,
          ),
        ),
      ),
    );
  }

  void launchMap() async {
    var isAvailable = await MapLauncher.isMapAvailable(MapType.google);
    if (isAvailable!) {
      await MapLauncher.showMarker(
        mapType: MapType.google,
        coords: Coords(message.location!.latLng.latitude,
            message.location!.latLng.longitude),
        title: "Test",
      );
    }
  }
}
