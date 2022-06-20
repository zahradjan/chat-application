import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

abstract class ILocationShareService {
  Future<LatLng> getUserLatLng();
  Future<bool> locationServiceStatus();
  Future<LocationPermission> locationPermission();
  Future<Position> determinePosition();
}
