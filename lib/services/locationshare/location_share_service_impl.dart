import 'package:Decentio/services/locationshare/location_share_service.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class LocationShareService implements ILocationShareService {
  @override
  Future<Position> determinePosition() async {
    return await Geolocator.getCurrentPosition();
  }

  @override
  Future<bool> locationServiceStatus() async {
    bool serviceEnabled;
    // Test if location services are enabled.
    serviceEnabled = await Geolocator.isLocationServiceEnabled();

    return serviceEnabled;
  }

  @override
  Future<LocationPermission> locationPermission() async {
    LocationPermission permission;
    // Test if location services are enabled.
    //After two denied it will become deniedForever or allowed if allowed
    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
    }
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
    }
    return permission;
  }

  @override
  Future<LatLng> getUserLatLng() async {
    Position userInitLocation =
        await LocationShareService().determinePosition();
    return LatLng(userInitLocation.latitude, userInitLocation.longitude);
  }
}
