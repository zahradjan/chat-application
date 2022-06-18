import 'dart:async';
import 'dart:io';
import 'dart:typed_data';

import 'package:Decentio/constants.dart';
import 'package:Decentio/models/chatMessage/ChatMessage.dart';
import 'package:Decentio/models/chatUser/chatUserStore.dart';
import 'package:Decentio/models/location/location.dart';
import 'package:Decentio/services/locationshare/location_share_service_impl.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:loggy/loggy.dart';
import 'package:path_provider/path_provider.dart';
import 'package:uuid/uuid.dart';

class LocationMap extends StatefulWidget {
  List<ChatMessage> chatMessages;
  final Function() notifyParent;
  LocationMap(
    this.chatMessages,
    this.notifyParent,
  );

  @override
  State<LocationMap> createState() => _LocationMapState();
}

class _LocationMapState extends State<LocationMap> {
  Marker locationMarker = Marker(markerId: const MarkerId('locationMarker'));
  Completer<GoogleMapController> _controller = Completer();
  LocationShareService _locationShareService = LocationShareService();

  late LatLng targetedPosition;

  // @override
  // void initState() {
  //   // TODO: implement initState
  //   getUserPosition();
  //   super.initState();
  // }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Stack(children: [
          GoogleMap(
              mapType: MapType.normal,
              initialCameraPosition: CameraPosition(
                  target: LatLng(40.27638647789279, -97.88926594389271),
                  zoom: 4),
              onMapCreated: (GoogleMapController controller) async {
                LatLng userPosition =
                    await _locationShareService.getUserPosition();
                controller.animateCamera(
                    CameraUpdate.newCameraPosition(CameraPosition(
                  target: userPosition,
                  zoom: 18,
                )));
                addMarker(
                    LatLng(userPosition.latitude, userPosition.longitude));

                _controller.complete(controller);
              },
              zoomControlsEnabled: false,
              myLocationEnabled: true,
              myLocationButtonEnabled: true,
              markers: {if (locationMarker != null) locationMarker},
              onTap: addMarker),
          // Container(
          //   decoration: BoxDecoration(color: Colors.blueGrey[50]),
          //   height: 300,
          //   width: 240,
          //   child: _imageBytes != null ? Image.memory(_imageBytes) : null,
          // )
        ]),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () async {
          Uint8List? imageBytes;
          await _controller.future.then((controller) async {
            imageBytes = await controller.takeSnapshot();
          });

          Location location =
              Location(Image.memory(imageBytes!), targetedPosition);

          setState(() {
            widget.chatMessages.add(ChatMessage(
                time: DateTime.now(),
                location: location,
                sender: chatUsers[0],
                messageType: ChatMessageType.location,
                messageStatus: MessageStatus.not_view,
                isSender: true));
            widget.notifyParent();
          });
          Navigator.maybePop(context);
        },
        label: Text('Share location'),
        icon: Icon(Icons.share_location),
      ),
      appBar: buildAppBar(),
    );
  }

  addMarker(LatLng pos) {
    setState(() {
      locationMarker =
          Marker(markerId: const MarkerId('locationMarker'), position: pos);
      targetedPosition = pos;
    });
    return locationMarker;
  }

  AppBar buildAppBar() {
    return AppBar(
      automaticallyImplyLeading: false,
      title: Row(
        children: [
          BackButton(),
          SizedBox(width: DefaultPadding * 0.75),
          Text("Share your location")
        ],
      ),
      actions: [
        SizedBox(width: DefaultPadding / 2),
      ],
    );
  }
}
