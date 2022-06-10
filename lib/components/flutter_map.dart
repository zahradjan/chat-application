import 'package:flutter/material.dart';
import 'package:flutter_osm_plugin/flutter_osm_plugin.dart';

class FlutterMap extends StatefulWidget {
  const FlutterMap({Key? key}) : super(key: key);

  @override
  State<FlutterMap> createState() => _FlutterMapState();
}

class _FlutterMapState extends State<FlutterMap> {
  MapController controller = MapController(
    initMapWithUserPosition: true,
    areaLimit: BoundingBox(
      east: 10.4922941,
      north: 47.8084648,
      south: 45.817995,
      west: 5.9559113,
    ),
  );

  @override
  Widget build(BuildContext context) {
    // return Container();
    return OSMFlutter(
      controller: controller,
      trackMyPosition: true,
      initZoom: 12,
      minZoomLevel: 8,
      maxZoomLevel: 19,
      stepZoom: 1.0,
      userLocationMarker: UserLocationMaker(
        personMarker: MarkerIcon(
          icon: Icon(
            Icons.location_history_rounded,
            color: Colors.red,
            size: 48,
          ),
        ),
        directionArrowMarker: MarkerIcon(
          icon: Icon(
            Icons.double_arrow,
            size: 48,
          ),
        ),
      ),
      roadConfiguration: RoadConfiguration(
        startIcon: MarkerIcon(
          icon: Icon(
            Icons.person,
            size: 64,
            color: Colors.brown,
          ),
        ),
        roadColor: Colors.yellowAccent,
      ),
      markerOption: MarkerOption(
          defaultMarker: MarkerIcon(
        icon: Icon(
          Icons.person_pin_circle,
          color: Colors.blue,
          size: 56,
        ),
      )),
    );
  }
}
