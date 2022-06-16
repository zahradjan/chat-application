import 'package:geolocator/geolocator.dart';

abstract class ILocationShareService {
  // Future<LocationData> getLocationData(Location location);
  // Future<Location> sendLocationData();
  Future<Position> determinePosition();
}
