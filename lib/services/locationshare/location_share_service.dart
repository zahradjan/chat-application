import 'package:location/location.dart';

abstract class ILocationShareService {
  // kouknout na tohle https://pub.dev/packages/location
  Future<LocationData> getLocationData(Location location);
  Future<Location> sendLocationData();
}
