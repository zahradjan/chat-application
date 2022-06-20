import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class Location {
  Image locationImage;
  LatLng latLng;

  Location(this.locationImage, this.latLng);
}
