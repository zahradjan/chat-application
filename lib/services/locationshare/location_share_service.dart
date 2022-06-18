import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

abstract class ILocationShareService {
  Future<LatLng> getUserPosition();
  Future<Position> determinePosition();
}
