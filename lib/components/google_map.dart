import 'dart:async';

import 'package:Decentio/services/locationshare/location_share_service_impl.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class LocationMap extends StatefulWidget {
  const LocationMap({Key? key}) : super(key: key);

  @override
  State<LocationMap> createState() => _LocationMapState();
}

class _LocationMapState extends State<LocationMap> {
  Marker locationMarker = Marker(markerId: const MarkerId('locationMarker'));

  Completer<GoogleMapController> _controller = Completer();

  CameraPosition _kGooglePlex = CameraPosition(
    target: LatLng(47.42796133580664, 73.085749655962),
    zoom: 14.4746,
  );

  void _onMapCreated(Completer<GoogleMapController> _cntlr) {
    _controller = _cntlr;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: GoogleMap(
            mapType: MapType.hybrid,
            initialCameraPosition: _kGooglePlex,
            onMapCreated: (GoogleMapController controller) async {
              Position userLocation =
                  await LocationShareService().determinePosition();
              controller
                  .animateCamera(CameraUpdate.newCameraPosition(CameraPosition(
                target: LatLng(userLocation.latitude, userLocation.longitude),
                zoom: 14.4746,
              )));
              addMarker(LatLng(userLocation.latitude, userLocation.longitude));
              _controller.complete(controller);
            },
            zoomControlsEnabled: false,
            myLocationEnabled: true,
            myLocationButtonEnabled: true,
            markers: {if (locationMarker != null) locationMarker},
            onTap: addMarker),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.startFloat,
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {},
        label: Text('Share location'),
        icon: Icon(Icons.share_location),
      ),
    );
  }

  addMarker(LatLng pos) {
    setState(() {
      locationMarker =
          Marker(markerId: const MarkerId('locationMarker'), position: pos);
    });
    return locationMarker;
  }
}
