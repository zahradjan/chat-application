import 'dart:async';
import 'dart:typed_data';

import 'package:Decentio/constants.dart';
import 'package:Decentio/models/chatMessage/ChatMessage.dart';
import 'package:Decentio/models/chatUser/chatUserStore.dart';
import 'package:Decentio/models/location/location.dart';
import 'package:Decentio/services/locationshare/location_share_service_impl.dart';
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class LocationMap extends StatefulWidget {
  List<ChatMessage> chatMessages;
  final Function() notifyParent;
  LatLng userPosition;
  LocationMap(
    this.chatMessages,
    this.notifyParent,
    this.userPosition,
  );

  @override
  State<LocationMap> createState() => _LocationMapState();
}

class _LocationMapState extends State<LocationMap> {
  Marker locationMarker = Marker(markerId: const MarkerId('locationMarker'));
  Completer<GoogleMapController> _controller = Completer();
  LocationShareService _locationShareService = LocationShareService();

  late LatLng targetedPosition;
  //USA
  // CameraPosition(
  //                 target: LatLng(40.27638647789279, -97.88926594389271),
  //                 zoom: 4),

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Stack(children: [
          GoogleMap(
              mapType: MapType.normal,
              initialCameraPosition:
                  CameraPosition(target: widget.userPosition, zoom: 14),
              onMapCreated: (GoogleMapController controller) async {
                addMarker(LatLng(widget.userPosition.latitude,
                    widget.userPosition.longitude));

                _controller.complete(controller);
              },
              zoomControlsEnabled: false,
              myLocationEnabled: true,
              myLocationButtonEnabled: true,
              markers: {if (locationMarker != null) locationMarker},
              onTap: addMarker),
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
