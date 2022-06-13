import 'dart:async';
import 'dart:typed_data';

import 'package:Decentio/constants.dart';
import 'package:Decentio/models/chatMessage/ChatMessage.dart';
import 'package:Decentio/models/chatUser/chatUserStore.dart';
import 'package:Decentio/services/locationshare/location_share_service_impl.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:loggy/loggy.dart';

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
  late GoogleMapController _googleMapController;
  Completer<GoogleMapController> _controller = Completer();
  var _imageBytes;
  CameraPosition _kGooglePlex = CameraPosition(
    target: LatLng(47.42796133580664, 73.085749655962),
    zoom: 14.4746,
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Stack(children: [
          GoogleMap(
              mapType: MapType.normal,
              initialCameraPosition: _kGooglePlex,
              onMapCreated: (GoogleMapController controller) async {
                Position userLocation =
                    await LocationShareService().determinePosition();
                controller.animateCamera(
                    CameraUpdate.newCameraPosition(CameraPosition(
                  target: LatLng(userLocation.latitude, userLocation.longitude),
                  zoom: 18,
                )));
                addMarker(
                    LatLng(userLocation.latitude, userLocation.longitude));

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
          var imageBytes;
          await _controller.future.then((controller) async {
            imageBytes = await controller.takeSnapshot();
          });
          setState(() {
            _imageBytes = imageBytes;
            // Share.share('https://www.google.com/maps/search/?api=1&query=${currentMArker.position.latitude},${currentMArker.position.longitude}');
            logDebug("tu");
            widget.chatMessages.add(ChatMessage(
                time: DateTime.now(),
                img: Image.memory(_imageBytes),
                sender: chatUsers[0],
                messageType: ChatMessageType.image,
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
